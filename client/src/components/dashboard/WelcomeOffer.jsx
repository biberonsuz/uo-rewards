import styles from '../../styles/dashboard.module.css';

export default function WelcomeOffer() {
  return (
    <div className={styles.offerCard}>
      <div className={styles.offerHeader}>
        <span className={styles.annotation}>Welcome Offer</span>
      </div>
      <div className={styles.offerAmount}>10%</div>
      <div className={styles.offerDescription}>off your first order as a UO Rewards member</div>
      <a href="https://www.urbanoutfitters.com/en-gb/?ar=uo-us,uo-uk" className={styles.btn}>Claim Now →</a>
      <p className={styles.offerExpiry}>Expires in 14 days</p>
    </div>
  );
}
