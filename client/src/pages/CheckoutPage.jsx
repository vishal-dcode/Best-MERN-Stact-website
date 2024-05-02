// * IMPORTS
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
// * MISCELLANEOUS
import {DISCOUNTED_PRICE} from '../app/constants';
// * COMPONENTS
import Cart from '../features/cart/Cart';
// * REDUX
import {selectItems} from '../features/cart/cartSlice';
import {updateUserAsync, selectUserInfo} from '../features/user/userSlice';

import {
  createOrderAsync,
  selectCurrentOrder,
} from '../features/order/orderSlice';

export default function Checkout() {
  const dispatch = useDispatch();
  const currentOrder = useSelector(selectCurrentOrder);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const userSelector = useSelector(selectUserInfo);
  const itemsSelector = useSelector(selectItems);
  const userInfoSelector = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const totalAmount = itemsSelector.reduce(
    (amount, item) => DISCOUNTED_PRICE(item.product) * item.quantity + amount,
    0
  );

  const totalItems = itemsSelector.reduce(
    (total, item) => item.quantity + total,
    0
  );
  const current = new Date(); // Assuming current is defined
  let hours = current.getHours();
  const minutes = current.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // Handle midnight (0 hours)
  const time = `${String(hours).padStart(2, '0')}:${
    minutes < 10 ? '0' : ''
  }${minutes}${ampm}`;
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
  const date = `${
    months[current.getMonth()]
  } ${current.getDate()}, ${current.getFullYear()}`;
  const handleAddress = (e) => {
    // console.log(e.target.value);
    setSelectedAddress(userSelector.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    // console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };
  let shippingAmount;
  const shippingOptions = [0, 10, 20]; // Shipping amounts
  const randomIndex = Math.floor(Math.random() * shippingOptions.length); // Generate random index
  shippingAmount = shippingOptions[randomIndex]; // Select shipping amount
  const orderTotal = shippingAmount + totalAmount;
  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items: itemsSelector,
        totalAmount,
        totalItems,
        user: userSelector.id,
        userName: userInfoSelector.userName,
        date: date,
        time: time,
        paymentMethod,
        selectedAddress,
        status: 'pending',
      };
      dispatch(createOrderAsync(order));
    } else {
      alert('Enter Address and Payment method');
    }
  };

  const handleRemove = (e, index) => {
    const newUser = {
      ...userInfoSelector,
      addresses: [...userInfoSelector.addresses],
    }; // for shallow copy issue
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  return (
    <main className="checkout_page-wrapper">
      {!itemsSelector.length && <Navigate to="/" replace={true} />}
      {/* //! TO USE STRIPE WHEN CARD PAYMENT */}
      {/* {currentOrder && currentOrder.paymentMethod === 'cash' && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}
      {currentOrder && currentOrder.paymentMethod === 'card' && (
        <Navigate to={`/card-payment`} replace={true} />
      )} */}

      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <section className="lg:col-span-3">
          {/* This form is for address */}
          <form
            className="mt-2"
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(
                updateUserAsync({
                  ...userSelector,
                  addresses: [...userSelector.addresses, data],
                })
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
                        {...register('name', {
                          required: 'name is required',
                        })}
                        id="name"
                        placeholder="Full Name*"
                        className="input"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
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
                        className="input"
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <div className="mt-2">
                      <input
                        id="phone"
                        {...register('phone', {
                          required: 'phone is required',
                        })}
                        type="tel"
                        placeholder="Mobile Number*"
                        className="input"
                      />
                      {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('street', {
                          required: 'street is required',
                        })}
                        id="street"
                        placeholder="Flat, Company, Apartment*"
                        autoComplete="street-address"
                        className="input"
                      />
                      {errors.street && (
                        <p className="text-red-500">{errors.street.message}</p>
                      )}
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
                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
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
                      {errors.state && (
                        <p className="text-red-500">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('pinCode', {
                          required: 'ZIP / Postal code is required',
                        })}
                        id="pinCode"
                        placeholder="Postal Code*"
                        autoComplete="postal-code"
                        className="input"
                      />
                      {errors.pinCode && (
                        <p className="text-red-500">{errors.pinCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={(e) => reset()}
                  type="button"
                  className="btn reset-btn">
                  Reset
                </button>
                <button type="submit" className="btn secondary-btn">
                  Add Address
                </button>
              </div>
            </div>
          </form>

          {/*//! Addresses */}
          <div className="border-b border-gray-500 pb-10">
            <h2 className="text-base uppercase font-semibold leading-7 text-gray-900">
              Addresses
            </h2>
            <p className="mb-3 text-sm font-medium leading-6 text-gray-600">
              Choose from Existing addresses
            </p>
            <ul>
              {userSelector.addresses
                ? userSelector.addresses.map((address, idx) => (
                    <li
                      key={idx}
                      className="flex relative justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={idx}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 text-xs flex-auto">
                          <p className="text-base font-semibold leading-4 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-2 text-sm truncate text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-0 text-sm truncate text-gray-500">
                            {address.state}, {address.city} - {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className=" sm:flex sm:flex-col">
                        <button
                          onClick={(e) => handleRemove(e)}
                          className="text-sm address_remove-btn leading-6 text-gray-900 rotate-45">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <line
                              y1="9"
                              x2="18"
                              y2="9"
                              stroke="black"
                              strokeWidth="2"
                            />
                            <line
                              x1="9"
                              y1="18"
                              x2="9"
                              y2="4.37114e-08"
                              stroke="black"
                              strokeWidth="2"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))
                : 'No Address Found'}
            </ul>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="uppercase text-base font-semibold leading-6 text-gray-900">
                  Payment Methods
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose One
                </p>
                <div className="mt-4 space-y-6 flex gap-10 items-center">
                  <div className="flex items-center">
                    <input
                      id="cash"
                      name="payments"
                      onChange={handlePayment}
                      value="cash"
                      type="radio"
                      checked={paymentMethod === 'cash'}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="cash"
                      className="block mx-2 text-sm font-medium leading-6 text-gray-900">
                      Cash
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="card"
                      onChange={handlePayment}
                      name="payments"
                      checked={paymentMethod === 'card'}
                      value="card"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="card"
                      className="block mx-2 text-sm font-medium leading-6 text-gray-900">
                      Card Payment
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </section>

        {/*//! ---------------------------------- CART ---------------------------------- */}
        <section className="lg:col-span-2">
          <div>
            <Cart />

            {/*//! TOTAL  */}
            <div className="checkout_total w-full flex flex-col">
              <div className="flex justify-between mt-6 mb-1 text-base font-bold">
                <p>Cart Subtotal:</p>
                <p>${totalAmount}</p>
              </div>
              <div className="flex justify-between mb-1 text-base font-bold">
                <p>Total Items:</p>
                <p>${totalItems}</p>
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
            <button onClick={handleOrder} className="btn primary-btn w-full">
              Place Order
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
