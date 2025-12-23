import { useEffect, useState } from 'react';
import { mangaService } from '../service/mangaService';
import { mapMangaToProduct } from '@/features/HomePage/utils/mapMangaToProduct';
import type { MangaProduct } from '@/features/HomePage/types/MangaProduct';

export const useMangaData = (mangaId: number) => {
  const [mangaData, setMangaData] = useState<MangaProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMangaProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await mangaService.fetchMangaData(mangaId, signal);
        const mangaData = mapMangaToProduct(res.data);

        setMangaData(mangaData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMangaProduct();

    return () => {
      controller.abort();
    };
  }, [mangaId]);

  return { mangaData, isLoading, error };
};
