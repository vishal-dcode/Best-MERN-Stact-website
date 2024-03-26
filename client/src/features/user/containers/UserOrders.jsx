import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrdersAsync, selectUserOrders } from "../userSlice";
import { useEffect } from "react";
import { selectLoggedInUser } from "../../auth/authSlice";
import { DISCOUNT_PRICE } from "../../../app/constants";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userOrdersSelected = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
    // console.log(userOrdersSelected);
  }, [dispatch, user]);

  return (
    <>
      <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">Cart</h1>
      {userOrdersSelected.map((orders) => (
        <div key={orders.id}>
          <div>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-1xl my-5 font-bold tracking-tight text-gray-900">Order Status: {orders.status}</h1>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {orders.items.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.title}</a>
                              </h3>
                              <p className="ml-4">${DISCOUNT_PRICE(item)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty {item.quantity}
                              </label>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$ {orders.totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  <p>{orders.totalItems} items</p>
                </div>
              </div>
              <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p>Shipping Address:</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{orders.address.address}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{orders.address.city}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{orders.address.state}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{orders.address.pinCode}</p>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
