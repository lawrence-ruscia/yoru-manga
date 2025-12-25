import { useRef } from 'react';
import styles from './ProductGrid.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { MangaProduct } from '../../types/MangaProduct';
import { ProductCard } from '@/shared/components/ProductCard';
import { Link } from 'react-router-dom';

export const ProductGrid = ({ products }: { products: MangaProduct[] }) => {
  const listRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!listRef.current) return;

    const scrollAmount = 300;

    listRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.grid}>
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
            <li key={product.title} className={styles.productItem}>
              <Link to={`/manga/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </li>
          ))}
      </ul>
    </section>
  );
};
