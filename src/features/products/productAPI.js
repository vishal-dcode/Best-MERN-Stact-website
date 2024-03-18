import axios from "axios";

const urlAPI = "http://localhost:8080";

export async function fetchProducts() {
  return await axios.get(urlAPI);
}
