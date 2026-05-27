import React from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function PelaporanSekolah() {
  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-black text-[#166534]">Dashboard Sekolah</h2>
            <p className="text-xl font-bold text-[#166534]">Pelaporan Makanan</p>
            <h3 className="text-2xl font-bold mt-2 text-gray-800">SDN 1 Subang</h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-800">Rabu, 4 Februari 2026</p>
          </div>
        </header>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-100 w-fit">
            <span className="text-2xl">🍱</span>
            <p className="font-black text-xl text-blue-900">SPPG Indonesia</p>
          </div>

          <div className="bg-[#C6F6D5] p-10 rounded-[40px] relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-8">Formulir Pelaporan Masalah</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/50 p-4 rounded-2xl font-bold">
                  <span>📋</span> Informasi Laporan
                </div>
                <div className="grid grid-cols-2 gap-6 w-3/4">
                  <select className="p-4 rounded-2xl border-2 border-blue-200 outline-none font-bold text-gray-600">
                    <option>Jenis Masalah</option>
                  </select>
                  <input type="date" className="p-4 rounded-2xl border-2 border-blue-200 outline-none font-bold text-gray-600" />
                </div>
                <textarea placeholder="Deskripsi masalah ......" className="w-3/4 p-6 rounded-3xl border-2 border-blue-200 h-32 outline-none font-bold"></textarea>
                
                <div className="flex gap-4 items-center w-3/4 justify-end">
                  <p className="font-bold text-gray-600">Upload Bukti</p>
                  <button className="bg-[#3B82F6] text-white px-10 py-4 rounded-2xl font-black text-xl flex flex-col items-center leading-tight hover:bg-blue-700 transition">
                    Upload <span className="text-sm">Foto</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute right-10 bottom-0">
              <img src="/taking-notes-rafiki.png" alt="Ilustrasi Catatan" className="w-80 object-contain" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}