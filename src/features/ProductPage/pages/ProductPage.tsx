import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductPage.module.css';
import { useMangaData } from '../hooks/useMangaData';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { LoadingPage } from '@/shared/pages/LoadingPage';

export const ProductPage = () => {
  const { mangaId } = useParams();

  const { mangaData, isLoading, error } = useMangaData(Number(mangaId));
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>{error.name}</div>;
  }

  return (
    <main className={styles.page}>
      <section className={styles.product}>
        <button
          type='button'
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft /> Back
        </button>
        {/* Media + Core Info */}
        <div className={styles.top}>
          {/* Image */}
          <div className={styles.media}>
            <img src={mangaData?.imageUrl} alt='Manga cover' />
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <h1 className={styles.title}>{mangaData?.title}</h1>

            <div className={styles.meta}>
              <span>⭐ {mangaData?.rating}</span>
              <span>{mangaData?.genre}</span>
            </div>

            <p>${mangaData?.price}</p>

            <div className={styles.actions}>
              <button className='btn-primary btn-md'>Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.description}>
          <h2>About this manga</h2>
          <p className={`${styles.text} ${!isExpanded ? styles.clamped : ''}`}>
            {mangaData?.description}
          </p>

          <button
            type='button'
            className={styles.toggle}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>
      </section>
    </main>
  );
};
