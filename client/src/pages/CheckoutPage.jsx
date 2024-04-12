// import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {
  // deleteItemFromCartAsync,
  selectItems,
  // updateCartAsync,
} from '../features/cart/cartSlice';
import {Navigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {updateUserAsync} from '../features/user/userSlice';
import {useState} from 'react';
import {
  createOrderAsync,
  selectCurrentOrder,
} from '../features/order/orderSlice';
import {selectUserInfo} from '../features/user/userSlice';
import {discountedPrice} from '../app/constants';
import Cart from '../features/cart/Cart';

function Checkout() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
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
  const date = `${
    months[current.getMonth()]
  } ${current.getDate()}, ${current.getFullYear()}`;

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // const handleQuantity = (e, item) => {
  //   dispatch(updateCartAsync({id: item.id, quantity: +e.target.value}));
  // };

  // const handleRemove = (e, id) => {
  //   dispatch(deleteItemFromCartAsync(id));
  // };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
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
        items,
        totalAmount,
        totalItems,
        user: user.id,
        date: date,
        time: time,
        paymentMethod,
        selectedAddress,
        status: 'pending', // other status can be delivered, received.
      };
      dispatch(createOrderAsync(order));
      // need to redirect from here to a new page of order success.
    } else {
      // TODO : we can use proper messaging popup here
      alert('Enter Address and Payment method');
    }
    //TODO : Redirect to order-success page
    //TODO : clear cart after order
    //TODO : on server change the stock number of items
  };

  return (
    <main className="checkout_page-wrapper">
      {!items.length && <Navigate to="/" replace={true} />}
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
                  ...user,
                  addresses: [...user.addresses, data],
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
              {user.addresses
                ? user.addresses.map((address, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={idx}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 text-xs flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-gray-500">
                            {address.state}, {address.city} - {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          REMOVE
                        </p>
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
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
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
                      className="block text-sm font-medium leading-6 text-gray-900">
                      Cash
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
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
                      className="block text-sm font-medium leading-6 text-gray-900">
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

export default Checkout;
