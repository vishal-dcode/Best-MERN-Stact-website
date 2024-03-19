import axios from "axios";

const urlAPI = "http://localhost:8080";

export async function fetchAuth() {
  return await axios.get(urlAPI);
}
