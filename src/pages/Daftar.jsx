import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Daftar() {
  const navigate = useNavigate()

  // Fungsi saat tombol daftar diklik (bisa diarahkan ke login atau langsung masuk dashboard)
  const handleSubmit = (e) => {
    e.preventDefault()
    // Arahkan ke halaman login setelah berhasil daftar
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen font-sans">
      
      {/* --- BAGIAN KIRI (Biru) --- */}
      <div className="w-5/12 bg-[#3B82F6] text-white flex flex-col items-center justify-center p-10 relative">
        
        {/* Tombol Kembali & Logo */}
        <div 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer hover:text-blue-200 transition"
        >
          <span className="text-2xl font-bold">‹</span>
          <span className="text-xl font-black">NutriSafe MBG</span>
        </div>

        {/* Konten Kiri */}
        <div className="max-w-sm mt-10">
          <h2 className="text-xl font-bold text-center leading-snug mb-6">
            Platform Monitoring & Pelaporan Keamanan Makanan Siswa (MBG)
          </h2>
          
          <img 
            src="/utama.png" 
            alt="Ilustrasi" 
            className="w-full rounded-2xl mb-6 shadow-md object-cover" 
          />
          
          <p className="text-sm font-medium text-center mb-8">
            Membantu sekolah, mitra, dan masyarakat dalam memantau serta melaporkan keamanan dan kualitas makanan siswa
          </p>

          {/* Daftar Fitur (Pill Box) */}
          <div className="space-y-3">
            <div className="bg-white/20 backdrop-blur-sm py-3 px-5 rounded-xl flex items-center gap-3 text-sm font-bold shadow-sm">
              <span className="text-lg">🟣</span> Monitoring Alergi Siswa
            </div>
            <div className="bg-white/20 backdrop-blur-sm py-3 px-5 rounded-xl flex items-center gap-3 text-sm font-bold shadow-sm">
              <span className="text-lg">📱</span> Pelaporan Makanan
            </div>
            <div className="bg-white/20 backdrop-blur-sm py-3 px-5 rounded-xl flex items-center gap-3 text-sm font-bold shadow-sm">
              <span className="text-lg">📋</span> Input & Laporan Menu Harian
            </div>
          </div>
        </div>
      </div>

      {/* --- BAGIAN KANAN (Formulir Daftar) --- */}
      <div className="w-7/12 bg-[#E0F2FE] flex flex-col items-center justify-center p-10">
        
        <h1 className="text-4xl font-black text-[#1E3A8A] mb-10">Daftar Akun</h1>

        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10 border border-blue-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid Input 2 Kolom */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Nama Lengkap */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <span>👤</span> Nama Lengkap
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" 
                  required 
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <span>📧</span> Email
                </label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" 
                  required 
                />
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <span>🔒</span> Password
                </label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" 
                  required 
                />
              </div>

              {/* No Handphone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <span>📱</span> No. Handphone
                </label>
                <input 
                  type="tel" 
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" 
                  required 
                />
              </div>

            </div>

            {/* Tombol Daftar */}
            <div className="pt-6">
              <button 
                type="submit" 
                className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition shadow-md"
              >
                Daftar
              </button>
            </div>

            {/* Tautan Masuk */}
            <div className="text-center text-xs font-bold text-gray-500 mt-6">
              Sudah Punya Akun?{' '}
              <span 
                onClick={() => navigate('/login')} 
                className="text-[#2563EB] cursor-pointer hover:underline"
              >
                Masuk
              </span>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}