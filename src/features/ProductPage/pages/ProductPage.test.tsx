import { describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { mangaService } from '../service/mangaService';
import type { JikanManga } from '@/features/HomePage/types/JikanManga';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { mapMangaToProduct } from '@/features/HomePage/utils/mapMangaToProduct';
import { ProductPage } from './ProductPage';

const mockMangaData: JikanManga = {
  mal_id: 1,
  images: {
    jpg: {
      image_url: 'image.jpg',
    },
  },
  title: 'One Piece',
  score: 9.22,
  genres: [{ name: 'Action' }],
  synopsis:
    'One Piece follows Monkey D. Luffy, a young, rubber-powered pirate inspired by his childhood hero to find the legendary "One Piece" treasure left behind by Gol D. Roger.',
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => vi.fn(),
  };
});

describe('ProductPage', () => {
  it('renders manga data when given a mangaId', async () => {
    vi.spyOn(mangaService, 'fetchMangaData').mockResolvedValueOnce({
      data: mockMangaData,
    });

    const mappedMangaData = mapMangaToProduct(mockMangaData);

    render(
      <MemoryRouter initialEntries={['/manga/1']}>
        <Routes>
          <Route path='/manga/:mangaId' element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Make sure we're not stuck in error state
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

    await screen.findByRole('heading', { name: mappedMangaData.title });

    expect(screen.getByText(mappedMangaData.description)).toBeInTheDocument();
  });
});
