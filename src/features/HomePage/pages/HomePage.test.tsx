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

    expect(
      await screen.findByRole('heading', { name: /yoru manga/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /browse manga/i })
    ).toBeInTheDocument();
  });

  it.todo('renders a list of manga products', () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce(
      mockProducts
    );

    render(<HomePage />);
  });
});
