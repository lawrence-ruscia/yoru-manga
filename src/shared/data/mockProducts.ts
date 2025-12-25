import type { JikanManga } from '@/features/HomePage/types/JikanManga';

export const mockJikanManga: JikanManga[] = [
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
    synopsis: 'something blah blah',
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
    synopsis: 'something blah blah',
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
    synopsis: 'something blah blah',
  },
];
