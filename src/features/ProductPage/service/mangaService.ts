import type { JikanManga } from '@/features/HomePage/types/JikanManga';

const API_URL = import.meta.env.VITE_MANGA_API_URL;

export const mangaService = {
  fetchMangaData: async (
    mangaId: number,
    signal: AbortSignal
  ): Promise<{ data: JikanManga }> => {
    const res = await fetch(`${API_URL}/${mangaId}`, { signal });

    if (!res.ok) {
      throw new Error('Failed to fetch manga info');
    }

    const data = res.json();

    return data;
  },
};
