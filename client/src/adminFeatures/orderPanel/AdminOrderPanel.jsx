import {useEffect, Fragment, useState} from 'react';
import {ITEMS_PER_PAGE} from '../../app/constants';
import {useDispatch, useSelector} from 'react-redux';
import {PencilIcon} from '@heroicons/react/24/solid';
import {Menu, Transition} from '@headlessui/react';
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from '../../features/order/orderSlice';
import Pagination from '../../components/Pagination';

export default function AdminOrderPanel() {
  const dispatch = useDispatch();
  const ordersSelector = useSelector(selectOrders);
  const [page, setPage] = useState(1);
  const [editOrderStatus, setEditOrderStatus] = useState(-1);
  const totalOrders = useSelector(selectTotalOrders);

  const handleStatus = (e, orders) => {
    const updatedOrder = {...orders, status: e.target.value};
    dispatch(updateOrderAsync(updatedOrder));
    setEditOrderStatus(-1); // ? to close options
  };
  // const handleShow = (orders) => {};
  const handleEdit = (orders) => {
    setEditOrderStatus(orders.id);
  };
  const handlePage = (page) => {
    setPage(page);
    const pagination = {_page: page, _limit: ITEMS_PER_PAGE};
    dispatch(fetchAllOrdersAsync(pagination));
  };
  const sortOptions = [
    {name: 'Best Rating', sort: 'rating', order: 'desc'},
    {name: 'Price: Low to High', sort: 'price', order: 'asc'},
    {name: 'Price: High to Low', sort: 'price', order: 'desc'},
  ];
  useEffect(() => {
    handlePage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
      {/* //! Sorting */}
      <div className="sorting-wrapper">
        <span></span>
        <div className="flex align-middle">
          <Menu as="div">
            <Menu.Button className="sorting-ctr group gap-1 inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              <strong>Sort by:</strong> High to Low
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({active}) => (
                        <p
                          onClick={(e) => console.log('Sort Clicked')}
                          className="">
                          {option.name}
                        </p>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

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
                <p>QUANTITY</p>
              </th>
              <th>
                <p>AMOUNT</p>
              </th>
              <th>
                <p>DATE</p>
              </th>
              <th>
                <p>STATUS</p>
              </th>

              <th>
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersSelector.map((orders) => (
              <tr>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <img
                      className="profile_pic"
                      src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                    <div>
                      <span className="user_id">
                        User ID: {orders.user.id}-
                        {Math.floor(Math.random() * 9999)}
                      </span>
                      <p className="user_name">{orders.address.fullName}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  {orders.items.map((item) => (
                    <div className="flex flex-col">
                      <span className="order_id">
                        Order ID: {item.product.id}S
                        {Math.floor(Math.random() * 999)}
                      </span>
                      <p className="product_name">{item.product.title}</p>
                    </div>
                  ))}
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    {orders.items.map((item) => (
                      <p key={item.id} className="quantity">
                        {orders.totalItems < 10
                          ? '0' + orders.totalItems
                          : orders.totalItems}
                      </p>
                    ))}
                  </div>
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="amount">${orders.totalAmount}</div>
                  </div>
                </td>
                <td className="py-3 border-b border-blue-gray-50">
                  <div className="date">
                    <p>{orders.user.time}10:30pm</p>
                    <p>{orders.user.date}</p>
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

                <td className="py-3 border-b border-blue-gray-50">
                  <div className="action">
                    {/* <span onClick={() => handleShow(orders)}>
                      <InformationCircleIcon className="w-6 h-6" />
                    </span> */}
                    <span onClick={() => handleEdit(orders)}>
                      <PencilIcon className="w-4 h-4" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* //! Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </section>
    </main>
  );
}
