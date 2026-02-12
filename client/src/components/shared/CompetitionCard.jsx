import styles from '../../styles/cards.module.css';

export default function CompetitionCard({ image, title, prize, daysLeft, ctaText, onCtaClick }) {
  return (
    <div className={styles.competitionCard}>
      <div className={styles.competitionImage} style={{ backgroundImage: `url('${image}')` }} />
      <div className={styles.competitionContent}>
        <span className={styles.memberBadge}>Competitions</span>
        <h3 className={styles.competitionTitle}>{title}</h3>
        <p className={styles.competitionPrize}>{prize}</p>
        <div className={styles.competitionFooter}>
          <span className={styles.competitionTimer}>{daysLeft} days left</span>
          <button className={styles.enterBtn} onClick={onCtaClick}>{ctaText}</button>
        </div>
      </div>
    </div>
  );
}
