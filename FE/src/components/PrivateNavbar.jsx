import React, { useState } from "react";
import { Shield, X, Menu } from "lucide-react";

const PrivateNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPath = window.location.pathname;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              Health Guard
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`font-medium transition-colors ${
                currentPath === "/"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Beranda
            </a>
            <a
              href="/prediksi"
              className={`font-medium transition-colors ${
                currentPath === "/prediksi"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Prediksi AI
            </a>
            <a
              href="/consultation"
              className={`font-medium transition-colors ${
                currentPath === "/consultation"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Konsultasi
            </a>
            <a
              href="/history"
              className={`font-medium transition-colors ${
                currentPath === "/history"
                  ? "text-green-600"
                  : "text-gray-700 hover:text-green-600"
              }`}
            >
              Riwayat
            </a>
           
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/signin";
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Logout
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className={`transition-colors ${
                  currentPath === "/"
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                Beranda
              </a>
              <a
                href="/prediksi"
                className={`transition-colors ${
                  currentPath === "/prediksi"
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                Prediksi AI
              </a>
              <a
                href="/consultation"
                className={`transition-colors ${
                  currentPath === "/consultation"
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                Konsultasi
              </a>
              <a
                href="/history"
                className={`transition-colors ${
                  currentPath === "/history"
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                Riwayat
              </a>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/signin";
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PrivateNavbar;