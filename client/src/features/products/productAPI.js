import axios from "axios";
import { productActions } from "./productSlice.js";

const urlAPI = "http://localhost:8080/products";

export async function fetchAllProducts(dispatch) {
  try {
    const res = await axios.get(urlAPI);
    dispatch(productActions.productDataState(res.data));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

export async function fetchFilterProducts(dispatch, filter) {
  try {
    const queryString = Object.entries(filter).map(
      ([key, value]) => `${key}=${value}`
    );
    const res = await axios.get(`${urlAPI}?${queryString}`);
    dispatch(productActions.productDataState(res.data));
  } catch (error) {
    console.error("Error fetching filtered products:", error);
  }
}
