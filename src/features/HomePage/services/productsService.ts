const API_URL = import.meta.env.VITE_MANGA_API_URL;

export const productsService = {
  fetchProducts: async (limit: number, signal: AbortSignal) => {
    const res = await fetch(`${API_URL}?limit=${limit}`, { signal });

    if (!res.ok) {
      throw new Error('Failed to fetch manga products');
    }

    const data = await res.json();

    return data;
  },
};
