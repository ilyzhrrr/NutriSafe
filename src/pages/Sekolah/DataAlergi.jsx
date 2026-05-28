import React from 'react'
import SidebarSekolah from './SidebarSekolah'
import { useNavigate } from 'react-router-dom'

export default function DataAlergi() {
  const navigate = useNavigate()
  
  const dataAlergi = [
    { nama: 'Icha Aulia Ambarwati', kelas: '6A', alergi: 'Kacang', tingkat: 'Tinggi', tindakan: 'Epinefrin jika terpapar' },
    { nama: 'Vina Namira', kelas: '4B', alergi: 'Susu Sapi', tingkat: 'Sedang', tindakan: 'Ganti menu soya' },
    { nama: 'Westy Adam Rismahadi', kelas: '1B', alergi: 'Seafood', tingkat: 'Tinggi', tindakan: 'Pisahkan alat makan' },
    { nama: 'Zahra Illiyin', kelas: '5B', alergi: 'Telur', tingkat: 'Rendah', tindakan: 'Hindari menu telur' },
  ]

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-6">
        <header className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => navigate(-1)} className="text-[#166534] hover:text-green-700 font-black text-xl">&lt;</button>
              <h2 className="text-2xl font-black text-[#166534]">Dashboard Sekolah</h2>
            </div>
            <p className="text-lg font-bold text-[#166534]">Rekap Data Alergi Siswa</p>
            <h3 className="text-xl font-bold mt-1 text-gray-800">SDN 1 Subang</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">Rabu, 4 Februari 2026</p>
          </div>
        </header>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-4">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span> Daftar Lengkap Siswa Alergi
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#C6F6D5] text-[#166534]">
                  <th className="p-4 rounded-l-xl font-black text-sm">Nama Siswa</th>
                  <th className="p-4 font-black text-sm">Kelas</th>
                  <th className="p-4 font-black text-sm">Jenis Alergi</th>
                  <th className="p-4 font-black text-sm">Keparahan</th>
                  <th className="p-4 rounded-r-xl font-black text-sm">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {dataAlergi.map((siswa, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-800 text-sm">{siswa.nama}</td>
                    <td className="p-4 font-bold text-gray-600 text-sm">{siswa.kelas}</td>
                    <td className="p-4 font-bold text-red-600 text-sm">{siswa.alergi}</td>
                    <td className="p-4 font-bold text-gray-600 text-sm">{siswa.tingkat}</td>
                    <td className="p-4 font-bold text-gray-600 text-sm">{siswa.tindakan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}