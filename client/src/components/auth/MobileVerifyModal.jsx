import { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import { apiClient } from '../../api/client';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/modals.module.css';

export default function MobileVerifyModal({ isOpen, onClose, mobileNumber, devCode }) {
  const { refreshUser } = useAuth();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/api/user/confirm-mobile', { code });
      await refreshUser();
      setSuccess("Mobile number verified! You've unlocked 10% off.");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await apiClient.post('/api/user/verify-mobile', { mobileNumber });
      setSuccess('Verification code resent!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2>Verify Your Mobile Number</h2>
        <p>We've sent a verification code to:</p>
        <p style={{ fontWeight: 600, marginTop: 8 }}>{mobileNumber}</p>
        <p style={{ fontSize: 12, marginTop: 16 }}>Enter the 6-digit code below</p>
      </div>

      {devCode && (
        <div className={styles.codeDisplay}>
          <div className={styles.codeDisplayLabel}>Verification Code (Testing)</div>
          <div className={styles.codeDisplayValue}>{devCode}</div>
        </div>
      )}

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Verification Code</label>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} required placeholder="000000" maxLength={6} />
        </div>
        <button type="submit" className={styles.btnSubmit} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <div className={styles.authFooter}>
        <p>Didn't receive the code? <a onClick={handleResend}>Resend code</a></p>
      </div>
    </Modal>
  );
}
