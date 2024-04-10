import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
// * COMPONENTS
import Cart from '../features/cart/Cart';
// * CONSTANTS
import {DISCOUNT_PRICE} from '../app/constants';
// * REDUX
import {selectItems} from '../features/cart/cartSlice';

export default function CartPage() {
  const cartItemsSelector = useSelector(selectItems);

  const totalItems = cartItemsSelector.reduce(
    (total, item) => item.quantity + total,
    0,
  );
  const totalAmount = cartItemsSelector.reduce(
    (amount, item) => DISCOUNT_PRICE(item.product) * item.quantity + amount,
    0,
  );

  let shippingAmount;
  const shippingOptions = [0, 10, 20]; // Shipping amounts
  const randomIndex = Math.floor(Math.random() * shippingOptions.length); // Generate random index
  shippingAmount = shippingOptions[randomIndex]; // Select shipping amount
  const orderTotal = shippingAmount + totalAmount;

  return (
    <>
      {totalItems === 0 ? (
        <h3 className="text-center uppercase font-bold text-sm">
          No items in cart
        </h3>
      ) : (
        <main className="cart_page-wrapper">
          <Cart />

          {/*//! TOTAL  */}
          <section className="cart_total-wrapper">
            <section className="cart_total-ctr">
              <h2 className="shopping_cart">Shopping Cart:</h2>
              <div className="shopping_cart-info mt-3">
                <p>Total Items</p>
                <p>{totalItems}</p>
              </div>
              <div className="shopping_cart-info">
                <p>Cart Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <div className="shopping_cart-info mb-3">
                <p>Shipping</p>
                <p>
                  {shippingAmount === 0
                    ? (shippingAmount = 'Free Shipping')
                    : (shippingAmount = `$${shippingAmount}`)}
                </p>
              </div>
              <span className="line-dotted"></span>
              <div className="shopping_cart-info my-3">
                <p>Order Total</p>
                <p>
                  <span className="total">${orderTotal}</span>
                </p>
              </div>
            </section>
            <div className="mt-6">
              <Link to="/checkout" className="primary-btn btn">
                Checkout
              </Link>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
