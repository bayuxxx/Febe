import React from "react";
import {
  Activity,
  Apple,
  Droplet,
  Heart,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DiabetesResponse = () => {
  const navigate = useNavigate();
  const riskScore = 65;

  const getRiskLevel = (score) => {
    if (score >= 80)
      return {
        level: "Risiko Tinggi",
        color: "red",
        message:
          "Anda memiliki risiko tinggi diabetes. Segera konsultasi dengan dokter.",
      };
    if (score >= 60)
      return {
        level: "Risiko Sedang",
        color: "yellow",
        message:
          "Anda memiliki beberapa faktor risiko diabetes yang perlu diperhatikan.",
      };
    if (score >= 40)
      return {
        level: "Risiko Rendah",
        color: "blue",
        message:
          "Risiko diabetes Anda relatif rendah, tetap jaga pola hidup sehat.",
      };
    return {
      level: "Risiko Sangat Rendah",
      color: "green",
      message: "Pertahankan pola hidup sehat Anda!",
    };
  };

  const risk = getRiskLevel(riskScore);

  const getColorClass = (color) => {
    switch (color) {
      case "red":
        return "text-red-500";
      case "yellow":
        return "text-yellow-400";
      case "blue":
        return "text-blue-500";
      case "green":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const recommendations = [
    {
      icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Aktivitas Fisik",
      description: "Lakukan olahraga minimal 30 menit sehari, 5 kali seminggu",
    },
    {
      icon: <Apple className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Pola Makan",
      description: "Batasi karbohidrat dan gula, tingkatkan konsumsi serat",
    },
    {
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Monitoring",
      description: "Periksa gula darah secara rutin setiap 3 bulan",
    },
    {
      icon: <Droplet className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Hidrasi",
      description: "Minum air putih minimal 8 gelas per hari",
    },
  ];

  return (
    <div className="min-h-screen  to-white py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Hasil Analisis Risiko Diabetes
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Analisis dilakukan pada: 2025-05-31 14:44:25
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Risk Score */}
          <div className="bg-gradient-to-br from-green-50 to-white p-4 sm:p-8">
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 128 128"
                >
                  <circle
                    className="text-green-100"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className={getColorClass(risk.color)}
                    strokeWidth="12"
                    strokeDasharray={360}
                    strokeDashoffset={360 - (riskScore / 100) * 360}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                    {riskScore}%
                  </span>
                  <span className="text-sm sm:text-base text-green-600 font-semibold mt-1 sm:mt-2">
                    {risk.level}
                  </span>
                </div>
              </div>
              <p className="text-center mt-4 sm:mt-6 text-sm sm:text-base text-gray-700 max-w-md">
                
                {risk.message}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8" >
              <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  120
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Glukosa (mg/dL)
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  80
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Tekanan Darah (mmHg)
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  23.1
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  BMI (kg/m²)
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  45
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Usia (tahun)
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Rekomendasi untuk Anda
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="bg-green-50 rounded-xl p-4 sm:p-6"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 mb-2">
                      <div className="p-2 sm:p-3 bg-white rounded-lg text-green-500">
                        {rec.icon}
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg">
                        {rec.title}
                      </h4>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">
                      {rec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-green-50 rounded-xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4 mb-8">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-green-800 text-sm sm:text-base">
                  Perhatian Penting
                </h4>
                <p className="text-green-700 text-xs sm:text-sm mt-1">
                  Hasil analisis ini bersifat prediktif dan tidak menggantikan
                  diagnosis medis profesional. Selalu konsultasikan dengan
                  dokter untuk evaluasi menyeluruh dan penanganan yang tepat.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => window.print()}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-colors text-sm sm:text-base flex-1"
              >
                Cetak Hasil
              </button>
              <Link
                to="/consultation"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-colors text-center text-sm sm:text-base flex-1"
              >
                Konsultasi Dokter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiabetesResponse;
