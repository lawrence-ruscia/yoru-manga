import type { FetchProductsParams } from '../types/FetchProductsParams';

const API_URL = import.meta.env.VITE_MANGA_API_URL;

export const productsService = {
  fetchProducts: async (
    params: FetchProductsParams = {},
    signal: AbortSignal
  ) => {
    const query = new URLSearchParams();

    // Always sfw
    query.append('sfw', 'true');

    // Dynamically add any defined params to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });

    const url = `${API_URL}?${query.toString()}`;

    const res = await fetch(url, {
      signal,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch manga products');
    }

    const data = await res.json();

    return data;
  },
};
