/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
    const [cookies] = useCookies([]);
  if (cookies?.token !== undefined) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProtectedRoute;
