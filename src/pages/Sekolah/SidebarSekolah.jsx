import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SidebarSekolah() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const scrollRef = useRef(null)

  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem('sidebarSekolahScroll')
    if (scrollRef.current && savedScrollPos) {
      scrollRef.current.scrollTop = parseInt(savedScrollPos, 10)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleScroll = () => {
    if (scrollRef.current) {
      sessionStorage.setItem('sidebarSekolahScroll', scrollRef.current.scrollTop)
    }
  }

  const isActive = (path) => location.pathname.includes(path)

  const go = (path) => {
    navigate(path)
    setOpen(false)
  }

  const menuClass = (path) =>
    `flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer text-sm transition-all ${
      isActive(path) ? 'bg-white/30 font-bold' : 'hover:bg-white/10 font-medium'
    }`

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="lg:hidden fixed top-3 left-3 z-30 bg-[#22C55E] text-white p-2 rounded-lg shadow-lg active:scale-95 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      <aside
        className={`
          bg-[#22C55E] text-white p-4 flex flex-col shadow-xl shrink-0 overflow-hidden
          fixed lg:sticky top-0 left-0 z-50
          w-[260px] sm:w-[300px] h-screen
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Tutup menu"
          className="lg:hidden absolute top-3 right-3 text-white/90 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 z-10"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-2 shrink-0">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 bg-white rounded-full p-1" />
          <span className="text-lg font-bold">NutriSafe MBG</span>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto pr-1 flex flex-col custom-scrollbar"
        >
          <div className="mb-2 shrink-0">
            <img src="/utama.png" alt="Illustration" className="w-full rounded-xl shadow-sm bg-white/20 mb-2" />
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
              Dashboard<br/>Sekolah
            </h2>
          </div>

          <nav className="flex flex-col gap-1">
            <div onClick={() => go('/sekolah/penerimaan-makanan')} className={menuClass('/sekolah/penerimaan-makanan')}>
              <span>Penerimaan Makanan</span><span className="font-bold">&gt;</span>
            </div>

            <div onClick={() => go('/sekolah/data-guru')} className={menuClass('/sekolah/data-guru')}>
              <span>Input Data Guru</span><span className="font-bold">&gt;</span>
            </div>

            <div onClick={() => go('/sekolah/data-siswa')} className={menuClass('/sekolah/data-siswa')}>
              <span>Input Data Siswa</span><span className="font-bold">&gt;</span>
            </div>

            <div onClick={() => go('/sekolah/input-alergi')} className={menuClass('/sekolah/input-alergi')}>
              <span>Input Data Alergi Siswa</span><span className="font-bold">&gt;</span>
            </div>

            <div onClick={() => go('/sekolah/data-alergi')} className={menuClass('/sekolah/data-alergi')}>
              <span>Data Alergi Siswa</span><span className="font-bold">&gt;</span>
            </div>

            <div onClick={() => go('/sekolah/pelaporan')} className={menuClass('/sekolah/pelaporan')}>
              <span>Pelaporan Makanan oleh Sekolah</span><span className="font-bold">&gt;</span>
            </div>

            <div onClick={() => go('/sekolah/makanan-alergi')} className={menuClass('/sekolah/makanan-alergi')}>
              <span>Makanan khusus siswa alergi</span><span className="font-bold">&gt;</span>
            </div>
          </nav>
        </div>

        <div className="pt-2 border-t border-white/20 flex flex-col gap-1 shrink-0 mt-2">
          <div
            onClick={() => go('/sekolah/akun')}
            className={`flex items-center gap-3 cursor-pointer text-sm py-1 transition-all ${isActive('akun') ? 'text-white font-semibold' : 'hover:text-green-200 font-normal'}`}
          >
            <span className="text-lg">👤</span><span>Akun</span>
          </div>
          <div
            onClick={() => go('/sekolah/pengaturan')}
            className={`flex items-center gap-3 cursor-pointer text-sm py-1 transition-all ${isActive('pengaturan') ? 'text-white font-semibold' : 'hover:text-green-200 font-normal'}`}
          >
            <span className="text-lg">⚙️</span><span>Pengaturan</span>
          </div>
        </div>

      </aside>
    </>
  )
}
