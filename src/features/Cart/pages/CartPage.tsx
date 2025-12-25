import type { CartContextType } from '@/app/App';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import styles from './CartPage.module.css';
import type { CartItem } from '../types/CartItem';
import { ChevronLeft } from 'lucide-react';

const calculateTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const CartPage = () => {
  const { cartItems } = useOutletContext<CartContextType>();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main>
        <h1>Your Cart</h1>
        <p>Your Cart is empty.</p>
      </main>
    );
  }

  const total = calculateTotal(cartItems).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <main className={styles.page}>
      <div className={styles.backContainer}>
        <button
          type='button'
          className={styles.back}
          onClick={() => navigate(-1)}
        >
          <ChevronLeft /> Back
        </button>
      </div>
      <h1 className={styles.heading}>Your Cart</h1>

      <section className={styles.layout}>
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id}>
              <Link to={`/manga/${item.id}`} className={styles.item}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.image}
                />
                <div className={styles.details}>
                  <h2 className={styles.title}>{item.title}</h2>
                  <p className={styles.price}>${item.price}</p>
                  <div className={styles.controls}>
                    <input
                      type='number'
                      min={1}
                      value={item.quantity}
                      aria-label='Quantity'
                      className={styles.quantity}
                    />
                    <button className={styles.remove}>Remove</button>
                  </div>
                </div>
                <div className={styles.subtotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <div className={styles.totalRow}>
            <span>Total</span>
            <strong>{total}</strong>
          </div>
          <button
            type='button'
            className={`${styles.checkout} btn-primary btn-md`}
          >
            Proceed to checkout
          </button>
        </aside>
      </section>
    </main>
  );
};
