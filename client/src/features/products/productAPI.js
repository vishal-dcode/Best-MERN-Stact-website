import axios from "axios";

export async function fetchProducts(pagination, filter, sort) {
  let queryString = "";
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (let key in filter) {
    const value = filter[key];
    if (value.length) {
      const lastValue = value[value.length - 1];
      queryString += `${key}=${lastValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  const res = await axios.get(`http://localhost:8080/products?${queryString}`);
  return res.data;
}

export async function fetchProductById(id) {
  const res = await axios.get(`http://localhost:8080/products/${id}`);
  return res.data;
}
