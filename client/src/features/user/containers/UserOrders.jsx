import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUserOrdersAsync,
  selectUserInfo,
  selectUserOrders,
} from '../userSlice';
import {useEffect, useState} from 'react';
import {selectLoggedInUser} from '../../auth/authSlice';
import {updateOrderAsync} from '../../order/orderSlice';

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userOrdersSelected = useSelector(selectUserOrders);
  const userInfoSelected = useSelector(selectUserInfo);
  const [editOrderStatus, setEditOrderStatus] = useState(-1);

  useEffect(() => {
    dispatch(fetchUserOrdersAsync(user.id));
    // console.log('userOrdersSelected', userOrdersSelected);
    // console.log('userInfoSelected', userInfoSelected[0]);
    // console.log('user', user);
  }, [dispatch, user]);
  const handleStatus = (e, orders) => {
    const updatedOrder = {...orders, status: e.target.value};
    dispatch(updateOrderAsync(updatedOrder));
    setEditOrderStatus(-1); // ? to close options
  };
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
              <p>QUANTITY</p>
            </th>
            <th>
              <p>TOTAL AMOUNT</p>
            </th>
            <th>
              <p>ORDER PLACED</p>
            </th>

            <th>
              <p>STATUS</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {userInfoSelected &&
            userInfoSelected.map((orders) => (
              <tr key={orders.id}>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        className="profile_pic"
                        src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                      />
                      <div>
                        <span className="order_id">
                          Order ID: {orders.id.substring(0, 5)}
                        </span>
                        {orders.items.map((item) => (
                          <div>
                            <p className="product_name">{item.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  <div>
                    <p className="product_name">
                      {orders.selectedAddress.address}
                    </p>
                    <p className="product_name">
                      {orders.selectedAddress.city}-
                      {orders.selectedAddress.pinCode}
                    </p>
                  </div>
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p className="quantity">
                      {orders.totalItems < 10
                        ? '0' + orders.totalItems
                        : orders.totalItems}
                    </p>
                  </div>
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p className="amount">${orders.totalAmount}</p>
                  </div>
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="date">
                    <p>{orders.time}10:30pm</p>
                    <p>{orders.date}</p>
                  </div>
                </td>

                <td className="py-3 border-b border-blue-gray-50">
                  <div className="w-max">
                    <div style={{opacity: 1}}>
                      {orders.id === editOrderStatus ? (
                        <select onChange={(e) => handleStatus(e, orders)}>
                          <option value={orders.status}>{orders.status}</option>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      ) : (
                        <p
                          className={`status_color ${statusColor(orders.status)}`}>
                          <span>{orders.status}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
