import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
// * COMPONENTS
import Cart from '../features/cart/Cart';
// * CONSTANTS
import {DISCOUNT_PRICE} from '../app/constants';
// * REDUX
import {selectItems} from '../features/cart/cartSlice';
import {selectLoggedInUser, updateUserAsync} from '../features/auth/authSlice';
import {placeOrderAsync, selectOrderPlaced} from '../features/order/orderSlice';

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const dispatch = new useDispatch();
  const cartItemsSelector = useSelector(selectItems);
  const orderPlacedSelector = useSelector(selectOrderPlaced);
  const userSelector = useSelector(selectLoggedInUser);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  // console.log(orderPlacedSelector.id);
  const current = new Date(); // Assuming current is defined
  let hours = current.getHours();
  const minutes = current.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // Handle midnight (0 hours)
  const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}${ampm}`;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = `${months[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;

  const handleAddresses = (e) => {
    // console.log(userSelector.addresses[e.target.value]);
    setAddress(userSelector.addresses[e.target.value]);
  };
  const handlePaymentMethod = (e) => {
    // console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = () => {
    const order = {
      status: 'pending',
      items: cartItemsSelector,
      user: userSelector,
      date: date,
      time: time,
      totalItems,
      totalAmount,
      paymentMethod,
      address,
    };
    dispatch(placeOrderAsync(order));
    // console.log(order);

    // TODO:
    // after click on Place order it should show order successfully
    // after placing order cart should get empty
    // after order stock of that product should change like if apple was 10 in stock it should change to 9 after purchasing 1
  };

  /*//! ------------ TOTAL AMOUNT ------------ */
  const totalAmount = cartItemsSelector.reduce(
    (amount, item) => DISCOUNT_PRICE(item) * item.quantity + amount,
    0,
  );
  const totalItems = cartItemsSelector.reduce(
    (total, item) => item.quantity + total,
    0,
  );

  let shippingAmount;
  const shippingOptions = [0, 10, 20]; // Shipping amounts
  const randomIndex = Math.floor(Math.random() * shippingOptions.length); // Generate random index
  shippingAmount = shippingOptions[randomIndex]; // Select shipping amount
  const orderTotal = shippingAmount + totalAmount;
  return (
    <main className="checkout_page-wrapper">
      {cartItemsSelector <= 0 && <Navigate to="/cart" replace={true} />}
      {orderPlacedSelector && (
        <Navigate
          to={`/order-success/${orderPlacedSelector.id}`}
          replace={true}
        />
      )}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form
            className="mt-2"
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(
                updateUserAsync({
                  ...userSelector,
                  date,
                  addresses: [...userSelector.addresses, data],
                }),
              );
              reset();
            })}>
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-bold uppercase">
                  Billing Details
                </h2>
                <p className="mt-1 text-sm">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('fullName', {
                          required: 'Name is required',
                        })}
                        id="fullName"
                        placeholder="Full Name*"
                        autoComplete="given-name"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 sm:col-start-1">
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('email', {
                          required: 'email is required',
                        })}
                        type="email"
                        placeholder="E-Mail Address*"
                        autoComplete="email"
                        className="input"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="mt-2">
                      <input
                        id="mobile"
                        {...register('mobile', {
                          required: 'Mobile Number is required',
                        })}
                        type="tel"
                        placeholder="Mobile Number*"
                        autoComplete="mobile"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('address', {
                          required: 'address is required',
                        })}
                        id="street-address"
                        placeholder="Flat, Company, Apartment*"
                        autoComplete="street-address"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('city', {
                          required: 'city is required',
                        })}
                        id="city"
                        placeholder="City*"
                        autoComplete="address-level2"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('state', {
                          required: 'State / Province is required',
                        })}
                        id="state"
                        placeholder="State*"
                        autoComplete="address-level1"
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('pinCode', {
                          required: 'ZIP / Postal code is required',
                        })}
                        id="postal-code"
                        placeholder="Postal Code*"
                        autoComplete="postal-code"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="btn reset-btn">
                  Reset
                </button>
                <button type="submit" className="btn secondary-btn">
                  Add Address
                </button>
              </div>

              <div className="border-b border-gray-500 pb-10">
                <h2 className="text-base uppercase font-semibold leading-7 text-gray-900">
                  Addresses
                </h2>
                <p className="mb-3 text-sm font-medium leading-6 text-gray-600">
                  Choose from Existing addresses
                </p>
                <ul>
                  {userSelector.addresses.map((address, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddresses}
                          value={idx}
                          name="address"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-base leading-3 mb-2 font-semibold leading-6 text-gray-900">
                            {address.fullName}
                          </p>
                          <p className="truncate text-sm leading-5 text-gray-500">
                            {address.address}
                          </p>
                          <div className="flex gap-2">
                            <p className="truncate text-sm leading-5 text-gray-500">
                              {address.state}
                            </p>
                            <span className="text-gray-400">-</span>
                            <p className="truncate text-sm leading-5 text-gray-500">
                              {address.city}
                            </p>
                            <span className="text-gray-400">-</span>
                            <p className="truncate text-sm leading-5 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <fieldset>
                    <legend className=" uppercase text-base font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="text-sm font-medium leading-6 text-gray-600">
                      Choose One
                    </p>
                    <div className="flex gap-6 items-center mt-2 ">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          type="radio"
                          onChange={handlePaymentMethod}
                          value="cash"
                          checked={paymentMethod === 'cash'}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          onChange={handlePaymentMethod}
                          value="card"
                          checked={paymentMethod === 'card'}
                          name="payments"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900">
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
          {/*//! ---------------------------------- CART ---------------------------------- */}

          <section>
            <Cart />

            {/*//! TOTAL  */}
            <div className="checkout_total w-full flex flex-col">
              <div className="flex justify-between mt-6 mb-1 text-base font-bold">
                <p>Total Items:</p>
                <p>{totalItems}</p>
              </div>
              <div className="flex justify-between mb-1 text-base font-bold">
                <p>Cart Subtotal:</p>
                <p>${totalAmount}</p>
              </div>
              <div className="flex justify-between mb-4 text-base font-bold">
                <p>Shipping:</p>
                <p>
                  {shippingAmount === 0
                    ? (shippingAmount = 'Free Shipping')
                    : (shippingAmount = `$${shippingAmount}`)}
                </p>
              </div>
              <span className="line-dotted w-full"></span>
              <div className="flex justify-between my-4 text-base font-bold">
                <p>Order Total:</p>
                <p>${orderTotal}</p>
              </div>
            </div>
          </section>
          <button onClick={handleOrder} className="btn primary-btn w-full">
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
