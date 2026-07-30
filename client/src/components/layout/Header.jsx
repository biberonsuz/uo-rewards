import useAuth from '../../hooks/useAuth';
import styles from '../../styles/layout.module.css';

export default function Header({ variant = 'dashboard' }) {
  const { logout } = useAuth();

  return (
    <header className={styles.header}>
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/header-mobile.png" />
        <img src="/images/header.png" alt="Urban Outfitters Header" className={styles.headerImg} />
      </picture>
      {variant === 'dashboard' && (
        <button className={styles.logoutBtn} onClick={logout}>Sign Out</button>
      )}
    </header>
  );
}
