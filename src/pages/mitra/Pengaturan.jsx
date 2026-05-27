import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Pengaturan() {
  const navigate = useNavigate()
  
  // State untuk tombol tema gelap
  const [isDarkMode, setIsDarkMode] = useState(false)

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
              <div onClick={() => navigate('/mitra/status-kemitraan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
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
          <div onClick={() => navigate('/mitra/akun')} className="flex items-center gap-3 cursor-pointer hover:bg-blue-400/30 rounded-lg py-2 pl-3 text-xs font-semibold transition">
            <span className="text-base">👤</span><span>Akun</span>
          </div>
          <div className="flex items-center gap-3 bg-[#2563EB] rounded-lg py-2 pl-3 border-l-4 border-white cursor-default text-xs font-semibold">
            <span className="text-base">⚙️</span><span>Pengaturan</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT RIGHT --- */}
      <main className="w-3/4 p-10 flex flex-col items-center">
        
        <div className="w-full max-w-3xl mb-8">
          <h1 className="text-3xl font-black text-[#1E3A8A]">Pengaturan</h1>
          <h2 className="text-sm font-bold text-[#3B82F6] mt-1">Sesuaikan preferensi sistem dan keamanan akun</h2>
        </div>

        <div className="w-full max-w-3xl space-y-6">
          
          {/* Kartu Preferensi Tampilan */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
            <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-xl">🎨</span> Tampilan
            </h3>
            
            <div className="flex justify-between items-center pb-2">
              <div>
                <h4 className="font-bold text-sm text-gray-800">Mode Gelap (Dark Mode)</h4>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">Ubah tampilan aplikasi menjadi tema gelap</p>
              </div>
              {/* Toggle Button Interaktif */}
              <div 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-10 h-5 rounded-full relative cursor-pointer shadow-inner transition-colors ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
              </div>
            </div>
          </div>

          {/* Kartu Keamanan Akun */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-50">
            <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-xl">🔒</span> Keamanan & Kata Sandi
            </h3>
            
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Kata Sandi Lama</label>
                <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Kata Sandi Baru</label>
                <input type="password" placeholder="Masukan kata sandi baru" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 bg-gray-50" />
              </div>
              <div className="pt-2">
                <button className="bg-gray-800 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-gray-700 transition shadow-sm">
                  Perbarui Kata Sandi
                </button>
              </div>
            </div>
          </div>

          {/* Tombol Logout (Keluar) */}
          <button 
            onClick={() => navigate('/')} 
            className="w-full bg-[#FEF2F2] border border-red-200 text-red-600 rounded-3xl p-4 font-black text-sm hover:bg-red-50 transition flex justify-center items-center gap-2 shadow-sm"
          >
            <span className="text-lg">🚪</span> Keluar dari Akun (Logout)
          </button>

        </div>
      </main>
    </div>
  )
}