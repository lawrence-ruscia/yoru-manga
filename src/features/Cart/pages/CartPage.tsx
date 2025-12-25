import type { CartContextType } from '@/app/App';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import styles from './CartPage.module.css';
import type { CartItem } from '../types/CartItem';
import { BackButton } from '@/shared/components/BackButton';
import { ShoppingCart } from 'lucide-react';

const calculateTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const CartPage = () => {
  const { cartItems, changeQuantity, removeItem, handleCheckout } =
    useOutletContext<CartContextType>();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.backContainer}>
          <BackButton />
        </div>
        <h1 className={styles.heading}>Your Cart</h1>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <ShoppingCart size={36} strokeWidth={1.5} />
          </div>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>
            Start adding your favorite manga to your cart and they'll appear
            here.
          </p>
          <button
            className={`${styles.browseManga} btn-primary btn-md`}
            onClick={() => navigate('/shop')}
          >
            Browse Manga
          </button>
        </div>
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
        <BackButton />
      </div>
      <h1 className={styles.heading}>Your Cart</h1>

      <section className={styles.layout}>
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <Link to={`/manga/${item.id}`} className={` ${styles.imageLink}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={styles.image}
                />
              </Link>

              <div className={styles.details}>
                <Link to={`/manga/${item.id}`} className={styles.titleLink}>
                  <h2 className={styles.title}>{item.title}</h2>
                </Link>
                <p className={styles.price}>${item.price}</p>
                <div className={styles.controls}>
                  <input
                    type='number'
                    min={1}
                    value={item.quantity}
                    aria-label='Quantity'
                    className={styles.quantity}
                    onChange={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      changeQuantity(item.id, Number(e.target.value));
                    }}
                  />
                  <button
                    className={styles.remove}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className={styles.subtotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
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
            onClick={handleCheckout}
          >
            Proceed to checkout
          </button>
        </aside>
      </section>
    </main>
  );
};
