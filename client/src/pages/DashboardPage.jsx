import { useState, useEffect } from 'react';
import WelcomeHero from '../components/dashboard/WelcomeHero';
import WelcomeOffer from '../components/dashboard/WelcomeOffer';
import DownloadApp from '../components/dashboard/DownloadApp';
import NextDropCountdown from '../components/dashboard/NextDropCountdown';
import MemberExclusivesDash from '../components/dashboard/MemberExclusivesDash';
import RewardsLocker from '../components/dashboard/RewardsLocker';
import FAQ from '../components/shared/FAQ';
import { apiClient } from '../api/client';
import styles from '../styles/dashboard.module.css';

export default function DashboardPage() {
  const [stamps, setStamps] = useState([]);

  useEffect(() => {
    const fetchStamps = async () => {
      try {
        const data = await apiClient.get('/api/rewards/stamps');
        setStamps(data.stamps || []);
      } catch { /* ignore */ }
    };
    fetchStamps();
  }, []);

  return (
    <div>
      <WelcomeHero stamps={stamps} />

      <div className={styles.mainGrid}>
        <div className={styles.welcomePriorityContainer}>
          <WelcomeOffer />
          <DownloadApp />
        </div>
        <NextDropCountdown />
      </div>

      <MemberExclusivesDash />
      <RewardsLocker />
      <FAQ />
    </div>
  );
}
