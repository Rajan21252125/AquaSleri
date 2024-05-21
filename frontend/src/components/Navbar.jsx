/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
  IoSearch,
  IoCartOutline,
  IoBulbOutline,
} from "react-icons/io5";
import { BsRocket } from "react-icons/bs";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { PiSquaresFour } from "react-icons/pi";
import { GrNotes } from "react-icons/gr";
import useUserDeatil from "../customHook/useUserDeatil";
import { useSelector } from "react-redux";
import useGetProduct from "../customHook/useGetProduct";
import Cart from "./Cart";
import useGetCart from "../customHook/useGetCart";
import Tooltip from "./Tootip";

const Navbar = ({ setSearchQuery }) => {
  useUserDeatil();
  useGetProduct();
  const { cart } = useGetCart();
  let cartNumber = 0;
  cart.forEach((item) => {
    cartNumber += item.quantity;
  });
  const [openCart, setOpenCart] = useState(false);
  const { user } = useSelector((state) => state.userDetail);
  const [search, setSearch] = useState(false);
  const searchRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setSearch(!search);
    setSearchText("")
    setSearchQuery("")
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (searchText === "") return setSearchQuery("")
    setSearchQuery(searchText.trim())
  };


  useEffect(() => {
    if (search) {
      searchRef.current.focus();
    }
  }, [search]);

  return (
    <>
      {/* cart popup */}
      {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
      <nav className="h-14 md:h-16 bg-gray-800 w-full">
        {/* Desktop View */}
        {search ? (
          <div className="flex justify-center items-center h-full">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchText}
                  ref={searchRef}
                  onChange={handleSearchChange}
                  className="bg-gray-600 py-1 lg:py-2 px-8 text-base rounded-lg text-white focus:outline-none w-72 md:w-96"
                  placeholder="Search for products"
                />
                <IoSearch className="absolute left-2 text-white text-base lg:text-xl" />
                <RxCross2
                  className="absolute right-2 text-white text-xl cursor-pointer"
                  onClick={toggleSearch}
                />
              </div>
          </div>
        ) : (
          <div className="flex items-center justify-between h-full mx-6 lg:mx-10 xl:mx-20">
            <div className="md:flex justify-between">
              <Link to="/">
                <img
                  src={logo}
                  alt="Navbar logo"
                  className="w-24 md:w-32 xl:w-40 bg-white px-3 py-1 rounded-lg"
                />
              </Link>
              <ul className="hidden text-white  text-[12px] xl:text-[14px] space-x-4 xl:space-x-8 ml-4 lg:ml-8 md:flex md:items-center">
                <Tooltip
                  styles = {"left-1/2 top-6"}
                  content={
                    <div className="flex flex-col space-y-2 w-40">
                      <Link
                        to={"/budgetFriendly"}
                        className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                      >
                        Budget Friendly
                      </Link>
                      <Link
                        to={"/midRange"}
                        className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                      >
                        Mid Range
                      </Link>
                      <Link
                        to={"/premium"}
                        className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                      >
                        Premium
                      </Link>
                    </div>
                  }
                >
                  <li className="cursor-pointer flex items-center">
                    Water Purifier
                  </li>
                </Tooltip>
                <Tooltip
                  styles={"left-1/2 top-6"}
                  content={
                    <div className="flex flex-col space-y-2 w-40">
                      <Link
                        to={"/solutions"}
                        className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                      >
                        Spare Parts
                      </Link>
                      <Link
                        to={"/amc"}
                        className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                      >
                        Universal Kits & Sets
                      </Link>
                    </div>
                  }
                >
                  <li className="cursor-pointer flex items-center">
                    Universal Accessories
                  </li>
                </Tooltip>
                <Link to={"/service"}>
                  <li className="cursor-pointer">Industrial & Commercial</li>
                </Link>
                <Link to={"/rainwaterHarvesting"}>
                  <li className="cursor-pointer flex items-start">
                  Rainwater Harvesting
                  </li>
                </Link>
              </ul>
            </div>
            <div className="text-white text-lg md:text-xl lg:text-2xl flex space-x-2 md:space-x-6 items-center">
              <IoSearch className="cursor-pointer" onClick={toggleSearch} />
              <div className="relative">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setOpenCart(true)}
                >
                  <IoCartOutline className="cursor-pointer" />
                  {cartNumber > 0 && (
                    <div className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px]">
                      {cartNumber}
                    </div>
                  )}
                </div>
              </div>
              {user ? (
                <Tooltip
                  styles={"-left-5 top-6"}
                  content={
                    <div className="flex flex-col space-y-2 w-28">
                      <Link
                        to={"/profile"}
                        className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                      >
                        Profile
                      </Link>
                      <Link
                        to={"/user/order"}
                        className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                      >
                        Order
                      </Link>
                    </div>
                  }
                >
                  {user?.image ? (
                    <img
                      src={user?.image}
                      alt="User"
                      className="rounded-full w-8 h-8 border border-white"
                    />
                  ) : (
                    <FaCircleUser className="rounded-full w-8 h-8 border border-white" />
                  )}
                </Tooltip>
              ) : (
                <Link to="/login">
                  <FiUser className="cursor-pointer" />
                </Link>
              )}

              <Link to={"/new"}>
                <p className="hidden md:block text-[10px] xl:text-[14px] bg-white text-black px-4 py-1 rounded-3xl font-bold hover:bg-blue-900 hover:text-white cursor-pointer transition duration-200">
                  New
                </p>
              </Link>
            </div>
          </div>
        )}
        {/* Mobile View */}
        <div className="md:hidden flex py-3 px-4 fixed bottom-0  text-black text-lg bg-gray-800 shadow-xl w-full">
          <ul className="flex space-x-4 items-center justify-evenly w-full">
            <Tooltip
              styles={"left-16 bottom-12"}
              content={
                <div className="flex flex-col space-y-2 w-40">
                  <Link
                    to={"/budgetFriendly"}
                    className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                  >
                    Budget Friendly
                  </Link>
                  <Link
                    to={"/midRange"}
                    className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                  >
                    Mid Range
                  </Link>
                  <Link
                    to={"/premium"}
                    className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                  >
                    Premium
                  </Link>
                </div>
              }
            >
              <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
                <PiSquaresFour className="text-sm sm:text-base" /> Purifier
              </li>
            </Tooltip>
            <Tooltip
              styles={"left-16 bottom-12"}
              content={
                <div className="flex flex-col space-y-2 w-40">
                  <Link
                    to={"/solutions"}
                    className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                  >
                    Spare Parts
                  </Link>
                  <Link
                    to={"/amc"}
                    className="hover:bg-gray-400 p-1 font-semibold text-base rounded"
                  >
                    Universal Kits & Sets
                  </Link>
                </div>
              }     
            >
              <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
                <IoBulbOutline className="text-sm sm:text-base" /> AMC
              </li>
            </Tooltip>
            <Link to={"/service"}>
              <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
                <HiOutlineWrenchScrewdriver className="text-sm sm:text-base" />{" "}
                Industrial
              </li>
            </Link>
            <Link to={"/rainwaterHarvesting"}>
              <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
                <GrNotes className="text-sm sm:text-base" /> Rainwater
              </li>
            </Link>
            <Link to={"/new"}>
              <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
                <BsRocket className="text-sm sm:text-base" /> New
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
