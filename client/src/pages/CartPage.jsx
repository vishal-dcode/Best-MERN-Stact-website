import { useSelector } from "react-redux";
import Cart from "../features/cart/Cart.jsx";
export default function CartPage() {
  const products = useSelector((state) => state.cartsName.carts);
  // const products = useSelector((state) => state.productName.selectedProduct);
  console.log(products);

  return (
    <div>
      <Cart products={products} />
    </div>
  );
}
