import { HomePage } from '@/features/HomePage';
import App from './App';
import { ShopPage } from '@/features/ShopPage';
import { ProductPage } from '@/features/ProductPage';
import { CartPage } from '@/features/Cart';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'shop',
        element: <ShopPage />,
      },
      {
        path: 'manga/:mangaId',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
];
