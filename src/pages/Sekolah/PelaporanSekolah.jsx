import React from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function PelaporanSekolah() {
  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl relative">
          
          <header className="flex justify-between items-start mb-6">
            <div className="relative z-10 pt-4">
              <h2 className="text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-lg font-bold text-[#166534] mt-1">Pelaporan Makanan</p>
              <h3 className="text-xl font-bold mt-3 text-gray-800">SDN 1 Subang</h3>
            </div>
            
            <div className="relative z-10 pt-4 text-right">
              <p className="text-lg font-bold text-gray-800">Rabu, 4 Februari 2026</p>
            </div>
          </header>

          {/* Gambar ditambahkan di sini, posisinya di bawah tanggal (top-24) */}
          <div className="absolute right-0 top-24 w-[450px] pointer-events-none z-0">
            <img src="/image.png" alt="Ilustrasi" className="w-full h-auto object-contain" />
          </div>

          <div className="space-y-6 relative z-10 mt-32">
            <div className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-gray-100 w-fit">
              <span className="text-xl">🍱</span>
              <p className="font-black text-lg text-blue-900">SPPG Indonesia</p>
            </div>

            <div className="bg-[#C6F6D5] p-8 rounded-[32px]">
              <h3 className="text-2xl font-black mb-6">Formulir Pelaporan Masalah</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-xl text-sm font-bold w-3/4">
                  <span>📋</span> Informasi Laporan
                </div>
                
                <div className="grid grid-cols-2 gap-5 w-3/4">
                  <select defaultValue="" className="p-3 rounded-xl border-2 border-blue-200 outline-none text-sm font-bold text-gray-600 bg-white cursor-pointer">
                    <option value="" disabled>Jenis Masalah</option>
                    <option value="makanan basi">Makanan basi</option>
                    <option value="makanan kurang">Makanan kurang</option>
                    <option value="makanan tidak layak">Makanan tidak layak</option>
                    <option value="lainnya">Lainnya....</option>
                  </select>
                  <input type="date" className="p-3 rounded-xl border-2 border-blue-200 outline-none text-sm font-bold text-gray-600 bg-white" />
                </div>
                
                <textarea placeholder="Deskripsi masalah ......" className="w-3/4 p-4 rounded-xl border-2 border-blue-200 h-28 outline-none text-sm font-semibold resize-none"></textarea>
                
                <div className="flex gap-4 items-center w-3/4 justify-end pt-2">
                  <p className="font-bold text-sm text-gray-600">Upload Bukti</p>
                  <button className="bg-[#3B82F6] text-white px-8 py-2.5 rounded-xl font-bold text-sm flex flex-col items-center leading-tight hover:bg-blue-700 transition cursor-pointer shadow-sm">
                    Upload Foto
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="bg-[#22C55E] text-white px-24 py-3 rounded-xl font-black text-base hover:bg-green-600 transition shadow-md cursor-pointer">
                Kirim
              </button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}