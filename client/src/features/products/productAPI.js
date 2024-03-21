import axios from "axios";
import { productActions } from "./productSlice.js";

export async function fetchProducts({ dispatch, filter }) {
  if (filter) {
    const res = await axios.get("http://localhost:8080/products");
    dispatch(productActions.productDataState(res.data));
  } else {
    let queryString = "";
    for (let key in filter) {
      queryString = Object.entries(filter).map(
        ([key, value]) => `${key}=${value}`
      );
    }

    const res = await axios.get(
      `http://localhost:8080/products?${queryString}`
    );
    dispatch(productActions.productDataState(res.data));
  }
}
