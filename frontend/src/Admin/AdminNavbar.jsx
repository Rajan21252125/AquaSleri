import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { logout } from "../api";
import { removeUser } from "../store/slice/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { BsDatabaseAdd } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Logout function
  const toggleLogout = () => {
    try {
      logout();
      dispatch(removeUser());
      localStorage.clear();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex justify-between items-center w-full">
            {/* Navbar Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/admin" className="text-white text-2xl font-semibold">
                Admin Dashboard
              </Link>
            </div>

            {/* Navbar Links */}
            <div className="hidden space-x-4 sm:-my-px sm:ml-10 sm:flex">
              <Link
                to="/admin/products"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FiHome className="mr-2 h-6 w-6 inline" />
                Products
              </Link>
              <Link
                to="/admin/users"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FiUsers className="mr-2 h-6 w-6 inline" />
                Users
              </Link>
              <Link
                to="/admin/orders"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <BsDatabaseAdd className="mr-2 h-6 w-6 inline" />
                Order Data
              </Link>
              <Link
                to="/admin/abundantCart"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <GiShoppingCart className="mr-2 h-6 w-6 inline" />
                Abundant Cart
              </Link>
              <p
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center cursor-pointer" onClick={toggleLogout}
              >
                <FiSettings className="mr-2 h-6 w-6 inline" />
                Logout
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3">
          <Link
            to="/admin/products"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Products
          </Link>
          <Link
            to="/admin/users"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Users
          </Link>
          <Link
            to="/admin/settings"
            className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
