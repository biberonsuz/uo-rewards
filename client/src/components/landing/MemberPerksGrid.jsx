import styles from '../../styles/landing.module.css';

const perks = [
  { icon: '/images/icons/welcome-offer.png', title: 'Welcome Offer', description: 'Enjoy 10% off your next order when you join UO Rewards.' },
  { icon: '/images/icons/reward-icon.png', title: 'Earn Stamps', description: 'Get a stamp for every £20 you spend. Collect 3 stamps to unlock a £5 reward.' },
  { icon: '/images/icons/early-access.png', title: 'Unlock Rewards', description: 'Redeem your rewards online or in-store. Rewards never expire.' },
  { icon: '/images/icons/events.png', title: 'Member Events', description: 'Get priority access to exclusive member-only events and previews.' },
  { icon: '/images/icons/competitions.png', title: 'Win Competitions', description: 'Enter member-exclusive competitions to win prizes worth up to £180.' },
  { icon: '/images/icons/birthday.png', title: 'Birthday Reward', description: 'Get a special surprise on your birthday as a UO Rewards member.' },
];

export default function MemberPerksGrid() {
  return (
    <section className={styles.memberPerksSection}>
      <div className={styles.memberPerksGrid}>
        {perks.map((perk, i) => (
          <div key={i} className={styles.perkItem}>
            <img className={styles.perkIcon} src={perk.icon} alt={perk.title} />
            <div className={styles.perkText}>
              <h3 className={styles.perkTitle}>{perk.title}</h3>
              <p className={styles.perkDescription}>{perk.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
