import { describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { HomePage } from './HomePage';
import { productsService } from '@/shared/services/productsService';
import { mockProducts } from '@/shared/data/mockProducts';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('HomePage', () => {
  it('renders a hero section', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce({
      data: mockProducts,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

    screen.debug();
    expect(
      await screen.findByRole('heading', { name: /yoru manga/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /browse manga/i })
    ).toBeInTheDocument();
  });

  it('renders a list of manga products', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce({
      data: mockProducts,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

    // Make sure all products are rendered
    const products = await screen.findAllByRole('listitem');
    expect(products).toHaveLength(mockProducts.length);
  });

  it('shows an error message when failing to fetch products', async () => {
    const errMsg = 'Failed to fetch manga products';
    vi.spyOn(productsService, 'fetchProducts').mockRejectedValueOnce(
      new Error(errMsg)
    );

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(errMsg)).toBeInTheDocument();
  });
});
