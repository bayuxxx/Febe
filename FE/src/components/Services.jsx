import React from "react";
import { Heart, Users, Shield, Activity, Brain, LineChart, History } from "lucide-react";

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Layanan Kesehatan AI Terpadu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform kesehatan pintar dengan prediksi AI dan rekomendasi dokter untuk perawatan kesehatan yang lebih akurat
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Prediksi AI
                  </h3>
                  <p className="text-gray-600">
                    Analisis kesehatan prediktif berbasis AI untuk deteksi dini risiko penyakit dan rekomendasi pencegahan personal.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <LineChart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Manajemen Risiko
                  </h3>
                  <p className="text-gray-600">
                    Rekomendasi penurunan risiko kesehatan berdasarkan analisis AI dan panduan dari dokter spesialis.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl">
                  <History className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Riwayat Deteksi
                  </h3>
                  <p className="text-gray-600">
                    Penyimpanan dan pelacakan riwayat deteksi AI serta konsultasi dokter untuk monitoring kesehatan jangka panjang.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Dashboard AI Health
                  </h3>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-sm text-gray-600">Skor Kesehatan AI</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">15%</div>
                    <div className="text-sm text-gray-600">Tingkat Risiko</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Rekomendasi AI</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Perlu Tindakan
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress Penurunan Risiko</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all">
                  Lihat Hasil Analisis AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;