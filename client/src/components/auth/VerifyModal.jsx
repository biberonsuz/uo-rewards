import { useState, useEffect } from 'react';
import Modal from '../shared/Modal';
import VerificationCodeInput from './VerificationCodeInput';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/modals.module.css';

export default function VerifyModal({ isOpen, onClose, email, devCode }) {
  const { verify, resendCode } = useAuth();
  const [code, setCode] = useState('      ');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCode('      ');
      setError('');
      setSuccess('');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmed = code.replace(/\s/g, '');
    if (trimmed.length !== 6) {
      setError('Please enter the complete 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      await verify(email, trimmed);
      setSuccess('Email verified! Redirecting to your dashboard...');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendCode(email);
      setCode('      ');
      setSuccess('New verification code sent!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalHeader}>
        <h2>Verify Your Email</h2>
        <p>We've sent a verification code to:</p>
        <p style={{ fontWeight: 600, marginTop: 8 }}>{email}</p>
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
          <VerificationCodeInput value={code} onChange={setCode} />
        </div>
        <button type="submit" className={styles.btnSubmit} disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Email'}
        </button>
      </form>

      <div className={styles.authFooter}>
        <p>Didn't receive the code? <a onClick={handleResend}>Resend code</a></p>
      </div>
    </Modal>
  );
}
