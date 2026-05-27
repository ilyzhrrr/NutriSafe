import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function MonitoringAlergi() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-1/4 bg-[#3B82F6] text-white p-4 flex flex-col sticky top-0 h-screen overflow-y-auto">
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
              <div onClick={() => navigate('/mitra/status-kemitraan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Status Kemitraan & Daftar SPPG</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/riwayat-laporan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Riwayat Laporan</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">🏢</span> Menu Pengelola</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center pl-3 pr-3 py-2 bg-[#2563EB] rounded-lg border-l-4 border-white cursor-default text-xs font-semibold">
                <span>Monitoring Alergi Siswa</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/scan-makanan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Scan & Pelaporan Menu Makanan</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/daftar-sekolah')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Daftar Sekolah</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-4 border-t border-white/20 space-y-2 mt-auto pr-2">
          <div onClick={() => navigate('/mitra/profile')} className="flex items-center gap-2 cursor-pointer hover:text-blue-200 text-sm">
            <span className="text-lg">👤</span><span>Akun</span>
          </div>
          <div onClick={() => navigate('/mitra/pengaturan')} className="flex items-center gap-2 cursor-pointer hover:text-blue-200 text-sm">
            <span className="text-lg">⚙️</span><span>Pengaturan</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT RIGHT --- */}
      <main className="w-3/4 p-8 overflow-y-auto">
        
        {/* Header Judul (Teks Diperkecil) */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#1E3A8A]">Dashboard Mitra</h1>
          <h2 className="text-lg font-bold text-[#3B82F6] mt-0.5">Monitoring Alergi siswa</h2>
        </div>

        {/* Kartu Atas (Teks dan Ikon Diperkecil) */}
        <div className="flex gap-6 mb-6 w-full max-w-3xl">
          <div className="flex-1 bg-[#FF8A8A] text-gray-900 p-5 rounded-2xl flex items-center justify-center gap-4 shadow-sm border border-red-300">
            <span className="text-4xl text-[#D83B3B]">📋</span>
            <div className="flex flex-col items-center">
              <p className="font-bold text-base">Jenis Alergi</p>
              <p className="text-3xl font-black">3 <span className="text-lg font-bold">Tipe Alergi</span></p>
            </div>
          </div>
          
          <div className="flex-1 bg-[#FDBA74] text-gray-900 p-5 rounded-2xl flex items-center justify-center gap-4 shadow-sm border border-orange-300">
            <span className="text-4xl text-[#C2410C]">🎓</span>
            <div className="flex flex-col items-center">
              <p className="font-bold text-base">Total Siswa Alergi</p>
              <p className="text-3xl font-black">19 <span className="text-lg font-bold">Siswa Alergi</span></p>
            </div>
          </div>
        </div>

        {/* Grid Konten Bawah */}
        <div className="flex gap-6 items-stretch w-full">
          
          {/* Kolom Kiri: Diagram Lingkaran (Posisi Dinaikkan & Teks Diperkecil) */}
          <div className="w-1/2 bg-white rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-black text-gray-800 mb-6">Jenis Alergi Siswa</h3>
            
            <div className="flex justify-center mb-6 relative">
              <div 
                className="w-56 h-56 rounded-full" 
                style={{ background: 'conic-gradient(#DC2626 0% 52.63%, #C026D3 52.63% 73.68%, #FACC15 73.68% 100%)' }}
              ></div>
              <span className="absolute top-0 right-12 text-[10px] font-bold text-gray-700">52,63%</span>
              <span className="absolute bottom-2 right-8 text-[10px] font-bold text-gray-700">21,05%</span>
              <span className="absolute bottom-12 left-4 text-[10px] font-bold text-gray-700">26,32%</span>
            </div>

            <div className="flex flex-col gap-2 font-bold text-xs text-gray-800 ml-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#DC2626] rounded-full"></div>
                <span>Alergi Kacang</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#FACC15] rounded-full"></div>
                <span>Alergi Telur</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#C026D3] rounded-full"></div>
                <span>Alergi Susu</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Diagram Batang & Daftar Sekolah (Teks Diperkecil) */}
          <div className="w-1/2 flex flex-col gap-6">
            
            {/* Diagram Batang */}
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-6">Jumlah Siswa Alergi</h3>
              
              <div className="relative h-32 border-l border-b border-gray-300 ml-6 mb-4 flex items-end justify-around pb-0 px-4">
                <div className="absolute w-full h-full flex flex-col justify-between -z-10 left-0">
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                </div>
                <div className="absolute -left-6 h-full flex flex-col justify-between text-[10px] font-bold text-gray-500 py-1">
                  <span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
                </div>
                
                <div className="w-1/4 bg-[#DC2626] h-[50%]"></div>
                <div className="w-1/4 bg-[#FACC15] h-[25%]"></div>
                <div className="w-1/4 bg-[#C026D3] h-[20%]"></div>
              </div>
              
              <div className="flex justify-around text-[10px] font-bold text-gray-500 ml-6 mb-4">
                <span className="w-1/4 text-center">Alergi Kacang</span>
                <span className="w-1/4 text-center">Alergi Telur</span>
                <span className="w-1/4 text-center">Alergi Susu</span>
              </div>
            </div>

            {/* Daftar Sekolah */}
            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">
              <h3 className="text-base font-black text-gray-800 mb-4">Daftar Sekolah dengan Data Alergi</h3>
              <div className="flex flex-col gap-4">
                <div className="bg-[#CFFAFE] rounded-xl p-3 border border-cyan-100">
                  <h4 className="font-black text-sm text-gray-800">SDN 1 Subang</h4>
                  <p className="text-[10px] font-bold">⚠️ 7 Siswa Alergi</p>
                </div>
                <div className="bg-[#CFFAFE] rounded-xl p-3 border border-cyan-100">
                  <h4 className="font-black text-sm text-gray-800">SMPN 1 Subang</h4>
                  <p className="text-[10px] font-bold">⚠️ 12 Siswa Alergi</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}