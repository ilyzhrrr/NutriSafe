import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function HalamanUtama() {
  const navigate = useNavigate()
  const [showTentang, setShowTentang] = useState(false)
  const [showCaraMitra, setShowCaraMitra] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [stats, setStats] = useState({ total_school: 0, total_sppg: 0, total_student: 0 })

  useEffect(() => {
    api.get('/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch(() => {})
  }, [])

  const openTentang = () => { setMenuOpen(false); setShowTentang(true) }
  const openCaraMitra = () => { setMenuOpen(false); setShowCaraMitra(true) }
  const goLogin = () => { setMenuOpen(false); navigate('/login') }

  return (
    <div className="min-h-screen bg-[#E0F2FE] font-sans relative pb-10">
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-10 py-4 sm:py-5 text-[#1E3A8A] font-bold text-xs bg-[#E0F2FE] relative">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/logo.png" alt="Logo MBG" className="w-9 h-9 sm:w-10 sm:h-10" />
          <span className="text-base sm:text-xl font-black">NutriSafe MBG</span>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <button onClick={() => window.scrollTo(0, 0)} className="bg-[#93C5FD] px-4 lg:px-5 py-2 rounded-full cursor-pointer hover:bg-blue-300 transition text-[#1E3A8A]">
            Beranda
          </button>
          <button onClick={() => setShowTentang(true)} className="hover:text-blue-600 transition">
            Tentang MBG
          </button>
          <button onClick={() => setShowCaraMitra(true)} className="hover:text-blue-600 transition">
            Cara Menjadi Mitra
          </button>
          <div onClick={() => navigate('/login')} className="cursor-pointer hover:text-blue-600 transition">
            Masuk/Daftar
          </div>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka menu"
          className="md:hidden p-2 rounded-lg hover:bg-white/40 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-40 flex flex-col py-3 px-4 gap-1">
            <button onClick={() => { setMenuOpen(false); window.scrollTo(0, 0) }} className="text-left py-2.5 px-3 rounded-lg bg-[#93C5FD] text-[#1E3A8A] font-bold">
              Beranda
            </button>
            <button onClick={openTentang} className="text-left py-2.5 px-3 rounded-lg hover:bg-blue-50 font-bold">
              Tentang MBG
            </button>
            <button onClick={openCaraMitra} className="text-left py-2.5 px-3 rounded-lg hover:bg-blue-50 font-bold">
              Cara Menjadi Mitra
            </button>
            <button onClick={goLogin} className="text-left py-2.5 px-3 rounded-lg hover:bg-blue-50 font-bold">
              Masuk/Daftar
            </button>
          </div>
        )}
      </nav>

      <section className="relative w-full mt-2">
        <img src="/utama.png" alt="Banner" className="w-full h-auto object-cover" />
        <div className="absolute top-2 sm:top-4 left-4 sm:left-10 max-w-[60%] sm:max-w-md pointer-events-none">
          <h2 className="text-[10px] sm:text-sm md:text-lg font-normal text-[#1E3A8A] leading-tight drop-shadow-sm">
            Platform Monitoring & Pelaporan Keamanan Makanan Siswa (MBG)
          </h2>
        </div>
      </section>

      <div className="w-full bg-white shadow-sm border-y border-gray-100 py-4 sm:py-6 my-0 grid grid-cols-3 px-2 sm:px-8 divide-x divide-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-1 sm:gap-5 px-2">
          <span className="text-2xl sm:text-[44px] drop-shadow-sm leading-none">🏫</span>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg sm:text-3xl leading-tight font-black text-black">{stats.total_school.toLocaleString('id-ID')}</h3>
            <p className="text-gray-800 text-[10px] sm:text-xs font-bold leading-tight mt-0.5 sm:mt-0">Sekolah<br className="sm:hidden"/> Terdaftar</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-1 sm:gap-5 px-2">
          <span className="text-2xl sm:text-[44px] drop-shadow-sm leading-none">👥</span>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg sm:text-3xl leading-tight font-black text-black">{stats.total_sppg.toLocaleString('id-ID')}</h3>
            <p className="text-gray-800 text-[10px] sm:text-xs font-bold leading-tight mt-0.5 sm:mt-0">Mitra SPPG</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-1 sm:gap-5 px-2">
          <span className="text-2xl sm:text-[44px] drop-shadow-sm leading-none">🧑‍🎓</span>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg sm:text-3xl leading-tight font-black text-black">{stats.total_student.toLocaleString('id-ID')}</h3>
            <p className="text-gray-800 text-[10px] sm:text-xs font-bold leading-tight mt-0.5 sm:mt-0">Siswa</p>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto py-2 px-4 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col items-center">
          <img src="/mitra.png" alt="Ilustrasi Mitra" className="w-40 h-28 sm:w-48 sm:h-32 object-contain mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6">Untuk Mitra</h3>
          <div className="w-full space-y-3">
            <div className="relative bg-[#3B82F6] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">🟣</span>Monitoring Alergi Siswa
            </div>
            <div className="relative bg-[#3B82F6] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📊</span>Data Sekolah
            </div>
            <div className="relative bg-[#3B82F6] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📱</span>Pelaporan Menu Harian
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col items-center">
          <img src="/umum.png" alt="Ilustrasi Umum" className="w-40 h-28 sm:w-48 sm:h-32 object-contain mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6">Untuk Umum</h3>
          <div className="w-full space-y-3">
            <div className="relative bg-[#F97316] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📱</span>Pelaporan Makanan
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col items-center">
          <img src="/sekolah.png" alt="Ilustrasi Sekolah" className="w-40 h-28 sm:w-48 sm:h-32 object-contain mb-4 sm:mb-6" />
          <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4 sm:mb-6">Untuk Sekolah</h3>
          <div className="w-full space-y-3">
            <div className="relative bg-[#22C55E] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📊</span>Menambahkan Data Alergi Siswa
            </div>
            <div className="relative bg-[#22C55E] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📋</span>Pelaporan Makanan
            </div>
          </div>
        </div>
      </section>

      {showTentang && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <button onClick={() => setShowTentang(false)} className="absolute top-4 right-5 text-2xl font-bold text-gray-400 hover:text-red-500 z-10">✕</button>
            <div className="p-6 sm:p-10 overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-black text-[#1E3A8A] text-center mb-4 sm:mb-6">Tentang MBG</h2>
              <div className="text-xs text-gray-700 font-semibold leading-relaxed space-y-4">
                <p>Program MBG (Mitra Bersama Gizi) merupakan platform digital yang bertujuan untuk mendukung distribusi pangan bergizi ke seluruh sekolah melalui kerja sama dengan mitra SPPG (Satuan Pelayanan Pemenuhan Gizi).</p>
                <p>Melalui sistem ini, pemerintah dapat mengelola proses pendaftaran mitra, verifikasi, hingga penugasan distribusi secara terstruktur dan transparan.</p>
                <div>
                  <p className="font-black text-gray-800">Visi:</p>
                  <p>Mewujudkan sistem distribusi pangan bergizi yang efektif, merata, dan berkelanjutan bagi seluruh sekolah.</p>
                </div>
                <div>
                  <p className="font-black text-gray-800">Misi:</p>
                  <p>• Meningkatkan akses pangan bergizi bagi peserta didik.</p>
                  <p>• Membangun kemitraan yang terpercaya dengan penyedia SPPG.</p>
                  <p>• Mengimplementasikan kontrol melalui sistem digital yang terintegrasi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCaraMitra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
            <button onClick={() => setShowCaraMitra(false)} className="absolute top-4 right-5 text-2xl font-bold text-gray-400 hover:text-red-500 z-10">✕</button>
            <div className="p-6 sm:p-10 flex flex-col items-center overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-black text-[#1E3A8A] text-center mb-4 sm:mb-6">Cara Menjadi Mitra</h2>
              <div className="text-[11px] text-gray-700 font-semibold leading-relaxed space-y-4 w-full">
                <p>1. Daftarkan diri melalui halaman Pendaftaran Mitra dengan mengisi data diri dan informasi usaha secara lengkap.</p>
                <p>2. Lengkapi informasi SPPG (nama, alamat, kapasitas produksi) dan upload dokumen pendukung.</p>
                <p>3. Tim MBG akan melakukan verifikasi terhadap data dan dokumen yang telah diajukan.</p>
                <p>4. Setelah disetujui, Anda ditetapkan sebagai mitra SPPG resmi dan dapat mulai mengelola layanan.</p>
                <p>5. Mitra aktif akan menerima penugasan distribusi ke sekolah yang ditentukan.</p>
              </div>
              <button
                onClick={() => { setShowCaraMitra(false); navigate('/formulir-pendaftaran') }}
                className="mt-6 sm:mt-8 bg-[#2563EB] text-white px-8 sm:px-10 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition"
              >
                Daftar Menjadi Mitra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
