import React, { useState } from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function PenerimaanMakanan() {
  const [jumlahPorsi, setJumlahPorsi] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logika pengiriman data bisa ditambahkan di sini
    alert('Konfirmasi makanan diterima berhasil disimpan!')
  }

  return (
    <div className="flex min-h-screen bg-[#cbf4c9] font-sans">
      <SidebarSekolah />

      <main className="flex-1 p-8 relative">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-3xl font-black text-[#1E3A8A]">Dashboard Sekolah</h1>
            <h2 className="text-xl font-bold text-[#2563EB] mt-1">Penerimaan Makanan</h2>
            <h3 className="text-xl font-black text-black mt-2">SDN 1 Subang</h3>
          </div>
          
          <div className="bg-[#D1D5DB] text-gray-800 font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <span>📅</span> Rabu, 4 Februari 2026
          </div>
        </div>

        {/* --- TIMER/JAM --- */}
        <div className="flex justify-end pr-4 mb-4">
          <div className="border-4 border-black font-black text-xl px-2 py-0.5 rounded shadow-sm bg-[#cbf4c9]">
            7:10
          </div>
        </div>

        {/* --- KONTEN FORMULIR --- */}
        <div className="max-w-4xl bg-white rounded-xl shadow-sm overflow-hidden">
          
          {/* Judul Kartu */}
          <div className="px-8 pt-8 pb-4 border-b-2 border-gray-100">
            <h2 className="text-2xl font-black text-black">Konfirmasi Kedatangan Pangan</h2>
          </div>

          {/* Isi Formulir */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {/* SPPG Pemasok */}
            <div>
              <label className="block text-lg font-bold text-black mb-2">
                SPPG Pemasok
              </label>
              <input
                type="text"
                value="SPPG Indonesia"
                disabled
                className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg px-4 py-4 text-black font-medium cursor-not-allowed outline-none"
              />
            </div>

            {/* Jumlah Porsi Diterima */}
            <div>
              <label className="block text-lg font-bold text-black mb-2">
                Jumlah Porsi Diterima
              </label>
              <input
                type="number"
                value={jumlahPorsi}
                onChange={(e) => setJumlahPorsi(e.target.value)}
                className="w-full border border-gray-400 rounded-lg px-4 py-4 text-black font-medium outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            {/* Upload Bukti */}
            <div className="flex items-center pt-4">
              <span className="text-base font-bold text-black w-20 leading-tight">
                Upload<br/>Bukti
              </span>
              <div className="flex-1 border-b border-gray-400 mx-6"></div>
              <button
                type="button"
                className="bg-[#2577F1] text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
              >
                Upload Foto
              </button>
            </div>

          </form>
        </div>

        {/* --- TOMBOL SUBMIT UTAMA --- */}
        <div className="max-w-4xl mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-[#22C55E] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-md cursor-pointer text-center leading-tight"
          >
            Konfirmasi makanan<br/>Diterima
          </button>
        </div>

      </main>
    </div>
  )
}