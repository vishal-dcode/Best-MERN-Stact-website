// * IMPORTS
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
// * ADMIN IMPORTS
import AdminHomePage from '../features/admin/AdminHomePage';
import AdminProductFormPage from '../features/admin/AdminProductFormPage';
import AdminOrdersPage from '../features/admin/AdminOrdersPage';
// * COMPONENTS
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// * PAGES
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import CartPage from '../pages/CartPage';
import Checkout from '../pages/CheckoutPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import UserOrdersPage from '../pages/UserOrdersPage';
import PageNotFound from '../pages/PageNotFound';
// import CardPaymentPage from '../pages/CardPaymentPage';
// * CONTAINERS
import Protected from '../features/auth/containers/Protected';
import Logout from '../features/auth/containers/Logout';
// * REDUX
import { selectLoggedInUser } from '../features/auth/authSlice';
import { fetchItemsByUserIdAsync } from '../features/cart/cartSlice';
import { fetchLoggedInUserAsync } from '../features/user/userSlice';
import BlogPage from '../pages/BlogPage';

// prettier-ignore
export default  function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoginPageOrSignupPage = location.pathname === '/login' || location.pathname === '/signup';

  const userSelector = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (userSelector) {
      dispatch(fetchItemsByUserIdAsync(userSelector.id));
      dispatch(fetchLoggedInUserAsync(userSelector.id));
    }
  }, [dispatch, userSelector]);

  return (
    <div className="App">
        {!isLoginPageOrSignupPage && <Navbar />}

          <Routes>
            <Route path="/" element={<Protected><HomePage /></Protected>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<Protected><AboutPage /></Protected>} />
            <Route path="/blog" element={<Protected><BlogPage /></Protected>} />
            <Route path="/product-detail/:id" element={<Protected><ProductDetailPage /></Protected>} />
            <Route path="/cart" element={<Protected><CartPage /></Protected>} />
            <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
            <Route path="/order-success/:id" element={<Protected><OrderSuccessPage /></Protected>} />
            <Route path="/orders" element={<Protected><UserOrdersPage /></Protected>} />
            <Route path="/admin" element={<Protected><AdminHomePage /></Protected>} />
            <Route path="/admin/orders" element={<Protected><AdminOrdersPage /></Protected>} />
            <Route path="/admin/product-form" element={<Protected><AdminProductFormPage /></Protected>} />
            <Route path="/admin/product-form/edit/:id" element={<Protected><AdminProductFormPage /></Protected>} />
            {/* <Route path="/card-payment" element={<Protected><CardPaymentPage /></Protected>} */}
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

        {!isLoginPageOrSignupPage && <Footer />}
    </div>
  );
}

