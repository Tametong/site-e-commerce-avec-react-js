import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaCreditCard, FaCheck } from "react-icons/fa";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});

  // Fonction de validation pour un champ spécifique
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "fullName":
        if (!value.trim()) newErrors.fullName = "Le nom complet est requis";
        else delete newErrors.fullName;
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) newErrors.email = "Email invalide";
        else delete newErrors.email;
        break;
      case "address":
        if (!value.trim()) newErrors.address = "L'adresse est requise";
        else delete newErrors.address;
        break;
      case "city":
        if (!value.trim()) newErrors.city = "La ville est requise";
        else delete newErrors.city;
        break;
      case "postalCode":
        const postalCodeRegex = /^\d{5}$/;
        if (!postalCodeRegex.test(value))
          newErrors.postalCode = "Code postal invalide (5 chiffres)";
        else delete newErrors.postalCode;
        break;
      case "cardNumber":
        const cardNumberRegex = /^\d{16}$/;
        if (!cardNumberRegex.test(value))
          newErrors.cardNumber = "Numéro de carte invalide (16 chiffres)";
        else delete newErrors.cardNumber;
        break;
      case "expiry":
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(value)) {
          newErrors.expiry = "Date invalide (MM/AA)";
        } else {
          const [month, year] = value.split("/");
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;
          if (
            parseInt(year) < currentYear ||
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)
          ) {
            newErrors.expiry = "Carte expirée";
          } else {
            delete newErrors.expiry;
          }
        }
        break;
      case "cvc":
        const cvcRegex = /^\d{3}$/;
        if (!cvcRegex.test(value)) newErrors.cvc = "CVC invalide (3 chiffres)";
        else delete newErrors.cvc;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion des changements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // Valide en temps réel
  };

  // Validation finale avant soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(formData).every((key) =>
      validateField(key, formData[key])
    );
    if (isValid) {
      alert("Commande passée avec succès ! (Simulation)");
      setCart([]);
      navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Paiement</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <form onSubmit={handleSubmit} className="flex-1">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <FaTruck /> Informations de livraison
          </h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Nom complet"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleChange} // Valide aussi quand l'utilisateur quitte le champ
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Adresse"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.city
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Code postal"
                  value={formData.postalCode}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.postalCode
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postalCode}
                  </p>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-semibold mt-6 mb-4 flex items-center gap-2">
            <FaCreditCard /> Informations de paiement
          </h2>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Numéro de carte"
                value={formData.cardNumber}
                onChange={handleChange}
                onBlur={handleChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.cardNumber
                    ? "border-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/AA"
                  value={formData.expiry}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.expiry
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.expiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={formData.cvc}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.cvc
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.cvc && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvc}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className={`w-full mt-6 py-3 rounded-lg flex items-center justify-center gap-2 text-white transition-colors ${
              Object.keys(errors).length > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <FaCheck /> Confirmer la commande
          </button>
        </form>

        <div className="w-full lg:w-80 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Récapitulatif
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Votre panier est vide.</p>
          ) : (
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-800">
                      {item.title} (x{item.quantity})
                    </span>
                    <span className="text-gray-800">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
