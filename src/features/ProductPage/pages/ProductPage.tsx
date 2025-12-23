import { useParams } from 'react-router-dom';
import styles from './ProductPage.module.css';
import { useMangaData } from '../hooks/useMangaData';

export const ProductPage = () => {
  const { mangaId } = useParams();

  const { mangaData, isLoading, error } = useMangaData(Number(mangaId));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.name}</div>;
  }

  return (
    <main>
      <section>
        {/* Media + Core Info */}
        <div>
          {/* Image */}
          <div>
            <img src={mangaData?.imageUrl} alt='Manga cover' />
          </div>

          {/* Product Info */}
          <div>
            <h1>{mangaData?.title}</h1>

            <div>
              <span>⭐ {mangaData?.rating}</span>
              <span>{mangaData?.genre}</span>
            </div>

            <p>${mangaData?.price}</p>

            <button>Add to Cart</button>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2>About this manga</h2>
          <p>{mangaData?.description}</p>
        </div>
      </section>
    </main>
  );
};
