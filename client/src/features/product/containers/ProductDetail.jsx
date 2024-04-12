import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductByIdAsync, selectProductById} from '../productSlice';
import {useParams, Link} from 'react-router-dom';
import {addToCartAsync, selectItems} from '../../cart/cartSlice';
import {selectLoggedInUser} from '../../auth/authSlice';
import {discountedPrice} from '../../../app/constants';
import {useAlert} from 'react-alert';

export default function ProductDetail() {
  const user = useSelector(selectLoggedInUser);
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      console.log({items, product});
      const newItem = {
        product: product.id,
        quantity: 1,
        user: user.id,
      };
      dispatch(addToCartAsync(newItem));
      // TODO: it will be based on server response of backend
      alert.success('Item added to Cart');
    } else {
      alert.error('Item Already added');
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      {product && (
        <main className="product_detail-wrapper">
          {/* Image gallery */}
          <section className="product_images-wrapper">
            <div className="product_images-ctr">
              <figure className="product_thumbnail">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </figure>
              <div className="product_images">
                <figure className="product_images-1">
                  <img
                    src={product.images[1]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>
                <figure className="product_images-2">
                  <img
                    src={product.images[2]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>
                <figure className="product_images-3">
                  <img
                    src={product.images[3]}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>
              </div>
            </div>
          </section>

          {/* Product info */}
          <section className="product_info-wrapper">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb-wrapper whitespace-nowrap flex items-center gap-2 uppercase">
                <li>
                  <Link
                    className="breadcrumb-go_back uppercase flex items-center gap-1"
                    to="/">
                    <figure>
                      <svg
                        width="60"
                        height="20"
                        viewBox="0 0 65 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 18L65 18L65 16L10 16L10 18Z"
                          fill="black"
                        />
                        <path
                          d="M9 16C10.1819 16 11.3522 16.2328 12.4442 16.6851C13.5361 17.1374 14.5282 17.8003 15.364 18.636C16.1997 19.4718 16.8626 20.4639 17.3149 21.5558C17.7672 22.6478 18 23.8181 18 25L16.0178 25C16.0178 24.0784 15.8363 23.1658 15.4836 22.3144C15.1309 21.463 14.614 20.6893 13.9623 20.0377C13.3107 19.386 12.537 18.8691 11.6856 18.5164C10.8342 18.1637 9.92159 17.9822 9 17.9822L9 16Z"
                          fill="black"
                        />
                        <path
                          d="M18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18L9 16.0178C10.8612 16.0178 12.6462 15.2784 13.9623 13.9623C15.2784 12.6462 16.0178 10.8612 16.0178 9L18 9Z"
                          fill="black"
                        />
                      </svg>
                    </figure>
                    GO BACK
                  </Link>
                </li>
                <li className="breadcrumb-items flex items-center gap-1">
                  <p className="">{product.category}</p>
                  <span>/</span>
                  <p className="">{product.brand}</p>
                </li>
              </ol>
            </nav>

            <div className="product_info-ctr">
              <h1 className="product_title">{product.title}</h1>

              <div className="product_rating-ctr">
                <div className="product_rating">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.2829 16C12.083 16 11.883 15.9304 11.7163 15.8261L8.01679 13.4609L4.31723 15.8261C3.9506 16.0696 3.48402 16.0348 3.11739 15.7913C2.75076 15.513 2.58413 15.0609 2.68412 14.6087L3.68399 10.1913L0.384376 7.23479C0.051087 6.92176 -0.0822286 6.46958 0.051087 6.01739C0.184403 5.56521 0.551031 5.28697 0.984296 5.25218L5.35043 4.86956L7.01688 0.695651C7.18352 0.278261 7.58346 0 8.01675 0C8.45003 0 8.84996 0.278261 9.01661 0.695651L10.6831 4.86956L15.0157 5.25218C15.449 5.28696 15.8156 5.6 15.9489 6.01739C16.0822 6.46956 15.9489 6.92174 15.6156 7.23479L12.3495 10.1913L13.3494 14.6087C13.4494 15.0609 13.2827 15.513 12.9161 15.7913C12.7495 15.9304 12.5162 16 12.2829 16Z"
                      fill="#FF9325"
                    />
                  </svg>

                  <div className="flex items-center">
                    <p>{Math.round(product.rating * 10) / 10} / 5</p>
                  </div>
                </div>
                <span>
                  <svg
                    width="7"
                    height="7"
                    viewBox="0 0 7 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#737373" />
                  </svg>
                </span>
                {product.stock === 0 ? (
                  <div className="product_stocks">
                    <p>Out of Stock</p>
                  </div>
                ) : (
                  <div className="product_stocks">
                    <p>Stocks {product.stock}</p>
                  </div>
                )}
              </div>
              {/* Description */}
              <div className="product_description">
                <p>{product.description}</p>
              </div>

              {/* Price */}
              <div className="product_price-ctr">
                <h3 className="">${discountedPrice(product)}</h3>
                <div>
                  <p>
                    M.R.P.:{' '}
                    <span className="line-through">${product.price}</span>
                  </p>
                  <span>/</span>
                  <p>-{Math.round(product.discountPercentage * 10) / 10}%</p>
                </div>
              </div>

              {/* Mern Features */}
              <div className="purchase_feature-wrapper text-center">
                <p>
                  7 days <br /> Replacement
                </p>
                <span className="horizontal-line"></span>
                <p>
                  Free <br /> Delivery
                </p>
                <span className="horizontal-line"></span>
                <p>
                  Warranty <br /> Policy
                </p>
                <span className="horizontal-line"></span>
                <p>
                  Worldwide <br /> Shipping
                </p>
              </div>

              <div className="product_category">
                <p className="">
                  Delivered by - <span>Mern</span>
                </p>
                <p>
                  {' '}
                  Sold by - <span>{product.brand}</span>
                </p>
              </div>
              <button
                onClick={handleCart}
                type="submit"
                className="btn primary-btn">
                Add to Cart
              </button>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"></div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
