import React from "react";
import { RiShoppingCartLine, RiShoppingCartFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Cart from "./Cart";

const Navbar: React.FC = () => {
  const { cartItems, cartQuantity, isOpen, handleClickCart } =
    useShoppingCart();

  return (
    <nav className="shadow-sm px-3 bg-white sticky top-0">
      <div className="flex justify-between items-center h-11">
        <div className="flex-1 flex items-center justify-start">
          <a
            href="/"
            className="bg-gray-50 text-indigo-700 px-3 text-4xl  font-mono font-bold italic flex items-center"
          >
            RBK STORE
          </a>
          <ul className="pl-3 flex items-center text-slate-500 italic">
            <li>
              {" "}
              <NavLink
                className="px-3 py-3 hover:text-red-300 duration-300"
                to={"/home"}
              >
                Home
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink
                className="px-3 py-3 hover:text-red-300 duration-300"
                to={"/store"}
              >
                Store
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink
                className="px-3 py-3 hover:text-red-300 duration-300"
                to={"/about"}
              >
                About
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink
                className="px-3 py-3 hover:text-red-300 duration-300"
                to={"/signup"}
              >
                Sign Up
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink
                className="px-3 py-3 hover:text-red-300 duration-300"
                to={"/login"}
              >
                Login
              </NavLink>{" "}
            </li>
          </ul>
        </div>
        <button
          onClick={() => handleClickCart()}
          className="flex items-center  text-red-500 hover:text-red-500 duration-300"
        >
          <RiShoppingCartLine />
          <span className="ml-1 text-xs italic">
            "{cartQuantity}" items in cart
          </span>
        </button>
      </div>

      {isOpen && (
        <Cart handleClickCart={handleClickCart} cartItems={cartItems} />
      )}
    </nav>
  );
};

export default Navbar;
