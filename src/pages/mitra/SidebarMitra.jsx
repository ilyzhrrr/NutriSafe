import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarMitra() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const savedScrollPos = sessionStorage.getItem("sidebarMitraScroll");
    if (sidebarRef.current && savedScrollPos) {
      sidebarRef.current.scrollTop = parseInt(savedScrollPos, 10);
    }
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  const handleScroll = () => {
    if (sidebarRef.current) {
      sessionStorage.setItem(
        "sidebarMitraScroll",
        sidebarRef.current.scrollTop,
      );
    }
  };

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  const menuClass = (path) => {
    return currentPath.includes(path)
      ? "flex justify-between items-center pl-3 pr-3 py-2 bg-[#2563EB] rounded-lg border-l-4 border-white cursor-default text-xs font-semibold"
      : "flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs";
  };

  const bottomMenuClass = (path) => {
    return currentPath.includes(path)
      ? "flex items-center gap-3 bg-[#2563EB] rounded-lg py-2 pl-3 border-l-4 border-white cursor-default text-xs font-semibold"
      : "flex items-center gap-3 cursor-pointer hover:text-blue-200 text-xs font-semibold pl-3 transition";
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="lg:hidden fixed top-3 left-3 z-30 bg-[#3B82F6] text-white p-2 rounded-lg shadow-lg active:scale-95 transition"
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
        ref={sidebarRef}
        onScroll={handleScroll}
        className={`
          bg-[#3B82F6] text-white p-4 flex flex-col shrink-0 overflow-y-auto
          fixed lg:sticky top-0 left-0 z-50
          w-[260px] sm:w-[280px] lg:w-1/4 h-screen
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Tutup menu"
          className="lg:hidden absolute top-3 right-3 text-white/90 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold">NutriSafe MBG</span>
        </div>

        <div className="mb-4">
          <img
            src="/utama.png"
            alt="Illustration"
            className="w-full rounded-xl shadow-md bg-white/20 p-1"
          />
        </div>

        <h2 className="text-xl font-bold leading-tight mb-6">
          Dashboard Mitra <br /> & Pengelola
        </h2>

        <nav className="flex-1 space-y-4 pr-2">
          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm">
              <span className="text-lg">📋</span> Menu Mitra
            </p>
            <div className="space-y-1">
              <div
                onClick={() => go("/mitra/status-kemitraan")}
                className={menuClass("/mitra/status-kemitraan")}
              >
                <span>Status Kemitraan & Daftar SPPG</span>
                <span className="font-bold">&gt;</span>
              </div>
              <div
                onClick={() => go("/mitra/riwayat-laporan")}
                className={menuClass("/mitra/riwayat-laporan")}
              >
                <span>Riwayat Laporan</span>
                <span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm">
              <span className="text-lg">🏢</span> Menu Pengelola
            </p>
            <div className="space-y-1">
              <div
                onClick={() => go("/mitra/monitoring-alergi")}
                className={menuClass("/mitra/monitoring-alergi")}
              >
                <span>Monitoring Alergi Siswa</span>
                <span className="font-bold">&gt;</span>
              </div>
              <div
                onClick={() => go("/mitra/scan-makanan")}
                className={menuClass("/mitra/scan-makanan")}
              >
                <span>Scan & Pelaporan Menu Makanan</span>
                <span className="font-bold">&gt;</span>
              </div>
              <div
                onClick={() => go("/mitra/pelaporan-masalah-makanan")}
                className={menuClass("/mitra/pelaporan-masalah-makanan")}
              >
                <span>Pelaporan Masalah Makanan</span>
                <span className="font-bold">&gt;</span>
              </div>
              <div
                onClick={() => go("/mitra/daftar-sekolah")}
                className={menuClass("/mitra/daftar-sekolah")}
              >
                <span>Daftar Sekolah</span>
                <span className="font-bold">&gt;</span>
              </div>

              <div onClick={() => go('/mitra/makanan-bermasalah')} className={menuClass('/mitra/makanan-bermasalah')}>
                <span>Laporan Makanan Bermasalah</span><span className="font-bold">&gt;</span>
              </div>

            </div>
          </div>
        </nav>

        <div className="pt-4 border-t border-white/20 space-y-3 mt-auto pr-2 pb-4">
          <div
            onClick={() => go("/mitra/profile")}
            className={bottomMenuClass("/mitra/profile")}
          >
            <span className="text-base">👤</span>
            <span>Akun</span>
          </div>
          <div
            onClick={() => go("/mitra/pengaturan")}
            className={bottomMenuClass("/mitra/pengaturan")}
          >
            <span className="text-base">⚙️</span>
            <span>Pengaturan</span>
          </div>
        </div>
      </aside>
    </>
  );
}
