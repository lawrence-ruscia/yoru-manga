import type { JikanManga } from '../types/JikanManga';

export const mockProducts: JikanManga[] = [
  {
    mal_id: 1,
    images: {
      jpg: {
        image_url: './one-piece.jpg',
      },
    },
    title: 'One Piece',
    score: 8.99,
    genres: [{ name: 'Comedy' }],
  },
  {
    mal_id: 2,
    images: {
      jpg: {
        image_url: './naruto.jpg',
      },
    },
    title: 'Naruto',
    score: 8.75,
    genres: [{ name: 'Action' }],
  },
  {
    mal_id: 3,
    images: {
      jpg: {
        image_url: './monster.jpg',
      },
    },
    title: 'Monster',
    score: 9.45,
    genres: [{ name: 'Thriller' }],
  },
];
