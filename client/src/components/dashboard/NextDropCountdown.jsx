import useCountdown from '../../hooks/useCountdown';
import styles from '../../styles/dashboard.module.css';

export default function NextDropCountdown() {
  const targetDate = new Date(2026, 2, 12, 16, 0, 0); // 12 March 2026, 4 PM
  const { formatted } = useCountdown(targetDate);

  return (
    <div className={styles.stepsCard}>
      <span className={styles.annotation}>Next Drop</span>
      <div>
        <div className={styles.nextDropCountdown}>{formatted}</div>
        <div className={styles.nextDropLabel}>Until the drop</div>
      </div>
      <div className={styles.nextDropHeader}>
        <div className={styles.nextDropTitle}>New In: Urban Renewal Drop</div>
        <p className={styles.nextDropSubtitle}>
          One-of-a-kind vintage and upcycled pieces, reimagined for now. Each item is sourced from around the world and reworked by hand — no two are alike. Once they're gone, they're gone.
        </p>
      </div>
    </div>
  );
}
