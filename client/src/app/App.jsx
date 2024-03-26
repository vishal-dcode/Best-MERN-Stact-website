// TODO
// Remove navbar in /login
// Add multiple dummy ids
// make dataJson order correctly
// Fix the sidebar so that it doesn't overflow
// Fix Pagination
// Fix Sorting
// Add my profile with changing pic in my order section
// Add address delete button in checkout
// Create blog page in this
// Create dark theme and light theme
// Use NODE multermeter ware to upload thumbnail and images in AddProducts
//

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//? Components
import Header from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
// import Loader from "../components/Loader.jsx";
//? Pages
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import ProductDetailPage from "../pages/ProductDetailPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import CartPage from "../pages/CartPage.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import UserOrderPage from "../pages/UserOrderPage.jsx";
//? Features
import Protected from "../features/auth/containers/Protected.jsx";
import { fetchItemsByUserIdAsync } from "../features/cart/cartSlice.js";
import { selectLoggedInUser } from "../features/auth/authSlice.js";
import OrderSuccess from "../pages/OrderSuccess.jsx";
import Logout from "../features/auth/containers/Logout.jsx";
//? Admin Pages
import AdminHomePage from "../pages/AdminHomePage.jsx";
import AdminProductDetailPage from "../pages/AdminProductDetailPage.jsx";
//? Admin Features
import AdminProtected from "../features/auth/containers/AdminProtected.jsx";
import AddProduct from "../adminFeatures/productPanel/containers/AddProduct.jsx";
import AdminOrderPanel from "../adminFeatures/orderPanel/AdminOrderPanel.jsx";

export default function App() {
  const dispatch = useDispatch();
  const loggedInUserSelector = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (loggedInUserSelector) {
      dispatch(fetchItemsByUserIdAsync(loggedInUserSelector.id));
    }
  }, [dispatch, loggedInUserSelector]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <AdminHomePage />
            </AdminProtected>
          }
        />

        <Route
          path="/admin/product-form"
          element={
            <AdminProtected>
              <AddProduct />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminProtected>
              <AdminOrderPanel />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/product-detail/edit/:id"
          element={
            <AdminProtected>
              <AddProduct />
            </AdminProtected>
          }
        />
        <Route
          path="/admin/product-form/edit/:id"
          element={
            <AdminProtected>
              <AddProduct />
            </AdminProtected>
          }
        />
        <Route
          path="/about"
          element={
            <Protected>
              <AboutPage />
            </Protected>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/orders"
          element={
            <Protected>
              <UserOrderPage />
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected>
              <CheckoutPage />
            </Protected>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Protected>
              <ProductDetailPage />
            </Protected>
          }
        />
        <Route path="/contactus" element={<ContactUs />} />
        <Route
          path="/logout"
          element={
            <Protected>
              <Logout />
            </Protected>
          }
        />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
