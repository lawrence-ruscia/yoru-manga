import type { JikanManga } from '../types/JikanManga';
import type { MangaProduct } from '../types/MangaProduct';

export const mapMangaToProduct = (manga: JikanManga): MangaProduct => {
  return {
    id: manga.mal_id,
    title: manga.title,
    price: generatePrice(manga.score),
    rating: manga.score,
    genre: manga.genres[0]?.name ?? 'Unknown',
    imageUrl: manga.images.jpg.image_url,
    description: manga.synopsis,
  };
};

// Pricing strategy
function generatePrice(score: number | null): number {
  if (!score) return 6.99;
  if (score >= 8.5) return 12.99;
  if (score >= 7) return 9.99;

  return 7.99;
}
