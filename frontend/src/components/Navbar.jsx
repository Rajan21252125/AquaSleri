import { useEffect, useRef, useState } from "react";
import { NAVBAR_IMG } from "../constant/image";
import { IoSearch, IoCartOutline , IoMicOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Arrow from "../Styles/Arrow";
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const searchRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setSearch(!search);
  };

  useEffect(() => {
    if (search) {
      searchRef.current.focus();
    }
  },[search])

  return (
    <nav className="h-10 md:h-16 bg-gray-800 w-full">
      {/* Desktop  View */}
      {search ? (
        <div className="flex justify-center items-center h-full">
          <div className="relative flex justify-center items-center h-full">
            <IoSearch className="absolute left-2 text-white text-xl"/>
          <input
            type="text"
            ref={searchRef}
            className="bg-gray-600 py-2 px-8 text-base rounded-lg text-white focus:outline-none w-72 md:w-96"
            placeholder="Search for products"
          />
          <IoMicOutline className="absolute right-8 text-white text-xl"/>
          <RxCross2
            className="absolute right-2 text-white text-xl cursor-pointer"
            onClick={toggleSearch}
          />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between h-full mx-6 sm:mx-10 md:mx-24 lg:mx-32">
          <div className="lg:flex justify-between">
            <img
              src={NAVBAR_IMG}
              alt="Navbar logo"
              className="w-24 md:w-auto"
            />
            <ul className="hidden text-white text-xl space-x-10 ml-10 lg:flex">
              <div className="group relative">
                <li className="cursor-pointer flex items-center">
                  Products <Arrow />
                </li>
                <DropdownMenu />
              </div>
              <li className="cursor-pointer">Service</li>
              <li className="cursor-pointer flex items-start">
                New Arrivals <p className="ml-1 text-red-500 text-xl">*</p>
              </li>
            </ul>
          </div>
          <div className="text-white text-lg md:text-2xl flex space-x-2 md:space-x-6 items-center">
            <IoSearch className="cursor-pointer" onClick={toggleSearch} />
            <IoCartOutline className="cursor-pointer" />
            <FiUser className="cursor-pointer" />
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-white text-lg md:text-3xl focus:outline-none"
              >
                &#8801;
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile View */}
      {isOpen && (
        <div className="lg:hidden text-black text-lg sm:text-xl bg-gray-600/65 p-10 w-full">
          <ul className="space-y-4">
            <li className="cursor-pointer group relative font-semibold text-white hover:underline flex">
              Products <MdOutlineKeyboardArrowDown className="text-3xl" />
              <DropdownMenu />
            </li>
            <li className="cursor-pointer font-semibold text-white hover:underline">
              Service
            </li>
            <li className="cursor-pointer font-semibold text-white hover:underline flex">
              New Arrivals <p className="ml-1 text-red-500 text-xl">*</p>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
