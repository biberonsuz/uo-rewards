import styles from '../../styles/dashboard.module.css';

export default function WelcomeHero({ stamps = [] }) {
  const earnedCount = stamps.length;
  const totalStamps = 3;
  const remaining = totalStamps - earnedCount;

  return (
    <section className={styles.welcomeHero}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeLeft}>
          <div className={styles.welcomeText}></div>
          <div
            className={styles.stampMessage}
            onClick={() => { window.location.href = 'https://www.urbanoutfitters.com/en-gb/?ar=uo-us,uo-uk'; }}
            style={{ cursor: 'pointer' }}
          >
            <span>
              <strong>{remaining > 0 ? `${remaining} more order${remaining !== 1 ? 's' : ''} to go!` : 'Reward unlocked!'}</strong>{' '}
              Spend £20+ per order to earn your next stamp. Collect 3 stamps to get £5 off your next order.
            </span>
          </div>
          <div className={styles.stampProgress}>
            <div
              className={styles.stampsContainer}
              onClick={() => { window.location.href = 'https://www.urbanoutfitters.com/en-gb/?ar=uo-us,uo-uk'; }}
              style={{ cursor: 'pointer' }}
            >
              {[1, 2, 3].map((num) => {
                const isEarned = num <= earnedCount;
                const isReward = num === 3;
                let className = styles.stamp;
                if (isEarned) className += ` ${styles.earned}`;
                if (!isEarned && num === earnedCount + 1) className += ` ${styles.current}`;
                if (isReward) className += ` ${styles.rewardStamp}`;
                return (
                  <div key={num} className={className}>
                    <span className={styles.stampNumber}>{num}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.qrCodeSection}>
          <p className={styles.qrCodeLabel}>
            Scan me at the <br />till for rewards!
          </p>
          <div className={styles.qrCode}>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.urbanoutfitters.com/en-gb/uo-rewards"
              alt="QR Code for UO Rewards"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
