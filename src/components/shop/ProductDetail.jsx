import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Produit non trouvé");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-4 text-center">Chargement...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Erreur : {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        {product.title}
      </h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-80 rounded-lg object-contain"
        />
        <div className="flex-1">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            {product.price} €
          </p>
          <p className="text-gray-600 mb-4 md:mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-full md:w-auto py-2 md:py-3 px-4 md:px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
