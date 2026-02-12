import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import styles from '../../styles/profile.module.css';

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await apiClient.get('/api/addresses');
        setAddresses(data.addresses || []);
      } catch { /* ignore */ }
    };
    fetchAddresses();
  }, []);

  return (
    <div>
      <div className={styles.profileHeader}>
        <h1 className={styles.profileTitle}>Addresses</h1>
        <p className={styles.profileSubtitle}>Manage your delivery addresses</p>
      </div>

      {addresses.length > 0 ? (
        <div className={styles.addressesList}>
          {addresses.map((address, index) => {
            const lines = [];
            if (address.addressLine1) lines.push(address.addressLine1);
            if (address.addressLine2) lines.push(address.addressLine2);
            const cityPostcode = [address.city, address.postcode].filter(Boolean).join(', ');
            if (cityPostcode) lines.push(cityPostcode);
            if (address.country) lines.push(address.country);

            return (
              <div key={address.id || index} className={styles.addressCard}>
                <div className={styles.addressName}>
                  {index === 0 ? 'Default Address' : `Address ${index + 1}`}
                </div>
                <div className={styles.addressDetails}>
                  {lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.noAddresses}>No addresses saved yet</div>
      )}
    </div>
  );
}
