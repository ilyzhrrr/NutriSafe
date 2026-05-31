import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function HalamanUtama() {
  const navigate = useNavigate()
  const [showTentang, setShowTentang] = useState(false)
  const [showCaraMitra, setShowCaraMitra] = useState(false)
  const [stats, setStats] = useState({ total_school: 0, total_sppg: 0, total_student: 0 })

  useEffect(() => {
    api.get('/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-[#E0F2FE] font-sans relative pb-10">
      <nav className="flex justify-between items-center px-10 py-5 text-[#1E3A8A] font-bold text-xs bg-[#E0F2FE]">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo MBG" className="w-10 h-10" />
          <span className="text-xl font-black">NutriSafe MBG</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => window.scrollTo(0, 0)} className="bg-[#93C5FD] px-5 py-2 rounded-full cursor-pointer hover:bg-blue-300 transition text-[#1E3A8A]">
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

      <section className="relative w-full mt-2">
        <img src="/utama.png" alt="Banner" className="w-full h-auto object-cover" />
        <div className="absolute top-4 left-10 max-w-md pointer-events-none">
          <h2 className="text-lg font-normal text-[#1E3A8A] leading-tight drop-shadow-sm">
            Platform Monitoring & Pelaporan Keamanan Makanan Siswa (MBG)
          </h2>
        </div>
      </section>

      <div className="w-full bg-white shadow-sm border-y border-gray-100 py-6 my-0 flex items-center justify-between px-8">
        <div className="flex-1 flex items-center justify-center gap-5">
          <span className="text-[44px] drop-shadow-sm">🏫</span>
          <div className="flex flex-col text-left">
            <h3 className="text-3xl leading-tight font-black text-black">{stats.total_school.toLocaleString('id-ID')}</h3>
            <p className="text-gray-800 text-xs font-bold">Sekolah Terdaftar</p>
          </div>
        </div>
        <div className="w-px h-12 bg-gray-300"></div>
        <div className="flex-1 flex items-center justify-center gap-5">
          <span className="text-[44px] drop-shadow-sm">👥</span>
          <div className="flex flex-col text-left">
            <h3 className="text-3xl leading-tight font-black text-black">{stats.total_sppg.toLocaleString('id-ID')}</h3>
            <p className="text-gray-800 text-xs font-bold">Mitra SPPG</p>
          </div>
        </div>
        <div className="w-px h-12 bg-gray-300"></div>
        <div className="flex-1 flex items-center justify-center gap-5">
          <span className="text-[44px] drop-shadow-sm">🧑‍🎓</span>
          <div className="flex flex-col text-left">
            <h3 className="text-3xl leading-tight font-black text-black">{stats.total_student.toLocaleString('id-ID')}</h3>
            <p className="text-gray-800 text-xs font-bold">Siswa</p>
          </div>
        </div>
      </div>

      <section className="max-w-5xl mx-auto py-2 px-4 flex justify-center gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col items-center">
          <img src="/mitra.png" alt="Ilustrasi Mitra" className="w-48 h-32 object-contain mb-6" />
          <h3 className="text-xl font-black text-gray-800 mb-6">Untuk Mitra</h3>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col items-center">
          <img src="/umum.png" alt="Ilustrasi Umum" className="w-48 h-32 object-contain mb-6" />
          <h3 className="text-xl font-black text-gray-800 mb-6">Untuk Umum</h3>
          <div className="w-full space-y-3">
            <div className="relative bg-[#F97316] text-white text-center py-2.5 rounded-lg text-xs font-semibold cursor-default flex items-center justify-center">
              <span className="absolute left-3 text-sm">📱</span>Pelaporan Makanan
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex-1 flex flex-col items-center">
          <img src="/sekolah.png" alt="Ilustrasi Sekolah" className="w-48 h-32 object-contain mb-6" />
          <h3 className="text-xl font-black text-gray-800 mb-6">Untuk Sekolah</h3>
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
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
            <button onClick={() => setShowTentang(false)} className="absolute top-5 right-6 text-2xl font-bold text-gray-400 hover:text-red-500">✕</button>
            <div className="p-10">
              <h2 className="text-2xl font-black text-[#1E3A8A] text-center mb-6">Tentang MBG</h2>
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
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
            <button onClick={() => setShowCaraMitra(false)} className="absolute top-5 right-6 text-2xl font-bold text-gray-400 hover:text-red-500">✕</button>
            <div className="p-10 flex flex-col items-center">
              <h2 className="text-2xl font-black text-[#1E3A8A] text-center mb-6">Cara Menjadi Mitra</h2>
              <div className="text-[11px] text-gray-700 font-semibold leading-relaxed space-y-4 w-full">
                <p>1. Daftarkan diri melalui halaman Pendaftaran Mitra dengan mengisi data diri dan informasi usaha secara lengkap.</p>
                <p>2. Lengkapi informasi SPPG (nama, alamat, kapasitas produksi) dan upload dokumen pendukung.</p>
                <p>3. Tim MBG akan melakukan verifikasi terhadap data dan dokumen yang telah diajukan.</p>
                <p>4. Setelah disetujui, Anda ditetapkan sebagai mitra SPPG resmi dan dapat mulai mengelola layanan.</p>
                <p>5. Mitra aktif akan menerima penugasan distribusi ke sekolah yang ditentukan.</p>
              </div>
              <button
                onClick={() => { setShowCaraMitra(false); navigate('/formulir-pendaftaran') }}
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
