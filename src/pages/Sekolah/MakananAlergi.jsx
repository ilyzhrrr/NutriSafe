import React from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function MakananAlergi() {
  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-black text-[#166534]">Dashboard Sekolah</h2>
            <p className="text-xl font-bold text-[#166534]">Makanan Khusus Siswa Alergi</p>
            <h3 className="text-2xl font-bold mt-2 text-gray-800">SDN 1 Subang</h3>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-xl font-bold text-gray-800 mb-2">Rabu, 4 Februari 2026</p>
            <button className="bg-[#22C55E] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-600 transition">
              Lihat Data Alergi Siswa
            </button>
          </div>
        </header>

        <div className="bg-[#C6F6D5] p-10 rounded-[40px]">
          <div className="bg-white p-6 rounded-2xl mb-8 w-fit shadow-sm border border-gray-100">
            <p className="font-black text-xl flex items-center gap-2 mb-1">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span> Alergi Kacang
            </p>
            <p className="text-sm font-bold text-gray-500">5 Siswa Alergi Kacang</p>
          </div>

          <h3 className="text-2xl font-black mb-6 text-center">Menu Makanan Khusus Siswa Alergi</h3>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {['Nasi Putih', 'Tumis Wortel & Jagung', 'Susu'].map((menu, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border-2 border-[#22C55E] font-bold text-xl shadow-sm">
                {menu}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}