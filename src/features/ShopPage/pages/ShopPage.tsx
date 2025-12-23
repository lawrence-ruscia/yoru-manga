import { ProductCard } from '@/features/HomePage/components/ProductCard/ProductCard';
import { useProducts } from '@/features/HomePage/hooks/useProducts';
import { ChevronDown, Funnel } from 'lucide-react';
import styles from './ShopPage.module.css';

export const ShopPage = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className={styles.page}>
      {/* Page Header */}
      <section className={styles.header}>
        <h1>Shop Manga</h1>
        <p>Browse our curated manga collection</p>
      </section>

      {/* Controls: filters / sorting */}
      <section className={styles.controls}>
        <button className={styles.controlButton}>
          <Funnel /> Filter
        </button>

        <button className={styles.controlButton}>
          Sort By <ChevronDown />
        </button>
      </section>

      {/* Product grid */}
      <section>
        <ul className={styles.productGrid}>
          {products &&
            products.map((product) => (
              <li key={product.title}>
                <ProductCard product={product} />
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};
