import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

function ProductCard({ product, addToCart }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-24 md:w-32 mx-auto mb-3 md:mb-4"
        />
        <h3 className="text-base md:text-lg font-semibold text-gray-800">
          {product.title}
        </h3>
      </Link>
      <p className="text-gray-600 mb-2">{product.price} €</p>
      <button
        onClick={() => addToCart(product)}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm md:text-base flex items-center justify-center gap-2"
      >
        <FaCartPlus /> Ajouter au panier
      </button>
    </div>
  );
}

export default ProductCard;
