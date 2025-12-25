import { describe, expect, it, vi } from 'vitest';
import { productsService } from '@/shared/services/productsService';
import { mockJikanManga } from '@/shared/data/mockProducts';
import { render, screen } from '@testing-library/react';
import { ShopPage } from './ShopPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => vi.fn(),
  };
});

describe('ShopPage', () => {
  it('renders a list of manga products', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce({
      data: mockJikanManga,
    });

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <Routes>
          <Route path='/shop' element={<ShopPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Sanitize for errors
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

    // Make sure all products are rendered
    const products = await screen.findAllByRole('listitem');
    expect(products).toHaveLength(mockJikanManga.length);
  });

  it('shows an error message when failing to fetch products', async () => {
    const errMsg = 'Failed to fetch manga products';
    vi.spyOn(productsService, 'fetchProducts').mockRejectedValueOnce(
      new Error(errMsg)
    );

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <Routes>
          <Route path='/shop' element={<ShopPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(await screen.findByText(errMsg)).toBeInTheDocument();
  });
});
