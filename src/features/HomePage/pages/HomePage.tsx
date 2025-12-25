import { Hero } from '../components/Hero/Hero';
import styles from './HomePage.module.css';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { LoadingPage } from '@/shared/pages/LoadingPage';
import { useHomePage } from '../hooks/useHomePage';

export const HomePage = () => {
  const { data, isLoading, error } = useHomePage();

  if (isLoading) return <LoadingPage />;

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.page}>
      <Hero />

      {/* Popular Mangas */}
      <ProductGrid products={data.popular} title='Popular Manga' />
      <ProductGrid products={data.newReleases} title='New Releases' />
    </div>
  );
};
