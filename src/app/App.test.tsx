import { render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { routes } from './routes';
import { productsService } from '@/features/HomePage/services/productsService';
import { mockProducts } from '@/features/HomePage/data/mockProducts';

describe('App', () => {
  it('renders the homepage when navigating to /', async () => {
    vi.spyOn(productsService, 'fetchProducts').mockResolvedValueOnce({
      data: mockProducts,
    });

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);

    await screen.findByRole('heading', { name: /yoru manga/i });

    expect(
      screen.getByText(/discover manga worth reading at night/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /browse manga/i })
    ).toBeInTheDocument();

    // Sanitize for errors
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });
});
