import { MoonLoader } from 'react-spinners';
import styles from './LoadingPage.module.css';

export const LoadingPage = () => {
  return (
    <div className={styles.wrapper}>
      <MoonLoader size={40} color='var(--accent)' />
      <p className={styles.text}>Loading manga...</p>
    </div>
  );
};
