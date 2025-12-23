import { HomePage } from '@/features/HomePage';
import App from './App';
import { ShopPage } from '@/features/ShopPage';

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
    ],
  },
];
