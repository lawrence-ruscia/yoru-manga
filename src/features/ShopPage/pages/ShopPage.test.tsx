import { describe, expect, it, vi } from 'vitest';
import { productsService } from '@/shared/services/productsService';
import { mockProducts } from '@/shared/data/mockProducts';
import { render, screen } from '@testing-library/react';
import { ShopPage } from './ShopPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('ShopPage', () => {
  it('renders a list of manga products', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce({
      data: mockProducts,
    });

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <Routes>
          <Route path='/shop' element={<ShopPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Make sure all products are rendered
    const products = await screen.findAllByRole('listitem');
    expect(products).toHaveLength(mockProducts.length);

    // Sanitize for errors
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
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
