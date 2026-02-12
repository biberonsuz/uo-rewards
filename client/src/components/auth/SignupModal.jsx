import { useState } from 'react';
import Modal from '../shared/Modal';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/modals.module.css';

export default function SignupModal({ isOpen, onClose, onSwitchToLogin, onVerify }) {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!mobileNumber) { setError('Please enter your mobile number.'); return; }
    if (!birthdate) { setError('Please enter your birthday.'); return; }
    if (!stylePreference) { setError('Please select your style preference.'); return; }

    setLoading(true);
    try {
      const data = await signup({ email, mobileNumber, birthdate, stylePreference });
      setSuccess('Verification code sent!');
      setTimeout(() => {
        onClose();
        onVerify(email, data.devCode);
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail(''); setMobileNumber(''); setBirthdate(''); setStylePreference('');
    setError(''); setSuccess('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.modalHeader}>
        <h2>Join UO Rewards</h2>
        <p>Sign up to access exclusive member benefits</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.email@example.com" />
        </div>
        <div className={styles.formGroup}>
          <label>Mobile Number</label>
          <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required placeholder="+44 7XXX XXXXXX" />
        </div>
        <div className={styles.formGroup}>
          <label>Birthday</label>
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Style Preference</label>
          <select value={stylePreference} onChange={(e) => setStylePreference(e.target.value)} required>
            <option value="">Select your style preference</option>
            <option value="womens">Women's</option>
            <option value="mens">Men's</option>
            <option value="no-preference">No preference</option>
          </select>
        </div>
        <button type="submit" className={styles.btnSubmit} disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <div className={styles.authFooter}>
        <p>Already have an account? <a onClick={() => { handleClose(); onSwitchToLogin(); }}>Sign in</a></p>
      </div>
    </Modal>
  );
}
