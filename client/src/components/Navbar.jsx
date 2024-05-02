import {Link, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
//* UI
import {Disclosure, Menu} from '@headlessui/react';
//* REDUX
import {selectItems} from '../features/cart/cartSlice';
import {selectLoggedInUser} from '../features/auth/authSlice';

const navigation = [
  {name: 'Home', to: '/', current: false},
  {name: 'Blog', to: '/blog', current: false},
  {name: 'About us', to: '/about', current: false},
  {name: 'Your Orders', to: '/orders', current: false},
];

export default function NavBar() {
  const items = useSelector(selectItems);
  const user = useSelector(selectLoggedInUser);
  // console.log(user);
  return (
    <header>
      <section className="subheader_wrapper py-3 px-4">
        <div>
          <span className="uppercase hidden md:block italic">
            Not Just another MERN App But an Experience
          </span>
        </div>
        <nav className="flex justify-between gap-5">
          {user && user.role === 'Admin' && (
            <div className="flex gap-5">
              <NavLink className="link" to="/admin">
                Admin Panel
              </NavLink>
              <NavLink className="link" to="/admin/product-form">
                Add Products
              </NavLink>
              <NavLink className="link" to="/admin/orders">
                Orders
              </NavLink>
            </div>
          )}
          <Link className="link_signout" to="/logout">
            Signout
          </Link>
        </nav>
      </section>
      <Disclosure as="nav">
        {({open}) => (
          <nav className="navbar_wrapper">
            <div className="navbar_ctr">
              <div className="logo_ctr">
                <Link
                  to="/"
                  className="logo pl-4 flex flex-shrink-0 items-center">
                  MERN
                </Link>
              </div>
              <div className="px-4 hidden sm:block">
                <div className="menu_list">
                  {navigation.map((item, idx) => (
                    <NavLink className="menu_item" key={idx} to={item.to}>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="profile_wrapper">
                <Link className="cart_ctr" to="/cart" type="button">
                  <svg
                    className="h-6 w-6"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M31.9981 24.2C33.6475 24.2 35.099 23.298 35.8467 21.934L43.7198 7.656C44.5335 6.204 43.4779 4.4 41.8065 4.4H9.25856L7.19133 0H0V4.4H4.39837L12.3154 21.098L9.34653 26.466C7.74113 29.414 9.85234 33 13.1951 33H39.5853V28.6H13.1951L15.6142 24.2H31.9981ZM11.3478 8.8H38.0679L31.9981 19.8H16.5599L11.3478 8.8ZM13.1951 35.2C10.776 35.2 8.81873 37.18 8.81873 39.6C8.81873 42.02 10.776 44 13.1951 44C15.6142 44 17.5935 42.02 17.5935 39.6C17.5935 37.18 15.6142 35.2 13.1951 35.2ZM35.1869 35.2C32.7678 35.2 30.8106 37.18 30.8106 39.6C30.8106 42.02 32.7678 44 35.1869 44C37.606 44 39.5853 42.02 39.5853 39.6C39.5853 37.18 37.606 35.2 35.1869 35.2Z"
                      fill="black"
                      stroke="white"
                      strokeWidth="1"
                    />
                  </svg>

                  {items.length > 0 && (
                    <span className="items_length">{items.length}</span>
                  )}
                </Link>

                {/* Profile dropdown */}
                <Menu as="div">
                  <div className="pr-4 md:pr-0">
                    <Link to="/orders" className="profile_ctr">
                      <figure className="h-8 w-8 profile_pic">
                        {user && user.profilePic ? (
                          <img src={user.profilePic} alt="Profile Pic" />
                        ) : (
                          <svg
                            width="50"
                            height="50"
                            viewBox="0 0 200 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_325_1001)">
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M120 0H80V51.7157L43.4315 15.1472L15.1472 43.4314L51.7158 80H0V120H51.7157L15.1472 156.568L43.4315 184.853L80 148.284V200H120V148.284L156.569 184.853L184.853 156.569L148.284 120H200V80H148.284L184.853 43.4314L156.569 15.1471L120 51.7157V0Z"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_325_1001">
                                <rect width="200" height="200" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                      </figure>

                      <div className="hidden md:grid pr-4">
                        <h4 className="leading-none">
                          {user && user.userName ? user.userName : 'New User'}
                        </h4>
                        <p>
                          {user && user.email
                            ? user.email
                            : 'Email-ID Not Found'}
                        </p>
                      </div>
                    </Link>
                  </div>
                </Menu>
                <div className="hamburger flex items-center sm:hidden">
                  {/* //! Mobile menu button*/}
                  <Disclosure.Button className="pr-4">
                    {open ? (
                      <svg
                        className="rotate-45"
                        width="18"
                        height="18"
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
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 84 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 0C2.2386 0 0 2.2385 0 5C0 7.76149 2.2386 10 5 10H79C81.7614 10 84 7.76149 84 5C84 2.2385 81.7614 0 79 0H5ZM5 27C2.2386 27 0 29.2385 0 32C0 34.7615 2.2386 37 5 37H79C81.7614 37 84 34.7615 84 32C84 29.2385 81.7614 27 79 27H5ZM5 54C2.2386 54 0 56.2385 0 59C0 61.7615 2.2386 64 5 64H79C81.7614 64 84 61.7615 84 59C84 56.2385 81.7614 54 79 54H5Z"
                          fill="black"
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </nav>
        )}
      </Disclosure>
    </header>
  );
}
