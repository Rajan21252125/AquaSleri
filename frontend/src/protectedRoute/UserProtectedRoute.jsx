/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("role")
  if (user === "user") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProtectedRoute;
