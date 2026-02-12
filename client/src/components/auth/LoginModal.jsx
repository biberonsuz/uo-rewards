import { useState } from 'react';
import Modal from '../shared/Modal';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/modals.module.css';

export default function LoginModal({ isOpen, onClose, onSwitchToSignup, onVerify }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
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

    setLoading(true);
    try {
      const data = await login(email);
      setSuccess('Please verify your email address to sign in.');
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
    setEmail(''); setError(''); setSuccess('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.modalHeader}>
        <h2>Sign In</h2>
        <p>Welcome back to UO Rewards</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.email@example.com" />
        </div>
        <button type="submit" className={styles.btnSubmit} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className={styles.authFooter}>
        <p>Don't have an account? <a onClick={() => { handleClose(); onSwitchToSignup(); }}>Sign up</a></p>
      </div>
    </Modal>
  );
}
