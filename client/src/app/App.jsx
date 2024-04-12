// TODO
// // Remove navbar in /login
// // fix navbar
// // Fix role "admin" code
// Download helvitica semibold font
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

import {Routes, Route, useLocation} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import CartPage from '../pages/CartPage';
import Checkout from '../pages/CheckoutPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Protected from '../features/auth/containers/Protected';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectLoggedInUser} from '../features/auth/authSlice';
import {fetchItemsByUserIdAsync} from '../features/cart/cartSlice';
import PageNotFound from '../pages/PageNotFound';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import UserOrdersPage from '../pages/UserOrdersPage';
import {fetchLoggedInUserAsync} from '../features/user/userSlice';
import Logout from '../features/auth/containers/Logout';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ProtectedAdmin from '../features/auth/containers/ProtectedAdmin';
import AdminHome from '../pages/AdminHome';
import AdminProductDetailPage from '../pages/AdminProductDetailPage';
import AdminProductFormPage from '../pages/AdminProductFormPage';
import AdminOrdersPage from '../pages/AdminOrdersPage';
import {positions, Provider, transitions} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
//? Admin Pages
//? Pages
//? Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutPage from '../pages/AboutPage';
import CardPaymentPage from '../pages/CardPaymentPage';
//? Admin Features
//? Features

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
  transition: transitions.FADE,
};

// prettier-ignore
export default  function App() {
  const location = useLocation();
  const isLoginPageOrSignupPage = location.pathname === '/login' || location.pathname === '/signup';


  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...alertOptions}>
        {!isLoginPageOrSignupPage && <Navbar />}
        {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Protected><HomePage /></Protected>} />
            <Route path="/admin" element={<ProtectedAdmin><AdminHome /></ProtectedAdmin>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/cart" element={<Protected><CartPage /></Protected>} />
            <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
            <Route path="/product-detail/:id" element={<Protected><ProductDetailPage /></Protected>} />
            <Route path="/admin/product-detail/:id" element={<ProtectedAdmin><AdminProductDetailPage /></ProtectedAdmin>} />
            <Route path="/admin/product-form" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
            <Route path="/admin/orders" element={<ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>} />
            <Route path="/admin/product-form/edit/:id" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
            <Route path="/order-success/:id" element={<Protected><OrderSuccessPage /></Protected>} />
            <Route path="/orders" element={<Protected><UserOrdersPage /></Protected>} />
            <Route path="/about" element={<Protected><AboutPage /></Protected>} />
            <Route path="/card-payment" element={<CardPaymentPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          {/* <Footer /> */}
        {!isLoginPageOrSignupPage && <Footer />}
      </Provider>
    </div>
  );
}
