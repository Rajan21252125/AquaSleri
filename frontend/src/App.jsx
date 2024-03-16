import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useUserDetail from "./customHook/useUserDeatil";
import Error from "./pages/Error";
import Loading from "./components/Loading";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Purifier = lazy(() => import("./pages/Purifier"));
const WaterSolution = lazy(() => import("./pages/WaterSolution"));
const Service = lazy(() => import("./pages/Service"));
const NewArrival = lazy(() => import("./pages/NewArrival"));
const Amc = lazy(() => import("./pages/Amc"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  const token = localStorage.getItem("id");
  useUserDetail(token);

  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
      <Router>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
