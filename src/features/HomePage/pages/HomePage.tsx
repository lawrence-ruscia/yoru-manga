import { useRef } from 'react';
import { Hero } from '../components/Hero/Hero';
import { useProducts } from '../hooks/useProducts';
import styles from './HomePage.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard/ProductCard';

export const HomePage = () => {
  const { products, isLoading, error } = useProducts();

  const listRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!listRef.current) return;

    const scrollAmount = 300;

    listRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.page}>
      <Hero />

      {/* Product Grid */}
      <section className={styles.featured}>
        <div className={styles.header}>
          <h2 className='heading-md'>Popular Mangas</h2>

          <div className={styles.controls}>
            <button
              aria-label='Scroll left'
              className='btn-icon'
              onClick={() => scroll('left')}
            >
              <ChevronLeft />
            </button>
            <button
              aria-label='Scroll right'
              className='btn-icon'
              onClick={() => scroll('right')}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        <ul ref={listRef} className={styles.carousel}>
          {products &&
            products.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
        </ul>
      </section>
    </div>
  );
};
