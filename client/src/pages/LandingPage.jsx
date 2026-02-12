import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import JoinBanner from '../components/landing/JoinBanner';
import MemberPerksGrid from '../components/landing/MemberPerksGrid';
import MemberExclusives from '../components/landing/MemberExclusives';
import FAQ from '../components/shared/FAQ';
import SignupModal from '../components/auth/SignupModal';
import LoginModal from '../components/auth/LoginModal';
import VerifyModal from '../components/auth/VerifyModal';
import useAuth from '../hooks/useAuth';
import styles from '../styles/landing.module.css';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyDevCode, setVerifyDevCode] = useState(null);

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  const openVerify = (email, devCode) => {
    setVerifyEmail(email);
    setVerifyDevCode(devCode || null);
    setShowVerify(true);
  };

  return (
    <div className={styles.landingPage}>
      <Header variant="landing" />
      <main className={styles.landingMain}>
        <div className={styles.landingContent}>
          <JoinBanner onJoinClick={() => setShowSignup(true)} />
          <MemberPerksGrid />
          <MemberExclusives onCtaClick={() => setShowSignup(true)} />
          <FAQ />
        </div>
      </main>
      <Footer />

      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => setShowLogin(true)}
        onVerify={openVerify}
      />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToSignup={() => setShowSignup(true)}
        onVerify={openVerify}
      />
      <VerifyModal
        isOpen={showVerify}
        onClose={() => setShowVerify(false)}
        email={verifyEmail}
        devCode={verifyDevCode}
      />
    </div>
  );
}
