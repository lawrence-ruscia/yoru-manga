import { Hero } from '../components/Hero/Hero';
import { useProducts } from '../hooks/useProducts';
import styles from './HomePage.module.css';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';

export const HomePage = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.page}>
      <Hero />

      <ProductGrid products={products} />
    </div>
  );
};
