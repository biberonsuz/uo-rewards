import styles from '../../styles/layout.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/footer-mobile.png" />
        <img src="/images/footer.png" alt="Footer" className={styles.footerImg} />
      </picture>
    </footer>
  );
}
