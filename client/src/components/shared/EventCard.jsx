import styles from '../../styles/cards.module.css';

export default function EventCard({ image, badge, title, date, location, ctaText, onCtaClick }) {
  return (
    <div className={styles.eventCard}>
      <div className={styles.eventImage} style={{ backgroundImage: `url('${image}')` }} />
      <div className={styles.eventContent}>
        {badge && <span className={styles.memberBadge}>{badge}</span>}
        <h3 className={styles.eventTitle}>{title}</h3>
        <p className={styles.eventDate}>{date}</p>
        <div className={styles.eventFooter}>
          <span className={styles.eventLocation}>{location || ''}</span>
          <button className={styles.enterBtn} onClick={onCtaClick}>{ctaText}</button>
        </div>
      </div>
    </div>
  );
}
