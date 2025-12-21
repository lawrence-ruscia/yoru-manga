import { useState, useEffect } from 'react';
import type { MangaProduct } from '../types/MangaProduct';
import { mapMangaToProduct } from '../utils/mapMangaToProduct';
import type { JikanManga } from '../types/JikanManga';
import { productsService } from '../services/productsService';

export const useProducts = (limit: number = 10) => {
  const [products, setProducts] = useState<MangaProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // refetch version
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMangaProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await productsService.fetchProducts(limit, signal);

        const mappedProducts = data.data.map((manga: JikanManga) =>
          mapMangaToProduct(manga)
        );

        setProducts(mappedProducts);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMangaProducts();

    return () => {
      controller.abort();
    };
  }, [limit, version]);

  const refetch = () => {
    setVersion((prev) => prev + 1);
  };

  return { products, isLoading, error, refetch };
};
