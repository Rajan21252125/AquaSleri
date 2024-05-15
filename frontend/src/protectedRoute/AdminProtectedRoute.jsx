/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const role = localStorage.getItem("role")
  if (role === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminProtectedRoute;
