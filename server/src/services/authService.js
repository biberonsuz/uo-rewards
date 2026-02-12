const crypto = require('crypto');
const { getDb } = require('../db/init');
const { generateCode } = require('../utils/codeGenerator');
const { signAccessToken } = require('../utils/jwt');

function findUserByEmail(email) {
  const db = getDb();
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

function createUser(email, data = {}) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO users (email, mobile_number, birthdate, style_preference) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(email, data.mobileNumber || null, data.birthdate || null, data.stylePreference || null);
  return db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
}

function createVerificationCode(userId, type = 'email') {
  const db = getDb();
  // Invalidate any existing unused codes for this user and type
  db.prepare(
    'UPDATE verification_codes SET used = 1 WHERE user_id = ? AND type = ? AND used = 0'
  ).run(userId, type);

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  db.prepare(
    'INSERT INTO verification_codes (user_id, code, type, expires_at) VALUES (?, ?, ?, ?)'
  ).run(userId, code, type, expiresAt);

  return { code, expiresAt };
}

function validateVerificationCode(userId, code, type = 'email') {
  const db = getDb();
  const record = db.prepare(
    'SELECT * FROM verification_codes WHERE user_id = ? AND code = ? AND type = ? AND used = 0 AND expires_at > datetime(\'now\') ORDER BY created_at DESC LIMIT 1'
  ).get(userId, code, type);

  if (!record) return false;

  db.prepare('UPDATE verification_codes SET used = 1 WHERE id = ?').run(record.id);
  return true;
}

function markUserVerified(userId) {
  const db = getDb();
  db.prepare(
    'UPDATE users SET verified = 1, verified_at = datetime(\'now\'), updated_at = datetime(\'now\') WHERE id = ?'
  ).run(userId);
}

function createRefreshToken(userId) {
  const db = getDb();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(
    'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)'
  ).run(userId, token, expiresAt);
  return token;
}

function validateRefreshToken(token) {
  const db = getDb();
  const record = db.prepare(
    'SELECT * FROM refresh_tokens WHERE token = ? AND revoked = 0 AND expires_at > datetime(\'now\')'
  ).get(token);
  return record || null;
}

function revokeRefreshToken(token) {
  const db = getDb();
  db.prepare('UPDATE refresh_tokens SET revoked = 1 WHERE token = ?').run(token);
}

function issueTokens(user) {
  const accessToken = signAccessToken({ userId: user.id, email: user.email });
  const refreshToken = createRefreshToken(user.id);
  return { accessToken, refreshToken };
}

function formatUserResponse(user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    mobileNumber: user.mobile_number,
    mobileVerified: !!user.mobile_verified,
    birthdate: user.birthdate,
    stylePreference: user.style_preference,
    isStudent: !!user.is_student,
    appDownloadClicked: !!user.app_download_clicked,
    verified: !!user.verified,
    verifiedAt: user.verified_at,
    createdAt: user.created_at
  };
}

module.exports = {
  findUserByEmail,
  createUser,
  createVerificationCode,
  validateVerificationCode,
  markUserVerified,
  createRefreshToken,
  validateRefreshToken,
  revokeRefreshToken,
  issueTokens,
  formatUserResponse
};
