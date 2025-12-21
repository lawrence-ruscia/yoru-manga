import { useProducts } from '../hooks/useProducts';
import styles from './HomePage.module.css';
import heroImg from './hero-img.webp';

export const HomePage = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.textBlock}>
            <h1 className={`${styles.title} heading-xl`}>Yoru Manga</h1>
            <p className='body-md'>Discover manga worth reading at night</p>
            <button className={`${styles.button} btn-primary btn-md`}>
              Browse Manga
            </button>
          </div>

          <div className={styles.imageBlock}>
            <img src={heroImg} alt='John smith from eminence in shadow' />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ul>
        {products &&
          products.map((product) => (
            <li key={product.id}>
              <p>{product.title}</p>
              <p>{product.price}</p>
              <p>{product.genre}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};
