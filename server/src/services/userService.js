const { getDb } = require('../db/init');

function getUserById(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

function updateProfile(userId, data) {
  const db = getDb();
  const fields = [];
  const values = [];

  if (data.firstName !== undefined) { fields.push('first_name = ?'); values.push(data.firstName); }
  if (data.lastName !== undefined) { fields.push('last_name = ?'); values.push(data.lastName); }
  if (data.mobileNumber !== undefined) { fields.push('mobile_number = ?'); values.push(data.mobileNumber); }
  if (data.birthdate !== undefined) { fields.push('birthdate = ?'); values.push(data.birthdate); }
  if (data.stylePreference !== undefined) { fields.push('style_preference = ?'); values.push(data.stylePreference); }

  if (fields.length === 0) return getUserById(userId);

  fields.push('updated_at = datetime(\'now\')');
  values.push(userId);

  db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...values);
  return getUserById(userId);
}

function markMobileVerified(userId) {
  const db = getDb();
  db.prepare(
    'UPDATE users SET mobile_verified = 1, updated_at = datetime(\'now\') WHERE id = ?'
  ).run(userId);
}

function markAppDownloadClicked(userId) {
  const db = getDb();
  db.prepare(
    'UPDATE users SET app_download_clicked = 1, updated_at = datetime(\'now\') WHERE id = ?'
  ).run(userId);
}

module.exports = { getUserById, updateProfile, markMobileVerified, markAppDownloadClicked };
