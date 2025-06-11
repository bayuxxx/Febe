import React from "react";
import {
  Activity,
  Heart,
  AlertTriangle,
  ArrowLeft,
  Scale,
  User,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const HeartAttackResponse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;
  const riskScore = result
    ? Math.round(result.probability_yes_heart_attack * 100)
    : 0;
  const currentUser = "bayuxxx";
  const currentDateTime = "2025-06-02 03:35:13";

  const getRiskLevel = (score) => {
    if (score >= 75)
      return {
        level: "Risiko Sangat Tinggi",
        color: "red",
        message:
          "Anda memiliki risiko sangat tinggi serangan jantung. Segera konsultasi dengan dokter.",
      };
    if (score >= 50)
      return {
        level: "Risiko Tinggi",
        color: "orange",
        message:
          "Anda memiliki risiko tinggi serangan jantung. Perlu evaluasi medis segera.",
      };
    if (score >= 25)
      return {
        level: "Risiko Sedang",
        color: "yellow",
        message:
          "Anda memiliki risiko sedang serangan jantung. Perhatikan faktor risiko Anda.",
      };
    return {
      level: "Risiko Rendah",
      color: "green",
      message:
        "Risiko serangan jantung Anda relatif rendah. Pertahankan pola hidup sehat!",
    };
  };

  const risk = getRiskLevel(riskScore);

  const getColorClass = (color) => {
    switch (color) {
      case "red":
        return "text-red-500";
      case "orange":
        return "text-orange-500";
      case "yellow":
        return "text-yellow-500";
      case "green":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const getYesNoText = (value) => (value === 1 ? "Ya" : "Tidak");

  const keyMetrics = [
    {
      icon: <Scale />,
      label: "Usia",
      value: result?.input_data_received.age,
      unit: "tahun",
    },
    {
      icon: <Activity />,
      label: "Lingkar Pinggang",
      value: result?.input_data_received.waist_circumference,
      unit: "cm",
    },
    {
      icon: <Heart />,
      label: "Trigliserida",
      value: result?.input_data_received.triglycerides,
      unit: "mg/dL",
    },
  ];

  const healthConditions = [
    {
      label: "Hipertensi",
      value: getYesNoText(result?.input_data_received.hypertension),
    },
    {
      label: "Diabetes",
      value: getYesNoText(result?.input_data_received.diabetes),
    },
    {
      label: "Obesitas",
      value: getYesNoText(result?.input_data_received.obesity),
    },
    {
      label: "Riwayat Penyakit Jantung",
      value: getYesNoText(result?.input_data_received.previous_heart_disease),
    },
    {
      label: "Penggunaan Obat",
      value: getYesNoText(result?.input_data_received.medication_usage),
    },
    {
      label: "Partisipasi Skrining Gratis",
      value: getYesNoText(
        result?.input_data_received.participated_in_free_screening
      ),
    },
  ];

  return (
    <div className="min-h-screen to-white py-8 px-2 sm:px-6">
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
            Hasil Analisis Risiko Serangan Jantung
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs sm:text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>{currentUser}</span>
            <span>•</span>
            <span>{currentDateTime}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Risk Score */}
          <div className="bg-gradient-to-br from-red-50 to-white p-4 sm:p-8">
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 128 128"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <circle
                    className="text-red-100"
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
                    strokeDasharray={364}
                    strokeDashoffset={364 - (riskScore / 100) * 364}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="absolute inset-0 flex ml-8 flex-col items-center justify-center">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                    {riskScore}%
                  </span>
                  <span
                    className={`text-sm sm:text-base font-semibold mt-1 sm:mt-2 ${getColorClass(
                      risk.color
                    )}`}
                  >
                    {result?.prediction_label}{" "}
                  </span>
                </div>
              </div>
              <p className="text-center mt-4 sm:mt-6 text-xs xs:text-sm sm:text-base text-gray-700 max-w-md">
                {risk.message}
              </p>
            </div>
          </div>

          <div className="p-2 xs:p-4 sm:p-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mb-8">
              {keyMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-red-50 rounded-xl p-2 xs:p-3 sm:p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-red-500">{metric.icon}</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">
                    {metric.value} {metric.unit}
                  </div>
                </div>
              ))}
            </div>

            {/* Health Conditions */}
            <div className="bg-red-50 rounded-xl p-3 xs:p-4 sm:p-6 mb-8">
              <h3 className="text-base xs:text-lg font-semibold mb-3 xs:mb-4">
                Kondisi Kesehatan
              </h3>
              <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 xs:gap-4">
                {healthConditions.map((condition, index) => (
                  <div key={index}>
                    <span className="text-xs xs:text-sm text-gray-600">
                      {condition.label}:
                    </span>
                    <p className="font-medium text-xs xs:text-sm">
                      {condition.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-red-50 rounded-xl p-3 xs:p-4 sm:p-6 flex items-start gap-2 xs:gap-3 sm:gap-4 mb-8">
              <AlertTriangle className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-red-800 text-xs xs:text-sm sm:text-base">
                  Perhatian Penting
                </h4>
                <p className="text-red-700 text-xs xs:text-sm sm:text-base mt-1">
                  Hasil analisis ini bersifat prediktif dan tidak menggantikan
                  diagnosis medis profesional. Segera konsultasikan dengan
                  dokter untuk evaluasi menyeluruh dan penanganan yang tepat.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4">
              <button
                onClick={() => window.print()}
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors text-xs xs:text-sm sm:text-base flex-1"
              >
                Cetak Hasil
              </button>
              <Link
                to="/consultation"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-colors text-center text-xs xs:text-sm sm:text-base flex-1"
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

export default HeartAttackResponse;
