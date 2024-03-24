import axios from "axios";

export async function addCart() {
  const res = await axios.post(`http://localhost:8080/carts`);
  console.log("cartAPI", res.data);
  return res.data;
}

// export async function fetchCartByUser(userId) {
//   const res = await fetch("http://localhost:8080/carts?users=" + userId);
//   const data = await res.json();
//   return data;
// }
// export async function updateCart(update) {
//   const res = await axios.patch("http://localhost:8080/carts/" + update.id);
//   return res.data;
// }
// export async function removeCart(itemId) {
//   const res = await axios.delete("http://localhost:8080/carts/" + itemId);
//   return res.data;
// }
