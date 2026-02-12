const { getDb } = require('../db/init');

function getStampProgress(userId) {
  const db = getDb();
  const stamps = db.prepare(
    'SELECT * FROM stamps WHERE user_id = ? ORDER BY cycle DESC, stamp_number ASC'
  ).all(userId);

  // Determine current cycle
  const currentCycle = stamps.length > 0 ? stamps[0].cycle : 1;
  const currentStamps = stamps.filter(s => s.cycle === currentCycle);

  return {
    cycle: currentCycle,
    stamps: currentStamps.map(s => ({
      number: s.stamp_number,
      earnedAt: s.earned_at
    })),
    earned: currentStamps.length,
    total: 3
  };
}

function getRewardsLocker(userId) {
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  if (!user) return [];

  return [
    {
      id: 'welcome-offer',
      type: 'welcome-offer',
      icon: '/images/icons/welcome-offer.png',
      title: 'Welcome Offer',
      description: '10% off your first order',
      unlocked: !!user.verified,
      badge: user.verified ? 'Unlocked' : 'Locked'
    },
    {
      id: 'birthday-gift',
      type: 'birthday-gift',
      icon: '/images/icons/birthday.png',
      title: 'Birthday Gift',
      description: 'A special treat on your birthday',
      unlocked: !!(user.birthdate && user.style_preference),
      badge: (user.birthdate && user.style_preference) ? 'Unlocked' : 'Locked'
    },
    {
      id: 'app-download',
      type: 'app-download',
      icon: '/images/icons/UO-App-Icon.png',
      title: 'App Download Reward',
      description: 'Download the UO app for a reward',
      unlocked: !!user.app_download_clicked,
      badge: user.app_download_clicked ? 'Unlocked' : 'Locked'
    }
  ];
}

module.exports = { getStampProgress, getRewardsLocker };
