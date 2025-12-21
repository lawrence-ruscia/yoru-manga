import { describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { HomePage } from './HomePage';
import { productsService } from '../services/productsService';
import { mockProducts } from '../data/mockProducts';

describe('HomePage', () => {
  it('renders a hero section', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce({
      data: mockProducts,
    });

    render(<HomePage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await screen.findByRole('heading', { name: /yoru manga/i });
    expect(
      screen.getByRole('button', { name: /browse manga/i })
    ).toBeInTheDocument();

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it('renders a list of manga products', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce({
      data: mockProducts,
    });

    render(<HomePage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Make sure all products are rendered
    const products = await screen.findAllByRole('listitem');
    expect(products).toHaveLength(mockProducts.length);

    // Sanitize for errors
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
