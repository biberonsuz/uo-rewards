const { getDb } = require('../db/init');

function getAddresses(userId) {
  const db = getDb();
  return db.prepare('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC').all(userId);
}

function createAddress(userId, data) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO addresses (user_id, label, full_name, address_line_1, address_line_2, city, postcode, country, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );
  const result = stmt.run(
    userId,
    data.label || 'Default',
    data.fullName || null,
    data.addressLine1,
    data.addressLine2 || null,
    data.city,
    data.postcode,
    data.country || 'United Kingdom',
    data.isDefault ? 1 : 0
  );
  return db.prepare('SELECT * FROM addresses WHERE id = ?').get(result.lastInsertRowid);
}

function updateAddress(id, userId, data) {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM addresses WHERE id = ? AND user_id = ?').get(id, userId);
  if (!existing) return null;

  const fields = [];
  const values = [];

  if (data.label !== undefined) { fields.push('label = ?'); values.push(data.label); }
  if (data.fullName !== undefined) { fields.push('full_name = ?'); values.push(data.fullName); }
  if (data.addressLine1 !== undefined) { fields.push('address_line_1 = ?'); values.push(data.addressLine1); }
  if (data.addressLine2 !== undefined) { fields.push('address_line_2 = ?'); values.push(data.addressLine2); }
  if (data.city !== undefined) { fields.push('city = ?'); values.push(data.city); }
  if (data.postcode !== undefined) { fields.push('postcode = ?'); values.push(data.postcode); }
  if (data.country !== undefined) { fields.push('country = ?'); values.push(data.country); }

  if (fields.length === 0) return existing;

  fields.push('updated_at = datetime(\'now\')');
  values.push(id, userId);

  db.prepare(`UPDATE addresses SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`).run(...values);
  return db.prepare('SELECT * FROM addresses WHERE id = ?').get(id);
}

function deleteAddress(id, userId) {
  const db = getDb();
  const result = db.prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?').run(id, userId);
  return result.changes > 0;
}

function formatAddress(addr) {
  return {
    id: addr.id,
    label: addr.label,
    fullName: addr.full_name,
    addressLine1: addr.address_line_1,
    addressLine2: addr.address_line_2,
    city: addr.city,
    postcode: addr.postcode,
    country: addr.country,
    isDefault: !!addr.is_default
  };
}

module.exports = { getAddresses, createAddress, updateAddress, deleteAddress, formatAddress };
