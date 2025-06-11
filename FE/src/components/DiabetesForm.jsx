import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import DiabetesResponse from "./DiabetesResponse";
import { Link, useNavigate } from "react-router-dom";

const DiabetesForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    age: "",
    pregnancies: "",
    diabetesPedigree: "",
  });

  const [errors, setErrors] = useState({});
  const [showResponse, setShowResponse] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "Field ini wajib diisi";
      } else if (isNaN(formData[key])) {
        newErrors[key] = "Masukkan angka yang valid";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("diabetesFormData", JSON.stringify(formData));
      navigate("/diabetes-response");
    }
  };

  return (
    <>
      <section
        id="diabetes-form"
        className="py-20 bg-gradient-to-br from-green-50 to-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Deteksi Risiko Diabetes
            </h2>
            <p className="text-xl text-gray-600">
              Isi form berikut dengan data kesehatan Anda untuk mengetahui
              risiko diabetes
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-lg border border-green-100"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Glucose Level */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Kadar Glukosa (mg/dL)
                </label>
                <input
                  type="number"
                  name="glucose"
                  value={formData.glucose}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.glucose ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 120"
                />
                {errors.glucose && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.glucose}
                  </p>
                )}
              </div>

              {/* Blood Pressure */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tekanan Darah (mmHg)
                </label>
                <input
                  type="number"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.bloodPressure ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 80"
                />
                {errors.bloodPressure && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bloodPressure}
                  </p>
                )}
              </div>

              {/* Skin Thickness */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Ketebalan Kulit (mm)
                </label>
                <input
                  type="number"
                  name="skinThickness"
                  value={formData.skinThickness}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.skinThickness ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 20"
                />
                {errors.skinThickness && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.skinThickness}
                  </p>
                )}
              </div>

              {/* Insulin */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Insulin (mu U/ml)
                </label>
                <input
                  type="number"
                  name="insulin"
                  value={formData.insulin}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.insulin ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 79"
                />
                {errors.insulin && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.insulin}
                  </p>
                )}
              </div>

              {/* BMI */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  BMI (kg/m²)
                </label>
                <input
                  type="number"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.bmi ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 23.1"
                  step="0.1"
                />
                {errors.bmi && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bmi}
                  </p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Usia (tahun)
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.age ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 45"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.age}
                  </p>
                )}
              </div>

              {/* Pregnancies */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Jumlah Kehamilan
                </label>
                <input
                  type="number"
                  name="pregnancies"
                  value={formData.pregnancies}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.pregnancies ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 2"
                />
                {errors.pregnancies && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.pregnancies}
                  </p>
                )}
              </div>

              {/* Diabetes Pedigree */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Riwayat Diabetes Keluarga
                </label>
                <input
                  type="number"
                  name="diabetesPedigree"
                  value={formData.diabetesPedigree}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.diabetesPedigree
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors`}
                  placeholder="Contoh: 0.527"
                  step="0.001"
                />
                {errors.diabetesPedigree && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.diabetesPedigree}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Analisis Risiko Diabetes
              </button>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Hasil prediksi ini bersifat sebagai deteksi dini dan tidak
                menggantikan diagnosis medis profesional.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default DiabetesForm;
