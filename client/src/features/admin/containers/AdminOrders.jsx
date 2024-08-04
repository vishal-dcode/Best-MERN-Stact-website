// * IMPORTS
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// * REDUX
import { selectOrders, updateOrderAsync } from '../../order/orderSlice';
// import { selectLoggedInUser } from '../../auth/authSlice';
import { Link } from 'react-router-dom';

export default function AdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  // const loggedInUser = useSelector(selectLoggedInUser);
  const [editOrderStatus, setEditOrderStatus] = useState(-1);
  // console.log(orders);
  // console.log(loggedInUser);
  const handleStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditOrderStatus(-1); // Close the select dropdown after updating the status
  };
  const handleEdit = (orders) => {
    setEditOrderStatus(orders.id);
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
    <main className="admin-order-panel">
      {/* //! Table */}
      <section className="order_table-wrapper">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th>
                <p>USER INFO</p>
              </th>
              <th>
                <p>PRODUCT INFO</p>
              </th>
              <th>
                <p className="flex justify-center">QUANTITY</p>
              </th>
              <th>
                <p className="flex justify-center">AMOUNT</p>
              </th>
              <th>
                <p className="flex justify-center">DATE</p>
              </th>
              <th>
                <p className="flex justify-center">STATUS</p>
              </th>
              <th>
                <p className="flex justify-center">Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((orders) => (
                <tr>
                  <td className="py-3 pr-1 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <img
                        className="profile_pic"
                        src={
                          orders.profilePic
                            ? orders.profilePic
                            : 'https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_640.png'
                        }
                        alt="Profile Pic"
                      />
                      <div>
                        <span className="user_id">
                          {/* {item.id.substring(item.id.length - 4)} */}
                          User ID: {orders.user.substring(orders.id.length - 4)}
                        </span>
                        <p className="user_name">{orders.userName ? orders.userName : 'New User'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 border-b border-blue-gray-50">
                    {orders.items.map((item) => (
                      <div className="flex flex-col">
                        <Link to={`/product-detail/${item.product.id}`}>
                          <span className="order_id">
                            Order ID: {item.product.id.substring(item.product.id.length - 5)}
                          </span>
                          <p className="product_name">{item.product.title}</p>
                        </Link>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-1  border-b border-blue-gray-50">
                    <div className="flex flex-col justify-center items-center">
                      {orders.items.map((item) => (
                        <p key={item.id} className="quantity">
                          {orders.totalItems < 10 ? '0' + orders.totalItems : orders.totalItems}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-1  border-b border-blue-gray-50">
                    <div className="flex justify-center items-center gap-3">
                      <div className="amount ">${orders.totalAmount}</div>
                    </div>
                  </td>
                  <td className="py-3 px-1  border-b border-blue-gray-50">
                    <div className="date grid justify-center text-center">
                      <p>{orders.time}</p>
                      <p>{orders.date}</p>
                    </div>
                  </td>
                  <td className="py-3 border-b border-blue-gray-50">
                    <div className="flex justify-center items-center">
                      {orders.id === editOrderStatus ? (
                        <select onChange={(e) => handleStatus(e, orders)}>
                          <option value={orders.status}>{orders.status}</option>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      ) : (
                        <p className={`status_color ${statusColor(orders.status)}`}>
                          <span>{orders.status}</span>
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="py-3 border-b border-blue-gray-50">
                    <div className="flex justify-center items-center">
                      <div className="action">
                        {/* <span onClick={() => handleShow(orders)}>
                      <InformationCircleIcon className="w-6 h-6" />
                    </span> */}
                        <span onClick={() => handleEdit(orders)}>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M8.14455 1.17731L8.79944 0.553192C9.57339 -0.184397 10.9204 -0.184397 11.6943 0.553192L12.2227 1.05674C12.6097 1.42553 12.8255 1.91489 12.8255 2.43262C12.8255 2.95036 12.6097 3.44681 12.2227 3.80851L11.5678 4.43262L8.14455 1.17021V1.17731ZM7.35572 1.92908L0.576181 8.39007C0.360367 8.59575 0.226414 8.86525 0.204088 9.15603L0.00315818 11.234C-0.0191674 11.4965 0.0775768 11.7518 0.271065 11.9433C0.44967 12.1135 0.680368 12.2057 0.925949 12.2057C0.955716 12.2057 0.985484 12.2057 1.00781 12.2057L3.18827 12.0142C3.49339 11.9858 3.77618 11.8582 3.992 11.6525L10.7715 5.19149L7.34827 1.92908H7.35572Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

