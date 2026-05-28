import React, { useState } from 'react'
import SidebarMitra from './SidebarMitra'

export default function ScanMakanan() {
  const [statusScan, setStatusScan] = useState('awal')

  const handleMulaiScan = () => {
    setStatusScan('loading')
    setTimeout(() => {
      setStatusScan('hasil')
    }, 2500)
  }

  const handleReset = () => {
    setStatusScan('awal')
  }

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="w-3/4 p-10 flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#1E3A8A]">Dashboard Mitra</h1>
          <h2 className="text-sm font-bold text-[#3B82F6] mt-0.5">Scan & Pelaporan Menu Makanan Oleh SPPG</h2>
          <p className="text-xs text-gray-500 italic">Scan untuk mendeteksi makanan mengandung alergi Oleh ML</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 border-t-2 border-black"></div>
            <h3 className="font-black text-sm text-black">Detail Menu</h3>
            <div className="flex-1 border-t-2 border-black"></div>
          </div>

          <div className="flex flex-col gap-3 max-w-lg mx-auto text-xs font-bold text-gray-800">
            {['Nama Menu', 'Kalori', 'Protein', 'Karbohidrat', 'Lemak', 'Lainnya'].map((label) => (
              <div key={label} className="flex items-center">
                <label className="w-32">{label} :</label>
                <input type="text" className="flex-1 border-b border-black bg-transparent outline-none pb-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-[#14A8E5] text-black rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
            <p className="font-bold text-sm mb-1">Kalori / Porsi</p>
            {statusScan === 'loading' ? (
              <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin my-2"></div>
            ) : statusScan === 'hasil' ? (
              <p className="text-4xl font-black">650 <span className="text-sm font-semibold">Kalori</span></p>
            ) : (
              <p className="text-4xl font-black">-</p>
            )}
          </div>
          
          <div className="flex-1 bg-[#14A8E5] text-black rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
            <p className="font-bold text-sm mb-1">Total Porsi</p>
            <p className="text-4xl font-black">556 <span className="text-sm font-semibold">Porsi</span></p>
          </div>
          
          <div className="flex-1 bg-[#14A8E5] text-black rounded-lg p-4 flex flex-col items-center justify-center shadow-sm">
            <p className="font-bold text-sm mb-1">Status Gizi</p>
            {statusScan === 'loading' ? (
              <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin my-2"></div>
            ) : statusScan === 'hasil' ? (
              <p className="text-2xl font-black">Seimbang</p>
            ) : (
              <p className="text-2xl font-black">-</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center border border-gray-100">
            <h4 className="font-bold text-sm mb-4">Scan Makanan disini</h4>
            
            <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-4 bg-gray-50 relative">
              {statusScan === 'hasil' ? (
                <img src="/utama.png" alt="Scanned" className="w-full h-full object-cover rounded-md p-1" />
              ) : (
                <>
                  <span className="text-4xl text-gray-400 mb-2">📄</span>
                  <button className="bg-blue-500 text-white px-4 py-1.5 text-[10px] font-bold rounded">Upload File</button>
                </>
              )}
            </div>

            {statusScan === 'awal' && (
              <button onClick={handleMulaiScan} className="w-full bg-[#16A34A] text-white font-bold py-2.5 rounded-lg text-sm shadow-md">
                Analisis dengan ML
              </button>
            )}
            {statusScan === 'loading' && (
              <button disabled className="w-full bg-gray-400 text-white font-bold py-2.5 rounded-lg text-sm shadow-md flex justify-center items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Menganalisis...
              </button>
            )}
            {statusScan === 'hasil' && (
              <button onClick={handleReset} className="w-full bg-[#16A34A] text-white font-bold py-2.5 rounded-lg text-sm shadow-md">
                Analisis Ulang
              </button>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col border border-gray-100">
            <h4 className="font-bold text-sm mb-4 text-center">Bahan Terdeteksi</h4>
            <div className="flex-1 flex flex-col justify-center items-center min-h-[12rem]">
              {statusScan === 'loading' ? (
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              ) : statusScan === 'hasil' ? (
                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-between items-center border border-green-500 rounded px-3 py-2 bg-green-50">
                    <span className="text-xs font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Nasi</span>
                    <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded font-bold">Bebas Alergen</span>
                  </div>
                  <div className="flex justify-between items-center border border-green-500 rounded px-3 py-2 bg-green-50">
                    <span className="text-xs font-bold flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Ayam</span>
                    <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded font-bold">Bebas Alergen</span>
                  </div>
                  <div className="flex justify-between items-center border border-red-500 rounded px-3 py-2 bg-red-100">
                    <span className="text-xs font-bold flex items-center gap-2"><div className="w-2 h-2 bg-red-600 rounded-full"></div>Kacang</span>
                    <span className="text-[10px] bg-red-300 text-red-900 px-2 py-0.5 rounded font-bold">Alergen Kacang! ⚠️</span>
                  </div>
                  <div className="flex justify-between items-center border border-purple-500 rounded px-3 py-2 bg-purple-100">
                    <span className="text-xs font-bold flex items-center gap-2"><div className="w-2 h-2 bg-purple-600 rounded-full"></div>Susu</span>
                    <span className="text-[10px] bg-purple-300 text-purple-900 px-2 py-0.5 rounded font-bold">Alergen Susu ⚠️</span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-gray-400">Menunggu data...</span>
              )}
            </div>
          </div>

          <div className="bg-[#93C5FD] rounded-xl shadow-sm flex flex-col overflow-hidden border border-blue-200 min-h-[10rem]">
            <div className="bg-[#93C5FD] py-3 text-center font-bold text-sm text-black">
              Rekomendasi Menu <br/> Siswa Alergi
            </div>
            <div className="bg-white flex-1 flex flex-col justify-center items-center p-4">
              {statusScan === 'loading' ? (
                <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              ) : statusScan === 'hasil' ? (
                <div className="w-full flex flex-col gap-3">
                  <div className="border border-gray-300 rounded-lg p-3">
                    <p className="text-[10px] font-bold text-red-600 flex items-center gap-1 mb-2"><div className="w-2 h-2 bg-red-600 rounded-full"></div>Kacang</p>
                    <input type="text" value="Nasi Putih, Ayam Bakar" readOnly className="w-full border border-gray-300 rounded px-2 py-1.5 text-xs mb-1 bg-gray-50 outline-none" />
                  </div>
                </div>
              ) : (
                <span className="text-xs text-gray-400">Menunggu data...</span>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden border border-gray-100 min-h-[10rem]">
            <div className="bg-[#FF6B6B] py-3 text-center font-bold text-sm text-white flex justify-center items-center gap-2">
              <span>🚨</span> Peringatan Alergi
            </div>
            <div className="flex-1 flex flex-col justify-center items-center p-4">
              {statusScan === 'loading' ? (
                <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
              ) : statusScan === 'hasil' ? (
                <div className="w-full flex flex-col gap-2">
                  <div className="text-xs font-bold text-black border-b border-gray-200 pb-1 mb-1">
                    <span className="text-red-600">● Kacang ⚠️</span>
                    <p className="text-[9px] text-gray-600">10 Siswa Alergi Kacang Teridentifikasi!</p>
                  </div>
                  <div className="flex justify-between items-center border border-red-300 rounded px-3 py-1.5 bg-white">
                    <span className="text-[10px] font-bold flex items-center gap-2">🏫 SDN 1 Subang</span>
                    <span className="text-red-600 text-xs">⚠️</span>
                  </div>
                  <div className="flex justify-between items-center border border-red-300 rounded px-3 py-1.5 bg-white">
                    <span className="text-[10px] font-bold flex items-center gap-2">🏫 SMPN 1 Subang</span>
                    <span className="text-red-600 text-xs">⚠️</span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-gray-400">Menunggu data...</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-4 mb-12">
           <button className="bg-[#2563EB] text-white px-16 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition">
             Kirim Laporan
           </button>
        </div>
      </main>
    </div>
  )
}