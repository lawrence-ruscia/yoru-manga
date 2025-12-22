import { Link } from 'react-router-dom';
import styles from './HeaderNav.module.css';
import { Menu, Search, ShoppingCart } from 'lucide-react';

const navData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Shop',
    url: '/shop',
  },
];
export const HeaderNav = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <button className={`${styles.menu} btn-icon`} aria-label='Menu'>
            <Menu />
          </button>
          <Link to={'/'} className={styles.logo}>
            <span className={styles.kanji}>夜</span>
            <div className={styles.brandName}>
              <span className={styles.highlight}>Yoru</span> Manga
            </div>
          </Link>
        </div>

        <div className={styles.nav}>
          {navData &&
            navData.map((data) => (
              <Link key={data.title} to={data.url}>
                {data.title}
              </Link>
            ))}
        </div>

        <div className={styles.actions}>
          <button aria-label='Search' className='btn-icon'>
            <Search />
          </button>
          <button
            type='button'
            aria-label='Cart'
            className={`${styles.cart} btn-icon`}
          >
            <ShoppingCart />
            <span className={styles.badge}>2</span>
          </button>
        </div>
      </div>
    </header>
  );
};
