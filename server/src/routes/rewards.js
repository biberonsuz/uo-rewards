const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const { getStampProgress, getRewardsLocker } = require('../services/rewardService');

router.use(requireAuth);

// GET /api/rewards/stamps
router.get('/stamps', (req, res) => {
  const progress = getStampProgress(req.user.userId);
  res.json(progress);
});

// GET /api/rewards/locker
router.get('/locker', (req, res) => {
  const rewards = getRewardsLocker(req.user.userId);
  res.json({ rewards });
});

module.exports = router;
