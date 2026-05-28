import React, { useState } from 'react'
import SidebarMitra from './SidebarMitra'

export default function RiwayatLaporan() {
  const [tampilan, setTampilan] = useState('daftar')

  if (tampilan === 'detail') {
    return (
      <div className="min-h-screen bg-[#E0F2FE] font-sans p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => setTampilan('daftar')} 
              className="text-[#1E3A8A] text-2xl font-bold hover:text-blue-600"
            >
              &lt;
            </button>
            <div>
              <h1 className="text-xl font-black text-[#1E3A8A]">Riwayat Laporan Makanan</h1>
              <h2 className="text-sm font-bold text-[#3B82F6] mt-0.5">Detail Riwayat Laporan SDN 1 Subang</h2>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex items-start gap-4 border border-blue-50">
            <div className="bg-blue-50 p-2 rounded-xl text-2xl">🏫</div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-800 mb-1">SDN 1 Subang</h3>
              <p className="text-xs text-gray-600 font-medium mb-3">
                Jl. H.O. Iskandar, Desa No.60, Subang, Kec. Subang, Kabupaten Subang, Jawa Barat 45586
              </p>
              <div className="flex gap-2 text-xs">
                <span className="bg-[#93C5FD] text-[#1E3A8A] font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                  📅 23 Maret 2026
                </span>
                <span className="bg-[#86EFAC] text-green-900 font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                  ✓ Diterima
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/3 flex flex-col gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-blue-50">
                <h4 className="font-bold text-sm mb-2 text-gray-800">Total Porsi</h4>
                <p className="text-2xl font-black text-gray-900">196</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-blue-50">
                <h4 className="font-bold text-sm mb-2 text-gray-800">Terdistribusi</h4>
                <p className="text-2xl font-black text-gray-900">196 <span className="text-sm font-bold text-gray-500">Porsi</span></p>
                <p className="text-xs text-gray-400 mt-1 font-semibold">100% Selesai</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-50">
                <h4 className="font-bold text-sm text-center mb-3 text-gray-800">Siswa Alergi</h4>
                <p className="text-2xl font-black text-center mb-4 text-gray-900">4 <span className="text-sm font-bold text-gray-500">Siswa</span></p>
                <div className="flex flex-col gap-2 font-bold text-xs text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                    <span>5 Siswa Alergi Kacang</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                    <span>2 Siswa Alergi Telur</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/3 flex flex-col gap-4">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-blue-50">
                <h3 className="font-bold text-center py-4 text-base text-gray-800">Menu Makanan</h3>
                <table className="w-full text-xs">
                  <thead className="bg-gray-200/50 text-left">
                    <tr>
                      <th className="px-4 py-2 font-bold text-gray-600">Nama Menu Makanan</th>
                      <th className="px-4 py-2 font-bold text-gray-600 text-right">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { nama: 'Nasi Putih', jenis: 'Karbohidrat', jumlah: '196 Porsi' },
                      { nama: 'Telur Rebus', jenis: 'Protein Hewani', jumlah: '196 Porsi' },
                      { nama: 'Capcay', jenis: 'Sayuran', jumlah: '196 Porsi' },
                      { nama: 'Jeruk', jenis: 'Buah', jumlah: '196 Porsi' },
                      { nama: 'Susu Kemasan', jenis: '', jumlah: '196 Porsi' },
                      { nama: 'Menu Pengganti (tanpa telur)', jenis: 'Khusus Siswa Alergi', jumlah: '4 Porsi' },
                    ].map((item, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="px-4 py-2">
                          <div className="font-bold text-gray-800">{item.nama}</div>
                          {item.jenis && <div className="text-[10px] font-semibold text-gray-500 mt-0.5">{item.jenis}</div>}
                        </td>
                        <td className="px-4 py-2 text-right font-bold text-gray-800">{item.jumlah}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-4 text-center border border-blue-50">
                <h3 className="font-bold text-base mb-4 text-gray-800">Foto Dokumentasi</h3>
                <div className="flex gap-4 justify-center">
                  <div className="w-48 h-32 border-2 border-gray-200 rounded-xl bg-gray-50"></div>
                  <div className="w-48 h-32 border-2 border-gray-200 rounded-xl bg-gray-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="w-3/4 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#1E3A8A]">Dashboard Mitra</h1>
            <h2 className="text-lg font-bold text-[#3B82F6] mt-0.5">Riwayat Laporan Makanan</h2>
          </div>
          <select className="bg-[#D1D5DB] text-gray-700 font-bold py-1.5 px-6 rounded-xl outline-none shadow-sm text-xs cursor-pointer">
            <option>Maret</option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-blue-50">
          <h3 className="text-gray-500 font-bold mb-4 text-xs">23 Maret 2026</h3>
          
          <div className="bg-[#CFFAFE] rounded-xl p-4 mb-3 flex justify-between items-center border border-cyan-100">
            <div className="flex gap-4 items-center">
              <div className="bg-white p-2 rounded-xl shadow-sm text-2xl">🏫</div>
              <div>
                <h4 className="font-bold text-base text-gray-800 mb-0.5">SDN 1 Subang</h4>
                <p className="text-xs font-semibold text-gray-600 mb-1">Jl. H.O. Iskandar, Desa No.60, Subang, Kec. Subang, Kabupaten Subang, Jawa Barat 45586</p>
                <p className="text-xs font-bold text-gray-800">196 Porsi</p>
              </div>
            </div>
            <button onClick={() => setTampilan('detail')} className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-blue-700 transition text-xs">Detail</button>
          </div>

          <div className="bg-[#CFFAFE] rounded-xl p-4 flex justify-between items-center border border-cyan-100">
            <div className="flex gap-4 items-center">
              <div className="bg-white p-2 rounded-xl shadow-sm text-2xl">🏫</div>
              <div>
                <h4 className="font-bold text-base text-gray-800 mb-0.5">SMPN 1 Subang</h4>
                <p className="text-xs font-semibold text-gray-600 mb-1">Jl. Letjen Suprapto No.105, Karanganyar, Kec. Subang, Kabupaten Subang, Jawa Barat 41211</p>
                <p className="text-xs font-bold text-gray-800">360 Porsi</p>
              </div>
            </div>
            <button onClick={() => setTampilan('detail')} className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-blue-700 transition text-xs">Detail</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-blue-50">
          <h3 className="text-gray-500 font-bold mb-4 text-xs">22 Maret 2026</h3>
          
          <div className="bg-[#CFFAFE] rounded-xl p-4 flex justify-between items-center border border-cyan-100">
            <div className="flex gap-4 items-center">
              <div className="bg-white p-2 rounded-xl shadow-sm text-2xl">🏫</div>
              <div>
                <h4 className="font-bold text-base text-gray-800 mb-0.5">SDN 1 Subang</h4>
                <p className="text-xs font-semibold text-gray-600 mb-1">Jl. H.O. Iskandar, Desa No.60, Subang, Kec. Subang, Kabupaten Subang, Jawa Barat 45586</p>
                <p className="text-xs font-bold text-gray-800">196 Porsi</p>
              </div>
            </div>
            <button onClick={() => setTampilan('detail')} className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-blue-700 transition text-xs">Detail</button>
          </div>
        </div>
      </main>
    </div>
  )
}