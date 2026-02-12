import { useState, useEffect } from 'react';
import RewardItem from '../shared/RewardItem';
import { apiClient } from '../../api/client';
import styles from '../../styles/dashboard.module.css';

export default function RewardsLocker() {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await apiClient.get('/api/rewards/locker');
        setRewards(data.rewards || []);
      } catch { /* ignore */ }
    };
    fetchRewards();
  }, []);

  return (
    <section className={styles.rewardsLockerSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>My Rewards Locker</h2>
      </div>
      <div className={styles.rewardsLockerGrid}>
        {rewards.map((reward) => (
          <RewardItem
            key={reward.id}
            icon={reward.icon}
            title={reward.title}
            description={reward.description}
            unlocked={reward.unlocked}
            badge={reward.unlocked ? 'Unlocked' : 'Locked'}
          />
        ))}
      </div>
    </section>
  );
}
