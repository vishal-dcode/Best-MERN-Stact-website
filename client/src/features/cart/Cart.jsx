// * IMPORTS
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';
// * COMPONENTS
import Modal from '../../components/Modal';
// * CONTAINERS
import {DISCOUNTED_PRICE} from '../../app/constants';
// * REDUX
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from './cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(null);

  const itemsSelector = useSelector(selectItems);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id: item.id, quantity: +e.target.value}));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!itemsSelector.length && <Navigate to="/" replace={true}></Navigate>}

      <section className="cart_wrapper">
        <div className="flow-root">
          <ul className="cart_list">
            {itemsSelector.map((item) => (
              <li key={item.product.id} className="cart_items">
                <figure className="h-32 w-32">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>

                <div className="cart_items-info">
                  <div>
                    <div className="cart_items-title">
                      <p className="order_id">{item.product.brand}</p>
                      <h3>{item.product.title}</h3>
                    </div>
                    <div className="qty-ctr">
                      <label htmlFor="quantity" className="">
                        Qty:
                      </label>
                      <select
                        onChange={(e) => handleQuantity(e, item)}
                        value={item.quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className="price">${DISCOUNTED_PRICE(item.product)}</p>
                  </div>
                </div>

                <div className="close_icon-ctr">
                  <Modal
                    title={`Delete ${item.product.title}`}
                    message="Are you sure you want to delete this Cart item ?"
                    dangerOption="Delete"
                    cancelOption="Cancel"
                    dangerAction={(e) => handleRemove(e, item.id)}
                    cancelAction={() => setOpenModal(null)}
                    showModal={openModal === item.id}></Modal>
                  <button
                    onClick={(e) => {
                      setOpenModal(item.id);
                    }}
                    type="button"
                    className="close_icon font-medium text-indigo-600 hover:text-indigo-500">
                    <svg
                      width="42"
                      height="42"
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
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
