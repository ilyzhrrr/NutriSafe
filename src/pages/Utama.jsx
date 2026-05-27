import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HalamanUtama() {
  const navigate = useNavigate()

  // State untuk mengontrol Modal (Pop-up)
  const [showTentang, setShowTentang] = useState(false)
  const [showCaraMitra, setShowCaraMitra] = useState(false)

  return (
    <div className="min-h-screen bg-[#E0F2FE] font-sans relative pb-10">
      
      {/* --- NAVBAR --- */}
      <nav className="flex justify-between items-center px-10 py-5 text-[#1E3A8A] font-bold text-xs bg-[#E0F2FE]">
        {/* Bagian Kiri: Logo & Nama */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo MBG" className="w-10 h-10" />
          <span className="text-xl font-black">NutriSafe MBG</span>
        </div>

        {/* Bagian Kanan: Menu Navigasi */}
        <div className="flex items-center gap-6">
          <button onClick={() => window.scrollTo(0,0)} className="bg-[#93C5FD] px-5 py-2 rounded-full cursor-pointer hover:bg-blue-300 transition text-[#1E3A8A]">
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
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full max-w-5xl mx-auto mt-2 px-4">
        <img src="/utama.png" alt="Banner" className="w-full h-auto rounded-3xl shadow-md object-cover" />
        <div className="absolute top-8 right-12">
          <button 
            /* DIUBAH: Langsung ke halaman formulir pendaftaran */
            onClick={() => navigate('/formulir-pendaftaran')}
            className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Daftar Menjadi Mitra
          </button>
        </div>
      </section>

      {/* --- STATISTIK GLOBAL --- */}
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 py-6 my-8 flex items-center justify-between px-8">
        
        {/* Statistik 1: Sekolah Terdaftar */}
        <div className="flex-1 flex items-center justify-center gap-5">
          <span className="text-[44px] drop-shadow-sm">🏫</span>
          <div className="flex flex-col text-left">
            <h3 className="text-3xl leading-tight font-black text-black">443.703</h3>
            <p className="text-gray-800 text-xs font-bold">Sekolah Terdaftar</p>
          </div>
        </div>

        {/* Garis Pemisah Vertikal */}
        <div className="w-px h-12 bg-gray-300"></div>

        {/* Statistik 2: Mitra SPPG */}
        <div className="flex-1 flex items-center justify-center gap-5">
          <span className="text-[44px] drop-shadow-sm">👥</span>
          <div className="flex flex-col text-left">
            <h3 className="text-3xl leading-tight font-black text-black">24.000</h3>
            <p className="text-gray-800 text-xs font-bold">Mitra SPPG</p>
          </div>
        </div>

        {/* Garis Pemisah Vertikal */}
        <div className="w-px h-12 bg-gray-300"></div>

        {/* Statistik 3: Siswa */}
        <div className="flex-1 flex items-center justify-center gap-5">
          <span className="text-[44px] drop-shadow-sm">🧑‍🎓</span>
          <div className="flex flex-col text-left">
            <h3 className="text-3xl leading-tight font-black text-black">59,86 Juta</h3>
            <p className="text-gray-800 text-xs font-bold">Siswa</p>
          </div>
        </div>

      </div>

      {/* --- BAGIAN FITUR KARTU --- */}
      <section className="max-w-5xl mx-auto py-2 px-4 flex justify-center gap-6 mb-10">
        
        {/* Kartu 1: Untuk Mitra */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col items-center">
          <img src="/mitra.png" alt="Ilustrasi Mitra" className="w-48 h-32 object-contain mb-6" />
          <h3 className="text-xl font-black text-gray-800 mb-6">Untuk Mitra</h3>
          <div className="w-full space-y-3">
            <div className="relative bg-[#3B82F6] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">🟣</span>
              Monitoring Alergi Siswa
            </div>
            <div className="relative bg-[#3B82F6] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📊</span>
              Data Sekolah
            </div>
            <div className="relative bg-[#3B82F6] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📱</span>
              Pelaporan Menu Harian
            </div>
          </div>
        </div>

        {/* Kartu 2: Untuk Umum */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col items-center">
          <img src="/umum.png" alt="Ilustrasi Umum" className="w-48 h-32 object-contain mb-6" />
          <h3 className="text-xl font-black text-gray-800 mb-6">Untuk Umum</h3>
          <div className="w-full space-y-3">
            <div className="relative bg-[#F97316] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📱</span>
              Pelaporan Makanan
            </div>
          </div>
        </div>

        {/* Kartu 3: Untuk Sekolah */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col items-center">
          <img src="/sekolah.png" alt="Ilustrasi Sekolah" className="w-48 h-32 object-contain mb-6" />
          <h3 className="text-xl font-black text-gray-800 mb-6">Untuk Sekolah</h3>
          <div className="w-full space-y-3">
            <div className="relative bg-[#22C55E] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📊</span>
              Menambahkan Data Alergi Siswa
            </div>
            <div className="relative bg-[#22C55E] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📋</span>
              Pelaporan Makanan
            </div>
          </div>
        </div>

      </section>

      {/* --- MODAL: TENTANG MBG --- */}
      {showTentang && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
            <button onClick={() => setShowTentang(false)} className="absolute top-5 right-6 text-2xl font-bold text-gray-400 hover:text-red-500">✕</button>
            <div className="p-10">
              <h2 className="text-2xl font-black text-[#1E3A8A] text-center mb-6">Tentang MBG</h2>
              <div className="text-xs text-gray-700 font-semibold leading-relaxed space-y-4">
                <p>Program MBG (Mitra Bersama Gizi) merupakan platform digital yang bertujuan untuk mendukung distribusi pangan bergizi ke seluruh sekolah melalui kerja sama dengan mitra SPPG (Satuan Pelayanan Pemenuhan Gizi).</p>
                <p>Melalui sistem ini, pemerintah dapat mengelola proses pendaftaran mitra, verifikasi, hingga penugasan distribusi secara terstruktur dan transparan. Di sisi lain, mitra dapat dengan mudah mengelola informasi, mendata siswa, serta melaporkan kegiatan distribusi sesuai dengan ketentuan yang berlaku.</p>
                <div>
                  <p className="font-black text-gray-800">Visi:</p>
                  <p>Mewujudkan sistem distribusi pangan bergizi yang efektif, merata, dan berkelanjutan bagi seluruh sekolah.</p>
                </div>
                <div>
                  <p className="font-black text-gray-800">Misi:</p>
                  <p>• Meningkatkan akses pangan bergizi bagi peserta didik.</p>
                  <p>• Membangun kemitraan yang terpercaya dengan penyedia SPPG.</p>
                  <p>• Mengimplementasikan kontrol melalui sistem digital yang terintegrasi.</p>
                  <p>• Menjamin transparansi dan akuntabilitas dalam setiap setiap proses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CARA MENJADI MITRA --- */}
      {showCaraMitra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
            <button onClick={() => setShowCaraMitra(false)} className="absolute top-5 right-6 text-2xl font-bold text-gray-400 hover:text-red-500">✕</button>
            <div className="p-10 flex flex-col items-center">
              <h2 className="text-2xl font-black text-[#1E3A8A] text-center mb-6">Cara Menjadi Mitra</h2>
              <div className="text-[11px] text-gray-700 font-semibold leading-relaxed space-y-4 w-full">
                <p>Ikuti langkah-langkah berikut untuk bergabung sebagai mitra resmi dalam program MBG:</p>
                <p>1. **Registrasi Mitra:** Daftarkan diri Anda melalui halaman Pendaftaran Mitra dengan mengisi data diri dan informasi usaha secara lengkap dan benar.</p>
                <p>2. **Pengisian Data SPPG:** Lengkapi informasi terkait SPPG yang Anda jalankan, seperti nama SPPG, alamat, kapasitas produksi, serta unggah dokumen pendukung yang dibutuhkan.</p>
                <p>3. **Proses Verifikasi:** Tim MBG akan melakukan verifikasi terhadap data dan dokumen yang telah diajukan untuk memastikan kesesuaian dengan ketentuan.</p>
                <p>4. **Persetujuan Mitra:** Apabila lolos proses verifikasi, Anda akan ditetapkan sebagai mitra SPPG resmi dan dapat mulai mengelola layanan dalam sistem.</p>
                <p>5. **Penugasan dan Distribusi:** Mitra yang telah aktif akan menerima penugasan distribusi ke sekolah yang ditentukan, serta dapat memantau kegiatan melalui sistem MBG.</p>
              </div>
              <button 
                /* DIUBAH: Menutup pop-up lalu pindah ke halaman formulir */
                onClick={() => { setShowCaraMitra(false); navigate('/formulir-pendaftaran'); }}
                className="mt-8 bg-[#2563EB] text-white px-10 py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition"
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