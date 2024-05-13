/* eslint-disable react/prop-types */
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
    const [cookies] = useCookies([]);
    console.log(cookies);
  if (cookies?.role === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminProtectedRoute;
