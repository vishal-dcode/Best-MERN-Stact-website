import ProductDetails from "../features/products/containers/ProductDetails.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductByIdAsync } from "../features/products/productSlice.js";
import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const productID = useSelector((store) => store.productName.selectedProduct);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchProductByIdAsync({ id: params.id }));
  }, [dispatch, params.id]);

  return (
    <div>
      <ProductDetails productID={productID} dispatch={dispatch} />
    </div>
  );
}
