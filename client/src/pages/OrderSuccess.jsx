import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {emptyCartAsync} from '../features/cart/cartSlice';
import {selectLoggedInUser} from '../features/auth/authSlice';

export default function OrderSuccess() {
  const dispatch = useDispatch();
  const params = useParams();
  const userSelector = useSelector(selectLoggedInUser);

  useEffect(() => {
    // console.log(userSelector.id);
    // dispatch(emptyCartAsync(userSelector.id));
  }, [dispatch, userSelector]);

  return (
    <main className="order_success-wrapper flex flex-col items-center">
      <section className="order_success-ctr">
        <figure>
          <svg
            width="35"
            height="35"
            viewBox="0 0 74 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M72.4066 9.66077C73.4205 8.64687 73.9412 7.44114 73.9686 6.04359C73.996 4.61864 73.5164 3.39922 72.5299 2.38531C71.516 1.3714 70.3103 0.85075 68.9127 0.823347C67.4878 0.795944 66.2684 1.2892 65.2545 2.3031L23.287 42.9553L9.06488 27.1712C8.10578 26.1025 6.92746 25.5407 5.52991 25.4859C4.10497 25.4037 2.87184 25.8285 1.83053 26.7602C0.761817 27.7193 0.200058 28.8976 0.145252 30.2951C0.0630437 31.7201 0.487788 32.9669 1.41949 34.0356L19.1765 53.8068C19.8068 54.4919 20.5741 54.9851 21.4784 55.2865C22.3827 55.5606 23.287 55.588 24.1913 55.3687C25.0956 55.1221 25.8902 54.6837 26.5753 54.0534L72.4066 9.66077Z"
              fill="black"
            />
          </svg>
        </figure>

        <h3 className="md:text-2xl text-base text-gray-900 font-medium text-center">
          Thank you
        </h3>
        <h3 className="md:text-2xl text-base text-gray-900 font-medium text-center">
          Your order has been received
        </h3>
        <p className="text-gray-600 text-sm">
          You will receive an email with your download link
        </p>
        <span className="continue_shopping flex gap-1 items-center py-2 text-sm text-center">
          <Link to="/">Continue Shopping</Link>
          <svg
            width="45"
            height="18"
            viewBox="0 0 65 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18L65 18L65 16L10 16L10 18Z" fill="black" />
            <path
              d="M9 16C10.1819 16 11.3522 16.2328 12.4442 16.6851C13.5361 17.1374 14.5282 17.8003 15.364 18.636C16.1997 19.4718 16.8626 20.4639 17.3149 21.5558C17.7672 22.6478 18 23.8181 18 25L16.0178 25C16.0178 24.0784 15.8363 23.1658 15.4836 22.3144C15.1309 21.463 14.614 20.6893 13.9623 20.0377C13.3107 19.386 12.537 18.8691 11.6856 18.5164C10.8342 18.1637 9.92159 17.9822 9 17.9822L9 16Z"
              fill="black"
            />
            <path
              d="M18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18L9 16.0178C10.8612 16.0178 12.6462 15.2784 13.9623 13.9623C15.2784 12.6462 16.0178 10.8612 16.0178 9L18 9Z"
              fill="black"
            />
          </svg>
        </span>
      </section>

      <section className="order_details">
        <div className="order_details-ctr">
          <div className="order_details-header">
            <h3>Order Details</h3>
            <h3>ORDER #86S02</h3>
          </div>

          {/* <p>Order ID is {params.id.toUpperCase()}</p> */}

          <div className="order_details-info">
            <p>
              Andrei Dorin Dorin si Asociatii SRLD Str. Furtunei, 28, Bucharest
              sector 6 Romania.
            </p>
            <div className="date py-2">
              <span>March 6, 2026</span>
              <span>Payment Method: Card</span>
            </div>
            <span className="line-dotted py-2"></span>
            <div className="order_details-total">
              <div>
                <p>Total Items:</p>
                <p>8</p>
              </div>
              <div>
                <p>Subtotal:</p>
                <p>$1099</p>
              </div>
              <div>
                <p>Shipping Taxes:</p>
                <p>Free Shipping</p>
              </div>
              <div>
                <p>Order Total:</p>
                <p>$1099</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
