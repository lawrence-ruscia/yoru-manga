import { ProductCard } from '@/shared/components/ProductCard';
import { useProducts } from '@/shared/hooks/useProducts';
import { ChevronDown, Funnel } from 'lucide-react';
import styles from './ShopPage.module.css';
import { useMemo } from 'react';
import type { FetchProductsParams } from '@/shared/types/FetchProductsParams';
import { Link } from 'react-router-dom';
import { LoadingPage } from '@/shared/pages/LoadingPage';
import { BackButton } from '@/shared/components/BackButton';
import toast from 'react-hot-toast';

export const ShopPage = () => {
  const params: FetchProductsParams = useMemo(() => {
    return { limit: 25, order_by: 'score', sort: 'desc' };
  }, []);

  const { products, isLoading, error } = useProducts(params);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <main className={styles.page}>
      <BackButton />
      {/* Page Header */}
      <section className={styles.header}>
        <h1>Shop Manga</h1>
        <p>Browse our curated manga collection</p>
      </section>

      {/* Controls: filters / sorting */}
      <section className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={() =>
            toast('Filter coming soon!', {
              icon: '⚙️',
              duration: 2500,
            })
          }
        >
          <Funnel /> Filter
        </button>

        <button
          className={styles.controlButton}
          onClick={() =>
            toast('Sorting coming soon!', {
              icon: '⚙️',
              duration: 2500,
            })
          }
        >
          Sort By <ChevronDown />
        </button>
      </section>

      {/* Product grid */}
      <section>
        <ul className={styles.productGrid}>
          {products &&
            products.map((product) => (
              <li key={product.title}>
                <Link to={`/manga/${product.id}`} className={styles.link}>
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};
