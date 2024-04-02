import {Fragment} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
//* UI
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
//* REDUX
import {selectItems} from '../features/cart/cartSlice';
import {selectLoggedInUser} from '../features/auth/authSlice';

const navigation = [
  {name: 'Home', to: '/', current: false},
  {name: 'Blog', to: '/blog', current: false},
  {name: 'About us', to: '/about', current: false},
  {name: 'Your Orders', to: '/orders', current: false},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar({children}) {
  const itemsSelector = useSelector(selectItems);
  const loggedInUserSelector = useSelector(selectLoggedInUser);

  return (
    <header>
      <section className="subheader_wrapper py-3 px-4">
        <span className="uppercase hidden md:block italic">
          Not Just another MERN App But an Experience
        </span>
        <nav className="flex justify-between gap-5">
          {loggedInUserSelector && loggedInUserSelector.role === 'admin' && (
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
            <div className=" navbar_ctr px-4">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div>
                <Link to="/" className="logo flex flex-shrink-0 items-center">
                  MERN
                </Link>
              </div>
              <div>
                <div className="menu_list">
                  {navigation.map((item) => (
                    <NavLink
                      className="menu_item"
                      key={item.name}
                      to={item.to}
                      aria-current={item.current ? 'page' : undefined}>
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="profile_wrapper">
                <Link className="cart_ctr" to="/cart" type="button">
                  <svg
                    class="h-6 w-6"
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M31.9981 24.2C33.6475 24.2 35.099 23.298 35.8467 21.934L43.7198 7.656C44.5335 6.204 43.4779 4.4 41.8065 4.4H9.25856L7.19133 0H0V4.4H4.39837L12.3154 21.098L9.34653 26.466C7.74113 29.414 9.85234 33 13.1951 33H39.5853V28.6H13.1951L15.6142 24.2H31.9981ZM11.3478 8.8H38.0679L31.9981 19.8H16.5599L11.3478 8.8ZM13.1951 35.2C10.776 35.2 8.81873 37.18 8.81873 39.6C8.81873 42.02 10.776 44 13.1951 44C15.6142 44 17.5935 42.02 17.5935 39.6C17.5935 37.18 15.6142 35.2 13.1951 35.2ZM35.1869 35.2C32.7678 35.2 30.8106 37.18 30.8106 39.6C30.8106 42.02 32.7678 44 35.1869 44C37.606 44 39.5853 42.02 39.5853 39.6C39.5853 37.18 37.606 35.2 35.1869 35.2Z"
                      fill="black"
                      stroke="white"
                      stroke-width="1"
                    />
                  </svg>

                  {itemsSelector.length > 0 && (
                    <span className="items_length">{itemsSelector.length}</span>
                  )}
                </Link>

                {/* Profile dropdown */}
                <Menu as="div">
                  <div>
                    <Link to="/orders" className="profile_ctr">
                      <img
                        className="h-8 w-8"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                      <div>
                        <h4>Vishal Vishwakarma</h4>
                        <p>vishalvish4225@gmail.com</p>
                      </div>
                    </Link>
                  </div>
                </Menu>
              </div>
            </div>
          </nav>
        )}
      </Disclosure>
    </header>
  );
}
