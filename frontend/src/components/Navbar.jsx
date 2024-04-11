import { useEffect, useRef, useState } from "react";
import {
  IoSearch,
  IoCartOutline,
  IoMicOutline,
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


const Navbar = () => {
  const token = localStorage.getItem("id");
  useUserDeatil(token);
  useGetProduct();
  const { user } = useSelector((state) => state.userDetail);
  const [search, setSearch] = useState(false);
  const searchRef = useRef(null);

  const toggleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    if (search) {
      searchRef.current.focus();
    }
  }, [search]);

  return (
    <nav className="h-14 md:h-16 bg-gray-800 w-full">
      {/* Desktop View */}
      {search ? (
        <div className="flex justify-center items-center h-full">
          <div className="relative flex justify-center items-center h-full">
            <IoSearch className="absolute left-2 text-white text-base lg:text-xl" />
            <input
              type="text"
              ref={searchRef}
              className="bg-gray-600 py-1 lg:py-2 px-8 text-base rounded-lg text-white focus:outline-none w-72 md:w-96"
              placeholder="Search for products"
            />
            <IoMicOutline className="absolute right-8 text-white text-xl" />
            <RxCross2
              className="absolute right-2 text-white text-xl cursor-pointer"
              onClick={toggleSearch}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between h-full mx-6 sm:mx-10 lg:mx-20">
          <div className="md:flex justify-between">
            <Link to="/">
              <img
                src={logo}
                alt="Navbar logo"
                className="w-24 md:w-32 bg-white/65 px-3 py-1 rounded-lg"
              />
            </Link>
            <ul className="hidden text-white text-[12px] lg:text-base xl:text-lg space-x-4 lg:space-x-8 ml-4 lg:ml-8 md:flex md:items-center">
              <Link to={"/purifiers"}>
                <li className="cursor-pointer flex items-center">
                  Water Purifier
                </li>
              </Link>
              <Link to={"/solutions"}>
                <li className="cursor-pointer flex items-center">
                  Water Solutions
                </li>
              </Link>
              <Link to={"/service"}>
                <li className="cursor-pointer">Service</li>
              </Link>
              <Link to={"/new"}>
                <li className="cursor-pointer flex items-start relative">
                  New Arrivals{" "}
                  <p className="text-red-500 absolute -top-1 -right-2 text-base lg:text-xl">
                    *
                  </p>
                </li>
              </Link>
            </ul>
          </div>
          <div className="text-white text-lg md:text-xl lg:text-2xl flex space-x-2 md:space-x-6 items-center">
            <IoSearch className="cursor-pointer" onClick={toggleSearch} />
            <Link to={"/cart"}>
              <IoCartOutline className="cursor-pointer" />
            </Link>
            {user ? (
              <Link to="/profile">
                <div className="group relative">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt=""
                    className="rounded-full w-8 h-8 border border-white"
                  />
                ) : (
                  <FaCircleUser className="rounded-full w-8 h-8 border border-white" />
                )}
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <FiUser className="cursor-pointer" />
              </Link>
            )}

            <Link to={"/amc"}>
              <p className="hidden md:block text-[14px] lg:text-base bg-white text-black px-4 py-1 rounded-3xl font-bold hover:bg-blue-900 hover:text-white cursor-pointer transition duration-200">
                Buy AMC
              </p>
            </Link>
          </div>
        </div>
      )}
      {/* Mobile View */}
      <div className="md:hidden flex py-3 px-4 fixed bottom-0  text-black text-lg bg-gray-800 shadow-xl w-full">
        <ul className="flex space-x-4 items-center justify-evenly w-full">
          <Link to={"/purifiers"}>
            <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
              <PiSquaresFour className="text-sm sm:text-base" /> Purifier
            </li>
          </Link>
          <Link to={"/solutions"}>
            <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
              <IoBulbOutline className="text-sm sm:text-base" /> Solutions
            </li>
          </Link>
          <Link to={"/service"}>
            <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
              <HiOutlineWrenchScrewdriver className="text-sm sm:text-base" />{" "}
              Service
            </li>
          </Link>
          <Link to={"/new"}>
            <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
              <BsRocket className="text-sm sm:text-base" /> New Arrivals
            </li>
          </Link>
          <Link to={"/amc"}>
            <li className="cursor-pointer relative flex flex-col items-center text-[10px] sm:text-sm font-semibold text-white hover:underline">
              <GrNotes className="text-sm sm:text-base" /> Buy AMC
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
