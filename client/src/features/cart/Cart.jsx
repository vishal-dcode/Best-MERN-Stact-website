import {useSelector, useDispatch} from 'react-redux';
//* CONSTANTS
import {DISCOUNT_PRICE} from '../../app/constants';
//* REDUX
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from './cartSlice';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItemsSelector = useSelector(selectItems);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({...item, quantity: +e.target.value}));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      <section className="cart_wrapper">
        <div className="flow-root">
          <ul className="cart_list">
            {cartItemsSelector.map((item) => (
              <li key={item.id} className="cart_items">
                <figure className="h-32 w-32">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>

                <div className="cart_items-info">
                  <div>
                    <div className="cart_items-title">
                      <p className="order_id">{item.brand}</p>
                      <h3>{item.title}</h3>
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
                    <p className="price">${DISCOUNT_PRICE(item)}</p>
                  </div>
                </div>

                <div className="close_icon-ctr">
                  <button
                    onClick={(e) => handleRemove(e, item.id)}
                    type="button"
                    className="close_icon">
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
                        stroke-width="2"
                      />
                      <line
                        x1="9"
                        y1="18"
                        x2="9"
                        y2="4.37114e-08"
                        stroke="black"
                        stroke-width="2"
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
