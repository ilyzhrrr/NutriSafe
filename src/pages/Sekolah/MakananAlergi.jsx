import React from 'react'
import { Link } from 'react-router-dom'
import SidebarSekolah from './SidebarSekolah'

export default function MakananAlergi() {
  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto relative">
          
          <header className="flex justify-between items-start mb-8">
            <div className="relative z-10 pt-2">
              <h2 className="text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-lg font-bold text-[#166534] mt-1">Makanan Khusus Siswa Alergi</p>
              <h3 className="text-xl font-bold mt-3 text-gray-800">SDN 1 Subang</h3>
            </div>
            
            <div className="text-right flex flex-col items-end relative z-50 pt-2">
              <p className="text-lg font-bold text-gray-800 mb-4">Rabu, 4 Februari 2026</p>
              
              {/* Tombol Link yang sudah disesuaikan ukurannya */}
              <Link 
                to="/sekolah/data-alergi" 
                className="bg-[#22C55E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-600 transition cursor-pointer inline-block shadow-md"
              >
                Lihat Data Alergi Siswa
              </Link>
            </div>
          </header>

          <div className="bg-[#C6F6D5] p-8 rounded-[32px] relative z-10">
            <div className="bg-white p-5 rounded-2xl mb-8 w-fit shadow-sm border border-gray-100">
              <p className="font-black text-xl flex items-center gap-3 mb-1 text-gray-800">
                <span className="w-4 h-4 bg-red-500 rounded-full"></span> Alergi Kacang
              </p>
              <p className="text-sm font-bold text-gray-500">5 Siswa Alergi Kacang</p>
            </div>

            <h3 className="text-2xl font-black mb-6 text-center text-gray-800">Menu Makanan Khusus Siswa Alergi</h3>
            
            <div className="space-y-4 max-w-3xl mx-auto pb-4">
              {['Nasi Putih', 'Tumis Wortel & Jagung', 'Susu'].map((menu, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border-2 border-[#22C55E] font-bold text-lg text-gray-800 shadow-sm text-center">
                  {menu}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}