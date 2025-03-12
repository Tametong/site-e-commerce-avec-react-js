import React from "react";
import { FaRocket } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
        
          <div>
           
            <p className="text-sm">© Paul-2025 - Tous droits réservés</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#" className="text-sm hover:text-blue-300">
            À propos
          </a>
          <a href="#" className="text-sm hover:text-blue-300">
            Contact
          </a>
          <a href="#" className="text-sm hover:text-blue-300">
            Conditions d'utilisation
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
