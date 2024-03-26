import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../features/order/orderSlice";
import Pagination from "../../components/Pagination";

export default function AdminOrderPanel() {
  const dispatch = useDispatch();
  const ordersSelector = useSelector(selectOrders);
  const totalOrdersSelector = useSelector(selectTotalOrders);
  const [page, setPage] = useState(1);
  const [editOrderStatus, setEditOrderStatus] = useState(-1);
  const totalOrders = useSelector(selectTotalOrders);

  const handleStatus = (e, orders) => {
    const updatedOrder = { ...orders, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditOrderStatus(-1); // ? to close options
  };
  const handleShow = (orders) => {};
  const handleEdit = (orders) => {
    setEditOrderStatus(orders.id);
  };
  const handlePage = (page) => {
    setPage(page);
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  };
  useEffect(() => {
    handlePage();
  }, [dispatch, page]);
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-500/20 text-blue-600";
      case "dispatched":
        return "bg-yellow-500/20 text-yellow-600";
      case "delivered":
        return "bg-green-500/20 text-green-600";
      case "canceled":
        return "bg-red-500/20 text-red-600";
      default:
        return "bg-blue-500/20 text-blue-600";
    }
  };
  return (
    <>
      <div className="p-6 overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Order ID{" "}
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Items{" "}
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Total Amount{" "}
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  User Details{" "}
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Delivery Address{" "}
                </p>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Status{" "}
                </p>
              </th>

              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Actions
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersSelector.map((orders) => (
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="block uppercase antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {orders.id}
                        {Math.floor(Math.random() * 9)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  {orders.items.map((item) => (
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {item.title}
                        </p>
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          {item.brand}
                        </p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      Price: ${orders.totalAmount}
                    </p>
                    {orders.items.map((item) => (
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                        Quantity: {item.quantity}
                      </p>
                    ))}
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        User ID: {orders.user.id}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                        Email: {orders.user.email}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                        Mobile: {orders.address.mobile}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                        Address: {orders.address.address}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {orders.address.state}, {orders.address.city}, {orders.address.pinCode}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="w-max">
                    <div
                      className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none  py-1 px-2 text-xs rounded-md"
                      style={{ opacity: 1 }}
                    >
                      {orders.id === editOrderStatus ? (
                        <select onChange={(e) => handleStatus(e, orders)}>
                          <option value={orders.status}>{orders.status}</option>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      ) : (
                        <span className={`${statusColor(orders.status)}`}>{orders.status}</span>
                      )}
                    </div>
                  </div>
                </td>

                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30">
                    <span onClick={() => handleShow(orders)}>
                      <InformationCircleIcon className="w-6 h-6" />
                    </span>
                    <span onClick={() => handleEdit(orders)}>
                      <PencilIcon className="w-6 h-6" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* section of product and filters ends */}
      <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} />
    </>
  );
}
