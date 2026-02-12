import styles from '../../styles/profile.module.css';

export default function QRCodeSection() {
  return (
    <div className={styles.qrCodeSectionProfile}>
      <div className={styles.profileHeader}>
        <h2 className={styles.profileTitle}>UO Rewards QR Code</h2>
        <p className={styles.profileSubtitle}>Scan code at the till to collect rewards</p>
      </div>
      <div style={{
        width: 150, height: 150, background: 'var(--uo-white)', border: '1px solid var(--uo-black)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12, margin: '0 auto'
      }}>
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.urbanoutfitters.com/en-gb/uo-rewards"
          alt="QR Code for UO Rewards"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <p className={styles.qrCodeId}>UO Rewards ID: <br /> 00000000000</p>
    </div>
  );
}
