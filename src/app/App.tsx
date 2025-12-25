import { HeaderNav } from '@/shared/components/HeaderNav/HeaderNav';
import { MobileMenu } from '@/shared/components/MobileMenu';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNoScroll } from './hooks/useNoScroll';
import type { CartItem } from '@/features/Cart';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  changeQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  handleCheckout: () => void; 
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

    toast.success(`${product.title} added to cart`);
  };

  const changeQuantity = (productId: number, quantity: number) => {
    const safeQuantity = Math.max(1, quantity);

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: safeQuantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    const item = cartItems.find((i) => i.id === productId);
    toast.success(`${item?.title} removed`);
  };

  const handleCheckout = () => {
    toast('Checkout coming soon!', {
      icon: '🚀',
      duration: 2500,
    });
  };

  const cartContext: CartContextType = {
    cartItems,
    addToCart,
    changeQuantity,
    removeItem,
    handleCheckout,
  };

  return (
    <div>
      <Toaster
        position='bottom-center'
        toastOptions={{
          duration: 2000,
          style: {
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            padding: '12px 16px',
            fontSize: '0.9375rem',
            fontWeight: '500',
          },
        }}
      />
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
