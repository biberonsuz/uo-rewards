import styles from '../../styles/cards.module.css';

export default function RewardItem({ icon, title, description, unlocked, badge, onAction }) {
  return (
    <div className={`${styles.rewardItem} ${unlocked ? styles.unlocked : styles.locked}`}>
      {badge && <span className={styles.rewardBadge}>{badge}</span>}
      <div className={styles.rewardIcon}>
        <img src={icon} alt={title} />
      </div>
      <h3 className={styles.rewardTitle}>{title}</h3>
      <p className={styles.rewardDescription}>{description}</p>
      <div className={`${styles.rewardStatus} ${unlocked ? styles.statusUnlocked : styles.statusLocked}`}>
        {unlocked ? (
          <a href="https://www.urbanoutfitters.com/en-gb/?ar=uo-us,uo-uk" className={styles.claimLink} target="_blank" rel="noopener noreferrer">Claim</a>
        ) : (
          <span>Locked</span>
        )}
      </div>
    </div>
  );
}
