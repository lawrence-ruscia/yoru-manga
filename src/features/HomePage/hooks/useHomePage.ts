import { useEffect, useState } from 'react';
import type { MangaProduct } from '../types/MangaProduct';
import { productsService } from '@/shared/services/productsService';
import { mapMangaToProduct } from '../utils/mapMangaToProduct';

export const useHomePage = () => {
  const [data, setData] = useState<{
    popular: MangaProduct[];
    newReleases: MangaProduct[];
  }>({
    popular: [],
    newReleases: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchHomePageData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch both in parallel
        const [popularData, newReleasesData] = await Promise.all([
          productsService.fetchProducts(
            { limit: 12, order_by: 'popularity' },
            signal
          ),
          productsService.fetchProducts(
            { limit: 12, order_by: 'start_date' }, // or whatever param for new releases
            signal
          ),
        ]);

        setData({
          popular: popularData.data.map(mapMangaToProduct),
          newReleases: newReleasesData.data.map(mapMangaToProduct),
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomePageData();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, error };
};
