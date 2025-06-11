import React from "react";
import { Heart, Brain, Activity } from "lucide-react";

const DiseasePrediction = () => {
  return (
    <section
      id="predict"
      className="py-20 bg-gradient-to-br from-green-50 to-emerald-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Deteksi Dini Penyakit dengan AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pilih jenis pemeriksaan yang ingin dilakukan. Teknologi machine
            learning kami akan menganalisis gejala dan memberikan prediksi
            akurat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Diabetes Card */}
          <PredictionCard
            title="Diabetes"
            description="Deteksi risiko diabetes berdasarkan gejala, riwayat kesehatan, dan faktor risiko lainnya"
            accuracy="96%"
            time="10 menit"
            gradient="from-red-500 to-pink-500"
            onClick={() => (window.location.href = "/diabetes-form")}
          />

          {/* Heart Disease Card */}
          <PredictionCard
            title="Serangan Jantung"
            description="Analisis risiko penyakit jantung berdasarkan tekanan darah, kolesterol, dan gaya hidup"
            accuracy="94%"
            time="8 menit"
            gradient="from-red-500 to-rose-500"
            icon={<Heart className="w-8 h-8 text-white fill-current" />}
            onClick={() => (window.location.href = "/heart-attack-form")}
          />

          {/* Stroke Card */}
          <PredictionCard
            title="Stroke"
            description="Prediksi risiko stroke dengan menganalisis faktor neurologis dan cardiovascular"
            accuracy="92%"
            time="12 menit"
            gradient="from-purple-500 to-indigo-500"
            icon={<Brain className="w-8 h-8 text-white" />}
            onClick={() => (window.location.href = "#stroke-form")}
          />

          {/* Hypertension Card */}
          <PredictionCard
            title="Hipertensi"
            description="Evaluasi risiko tekanan darah tinggi berdasarkan gaya hidup dan riwayat keluarga"
            accuracy="95%"
            time="7 menit"
            gradient="from-orange-500 to-amber-500"
            icon={<Activity className="w-8 h-8 text-white" />}
            onClick={() => (window.location.href = "#hypertension-form")}
          />

          {/* Kidney Disease Card */}
          <PredictionCard
            title="Penyakit Ginjal"
            description="Deteksi dini gangguan fungsi ginjal melalui analisis gejala dan faktor risiko"
            accuracy="93%"
            time="9 menit"
            gradient="from-blue-500 to-cyan-500"
            onClick={() => (window.location.href = "#kidney-form")}
          />

          {/* Liver Disease Card */}
          <PredictionCard
            title="Penyakit Hati"
            description="Analisis kesehatan hati berdasarkan gejala klinis dan riwayat medis"
            accuracy="91%"
            time="11 menit"
            gradient="from-yellow-500 to-orange-500"
            onClick={() => (window.location.href = "#liver-form")}
          />
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg inline-block border border-green-100">
            <p className="text-gray-600 mb-4">
              <strong className="text-gray-900">Catatan Penting:</strong> Hasil
              prediksi ini bersifat sebagai deteksi dini dan tidak menggantikan
              diagnosis medis profesional.
            </p>
            <p className="text-sm text-gray-500">
              Selalu konsultasikan dengan dokter untuk diagnosis dan perawatan
              yang tepat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const PredictionCard = ({
  title,
  description,
  accuracy,
  time,
  gradient,
  icon,
  onClick,
}) => {
  return (
    <div
      className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-green-100 cursor-pointer`}
      onClick={onClick}
    >
      <div className="text-center space-y-4">
        <div
          className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl mx-auto w-fit group-hover:scale-110 transition-transform`}
        >
          <div
            className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`}
          >
            {icon || (
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            )}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Akurasi {accuracy}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{time}</span>
          </div>
        </div>
        <button
          className={`w-full bg-gradient-to-r ${gradient} text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all group-hover:shadow-lg`}
        >
          Mulai Deteksi
        </button>
      </div>
    </div>
  );
};

export default DiseasePrediction;