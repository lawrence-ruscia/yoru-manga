import type { CartContextType } from '@/app/App';
import { useOutletContext } from 'react-router';
import styles from './CartPage.module.css';
import type { CartItem } from '../types/CartItem';

const calculateTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const CartPage = () => {
  const { cartItems } = useOutletContext<CartContextType>();

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
    <main>
      <h1>Your Cart</h1>

      <section>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt='' />

              <div>
                <h2>{item.title}</h2>
                <p>${item.price}</p>

                <div>
                  <label>
                    <input
                      type='number'
                      min={1}
                      value={item.quantity}
                      aria-label='Quantity'
                    />
                  </label>

                  <button
                    type='button'
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className={styles.subtotal}>
                {(item.price * item.quantity).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
            </li>
          ))}
        </ul>

        <aside>
          <div>
            <span>Total</span>
            {total}
          </div>
        </aside>
      </section>
    </main>
  );
};
