/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const LoginProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("role")
  if (!user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default LoginProtectedRoute;
