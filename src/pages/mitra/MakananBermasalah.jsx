import React, { useState } from 'react'
import SidebarMitra from './SidebarMitra' // Sesuaikan dengan path Sidebar Mitra Anda

export default function MakananBermasalah() {
  const [selectedMonth, setSelectedMonth] = useState('Maret')

  // Daftar Bulan untuk Dropdown
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]

  // Data dummy laporan sesuai gambar
  const [laporan] = useState([
    { id: 1, tanggal: '1 Juni 2026', pelapor: 'SDN 1 Subang', masalah: 'Makanan Kurang' },
    { id: 2, tanggal: '30 Mei 2026', pelapor: 'SDN 1 Subang', masalah: 'Makanan Basi' },
    { id: 3, tanggal: '12 Maret 2026', pelapor: 'SDN 1 Subang', masalah: 'Makanan Mengandung Alergi' },
  ])

  return (
    <div className="flex min-h-screen bg-[#BAE1FF] font-sans">
      {/* Sidebar Mitra diletakkan di sini */}
      <SidebarMitra />

      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-[32px] font-black text-[#0B1A73] leading-tight mb-2">
              Dashboard Mitra
            </h1>
            <h2 className="text-xl font-bold text-[#0D3B9E]">
              Laporan Makanan Bermasalah
            </h2>
          </div>
          
          {/* Dropdown Bulan */}
          <div className="relative">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-[#C1BDB8] text-white text-base font-bold px-6 py-2.5 pr-12 rounded-lg outline-none cursor-pointer shadow-sm"
            >
              {bulan.map((b) => (
                <option key={b} value={b} className="bg-white text-gray-800">
                  {b}
                </option>
              ))}
            </select>
            {/* Ikon Panah Dropdown */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* --- TABEL LAPORAN --- */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-6xl">
          
          {/* Judul Tabel */}
          <div className="p-6 text-center">
            <h3 className="text-lg font-black text-gray-900">Laporan Masuk</h3>
          </div>

          <table className="w-full text-left border-collapse">
            {/* Header Kolom */}
            <thead className="bg-[#E5E5E5] text-gray-800 text-sm border-y border-gray-300">
              <tr>
                <th className="py-4 px-8 font-black w-1/4">Tanggal</th>
                <th className="py-4 px-8 font-black w-1/4 text-center">Pelapor</th>
                <th className="py-4 px-8 font-black w-1/3 text-center">Masalah</th>
                <th className="py-4 px-8 w-32"></th>
              </tr>
            </thead>
            
            {/* Isi Tabel */}
            <tbody className="text-sm font-bold text-gray-800">
              {laporan.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="py-5 px-8">{item.tanggal}</td>
                  <td className="py-5 px-8 text-center">{item.pelapor}</td>
                  <td className="py-5 px-8 text-center">{item.masalah}</td>
                  <td className="py-5 px-8 text-right">
                    <button className="bg-[#2577F1] text-white px-5 py-1.5 rounded-md text-xs font-bold hover:bg-blue-700 transition cursor-pointer">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>

      </main>
    </div>
  )
}