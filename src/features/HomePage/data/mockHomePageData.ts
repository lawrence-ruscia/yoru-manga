import type { MangaProduct } from '@/features/HomePage/types/MangaProduct';

export const mockHomePageData: MangaProduct[] = [
  {
    id: 1,
    title: 'Manga1',
    price: 12.99,
    rating: 9.82,
    genre: 'Adventure',
    imageUrl: 'image.png',
    description: 'description',
  },
  {
    id: 2,
    title: 'Manga2',
    price: 9.99,
    rating: 7.12,
    genre: 'Action',
    imageUrl: 'image.png',
    description: 'description',
  },
  {
    id: 3,
    title: 'Manga3',
    price: 8.99,
    rating: 8.12,
    genre: 'Romance',
    imageUrl: 'image.png',
    description: 'description',
  },
];
