import { useState } from 'react';
import styles from '../../styles/faq.module.css';

const faqItems = [
  { q: 'How do I earn stamps?', a: 'Earn stamps by making qualifying purchases of £20 or more. Each stamp brings you closer to unlocking rewards. You can also earn stamps through special member events and promotions.' },
  { q: 'What rewards can I unlock?', a: 'As a UO Rewards member, you can unlock exclusive discounts, early access to sales, member-only events, birthday rewards, and special perks throughout the year.' },
  { q: 'Is membership free?', a: 'Yes! UO Rewards membership is completely free. Simply sign up with your email address to start earning stamps and unlocking rewards.' },
  { q: 'How do I track my stamp progress?', a: "Once you're a member, you can view your stamp progress in your dashboard. You'll see how many stamps you've earned and how many you need to unlock your next reward." },
  { q: 'Do stamps expire?', a: "Stamps don't expire, so you can take your time earning them. However, some rewards and offers may have expiration dates, so be sure to check your dashboard regularly." },
  { q: 'Can I use rewards online and in-store?', a: 'Yes! Your rewards can be used both online and in-store. When shopping online, your rewards will be automatically applied at checkout. In-store, simply show your membership details at the register.' },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.faqTitle}>FAQs</h2>
      <div className={styles.faqList}>
        {faqItems.map((item, i) => (
          <div key={i} className={`${styles.faqItem} ${activeIndex === i ? styles.active : ''}`}>
            <div className={styles.faqQuestion} onClick={() => toggle(i)}>
              <span>{item.q}</span>
              <span className={styles.faqToggle}>+</span>
            </div>
            <div className={styles.faqAnswer}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
