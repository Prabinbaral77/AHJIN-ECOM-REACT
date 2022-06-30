import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
  CashIcon,
  CogIcon,
  UserRemoveIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [userInfo, setuserInfo] = useState(false);
  const [nav, setNav] = useState(false);
  const cartProductDetails = useSelector((state) => state.products).cart;
  const isUserPresent = JSON.parse(localStorage.getItem("isUserPresent"));
  const [products, setProducts] = useState([]);
  const [searchInput, setsearchInput] = useState("");

  const logOutHandler = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("isUserPresent");
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://0.0.0.0:8000/api/products/");
      setProducts(res.data);
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter((m) => {
    return m.name.toLowerCase().includes(searchInput.toLowerCase());
  });
  return (
    <nav className=" w-full sticky top-0 z-50 select-none  bg-gray-800 text-gray-100 shadow-md h-14 flex items-center justify-between px-4 ">
      <Link to="/">
        <p className="text-2xl font-mono text-yellow-600 hover:opacity-80 cursor-pointer ml-6 ">
          AHJIN
        </p>
      </Link>
      <div className="flex items-center border border-gray-500 shadow-sm shadow-gray-100 rounded-lg px-3 md:w-[700px] w-[500px] mx-3 h-[60%]">
        <input
          type="text"
          placeholder="Search"
          className="outline-none bg-transparent flex-1 text-gray-100 px-2"
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />
        <SearchIcon className="h-4 w-4 text-gray-100" />
      </div>
      <section className="hidden md:flex space-x-10 items-center">
        <ul className="text-xs text-cyan-600 flex items-center space-x-10">
          <Link
            to="/categories/electronics"
            className="relative flex flex-col items-center justify-center h-14 cursor-pointer "
          >
            <li>Electronics</li>
          </Link>
          <Link
            to="/categories/clothes"
            className="relative flex flex-col items-center justify-center h-14 cursor-pointer"
          >
            <li>Clothes</li>
          </Link>
          <div className="relative flex flex-col items-center justify-center h-14 cursor-pointer">
            <li>Others</li>
          </div>

          {!isUserPresent ? (
            <div className="flex items-center space-x-10">
              <Link
                className="text-cyan-600 hover:text-cyan-700 transition-colors"
                to="/register"
              >
                Register
              </Link>
              <Link
                className="text-cyan-600 hover:text-cyan-700 transition-colors"
                to="/login"
              >
                Login
              </Link>
            </div>
          ) : (
            <div
              onMouseLeave={() => setuserInfo(false)}
              onMouseEnter={() => setuserInfo(true)}
              className="flex items-center space-x-1 cursor-pointer pt-3  p-2 rounded-full "
            >
              <div className="h-10 w-10 relative ">
                <img
                  src={`https://avatars.dicebear.com/api/adventurer/sankalpa.svg`}
                  className=" rounded-full bg-black hover:opacity-80 object-cover"
                  alt="product"
                />
              </div>

              {userInfo && (
                <Fade>
                  <div className="bg-gray-900 shadow-lg  z-[100] h-auto w-[13rem] text-gray-100  py-8 px-4 absolute top-10 right-6">
                    <ul className="flex flex-col justify-center space-y-4">
                      <div
                        className="flex items-center space-x-2 hover:bg-yellow-600 px-2 py-1 transition-all"
                        //  onClick={connectWalletHandler}
                      >
                        <CashIcon className="h-6 w-6 cursor-pointer text-gray-100" />
                        <p>Connect Wallet</p>
                      </div>

                      <Link
                        to="/product/cart"
                        className="flex hover:bg-yellow-600 transition-all px-2 py-1 items-center space-x-2"
                      >
                        <ShoppingCartIcon
                          to="/product/cart"
                          className="h-6 w-6 cursor-pointer text-gray-100"
                        />

                        <p className="">Cart ({cartProductDetails.length})</p>
                      </Link>
                      <Link
                        className="flex items-center space-x-2 hover:bg-yellow-600 transition-all px-2 py-2"
                        to="/account"
                      >
                        <CogIcon className="h-6 w-6 cursor-pointer text-gray-100" />
                        <p>Account Settings</p>
                      </Link>
                      <Link
                        className="flex items-center space-x-2 hover:bg-yellow-600 transition-all px-2 py-2"
                        to="/admin"
                      >
                        <UsersIcon className="h-6 w-6 cursor-pointer text-gray-100" />
                        <p>Admin</p>
                      </Link>
                      <div
                        className="flex items-center space-x-2 hover:bg-yellow-600 transition-all px-2 py-2"
                        onClick={logOutHandler}
                      >
                        <UserRemoveIcon className="h-6 w-6 cursor-pointer text-gray-100" />
                        <p>Logout</p>
                      </div>
                    </ul>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </ul>
      </section>
      {searchInput && (
        <div
          className={`h-auto lg:w-[500px] w-[300px] bg-gray-600 shadow-md absolute lg:left-[25%] left-[15%] top-14 rounded-b-md transition-all duration-500 ease-in-out delay-700 z-50 ${
            filteredProducts.length !== 0 ? "flex" : "hidden"
          } flex-col lg:space-y-2 space-y-1 py-4 px-4 text-sm`}
        >
          {filteredProducts.slice(0, 8).map((m) => (
            <Link to={`/product/${m.id}`}>
              <p
                onClick={() => setsearchInput("")}
                className="hover:bg-red-600 px-2 py-3 rounded-sm transition-colors duration-300 ease-out cursor-pointer font-light"
              >
                {m.name}
              </p>
            </Link>
          ))}
        </div>
      )}
      <MenuIcon
        //  onClick={handleNavClick}
        className="h-10 w-10 cursor-pointer text-gray-100 md:hidden "
      />
      {nav && (
        <div className="md:hidden h-screen w-full z-50 fixed bg-black/70 left-0 top-0">
          <div className="  fixed top-14 left-0 w-3/4 flex justify-between  bg-gray-800 rounded-md h-full py-4  px-4 ease-in duration-500 transition-all">
            <ul className="text-sm  flex items-start flex-col  space-y-8">
              <li>Electronics</li>
              <li>Clothes</li>
              <li>Others</li>
              <li>Signup</li>
              <li>Login</li>

              <div className="relative my-4 flex space-x-4">
                <div>
                  <ShoppingCartIcon className="h-6 w-6 cursor-pointer text-gray-100" />
                  <span className="bg-red-600 text-gray-100 h-4 w-4 rounded-full text-center text-xs absolute right-0 -top-2 left-4">
                    0
                  </span>
                </div>
                <CashIcon className="h-6 w-6 cursor-pointer text-gray-100" />
              </div>
            </ul>

            <div
              onClick={() => setNav(false)}
              className="rounded-full shadow-lg p-3 h-10"
            >
              <XIcon className="h-4 w-4 text-gray-100" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
