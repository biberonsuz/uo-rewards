import useAuth from '../../hooks/useAuth';
import styles from '../../styles/layout.module.css';

export default function Header({ variant = 'dashboard' }) {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <img src="/images/header.png" alt="Urban Outfitters Header" className={styles.headerImg} />
      {variant === 'dashboard' && (
        <button className={styles.logoutBtn} onClick={logout}>Sign Out</button>
      )}
    </header>
  );
}
