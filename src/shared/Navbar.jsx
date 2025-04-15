import React, { useState } from "react";
import logo from "../images/logo.png";
import Navbutton from "./Navbutton";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "../context/AuthContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = ({ currentRoute }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const name = auth?.user?.user_Name;
  const navigate = useNavigate();

  const handleLogout = async () => {
    removeCookie("token");
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search-product?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchMobile = () => {
    if (searchQuery.trim()) {
      navigate(`/search-product?search=${encodeURIComponent(searchQuery)}`);
      toggleSearch();
    }
  };

  return (
    <nav className="bg-blue-700 border-black py-2.5 w-full">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl h-full px-4 mx-auto">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            // src={logo}
            className="h-12 w-16 mr-3"
            alt="Tuddles Logo"
          />
          <span className="self-center text-2xl font-title_font font-bold whitespace-nowrap text-white">
            Tuddles
          </span>
        </a>

        {/* Right Section */}
        <div className="flex items-center lg:order-2">
          {/* Search Button */}
          <button
            onClick={toggleSearch}
            className="lg:hidden ml-4 p-2 text-gray-400 rounded-lg hover:bg-gray-800 focus:outline-none"
            aria-expanded={isSearchOpen ? "true" : "false"}
          >
            <Icon icon="si:search-duotone" width="20" height="20" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative hidden md:block group">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <div className="flex items-center justify-center w-6 h-6 bg-white text-purple-600 rounded-full font-bold text-sm">
                {name?.substring(0, 2)?.toUpperCase() || "P"}
              </div>
              <span className="hidden sm:inline">Profile</span>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded shadow-lg z-50 hidden group-hover:block hover:block">
              <div
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </div>
              <div
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-controls="mobile-menu-2"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navbar Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } items-center justify-between bg-blue-700 z-40 w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Navbutton
                destination={"/"}
                label={"Home"}
                active={currentRoute == "home"}
              />
            </li>
            <li>
              <Navbutton
                destination={"/shop"}
                label={"Shop"}
                active={currentRoute == "shop"}
              />
            </li>
            <li>
              <Navbutton
                destination={"/vet"}
                label={"Vet"}
                active={currentRoute == "vet"}
              />
            </li>
            <li>
              <Navbutton
                destination={"/contact"}
                label={"Contact"}
                active={currentRoute == "contact"}
              />
            </li>
            <li>
              <Navbutton
                destination={"/adapt"}
                label={"Adopt"}
                active={currentRoute == "adapt"}
              />
            </li>
            <li className={`${isMobileMenuOpen ? "block" : "hidden"}`}>
              <button
                onClick={() => navigate("/dashboard")}
                className="md:hidden relative inline-flex h-9 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none my-3"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                  Profile
                </span>
              </button>
            </li>
          </ul>

          {/* Mobile Search */}
          <div className="block relative mt-4 w-full lg:hidden">
            <input
              type="text"
              className="block w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:block relative mx-4">
          <input
            type="text"
            className="block w-64 px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            onClick={handleSearch}
          >
            <Icon icon="si:search-duotone" width="20" height="20" />
          </button>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-black bg-opacity-50 z-50"
          onClick={toggleSearch}
        >
          <div className="flex justify-center items-start h-full">
            <div
              className="relative m-3 w-11/12 sm:w-96 bg-white p-4 rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Search...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearchMobile}
                className="absolute top-6 right-5 text-gray-600 hover:text-gray-800"
              >
                <Icon icon="si:search-duotone" width="20" height="20" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
