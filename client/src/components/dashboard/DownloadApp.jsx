import { apiClient } from '../../api/client';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/dashboard.module.css';

export default function DownloadApp() {
  const { refreshUser } = useAuth();

  const handleClick = async () => {
    try {
      await apiClient.post('/api/user/app-download');
      await refreshUser();
    } catch { /* ignore */ }
  };

  return (
    <section className={styles.priorityPassSection}>
      <span className={styles.annotation}>Download the App</span>
      <div className={styles.priorityPassContent}>
        <p className={styles.priorityPassDescription}>
          Download the UO app to shop new drops first, access member exclusives and manage your rewards on the go.
        </p>
        <div className={styles.downloadAppButtons}>
          <a href="https://www.urbanoutfitters.com/en-gb/apps" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
            <img src="/images/download-app-atore.svg" alt="Download on the App Store" />
          </a>
          <a href="https://www.urbanoutfitters.com/en-gb/apps" target="_blank" rel="noopener noreferrer" onClick={handleClick}>
            <img src="/images/download-play-store.svg" alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
}
