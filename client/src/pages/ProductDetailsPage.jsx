import ProductDetails from "../features/products/containers/ProductDetails.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../features/products/productSlice.js";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const productID = useSelector((store) => store.productName.selectedProduct);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch products with the constructed query string
      const res = await axios.get(
        `http://localhost:8080/products/${params.id}`
      );
      dispatch(productActions.selectedProductState(res.data));
    };

    fetchData();
  }, [dispatch, params.id]);

  return (
    <div>
      <ProductDetails product={productID} />
    </div>
  );
}
