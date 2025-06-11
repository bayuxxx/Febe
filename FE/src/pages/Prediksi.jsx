import React from "react";
import Footer from "../components/Footer";
import DiseasePrediction from "../components/DiseasePrediction";

const PredictionPage = () => {
  return (
    <>
        {/* Disease Prediction Section */}
        <DiseasePrediction />

        {/* Supporting Section */}
        <section
          id="about-prediction"
          className="py-20 bg-gray-50 border-t border-green-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tentang Teknologi Kami
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Teknologi prediksi AI kami dirancang untuk memberikan hasil yang
                cepat dan akurat. Dengan menggunakan data yang telah terlatih,
                kami dapat membantu Anda mendeteksi risiko penyakit lebih dini.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Machine Learning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Teknologi kami menggunakan model machine learning terkini
                  yang telah diuji secara ketat untuk memberikan hasil yang
                  akurat.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Data Terpercaya
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Kami melatih model kami dengan data medis terpercaya dari
                  sumber terpercaya untuk memastikan kualitas hasil.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-green-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Fokus pada Anda
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Kami memahami betapa pentingnya kesehatan Anda, oleh karena
                  itu kami membuat alat ini untuk membantu Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
    </>
  );
};

export default PredictionPage;