const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const {
  findUserByEmail,
  createUser,
  createVerificationCode,
  validateVerificationCode,
  markUserVerified,
  validateRefreshToken,
  revokeRefreshToken,
  issueTokens,
  formatUserResponse
} = require('../services/authService');

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  const { email, mobileNumber, birthdate, stylePreference } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  let user = findUserByEmail(email.toLowerCase());

  if (user && user.verified) {
    return res.status(409).json({ error: 'Account already exists. Please log in.' });
  }

  if (!user) {
    user = createUser(email.toLowerCase(), { mobileNumber, birthdate, stylePreference });
  }

  const { code, expiresAt } = createVerificationCode(user.id, 'email');

  const response = { message: 'Verification code sent', expiresAt };
  if (process.env.NODE_ENV !== 'production') {
    response.devCode = code;
  }

  res.status(201).json(response);
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const user = findUserByEmail(email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'Account not found. Please sign up.' });
  }

  const { code, expiresAt } = createVerificationCode(user.id, 'email');

  const response = { message: 'Verification code sent', expiresAt };
  if (process.env.NODE_ENV !== 'production') {
    response.devCode = code;
  }

  res.json(response);
});

// POST /api/auth/verify
router.post('/verify', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: 'Email and code are required' });
  }

  const user = findUserByEmail(email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const isValid = validateVerificationCode(user.id, code, 'email');
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid or expired verification code' });
  }

  if (!user.verified) {
    markUserVerified(user.id);
  }

  const tokens = issueTokens(user);
  const updatedUser = findUserByEmail(email.toLowerCase());

  res.json({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    user: formatUserResponse(updatedUser)
  });
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  const record = validateRefreshToken(refreshToken);
  if (!record) {
    return res.status(401).json({ error: 'Invalid or expired refresh token' });
  }

  const { signAccessToken } = require('../utils/jwt');
  const { getDb } = require('../db/init');
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(record.user_id);

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const accessToken = signAccessToken({ userId: user.id, email: user.email });
  res.json({ accessToken, user: formatUserResponse(user) });
});

// POST /api/auth/logout
router.post('/logout', requireAuth, (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    revokeRefreshToken(refreshToken);
  }
  res.json({ message: 'Logged out' });
});

// POST /api/auth/resend-code
router.post('/resend-code', (req, res) => {
  const { email, type = 'email' } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const user = findUserByEmail(email.toLowerCase());
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { code, expiresAt } = createVerificationCode(user.id, type);

  const response = { message: 'Verification code sent', expiresAt };
  if (process.env.NODE_ENV !== 'production') {
    response.devCode = code;
  }

  res.json(response);
});

module.exports = router;
