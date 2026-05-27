import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-blue-100 font-sans">
      <div className="w-2/5 bg-blue-500 text-white p-10 flex flex-col items-center justify-center relative">
        
        <div className="absolute top-8 left-8 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="text-3xl font-bold hover:text-blue-200 cursor-pointer"
          >
            &lt;
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">NutriSafe MBG</span>
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold mb-8 mt-12">
          Platform Monitoring & Pelaporan Keamanan Makanan Siswa (MBG)
        </h2>
        <img src="/utama.png" alt="Ilustrasi Utama" className="w-4/5 rounded-xl mb-8 shadow-lg bg-white" />
        <p className="text-center mb-6 px-4 text-sm">
          Membantu sekolah, mitra, dan masyarakat dalam memantau serta melaporkan keamanan dan kualitas makanan siswa
        </p>
        
        <div className="w-full flex flex-col gap-3 px-8 text-sm font-semibold">
          <div className="bg-blue-400/50 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-xl">📊</span>
            <span>Monitoring Alergi Siswa</span>
          </div>
          <div className="bg-blue-400/50 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-xl">📱</span>
            <span>Pelaporan Makanan</span>
          </div>
          <div className="bg-blue-400/50 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-xl">📋</span>
            <span>Input & Laporan Menu Harian</span>
          </div>
        </div>
      </div>

      <div className="w-3/5 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-10">Masuk Akun</h1>
        <div className="bg-white p-10 rounded-2xl shadow-xl w-3/5 max-w-md">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>✉️</span> Email
            </label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>🔒</span> Password
            </label>
            <input type="password" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500" />
          </div>
          
          <button 
            onClick={() => navigate('/mitra/status-kemitraan')}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Masuk
          </button>
        
          <p className="text-center mt-6 text-sm text-gray-600">
            Belum Punya Akun? <span onClick={() => navigate('/daftar')} className="text-blue-500 cursor-pointer font-bold hover:underline">Daftar</span>
          </p>
        </div>
      </div>
    </div>
  );
}