const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { getUserById, updateProfile, markMobileVerified, markAppDownloadClicked } = require('../services/userService');
const { formatUserResponse, createVerificationCode, validateVerificationCode } = require('../services/authService');

router.use(requireAuth);

// GET /api/user/profile
router.get('/profile', (req, res) => {
  const user = getUserById(req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(formatUserResponse(user));
});

// PUT /api/user/profile
router.put('/profile', (req, res) => {
  const { firstName, lastName, mobileNumber, birthdate, stylePreference } = req.body;
  const user = updateProfile(req.user.userId, { firstName, lastName, mobileNumber, birthdate, stylePreference });
  res.json(formatUserResponse(user));
});

// POST /api/user/verify-mobile
router.post('/verify-mobile', (req, res) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  // Update mobile number on user
  updateProfile(req.user.userId, { mobileNumber });

  const { code, expiresAt } = createVerificationCode(req.user.userId, 'mobile');

  const response = { message: 'Mobile verification code sent', expiresAt };
  if (process.env.NODE_ENV !== 'production') {
    response.devCode = code;
  }

  res.json(response);
});

// POST /api/user/confirm-mobile
router.post('/confirm-mobile', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Verification code is required' });
  }

  const isValid = validateVerificationCode(req.user.userId, code, 'mobile');
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid or expired verification code' });
  }

  markMobileVerified(req.user.userId);
  const user = getUserById(req.user.userId);
  res.json(formatUserResponse(user));
});

// POST /api/user/app-download
router.post('/app-download', (req, res) => {
  markAppDownloadClicked(req.user.userId);
  const user = getUserById(req.user.userId);
  res.json(formatUserResponse(user));
});

module.exports = router;
