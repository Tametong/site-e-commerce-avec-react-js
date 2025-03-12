import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";

function Navbar({ cartCount }) {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
        <Link
          to="/"
          className="text-lg md:text-xl font-bold flex items-center gap-2"
        >
          <FaHome /> Boutique
        </Link>
        <Link to="/cart" className="flex items-center gap-2">
          <FaShoppingCart /> Panier{" "}
          <span className="bg-blue-500 px-2 py-1 rounded-full text-sm">
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
