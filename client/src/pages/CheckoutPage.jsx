import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import Cart from "../features/cart/Cart";
import { selectItems } from "../features/cart/cartSlice";
import { selectLoggedInUser, updateUserAsync } from "../features/auth/authSlice";
import { placeOrderAsync, selectOrderPlaced } from "../features/order/orderSlice";
import { DISCOUNT_PRICE } from "../app/constants";

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = new useDispatch();
  const cartItemsSelector = useSelector(selectItems);
  const orderPlacedSelector = useSelector(selectOrderPlaced);
  const userSelector = useSelector(selectLoggedInUser);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  // console.log(orderPlacedSelector.id);

  const handleAddresses = (e) => {
    // console.log(userSelector.addresses[e.target.value]);
    setAddress(userSelector.addresses[e.target.value]);
  };
  const handlePaymentMethod = (e) => {
    // console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const totalAmount = cartItemsSelector.reduce((amount, item) => DISCOUNT_PRICE(item) * item.quantity + amount, 0);
  const totalItems = cartItemsSelector.reduce((total, item) => item.quantity + total, 0);
  const handleOrder = () => {
    const order = {
      status: "pending",
      totalItems,
      totalAmount,
      paymentMethod,
      address,
      items: cartItemsSelector,
      user: userSelector,
    };
    dispatch(placeOrderAsync(order));
    // console.log(order);

    // TODO:
    // after click on Place order it should show order successfully
    // after placing order cart should get empty
    // after order stock of that product should change like if apple was 10 in stock it should change to 9 after purchasing 1
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {cartItemsSelector <= 0 && <Navigate to="/cart" replace={true} />}
      {orderPlacedSelector && <Navigate to={`/order-success/${orderPlacedSelector.id}`} replace={true} />}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form
            className="bg-white px-5 py-12 mt-12"
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(updateUserAsync({ ...userSelector, addresses: [...userSelector.addresses, data] }));
              reset();
            })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("fullName", {
                          required: "Name is required",
                        })}
                        id="fullName"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email", {
                          required: "email is required",
                        })}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900">
                      Mobile Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="mobile"
                        {...register("mobile", {
                          required: "Mobile Number is required",
                        })}
                        type="tel"
                        autoComplete="mobile"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("address", {
                          required: "address is required",
                        })}
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city", {
                          required: "city is required",
                        })}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state", {
                          required: "State / Province is required",
                        })}
                        id="state"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("pinCode", {
                          required: "ZIP / Postal code is required",
                        })}
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Choose from Existing addresses</p>
                <ul>
                  {userSelector.addresses.map((address, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddresses}
                          value={idx}
                          name="address"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">{address.fullName}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.address}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.state}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          type="radio"
                          onChange={handlePaymentMethod}
                          value="cash"
                          checked={paymentMethod === "cash"}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          onChange={handlePaymentMethod}
                          value="card"
                          checked={paymentMethod === "card"}
                          name="payments"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
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
          {/* -------------------------------------------------------------------------- */
          /*                                    CART                                    */
          /* -------------------------------------------------------------------------- */}
          <Cart />
          <button
            onClick={handleOrder}
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
