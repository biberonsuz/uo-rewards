import styles from '../../styles/profile.module.css';

export default function EmailPreferences() {
  return (
    <div className={styles.emailPreferencesSection}>
      <div className={styles.profileHeader}>
        <h2 className={styles.profileTitle}>Email Preferences</h2>
      </div>
      <button type="button" className={styles.btnPrimary}>Update</button>
    </div>
  );
}
