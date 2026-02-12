import { useState } from 'react';
import Modal from '../shared/Modal';
import { apiClient } from '../../api/client';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/modals.module.css';

export default function BirthdayModal({ isOpen, onClose }) {
  const { refreshUser } = useAuth();
  const [birthdate, setBirthdate] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!birthdate || !stylePreference) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await apiClient.put('/api/user/profile', { birthdate, stylePreference });
      await refreshUser();
      setSuccess("Birthday and style preference saved! You'll receive a special gift on your birthday.");
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setBirthdate('');
    setStylePreference('');
    setError('');
    setSuccess('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.modalHeader}>
        <h2>Enter Your Birthday</h2>
        <p>A lil something for your birthday</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <form onSubmit={handleSubmit}>
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
          {loading ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </Modal>
  );
}
