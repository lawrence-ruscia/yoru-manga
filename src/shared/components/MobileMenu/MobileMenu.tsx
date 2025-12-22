import { navData } from '@/shared/data/navData';
import styles from './MobileMenu.module.css';
import { Link } from 'react-router';
import { Logo } from '../Logo';

type MobileMenuProps = {
  isMenuOpen: boolean;
  onMenuClose: () => void;
};

export const MobileMenu = ({ isMenuOpen, onMenuClose }: MobileMenuProps) => {
  return (
    <div>
      <div
        className={`${styles.overlay} ${
          isMenuOpen ? styles.show : styles.hide
        }`}
        onClick={onMenuClose}
      />
      <div
        className={`${styles.panel} ${isMenuOpen ? styles.open : styles.close}`}
      >
        <div className={styles.logo}>
          <Logo size={50} />
        </div>
        <nav className={styles.navLinks}>
          {navData &&
            navData.map((data) => (
              <li key={data.title} className={styles.navItem}>
                <Link to={data.url} className={styles.navLink}>
                  <data.icon />
                  {data.title}
                </Link>
              </li>
            ))}
        </nav>
      </div>
    </div>
  );
};
