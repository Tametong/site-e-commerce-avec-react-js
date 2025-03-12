import React from "react";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

function Cart({ cart, setCart }) {
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Votre Panier
      </h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <>
          <div className="border border-gray-200 rounded-lg p-3 md:p-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 md:py-4 border-b border-gray-200 gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-gray-800">{item.title}</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaMinus />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    <FaPlus />
                  </button>
                </div>
                <span className="text-gray-800 text-right w-full sm:w-24">
                  {(item.price * item.quantity).toFixed(2)} €
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-full sm:w-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center gap-2"
                >
                  <FaTrash /> Supprimer
                </button>
              </div>
            ))}
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-right mt-4 md:mt-6">
            Total : {total.toFixed(2)} €
          </h2>
          <Link
            to="/checkout"
            className="block mx-auto mt-4 md:mt-6 py-2 md:py-3 px-6 md:px-8 bg-green-500 text-white rounded-lg hover:bg-green-600 text-center"
          >
            Passer la commande
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
