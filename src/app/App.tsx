import { HeaderNav } from '@/shared/components/HeaderNav/HeaderNav';
import { MobileMenu } from '@/shared/components/MobileMenu';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNoScroll } from './hooks/useNoScroll';
import type { CartItem } from '@/features/Cart';

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  changeQuantity: (productId: number, quantity: number) => void;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useNoScroll(isMenuOpen);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      // Increase quantity if item already in cart
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Otherwise, add with quantity
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (productId: number, quantity: number) => {
    const safeQuantity = Math.max(1, quantity);

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: safeQuantity } : item
      )
    );
  };

  const cartContext: CartContextType = {
    cartItems,
    addToCart,
    changeQuantity,
  };

  return (
    <div>
      <HeaderNav
        onMenuOpen={() => setIsMenuOpen(true)}
        cartItemsCount={cartItems.length}
      />

      <MobileMenu
        isMenuOpen={isMenuOpen}
        onMenuClose={() => setIsMenuOpen(false)}
      />
      <Outlet context={cartContext} />
    </div>
  );
}

export default App;
