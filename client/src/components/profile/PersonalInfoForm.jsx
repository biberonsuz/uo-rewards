import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import useAuth from '../../hooks/useAuth';
import styles from '../../styles/profile.module.css';

export default function PersonalInfoForm() {
  const { user, refreshUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [stylePreference, setStylePreference] = useState('');
  const [showMobile, setShowMobile] = useState(false);
  const [showBirthdate, setShowBirthdate] = useState(false);
  const [showStyle, setShowStyle] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setMobileNumber(user.mobileNumber || '');
      setBirthdate(user.birthdate || '');
      setStylePreference(user.stylePreference || '');
      setShowMobile(!!(user.mobileNumber));
      setShowBirthdate(!!(user.birthdate));
      setShowStyle(!!(user.stylePreference));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put('/api/user/profile', {
        firstName, lastName,
        ...(showMobile && { mobileNumber }),
        ...(showBirthdate && { birthdate }),
        ...(showStyle && { stylePreference }),
      });
      await refreshUser();
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setSaveMessage({ type: 'error', text: err.message });
    }
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className={styles.personalInfoSection}>
      <div className={styles.profileHeader}>
        <h1 className={styles.profileTitle}>Personal Information</h1>
        <p className={styles.profileSubtitle}>Manage your personal information and preferences</p>
      </div>

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <div className={styles.formGroupRow}>
          <div className="form-group">
            <label className={styles.formLabel}>First Name</label>
            <input type="text" className={styles.formInput} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
          </div>
          <div className="form-group">
            <label className={styles.formLabel}>Last Name</label>
            <input type="text" className={styles.formInput} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
          </div>
        </div>

        <div className="form-group">
          <label className={styles.formLabel}>Email</label>
          <div className={`${styles.formInputDisplay} ${styles.readOnly}`}>{user?.email}</div>
        </div>

        <div className="form-group">
          <label className={styles.formLabel}>Mobile Number</label>
          {showMobile ? (
            <input type="tel" className={styles.formInput} value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter your mobile number" />
          ) : (
            <div className={styles.formInputDisplay} onClick={() => setShowMobile(true)}>Not entered</div>
          )}
        </div>

        <div className="form-group">
          <label className={styles.formLabel}>Birth Date</label>
          {showBirthdate ? (
            <input type="date" className={styles.formInput} value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
          ) : (
            <div className={styles.formInputDisplay} onClick={() => setShowBirthdate(true)}>Not entered</div>
          )}
        </div>

        <div className="form-group">
          <label className={styles.formLabel}>Style Preference</label>
          {showStyle ? (
            <select className={styles.formSelect} value={stylePreference} onChange={(e) => setStylePreference(e.target.value)}>
              <option value="">Select a preference</option>
              <option value="womens">Women's</option>
              <option value="mens">Men's</option>
              <option value="no-preference">No preference</option>
            </select>
          ) : (
            <div className={styles.formInputDisplay} onClick={() => setShowStyle(true)}>Not entered</div>
          )}
        </div>

        <div className="form-group">
          <label className={styles.formLabel}>Are you a student?</label>
          <div className={`${styles.formInputDisplay} ${styles.readOnly}`}>No</div>
        </div>

        <div className={styles.profileActions}>
          <button type="submit" className={styles.btnPrimary}>Save Changes</button>
        </div>

        {saveMessage && (
          <div className={`${styles.saveMessage} ${saveMessage.type === 'success' ? styles.saveMessageSuccess : styles.saveMessageError}`}>
            {saveMessage.text}
          </div>
        )}
      </form>
    </div>
  );
}
