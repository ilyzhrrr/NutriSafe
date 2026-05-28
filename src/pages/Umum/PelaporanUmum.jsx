import React from 'react'
import SidebarUmum from './SidebarUmum'

export default function PelaporanUmum() {
  return (
    <div className="flex min-h-screen bg-[#FFEDD5] font-sans">
      <SidebarUmum />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl relative">
          
          <div className="flex justify-between items-start mb-6">
            <div className="relative z-10 pt-4">
              <h2 className="text-4xl font-black text-[#1E3A8A]">Dashboard Umum</h2>
              <p className="text-xl font-bold text-[#1E3A8A] mt-1">Pelaporan Makanan</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm relative z-10 mt-32">
            
            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-2xl font-black text-gray-900">Formulir Pelaporan Masalah</h3>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-[#3B82F6] font-bold border-b border-gray-100 pb-4">
                <span className="text-xl">📋</span> Informasi Laporan
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    🏫
                  </div>
                  <select defaultValue="" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 bg-white">
                    <option value="" disabled>Pilih Sekolah</option>
                  </select>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    📍
                  </div>
                  <input type="text" placeholder="Alamat" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 bg-blue-50/50" />
                </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl flex items-center gap-3 border border-blue-100">
                <span className="text-xl">📱</span>
                <p className="text-xs font-bold text-gray-400">Setelah masukin nama sekolah dan alamat sekolah, langsung kelacak SPPG mana</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    📑
                  </div>
                  <select defaultValue="" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 bg-white cursor-pointer">
                    <option value="" disabled>Jenis Masalah</option>
                    <option value="Makanan Basi">Makanan Basi</option>
                    <option value="Makanan Kurang">Makanan Kurang</option>
                    <option value="Makanan Tidak Layak">Makanan Tidak Layak</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                    📅
                  </div>
                  <input type="date" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 bg-white" />
                </div>
              </div>

              <textarea placeholder="Deskripsi masalah ...." className="w-full p-4 rounded-2xl border border-gray-200 h-28 outline-none font-bold text-gray-700 resize-none"></textarea>

              <div className="flex justify-between items-center pt-2">
                <div className="flex-1 flex items-center gap-4">
                  <div className="font-bold text-sm text-gray-700">
                    Upload<br/>Bukti
                  </div>
                  <hr className="flex-1 border-gray-300" />
                </div>
                <button className="bg-[#2563EB] text-white px-10 py-3 rounded-xl font-bold ml-6 hover:bg-blue-700 transition flex flex-col items-center leading-tight cursor-pointer">
                  <span className="text-lg">Upload</span>
                  <span className="text-xs font-normal">Foto</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-[#F97316] text-white px-32 py-4 rounded-2xl font-black text-xl hover:bg-orange-600 transition shadow-md cursor-pointer">
              Kirim
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}