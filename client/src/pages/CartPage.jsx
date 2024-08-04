// * IMPORTS
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// * MISCELLANEOUS
import { DISCOUNTED_PRICE } from '../app/constants';
// * COMPONENTS
import Cart from '../features/cart/Cart';
// * REDUX
import { selectItems } from '../features/cart/cartSlice';

export default function CartPage() {
  const cartItemsSelector = useSelector(selectItems);

  const totalItems = cartItemsSelector.reduce((total, item) => (item && item.quantity ? item.quantity : 0) + total, 0);
  const totalAmount = cartItemsSelector.reduce((amount, item) => {
    if (item && item.product) {
      return DISCOUNTED_PRICE(item.product) * (item.quantity || 0) + amount;
    }
    return amount;
  }, 0);

  let shippingAmount;
  const shippingOptions = [0, 10, 20]; // Shipping amounts
  const randomIndex = Math.floor(Math.random() * shippingOptions.length); // Generate random index
  shippingAmount = shippingOptions[randomIndex]; // Select shipping amount
  const orderTotal = shippingAmount + totalAmount;

  return (
    <>
      {totalItems === 0 ? (
        <div className="empty_cart flex justify-center items-center uppercase font-bold text-sm">
          <span>No items in cart</span>
        </div>
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
                  {shippingAmount === 0 ? (shippingAmount = 'Free Shipping') : (shippingAmount = `$${shippingAmount}`)}
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

