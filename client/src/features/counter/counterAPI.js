import axios from "axios";

const urlAPI = "http://localhost:8080";

export async function fetchCounter() {
  return await axios.get(urlAPI);
}
