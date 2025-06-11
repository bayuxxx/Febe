import React from 'react';

const RiwayatPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Riwayat
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <div className="text-2xl font-semibold text-blue-600 mb-3">
              Coming Soon
            </div>
          </div>
          <p className="text-gray-600">
            Halaman ini sedang dalam pengembangan. 
            Silahkan kembali lagi nanti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPage;