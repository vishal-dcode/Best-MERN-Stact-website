import { Routes, Route } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import CartPage from "../pages/CartPage.jsx";
import Checkout from "../pages/Checkout.jsx";
import ProductDetailsPage from "../pages/ProductDetailsPage.jsx";

import Protected from "../features/auth/containers/Protected.jsx";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCartByUserAsync } from "../features/cart/cartSlice.js";
function App() {
  // const dispatch = useDispatch();
  // const productID = useSelector((store) => store.productName.selectedProduct);
  // useEffect(() => {
  //   if (productID) {
  //     dispatch(fetchCartByUserAsync(productID.id));
  //   }
  // }, [dispatch, productID]);

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
              <Checkout />
            </Protected>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Protected>
              <ProductDetailsPage />
            </Protected>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
