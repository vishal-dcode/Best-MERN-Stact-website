import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
} from '../userSlice';
import {Link} from 'react-router-dom';

export default function UserOrders() {
  const dispatch = useDispatch();
  const userInfoSelector = useSelector(selectUserInfo);
  const ordersSelector = useSelector(selectUserOrders);

  // console.log(ordersSelector);
  // console.log(userInfoSelector);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(userInfoSelector.id));
  }, [dispatch, userInfoSelector]);

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-500/20 text-blue-600';
      case 'dispatched':
        return 'bg-yellow-500/20 text-yellow-600';
      case 'delivered':
        return 'bg-green-500/20 text-green-600';
      case 'canceled':
        return 'bg-red-500/20 text-red-600';
      default:
        return 'bg-blue-500/20 text-blue-600';
    }
  };
  return (
    <section className="order_table-wrapper">
      {ordersSelector && ordersSelector.length > 0 ? (
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th>
                <p>PRODUCT LIST</p>
              </th>
              <th>
                <p>SHIP TO</p>
              </th>
              <th>
                <p className="flex justify-center">QUANTITY</p>
              </th>
              <th>
                <p className="flex justify-center">TOTAL AMOUNT</p>
              </th>
              <th>
                <p className="flex justify-center">ORDER PLACED</p>
              </th>
              <th>
                <p className="flex justify-center">STATUS</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersSelector &&
              ordersSelector.map((orders) => (
                <tr key={orders.id}>
                  <td className="py-3 pr-1 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div>
                        {orders.items.map((item, idx) => (
                          <>
                            <Link
                              to={`/product-detail/${item.product.id}`}
                              className="flex items-center gap-3">
                              <img
                                key={idx}
                                className="profile_pic"
                                src={item.product.thumbnail}
                                alt="Thumbnail"
                              />
                              <div>
                                <span className="order_id">
                                  Order ID:{' '}
                                  {item.id.substring(item.id.length - 4)}
                                </span>
                                <p className="product_name">
                                  {item.product.title}
                                </p>
                              </div>
                            </Link>
                          </>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 border-b border-blue-gray-50">
                    <div>
                      <p className="product_name">
                        {orders.selectedAddress.street}
                      </p>
                      <p className="product_name">
                        {orders.selectedAddress.city}-
                        {orders.selectedAddress.pinCode}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="quantity flex justify-center">
                        {orders.totalItems < 10
                          ? '0' + orders.totalItems
                          : orders.totalItems}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="amount flex justify-center">
                        ${orders.totalAmount}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 border-b border-blue-gray-50">
                    <div className="date flex justify-center items-center flex-col">
                      <p>{orders.time}</p>
                      <p>{orders.date}</p>
                    </div>
                  </td>

                  <td className="py-3 border-b border-blue-gray-50">
                    <div className="flex justify-center items-center">
                      <div>
                        <span
                          className={`status_color ${statusColor(
                            orders.status
                          )}`}>
                          {orders.status}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p className="order_empty">No Orders</p>
      )}
    </section>
  );
}
