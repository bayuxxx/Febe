import React from "react";
import { ArrowRight, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Kesehatan Anda,
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent block">
                  Prioritas Utama
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Deteksi dini penyakit dengan teknologi machine learning
                terdepan, konsultasi dokter profesional, dan panduan hidup
                sehat yang personal.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                Cek Kesehatan Sekarang
                <ArrowRight className="h-5 w-5" />
              </button>
            
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">50K+</div>
                <div className="text-gray-600">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-gray-600">Akurasi Deteksi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600">Layanan</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Analisis Real-time
                    </h3>
                    <p className="text-gray-600">Deteksi instan dengan AI</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Kesehatan Jantung</span>
                    <span className="text-green-600 font-semibold">Baik</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full w-4/5"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Tekanan Darah</span>
                    <span className="text-green-600 font-semibold">
                      Normal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full w-3/4"></div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all">
                  Lihat Detail Lengkap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;