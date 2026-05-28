import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SidebarSekolah() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Menyiapkan referensi untuk elemen yang digulir
  const scrollRef = useRef(null)

  // Mengembalikan posisi gulir saat komponen dimuat
  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem('sidebarSekolahScroll')
    if (scrollRef.current && savedScrollPos) {
      scrollRef.current.scrollTop = parseInt(savedScrollPos, 10)
    }
  }, [])

  // Menyimpan posisi setiap kali elemen digulir
  const handleScroll = () => {
    if (scrollRef.current) {
      sessionStorage.setItem('sidebarSekolahScroll', scrollRef.current.scrollTop)
    }
  }

  const isActive = (path) => location.pathname.includes(path)
  
  const menuClass = (path) => 
    `flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer text-sm transition-all ${
      isActive(path) ? 'bg-white/30 font-bold' : 'hover:bg-white/10 font-medium'
    }`

  return (
    <aside className="w-[300px] bg-[#22C55E] text-white p-4 flex flex-col sticky top-0 h-screen shadow-xl shrink-0 overflow-hidden">
      
      {/* Bagian Atas */}
      <div className="flex items-center gap-3 mb-2 shrink-0">
        <img src="/logo.png" alt="Logo" className="w-8 h-8 bg-white rounded-full p-1" />
        <span className="text-lg font-bold">NutriSafe MBG</span>
      </div>
      
      {/* Bagian Tengah (Area yang bisa digulir) */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto pr-1 flex flex-col custom-scrollbar"
      >
        <div className="mb-2 shrink-0">
          <img src="/utama.png" alt="Illustration" className="w-full rounded-xl shadow-sm bg-white/20 mb-2" />
          <h2 className="text-3xl font-bold leading-tight mb-2">
            Dashboard<br/>Sekolah
          </h2>
        </div>

        <nav className="flex flex-col gap-1">
          <div onClick={() => navigate('/sekolah/data-siswa')} className={menuClass('/sekolah/data-siswa')}>
            <span>Input Data Siswa</span><span className="font-bold">&gt;</span>
          </div>

          <div onClick={() => navigate('/sekolah/input-alergi')} className={menuClass('/sekolah/input-alergi')}>
            <span>Input Data Alergi Siswa</span><span className="font-bold">&gt;</span>
          </div>
          
          <div onClick={() => navigate('/sekolah/pelaporan')} className={menuClass('/sekolah/pelaporan')}>
            <span>Pelaporan Makanan oleh Sekolah</span><span className="font-bold">&gt;</span>
          </div>
          
          <div onClick={() => navigate('/sekolah/makanan-alergi')} className={menuClass('/sekolah/makanan-alergi')}>
            <span>Makanan khusus siswa alergi</span><span className="font-bold">&gt;</span>
          </div>
        </nav>
      </div>

      {/* Bagian Bawah */}
      <div className="pt-2 border-t border-white/20 flex flex-col gap-1 shrink-0 mt-2">
        <div 
          onClick={() => navigate('/sekolah/akun')}
          className={`flex items-center gap-3 cursor-pointer text-sm py-1 transition-all ${isActive('akun') ? 'text-white font-semibold' : 'hover:text-green-200 font-normal'}`}
        >
          <span className="text-lg">👤</span><span>Akun</span>
        </div>
        <div 
          onClick={() => navigate('/sekolah/pengaturan')}
          className={`flex items-center gap-3 cursor-pointer text-sm py-1 transition-all ${isActive('pengaturan') ? 'text-white font-semibold' : 'hover:text-green-200 font-normal'}`}
        >
          <span className="text-lg">⚙️</span><span>Pengaturan</span>
        </div>
      </div>

    </aside>
  )
}