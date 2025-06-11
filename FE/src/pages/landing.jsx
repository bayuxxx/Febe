import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Star,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Services from "../components/Services";
import DiseasePrediction from "../components/DiseasePrediction";
import Features from "../components/Features";

export default function HealthGuardLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Dokter Umum",
      text: "Health Guard telah membantu saya memberikan diagnosis yang lebih akurat dengan dukungan AI yang canggih.",
      rating: 5,
    },
    {
      name: "Ahmad Rizki",
      role: "Pasien",
      text: "Sangat mudah digunakan! Deteksi awal yang akurat membantu saya mendapatkan perawatan tepat waktu.",
      rating: 5,
    },
    {
      name: "Dr. Maria Santos",
      role: "Spesialis Jantung",
      text: "Platform konsultasi yang luar biasa. Pasien bisa mendapat akses kesehatan berkualitas dari mana saja.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Disease Prediction Section */}
      <DiseasePrediction />

      {/* Services Section */}
      <Services />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dipercaya Ribuan Pengguna
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bergabunglah dengan komunitas yang telah merasakan manfaat Health
              Guard untuk hidup yang lebih sehat
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 shadow-xl border border-green-100">
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-400 fill-current"
                      />
                    )
                  )}
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div>
                  <div className="font-semibold text-xl text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-green-600 font-medium">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-green-500 scale-125"
                      : "bg-green-200 hover:bg-green-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Mulai Perjalanan Hidup Sehat Anda Hari Ini
            </h2>
            <p className="text-xl text-green-100 leading-relaxed">
              Bergabunglah dengan ribuan pengguna yang telah mempercayai Health
              Guard untuk menjaga kesehatan mereka. Dapatkan akses ke teknologi
              kesehatan terdepan sekarang juga.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Daftar Gratis Sekarang
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-green-600 transition-all duration-300">
                Hubungi Kami
              </button>
            </div>

            <div className="flex justify-center items-center gap-8 pt-8 text-green-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Gratis 30 hari</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Tanpa kontrak</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>Dukungan 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
