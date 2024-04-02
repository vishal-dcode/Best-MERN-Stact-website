// TODO
// // Remove navbar in /login
// // fix navbar
// // Fix role "admin" code
// add Modal confirmations for delete
// Add multiple dummy ids
// Fix the sidebar so that it doesn't overflow
// // Fix Pagination
// Fix Sorting
// Add a timer to OrderSuccess page that automatically sends user to HomePage
// Add my profile with changing pic in my order section
// Add address delete button in checkout
// Create blog page in this
// Create dark theme and light theme
// Use NODE multermeter ware to upload thumbnail and images in AddProducts

import {useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {positions, transitions, Provider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

//? Components
import Header from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
// import Loader from "../components/Loader.jsx";
//? Pages
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import ProductDetailPage from '../pages/ProductDetailPage.jsx';
import CheckoutPage from '../pages/CheckoutPage.jsx';
import CartPage from '../pages/CartPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import PageNotFound from '../pages/PageNotFound.jsx';
import UserOrderPage from '../pages/UserOrderPage.jsx';
//? Features
import Protected from '../features/auth/containers/Protected.jsx';
import {fetchItemsByUserIdAsync} from '../features/cart/cartSlice.js';
import {selectLoggedInUser} from '../features/auth/authSlice.js';
import OrderSuccess from '../pages/OrderSuccess.jsx';
import Logout from '../features/auth/containers/Logout.jsx';
//? Admin Pages
import AdminHomePage from '../pages/AdminHomePage.jsx';
import AdminProductDetailPage from '../pages/AdminProductDetailPage.jsx';
//? Admin Features
import AddProduct from '../adminFeatures/productPanel/containers/AddProduct.jsx';
import AdminOrderPanel from '../adminFeatures/orderPanel/AdminOrderPanel.jsx';

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.FADE,
};

// prettier-ignore
export default function App() {
  const location = useLocation();
  const isLoginPageOrSignupPage = location.pathname === '/login' || location.pathname === '/signup';

  const dispatch = useDispatch();
  const loggedInUserSelector = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (loggedInUserSelector) {
      dispatch(fetchItemsByUserIdAsync(loggedInUserSelector.id));
    }
  }, [dispatch, loggedInUserSelector]);

  return (
    <>
      <Provider template={AlertTemplate} {...alertOptions}>
        {!isLoginPageOrSignupPage && <Header />}

        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<><HomePage /></>} />
            <Route path="/about" element={<Protected><AboutPage /></Protected>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/orders" element={<Protected><UserOrderPage /></Protected>} />
            <Route path="/cart" element={<Protected><CartPage /></Protected>} />
            <Route path="/checkout" element={<Protected><CheckoutPage /></Protected>} />
            <Route path="/product-detail/:id" element={<Protected><ProductDetailPage /></Protected>} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />

            <Route path="/admin" element={<Protected><AdminHomePage /></Protected>} />
            <Route path="/admin/product-form" element={<Protected><AddProduct /></Protected>} />
            <Route path="/admin/orders" element={<Protected><AdminOrderPanel /></Protected>} />
            <Route path="/admin/product-detail/edit/:id" element={<Protected><AddProduct /></Protected>} />
            <Route path="/admin/product-form/edit/:id" element={<Protected><AddProduct /></Protected>} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>

        {!isLoginPageOrSignupPage && <Footer />}
      </Provider>
    </>
  );
}
