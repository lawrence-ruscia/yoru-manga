export type FetchProductsParams = {
  limit?: number;
  order_by?: 'score' | 'popularity' | 'favorites' | 'start_date' | 'chapters';
  sort?: 'asc' | 'desc';
  page?: number;
  status?: 'publishing' | 'complete' | 'hiatus';
  sfw?: boolean;
};
