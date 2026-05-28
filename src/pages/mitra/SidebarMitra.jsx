import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SidebarMitra() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  
  // Referensi untuk menangkap elemen sidebar
  const sidebarRef = useRef(null)

  // Mengembalikan posisi scroll terakhir saat komponen dimuat
  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem('sidebarMitraScroll')
    if (sidebarRef.current && savedScrollPos) {
      sidebarRef.current.scrollTop = parseInt(savedScrollPos, 10)
    }
  }, [])

  // Menyimpan posisi scroll setiap kali digulir
  const handleScroll = () => {
    if (sidebarRef.current) {
      sessionStorage.setItem('sidebarMitraScroll', sidebarRef.current.scrollTop)
    }
  }

  const menuClass = (path) => {
    return currentPath.includes(path)
      ? "flex justify-between items-center pl-3 pr-3 py-2 bg-[#2563EB] rounded-lg border-l-4 border-white cursor-default text-xs font-semibold"
      : "flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs"
  }

  const bottomMenuClass = (path) => {
    return currentPath.includes(path)
      ? "flex items-center gap-3 bg-[#2563EB] rounded-lg py-2 pl-3 border-l-4 border-white cursor-default text-xs font-semibold"
      : "flex items-center gap-3 cursor-pointer hover:text-blue-200 text-xs font-semibold pl-3 transition"
  }

  return (
    <aside 
      ref={sidebarRef}
      onScroll={handleScroll}
      className="w-1/4 bg-[#3B82F6] text-white p-4 flex flex-col sticky top-0 h-screen overflow-y-auto"
    >
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
            <div onClick={() => navigate('/mitra/status-kemitraan')} className={menuClass('/mitra/status-kemitraan')}>
              <span>Status Kemitraan & Daftar SPPG</span><span className="font-bold">&gt;</span>
            </div>
            <div onClick={() => navigate('/mitra/riwayat-laporan')} className={menuClass('/mitra/riwayat-laporan')}>
              <span>Riwayat Laporan</span><span className="font-bold">&gt;</span>
            </div>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">🏢</span> Menu Pengelola</p>
          <div className="space-y-1">
            <div onClick={() => navigate('/mitra/monitoring-alergi')} className={menuClass('/mitra/monitoring-alergi')}>
              <span>Monitoring Alergi Siswa</span><span className="font-bold">&gt;</span>
            </div>
            <div onClick={() => navigate('/mitra/scan-makanan')} className={menuClass('/mitra/scan-makanan')}>
              <span>Scan & Pelaporan Menu Makanan</span><span className="font-bold">&gt;</span>
            </div>
            <div onClick={() => navigate('/mitra/daftar-sekolah')} className={menuClass('/mitra/daftar-sekolah')}>
              <span>Daftar Sekolah</span><span className="font-bold">&gt;</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-4 border-t border-white/20 space-y-3 mt-auto pr-2 pb-4">
        <div onClick={() => navigate('/mitra/profile')} className={bottomMenuClass('/mitra/profile')}>
          <span className="text-base">👤</span><span>Akun</span>
        </div>
        <div onClick={() => navigate('/mitra/pengaturan')} className={bottomMenuClass('/mitra/pengaturan')}>
          <span className="text-base">⚙️</span><span>Pengaturan</span>
        </div>
      </div>
    </aside>
  )
}