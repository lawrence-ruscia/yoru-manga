import { describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { HomePage } from './HomePage';
import { productsService } from '@/shared/services/productsService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as hooks from '../hooks/useHomePage';
import { mockHomePageData } from '../data/mockHomePageData';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => vi.fn(),
  };
});

describe('HomePage', () => {
  it('renders a hero section', async () => {
    vi.spyOn(hooks, 'useHomePage').mockReturnValueOnce({
      data: {
        popular: mockHomePageData,
        newReleases: mockHomePageData,
      },
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /yoru manga/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /browse manga/i })
    ).toBeInTheDocument();
  });

  it('renders a list of manga products', async () => {
    vi.spyOn(hooks, 'useHomePage').mockReturnValueOnce({
      data: {
        popular: mockHomePageData,
        newReleases: mockHomePageData,
      },
      isLoading: false,
      error: null,
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
    // Since both genre uses the same mock array
    expect(products).toHaveLength(mockHomePageData.length * 2);
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
