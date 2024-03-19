import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "./counterSlice.js";

export default function CounterList() {
  const dispatch = useDispatch();
  const value = useSelector((store) => store.authRedux);

  return (
    <div>
      <button>Counter</button>
    </div>
  );
}
