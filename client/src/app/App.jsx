// * IMPORTS
import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Protected from '../features/auth/containers/Protected';
import Logout from '../features/auth/containers/Logout';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { fetchItemsByUserIdAsync } from '../features/cart/cartSlice';
import { fetchLoggedInUserAsync } from '../features/user/userSlice';

// * ADMIN PAGES (LAZY)
const AdminHomePage = lazy(() => import('../features/admin/AdminHomePage'));
const AdminProductFormPage = lazy(() => import('../features/admin/AdminProductFormPage'));
const AdminOrdersPage = lazy(() => import('../features/admin/AdminOrdersPage'));

// * PAGES (LAZY)
const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const Checkout = lazy(() => import('../pages/CheckoutPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const OrderSuccessPage = lazy(() => import('../pages/OrderSuccessPage'));
const UserOrdersPage = lazy(() => import('../pages/UserOrdersPage'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const BlogPage = lazy(() => import('../pages/BlogPage'));

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

          <Suspense fallback={<Loader />}>
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
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>

        {!isLoginPageOrSignupPage && <Footer />}
    </div>
  );
}

