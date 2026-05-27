import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StatusKemitraan() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      
      {/* --- SIDEBAR LEFT --- */}
      <aside className="w-1/4 bg-[#3B82F6] text-white p-4 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold">NutriSafe MBG</span>
        </div>
        
        <div className="mb-4">
          <img src="/utama.png" alt="Illustration" className="w-full rounded-xl shadow-md bg-white/20 p-1" />
        </div>

        <h2 className="text-xl font-bold leading-tight mb-6">
          Dashboard Mitra <br /> & Pengelola
        </h2>

        <nav className="flex-1 space-y-4 pr-2">
          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">📋</span> Menu Mitra</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center pl-3 pr-3 py-2 bg-[#2563EB] rounded-lg border-l-4 border-white cursor-default text-xs font-semibold">
                <span>Status Kemitraan & Daftar SPPG</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/riwayat-laporan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Riwayat Laporan</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">🏢</span> Menu Pengelola</p>
            <div className="space-y-1">
              <div onClick={() => navigate('/mitra/monitoring-alergi')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Monitoring Alergi Siswa</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/scan-makanan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Scan & Pelaporan Menu Makanan</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/daftar-sekolah')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Daftar Sekolah</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-4 border-t border-white/20 space-y-3 mt-auto pr-2 pb-4">
          <div onClick={() => navigate('/mitra/profile')} className="flex items-center gap-3 cursor-pointer hover:text-blue-200 text-xs font-semibold pl-3">
            <span className="text-base">👤</span><span>Akun</span>
          </div>
          <div onClick={() => navigate('/mitra/pengaturan')} className="flex items-center gap-3 cursor-pointer hover:text-blue-200 text-xs font-semibold pl-3">
            <span className="text-base">⚙️</span><span>Pengaturan</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT RIGHT --- */}
      <main className="w-3/4 flex flex-col">
        {/* Header Section Banner */}
        <div className="bg-white p-0 relative overflow-hidden h-56 flex flex-col pt-8 rounded-b-3xl shadow-sm border-b border-blue-50">
          <img 
            src="/status.png" 
            alt="Status Banner" 
            className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none" 
          />
          <div className="relative z-10 px-12 ml-6 max-w-lg">
            <h1 className="text-2xl font-black text-[#1E3A8A] leading-tight">Dashboard Mitra</h1>
            <p className="text-[#3B82F6] font-bold text-base mt-1">Status Kemitraan & Daftar SPPG</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 pt-6 pb-8 flex flex-col items-center">
          
          {/* Status Sukses */}
          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#22C55E] text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-2 shadow-md">✓</div>
            <h3 className="text-xl font-bold text-[#1E3A8A]">Status Kemitraan</h3>
            <p className="text-[#3B82F6] font-bold text-sm">Anda telah menjadi mitra SPPG!</p>
          </div>

          {/* Kartu Statistik */}
          <div className="flex gap-4 w-full max-w-3xl mb-10">
            <div className="flex-1 bg-[#F97316] text-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
              <span className="text-3xl">🏢</span>
              <div>
                <p className="text-2xl font-black">1</p>
                <p className="font-semibold text-xs">Daftar SPPG</p>
              </div>
            </div>
            <div className="flex-1 bg-[#3B82F6] text-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
              <span className="text-3xl">🏫</span>
              <div>
                <p className="text-2xl font-black">2</p>
                <p className="font-semibold text-xs">Daftar Sekolah</p>
              </div>
            </div>
          </div>

          {/* Judul Daftar (Ditengah) */}
          <h3 className="text-xl font-black text-gray-800 mb-6 text-center">SPPG Saya</h3>

          {/* Kartu Daftar SPPG */}
          <div className="w-full max-w-3xl bg-white rounded-2xl p-5 shadow-sm border border-blue-100 flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <span className="text-4xl">🏢</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-lg font-black text-[#1E3A8A]">SPPG Indonesia</h4>
                <div className="text-gray-600 font-semibold space-y-0.5 text-xs">
                  <p>Status: <span className="text-blue-500">Aktif</span></p>
                  <p>Alamat: jl. Indonesia</p>
                  <p>Kapasitas: 100 Porsi</p>
                </div>
              </div>
            </div>
            <button className="bg-[#3B82F6] text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-600 shadow-sm transition text-xs">
              Detail
            </button>
          </div>
          
          {/* Tombol Daftar SPPG Baru */}
          <button className="bg-[#2563EB] text-white px-10 py-3.5 rounded-lg font-bold text-base hover:bg-blue-700 shadow-md transition w-full max-w-xl mb-12">
            Daftar SPPG Baru
          </button>

        </div>
      </main>
    </div>
  );
}