import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SidebarSekolah() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname.includes(path)

  return (
    <aside className="w-[300px] bg-[#22C55E] text-white flex flex-col sticky top-0 h-screen shadow-xl shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain bg-white rounded-full p-1" />
          <h1 className="text-xl font-bold">NutriSafe MBG</h1>
        </div>
        
        <div className="mb-10 text-center">
          <img src="/utama.png" alt="Ilustrasi Utama" className="w-full rounded-2xl mb-4 bg-white/10" />
          <h2 className="text-2xl font-black leading-tight text-left">Dashboard Sekolah</h2>
        </div>

        <nav className="space-y-1">
          <button 
            onClick={() => navigate('/sekolah/input-alergi')}
            className={`w-full text-left p-2 rounded-xl text-sm font-bold transition flex justify-between items-center ${isActive('input-alergi') ? 'bg-white text-[#22C55E]' : 'hover:bg-white/8'}`}
          >
            Input Data Alergi Siswa <span>&gt;</span>
          </button>
          <button 
            onClick={() => navigate('/sekolah/pelaporan')}
            className={`w-full text-left p-2 rounded-xl text-sm font-bold transition flex justify-between items-center ${isActive('pelaporan') ? 'bg-white text-[#22C55E]' : 'hover:bg-white/8'}`}
          >
            Pelaporan Makanan oleh Sekolah <span>&gt;</span>
          </button>
          <button 
            onClick={() => navigate('/sekolah/makanan-alergi')}
            className={`w-full text-left p-2 rounded-xl text-sm font-bold transition flex justify-between items-center ${isActive('makanan-alergi') ? 'bg-white text-[#22C55E]' : 'hover:bg-white/8'}`}
          >
            Makanan khusus siswa alergi <span>&gt;</span>
          </button>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/20">
        <div className="flex items-center gap-2 mb-2 font-bold cursor-pointer"><span>👤</span> Akun</div>
        <div className="flex items-center gap-2 font-bold cursor-pointer"><span>⚙️</span> Pengaturan</div>
      </div>
    </aside>
  )
}