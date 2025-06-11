import React from "react";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Health Guard</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Platform kesehatan digital terdepan yang menggabungkan teknologi
              AI, konsultasi dokter profesional, dan panduan hidup sehat.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  AI Diagnosis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Konsultasi Dokter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Pola Hidup Sehat
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Pemeriksaan Rutin
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Syarat Layanan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Health Guard. Semua hak dilindungi. Dibuat dengan ❤️
            untuk kesehatan yang lebih baik.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;