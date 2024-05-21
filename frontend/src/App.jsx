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
import AdminProtectedRoute from "./protectedRoute/AdminProtectedRoute";
import AdminUserCart from "./Admin/AdminUserCart";
import OrderPage from "./pages/OrderPage";
import AllOrders from "./Admin/AllOrders";
import DetailedOrderPage from "./pages/DetailedOrderPage";
import CategoryPage from "./pages/CategoryPage";
import { categories , harvesting } from "./constant/data";

// Lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const Purifier = lazy(() => import("./pages/Purifier"));
const Profile = lazy(() => import("./pages/Profile"));
const DetailProductPage = lazy(() => import("./pages/DetailProductPage"));
// admin lazy load
const AdminHome = lazy(() => import("./Admin/AdminHome"));
const ProductPage = lazy(() => import("./Admin/ProductPage"));

const App = () => {
  const isOnline = useGetOfflineStatus();

  const data = useSelector((state) => state.product?.products);
  const premiumPurifier = data && data.filter((product) =>
    product.category.includes("Water Purifier - Premium")
  );
  const midRangePurifier = data && data.filter((product) =>
    product.category.includes("Water Purifier - Mid Range")
  );
  const budgetFriendlypurifier = data && data.filter((product) =>
    product.category.includes("Water Purifier - Budget Friendly")
  );
  const spare = data.filter((product) =>
    product.category.includes("Spare Parts")
  );
  const kitsSets = data.filter((product) =>
    product.category.includes("Universal Kits & sets")
  );
  const newArrival = data.filter((product) =>
    product.category.includes("New Arrivals")
  );


  return (
    <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/budgetFriendly"
              element={<Purifier filteredProducts={budgetFriendlypurifier} title={"Water Purifier - Budget Friendly"} />}
            />
            <Route
              path="/midRange"
              element={<Purifier filteredProducts={midRangePurifier} title={"Water Purifier - Mid Range"} />}
            />
            <Route
              path="/premium"
              element={<Purifier filteredProducts={premiumPurifier} title={"Water Purifier - Premium"} />}
            />
            <Route
              path="/solutions"
              element={<Purifier filteredProducts={spare} title={"Spare Parts - Water Solution"} />}
            />
            <Route path="/service" element={<CategoryPage categories={categories} title={"Industrial & Commercial"}/>} />
            <Route path="/rainwaterHarvesting" element={<CategoryPage categories={harvesting} title={"Rainwater Harvesting"}/>} />
            <Route
              path="/new"
              element={<Purifier filteredProducts={newArrival} title={"New Arrival"} />}
            />
            <Route path="/amc" element={<Purifier filteredProducts={kitsSets} title={"AMC Kit & Sets"}/>} />
            <Route path="/checkout" element={<UserProtectedRoute><CheckoutPage /></UserProtectedRoute>} />
            <Route path="/payment" element={<UserProtectedRoute><PaymentPage /></UserProtectedRoute>} />
            <Route path="/profile" element={<UserProtectedRoute><Profile /></UserProtectedRoute>} />
            <Route path="/product/:id" element={<DetailProductPage />} />
            <Route path="/order/success" element={<UserProtectedRoute><OrderSuccessPage /></UserProtectedRoute>} />
            <Route path="/user/order" element={<UserProtectedRoute><OrderPage /></UserProtectedRoute>} />
            <Route path="/user/order/:id" element={<UserProtectedRoute><DetailedOrderPage /></UserProtectedRoute>} />
            <Route path="/activation/:activation_token" element={<ActivationPage />}
        />
            <Route path="*" element={<Error />} />
            {/* admin routes */}
            <Route path="/admin" element={<AdminProtectedRoute><AdminHome /></AdminProtectedRoute>} />
            <Route path="/admin/products" element={<AdminProtectedRoute><ProductPage /></AdminProtectedRoute>} />
            <Route path="/admin/users" element={<AdminProtectedRoute><UserPage /></AdminProtectedRoute>} />
            <Route path="/admin/form" element={<AdminProtectedRoute><ViewForm /></AdminProtectedRoute>} />
            <Route path="/admin/abundantCart" element={<AdminProtectedRoute><AdminUserCart /></AdminProtectedRoute>} />
            <Route path="/admin/orders" element={<AdminProtectedRoute><AllOrders /></AdminProtectedRoute>} />
          </Routes>
        </Suspense>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
