import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import QRCodeSection from '../components/profile/QRCodeSection';
import EmailPreferences from '../components/profile/EmailPreferences';
import styles from '../styles/profile.module.css';

export default function ProfilePage() {
  return (
    <section className={styles.profileSection}>
      <PersonalInfoForm />
      <div className={styles.profileRightColumn}>
        <QRCodeSection />
        <EmailPreferences />
      </div>
    </section>
  );
}
