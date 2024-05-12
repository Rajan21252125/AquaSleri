/* eslint-disable no-unused-vars */
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Error from "./pages/Error";
import Loading from "./components/Loading";
import { useSelector } from "react-redux";
import useGetOfflineStatus from "./customHook/useGetOfflineStatus";
import UserPage from "./Admin/UserPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ViewForm from "./Admin/ViewForm";
import ActivationPage from "./pages/ActivationPage";
import UserProtectedRoute from "./protectedRoute/UserProtectedRoute";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Purifier = lazy(() => import("./pages/Purifier"));
const Service = lazy(() => import("./pages/Service"));
const Amc = lazy(() => import("./pages/Amc"));
const Profile = lazy(() => import("./pages/Profile"));
const DetailProductPage = lazy(() => import("./pages/DetailProductPage"));
// admin lazy load
const AdminHome = lazy(() => import("./Admin/AdminHome"));
const ProductPage = lazy(() => import("./Admin/ProductPage"));

const App = () => {
  const isOnline = useGetOfflineStatus();

  const data = useSelector((state) => state.product?.products);
  const purifier = data && data.filter((product) =>
    product.category.includes("Water Purifier")
  );
  const solution = data.filter((product) =>
    product.category.includes("Water Solution")
  );
  const newArrival = data.filter((product) =>
    product.category.includes("New Arrival")
  );

  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/purifiers"
              element={<Purifier filteredProducts={purifier} title={"Water Purifier"} />}
            />
            <Route
              path="/solutions"
              element={<Purifier filteredProducts={solution} title={"Water Solution"} />}
            />
            <Route path="/service" element={<Service />} />
            <Route
              path="/new"
              element={<Purifier filteredProducts={newArrival} title={"New Arrival"} />}
            />
            <Route path="/amc" element={<Amc />} />
            <Route path="/checkout" element={<UserProtectedRoute><CheckoutPage /></UserProtectedRoute>} />
            <Route path="/payment" element={<UserProtectedRoute><PaymentPage /></UserProtectedRoute>} />
            <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
            <Route path="/product/:id" element={<DetailProductPage />} />
            <Route path="/order/success" element={<UserProtectedRoute><OrderSuccessPage /></UserProtectedRoute>} />
            <Route path="/activation/:activation_token" element={<ActivationPage />}
        />
            <Route path="*" element={<Error />} />
            {/* admin routes */}
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/products" element={<ProductPage />} />
            <Route path="/admin/users" element={<UserPage />} />
            <Route path="/admin/form" element={<ViewForm />} />
          </Routes>
        </Suspense>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
