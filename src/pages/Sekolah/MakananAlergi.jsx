import React from 'react'
import { Link } from 'react-router-dom'
import SidebarSekolah from './SidebarSekolah'

export default function MakananAlergi() {
  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-6 relative">
        <header className="flex justify-between items-start mb-6">
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-[#166534]">Dashboard Sekolah</h2>
            <p className="text-lg font-bold text-[#166534]">Makanan Khusus Siswa Alergi</p>
            <h3 className="text-xl font-bold mt-1 text-gray-800">SDN 1 Subang</h3>
          </div>
          
          <div className="text-right flex flex-col items-end relative z-50">
            <p className="text-sm font-bold text-gray-800 mb-2">Rabu, 4 Februari 2026</p>
            
            {/* Tombol diubah menjadi komponen Link agar navigasi 100% pasti jalan */}
            <Link 
              to="/sekolah/data-alergi" 
              className="bg-[#22C55E] text-white px-3 py-1.5 rounded-md font-bold text-xs hover:bg-green-600 transition cursor-pointer inline-block shadow-sm"
            >
              Lihat Data Alergi Siswa
            </Link>
            
          </div>
        </header>

        <div className="bg-[#C6F6D5] p-6 rounded-[24px] relative z-10">
          <div className="bg-white p-4 rounded-xl mb-6 w-fit shadow-sm border border-gray-100">
            <p className="font-black text-lg flex items-center gap-2 mb-1">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span> Alergi Kacang
            </p>
            <p className="text-xs font-bold text-gray-500">5 Siswa Alergi Kacang</p>
          </div>

          <h3 className="text-xl font-black mb-4 text-center">Menu Makanan Khusus Siswa Alergi</h3>
          
          <div className="space-y-3 max-w-3xl mx-auto">
            {['Nasi Putih', 'Tumis Wortel & Jagung', 'Susu'].map((menu, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-[#22C55E] font-bold text-base shadow-sm">
                {menu}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}