import EventCard from '../shared/EventCard';
import CompetitionCard from '../shared/CompetitionCard';
import styles from '../../styles/landing.module.css';

const events = [
  {
    image: '/images/uo-stamp-campaign.png',
    badge: 'Benefits',
    title: 'Collect Stamps to earn Rewards',
    date: 'Collect a £5 reward every 3rd purchase to redeem on your 4th purchase. Spend £20+ per order to earn your next stamp.',
    location: '',
    ctaText: 'Join to View',
  },
  {
    image: '/images/uo-priority-pass.jpg',
    badge: 'Benefits',
    title: 'Next Day Delivery Pass',
    date: 'Enjoy Unlimited next day Delivery on all purchases for an entire year for just £12*',
    location: '',
    ctaText: 'Join to View',
  },
  {
    image: '/images/uo-event-1.jpg',
    badge: 'Events',
    title: 'UO Rewards Member Night',
    date: 'March 15, 2026 • 6:00 PM',
    location: 'London Brick Lane Store',
    ctaText: 'Join to RSVP',
  },
  {
    image: '/images/uo-events-3.jpg',
    badge: 'Events',
    title: 'DJ Night & Shopping',
    date: 'March 28, 2026 • 8:00 PM',
    location: 'Birmingham Store',
    ctaText: 'Join to RSVP',
  },
];

const competitions = [
  {
    image: '/images/uo-competition-1.jpg',
    title: "WIN a pick from our Valentine's Day Edit!",
    prize: 'Worth up to £150',
    daysLeft: 24,
    ctaText: 'Join to Enter',
  },
  {
    image: '/images/uo-competition-2.jpg',
    title: 'WIN an item from No Problemo',
    prize: 'Worth up to £150',
    daysLeft: 24,
    ctaText: 'Join to Enter',
  },
  {
    image: '/images/uo-competition-3.jpg',
    title: 'WIN a pair of new in Vibram shoes!',
    prize: 'Worth up to £180',
    daysLeft: 23,
    ctaText: 'Join to Enter',
  },
];

export default function MemberExclusives({ onCtaClick }) {
  return (
    <section className={styles.landingEventsSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Member Exclusives</h2>
      </div>
      <div className={styles.eventsGrid}>
        {events.map((event, i) => (
          <EventCard key={i} {...event} onCtaClick={onCtaClick} />
        ))}
        {competitions.map((comp, i) => (
          <CompetitionCard key={i} {...comp} onCtaClick={onCtaClick} />
        ))}
      </div>
    </section>
  );
}
