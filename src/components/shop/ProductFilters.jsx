import React, { useState } from "react";
import { FaFilter, FaBars, FaTimes } from "react-icons/fa";

function ProductFilters({ setCategory, activeCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const categories = [
    { name: "all", label: "Tous les produits", icon: <FaBars /> },
    { name: "electronics", label: "Electronics", icon: <FaFilter /> },
    { name: "jewelery", label: "Jewelery", icon: <FaFilter /> },
    { name: "men's clothing", label: "Men's Clothing", icon: <FaFilter /> },
    { name: "women's clothing", label: "Women's Clothing", icon: <FaFilter /> },
  ];

  return (
    <div className="w-full md:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 bg-gray-800 text-white w-full text-left font-semibold flex items-center gap-2"
      >
        {isOpen ? <FaTimes /> : <FaBars />} Filtres
      </button>
      <div
        className={`w-full md:w-64 p-4 bg-gray-100 border-r border-gray-200 md:h-screen transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 md:max-h-screen md:opacity-100 overflow-hidden"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaFilter /> Catégories
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => {
                  setCategory(category.name);
                  setIsOpen(false);
                }}
                className={`w-full text-left py-2 px-4 rounded border flex items-center gap-2 ${
                  activeCategory === category.name
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
                }`}
              >
                {category.icon} {category.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductFilters;