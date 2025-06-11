import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function HeartAttackForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    age: 45,
    gender: 'Male',
    hypertension: '0',
    diabetes: '0',
    obesity: '0',
    waist_circumference: 85,
    smoking_status: 'Never',
    alcohol_consumption: 'None',
    triglycerides: 150,
    previous_heart_disease: '0',
    medication_usage: '0',
    participated_in_free_screening: '0'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert data types as needed
    const processedData = {
      ...formData,
      age: parseFloat(formData.age),
      waist_circumference: parseFloat(formData.waist_circumference),
      triglycerides: parseFloat(formData.triglycerides),
      hypertension: parseInt(formData.hypertension),
      diabetes: parseInt(formData.diabetes),
      obesity: parseInt(formData.obesity),
      previous_heart_disease: parseInt(formData.previous_heart_disease),
      medication_usage: parseInt(formData.medication_usage),
      participated_in_free_screening: parseInt(formData.participated_in_free_screening),
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', processedData);
      navigate('/heart-attack-response', { state: { result: response.data } });
    } catch (err) {
      setError(err.response?.data?.error || 'Terjadi kesalahan dalam menghubungi server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Prediksi Risiko Serangan Jantung
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Isi formulir di bawah ini untuk mengetahui tingkat risiko serangan jantung Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Age Input */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Usia
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              {/* Gender Select */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Jenis Kelamin
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
              </div>

              {/* Hypertension Select */}
              <div>
                <label htmlFor="hypertension" className="block text-sm font-medium text-gray-700">
                  Hipertensi
                </label>
                <select
                  id="hypertension"
                  name="hypertension"
                  value={formData.hypertension}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>

              {/* Diabetes Select */}
              <div>
                <label htmlFor="diabetes" className="block text-sm font-medium text-gray-700">
                  Diabetes
                </label>
                <select
                  id="diabetes"
                  name="diabetes"
                  value={formData.diabetes}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>

              {/* Obesity Select */}
              <div>
                <label htmlFor="obesity" className="block text-sm font-medium text-gray-700">
                  Obesitas
                </label>
                <select
                  id="obesity"
                  name="obesity"
                  value={formData.obesity}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>

              {/* Waist Circumference Input */}
              <div>
                <label htmlFor="waist_circumference" className="block text-sm font-medium text-gray-700">
                  Lingkar Pinggang (cm)
                </label>
                <input
                  type="number"
                  id="waist_circumference"
                  name="waist_circumference"
                  value={formData.waist_circumference}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              {/* Smoking Status Select */}
              <div>
                <label htmlFor="smoking_status" className="block text-sm font-medium text-gray-700">
                  Status Merokok
                </label>
                <select
                  id="smoking_status"
                  name="smoking_status"
                  value={formData.smoking_status}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="Never">Tidak Pernah</option>
                  <option value="Past">Dulu Pernah</option>
                  <option value="Current">Masih Merokok</option>
                </select>
              </div>

              {/* Alcohol Consumption Select */}
              <div>
                <label htmlFor="alcohol_consumption" className="block text-sm font-medium text-gray-700">
                  Konsumsi Alkohol
                </label>
                <select
                  id="alcohol_consumption"
                  name="alcohol_consumption"
                  value={formData.alcohol_consumption}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="None">Tidak Pernah</option>
                  <option value="Moderate">Sedang</option>
                  <option value="High">Tinggi</option>
                </select>
              </div>

              {/* Triglycerides Input */}
              <div>
                <label htmlFor="triglycerides" className="block text-sm font-medium text-gray-700">
                  Trigliserida (mg/dL)
                </label>
                <input
                  type="number"
                  id="triglycerides"
                  name="triglycerides"
                  value={formData.triglycerides}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                />
              </div>

              {/* Previous Heart Disease Select */}
              <div>
                <label htmlFor="previous_heart_disease" className="block text-sm font-medium text-gray-700">
                  Riwayat Penyakit Jantung
                </label>
                <select
                  id="previous_heart_disease"
                  name="previous_heart_disease"
                  value={formData.previous_heart_disease}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>

              {/* Medication Usage Select */}
              <div>
                <label htmlFor="medication_usage" className="block text-sm font-medium text-gray-700">
                  Penggunaan Obat-obatan
                </label>
                <select
                  id="medication_usage"
                  name="medication_usage"
                  value={formData.medication_usage}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>

              {/* Free Screening Participation Select */}
              <div>
                <label htmlFor="participated_in_free_screening" className="block text-sm font-medium text-gray-700">
                  Partisipasi Skrining Gratis
                </label>
                <select
                  id="participated_in_free_screening"
                  name="participated_in_free_screening"
                  value={formData.participated_in_free_screening}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  required
                >
                  <option value="0">Tidak</option>
                  <option value="1">Ya</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-white 
                  ${loading ? 'bg-red-300' : 'bg-red-600 hover:bg-red-700'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors`}
              >
                {loading ? 'Memproses...' : 'Analisis Risiko'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}