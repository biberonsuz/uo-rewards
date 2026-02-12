import { useState } from 'react';
import Modal from '../shared/Modal';
import { apiClient } from '../../api/client';
import styles from '../../styles/modals.module.css';

export default function MobileModal({ isOpen, onClose, onVerify }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!mobileNumber || mobileNumber.trim().length < 10) {
      setError('Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    try {
      const data = await apiClient.post('/api/user/verify-mobile', { mobileNumber });
      onClose();
      setTimeout(() => {
        onVerify(mobileNumber, data.devCode);
      }, 300);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMobileNumber('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.modalHeader}>
        <h2>Enter Your Mobile Number</h2>
        <p>Get 10% off your next order</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Mobile Number</label>
          <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required placeholder="+44 7XXX XXXXXX" />
        </div>
        <button type="submit" className={styles.btnSubmit} disabled={loading}>
          {loading ? 'Sending...' : 'Continue'}
        </button>
      </form>
    </Modal>
  );
}
