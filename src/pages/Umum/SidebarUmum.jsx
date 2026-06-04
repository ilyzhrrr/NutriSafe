import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SidebarUmum() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const isActive = (path) => location.pathname.includes(path)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const go = (path) => {
    navigate(path)
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="lg:hidden fixed top-3 left-3 z-30 bg-[#F97316] text-white p-2 rounded-lg shadow-lg active:scale-95 transition"
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
          bg-[#F97316] text-white p-4 flex flex-col shadow-xl shrink-0 overflow-hidden
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

        <div className="flex-1 overflow-y-auto pr-1 flex flex-col">
          <div className="mb-2 shrink-0">
            <img src="/utama.png" alt="Illustration" className="w-full rounded-xl shadow-sm bg-white/20 mb-2" />
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-2">
              Dashboard<br/>Umum
            </h2>
          </div>

          <nav className="flex flex-col gap-0.5">
            <div
              onClick={() => go('/umum/pelaporan')}
              className={`flex justify-between items-center px-4 py-1.5 rounded-full text-sm transition-all ${isActive('pelaporan') ? 'bg-white/30 cursor-default font-semibold' : 'cursor-pointer hover:bg-white/10'}`}
            >
              <span>Pelaporan Makanan</span><span>&gt;</span>
            </div>
          </nav>
        </div>

        <div className="pt-2 border-t border-white/20 flex flex-col gap-1 shrink-0 mt-2">
          <div
            onClick={() => go('/umum/akun')}
            className={`flex items-center gap-3 px-4 py-1.5 rounded-full cursor-pointer text-sm transition-all ${isActive('akun') ? 'bg-white/30 font-semibold' : 'hover:bg-white/10'}`}
          >
            <span className="text-lg">👤</span><span>Akun</span>
          </div>
          <div
            onClick={() => go('/umum/pengaturan')}
            className={`flex items-center gap-3 px-4 py-1.5 rounded-full cursor-pointer text-sm transition-all ${isActive('pengaturan') ? 'bg-white/30 font-semibold' : 'hover:bg-white/10'}`}
          >
            <span className="text-lg">⚙️</span><span>Pengaturan</span>
          </div>
        </div>

      </aside>
    </>
  )
}
