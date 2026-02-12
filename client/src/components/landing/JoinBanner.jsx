import styles from '../../styles/landing.module.css';

export default function JoinBanner({ onJoinClick }) {
  return (
    <div className={styles.joinBanner} onClick={onJoinClick}>
      <h1>Join UO Rewards</h1>
      <p>Sign up to access exclusive member benefits, earn stamps, and unlock rewards</p>
      <button className={styles.joinBtn} onClick={(e) => { e.stopPropagation(); onJoinClick(); }}>Join Now</button>
    </div>
  );
}
