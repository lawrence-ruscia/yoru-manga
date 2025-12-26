import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import type { ComponentPropsWithoutRef } from 'react';

type LogoProps = {
  size?: number;
} & ComponentPropsWithoutRef<'a'>;

export const Logo = ({ size = 40, ...props }: LogoProps) => {
  return (
    <Link
      to={'/'}
      className={styles.logo}
      style={{ '--logo-size': `${size}px` } as React.CSSProperties}
      {...props}
    >
      <span className={styles.kanji}>夜</span>
      <div className={styles.brandName}>
        <span className={styles.highlight}>Yoru</span> Manga
      </div>
    </Link>
  );
};
