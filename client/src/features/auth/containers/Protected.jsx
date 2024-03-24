import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const user = useSelector((store) => store.usersName.users);

  if (!user) {
    // if (user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
