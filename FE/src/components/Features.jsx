import React from "react";
import { Brain, Stethoscope, Activity, CheckCircle } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Fitur Unggulan Health Guard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Teknologi terdepan untuk menjaga kesehatan Anda dengan solusi yang
            komprehensif dan mudah digunakan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-white" />}
            title="AI Diagnosis"
            description="Teknologi machine learning canggih untuk deteksi dini berbagai penyakit dengan akurasi tinggi dan analisis mendalam."
            features={[
              "Deteksi 6 jenis penyakit",
              "Akurasi 90%",
              "Hasil instan",
            ]}
          />
          <FeatureCard
            icon={<Stethoscope className="h-8 w-8 text-white" />}
            title="Konsultasi Dokter"
            description="Akses langsung ke dokter profesional untuk konsultasi online kapan saja, di mana saja dengan kualitas terbaik."
            features={[
              "Dokter bersertifikat",
              "Layanan 24/7",
            ]}
          />
          <FeatureCard
            icon={<Activity className="h-8 w-8 text-white" />}
            title="Rekomendasi Kesehatan"
            description="Saran personal berdasarkan hasil prediksi AI untuk meningkatkan kualitas kesehatan dan mencegah risiko penyakit."
            features={[
              "Rekomendasi berbasis AI",
              "Saran gaya hidup personal",
              "Monitoring kesehatan",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, features }) => {
  return (
    <div className="group bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-green-100">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2 text-gray-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;