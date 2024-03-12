import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Purifier from "./pages/Purifier";
import WaterSolution from "./pages/WaterSolution";
import Service from "./pages/Service";
import NewArrival from "./pages/NewArrival";
import Amc from "./pages/Amc";
import Cart from "./pages/Cart";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useUserDeatil from "./customHook/useUserDeatil";
import Error from "./pages/Error";
import Profile from "./pages/Profile";

const App = () => {
  const token = localStorage.getItem("id");
  useUserDeatil(token);
  return (
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/purifiers" element={<Purifier />} />
            <Route path="/solutions" element={<WaterSolution />} />
            <Route path="/service" element={<Service />} />
            <Route path="/new" element={<NewArrival />} />
            <Route path="/amc" element={<Amc />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
  );
};

export default App;
