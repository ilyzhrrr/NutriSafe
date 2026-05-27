import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DaftarSekolah() {
  const navigate = useNavigate()

  const dataSekolah = [
    {
      id: 1,
      nama: 'SDN 1 Subang',
      npsn: '20233412',
      alamat: 'Kabupaten Kuningan, Jawa Barat 45586',
      jumlahSiswa: 187,
      jumlahGuru: 9,
      jumlahPorsi: 196,
      alergi: { kacang: 5, telur: 2, susu: 0 }
    },
    {
      id: 2,
      nama: 'SMPN 1 Subang',
      npsn: '20233588',
      alamat: 'Jl. Letjen Suprapto No.105, Karanganyar, Subang, Jawa Barat 41211',
      jumlahSiswa: 340,
      jumlahGuru: 15,
      jumlahPorsi: 360,
      alergi: { kacang: 12, telur: 4, susu: 2 }
    }
  ]

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      
      <aside className="w-1/4 bg-[#3B82F6] text-white p-4 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold">NutriSafe MBG</span>
        </div>
        
        <div className="mb-4">
          <img src="/utama.png" alt="Illustration" className="w-full rounded-xl shadow-md bg-white/20 p-1" />
        </div>

        <h2 className="text-xl font-bold leading-tight mb-6">
          Dashboard Mitra <br /> & Pengelola
        </h2>

        <nav className="flex-1 space-y-4 pr-2">
          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">📋</span> Menu Mitra</p>
            <div className="space-y-1">
              <div onClick={() => navigate('/mitra/status-kemitraan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Status Kemitraan & Daftar SPPG</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/riwayat-laporan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Riwayat Laporan</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">🏢</span> Menu Pengelola</p>
            <div className="space-y-1">
              <div onClick={() => navigate('/mitra/monitoring-alergi')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Monitoring Alergi Siswa</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/scan-makanan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Scan & Pelaporan Menu Makanan</span><span className="font-bold">&gt;</span>
              </div>
              
              <div className="flex justify-between items-center pl-3 pr-3 py-2 bg-[#2563EB] rounded-lg border-l-4 border-white cursor-default text-xs font-semibold">
                <span>Daftar Sekolah</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-4 border-t border-white/20 space-y-2 mt-auto pr-2">
          <div onClick={() => navigate('/mitra/profile')} className="flex items-center gap-2 cursor-pointer hover:text-blue-200 text-sm">
            <span className="text-lg">👤</span><span>Akun</span>
          </div>
          <div onClick={() => navigate('/mitra/pengaturan')} className="flex items-center gap-2 cursor-pointer hover:text-blue-200 text-sm">
            <span className="text-lg">⚙️</span><span>Pengaturan</span>
          </div>
        </div>
      </aside>

      <main className="w-3/4 p-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#1E3A8A]">Dashboard Pengelola</h1>
          <h2 className="text-lg font-bold text-[#3B82F6] mt-0.5">Daftar Sekolah Mitra</h2>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-2xl">🏫</div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Total Sekolah</p>
              <p className="text-2xl font-black text-gray-800">2 <span className="text-sm font-semibold text-gray-500">Sekolah</span></p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl text-2xl">👤</div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Total Siswa Terdaftar</p>
              <p className="text-2xl font-black text-gray-800">527 <span className="text-sm font-semibold text-gray-500">Siswa</span></p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl text-2xl">🍱</div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Kebutuhan Porsi Harian</p>
              <p className="text-2xl font-black text-gray-800">556 <span className="text-sm font-semibold text-gray-500">Porsi</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-gray-800 text-sm">Data Lengkap Sekolah</h3>
          </div>
          
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-100/50 text-gray-500">
              <tr>
                <th className="px-6 py-3 font-bold">Nama & NPSN</th>
                <th className="px-6 py-3 font-bold">Alamat Lengkap</th>
                <th className="px-6 py-3 font-bold">Info Utama</th>
                <th className="px-6 py-3 font-bold">Data Alergi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dataSekolah.map((sekolah) => (
                <tr key={sekolah.id} className="hover:bg-blue-50/30 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800 text-sm">{sekolah.nama}</div>
                    <div className="text-gray-500 font-semibold mt-0.5">NPSN: {sekolah.npsn}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium max-w-[200px] leading-relaxed">
                    {sekolah.alamat}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800 flex items-center gap-2 mb-1">
                      <span className="text-sm">👤</span> {sekolah.jumlahSiswa} Siswa
                    </div>
                    <div className="font-bold text-gray-800 flex items-center gap-2 mb-1">
                      <span className="text-sm">🧑‍🏫</span> {sekolah.jumlahGuru} Guru
                    </div>
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <span className="text-sm">🍱</span> {sekolah.jumlahPorsi} Porsi
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-gray-700 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                        {sekolah.alergi.kacang} Kacang
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                        {sekolah.alergi.telur} Telur
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-purple-600 rounded-full"></div>
                        {sekolah.alergi.susu} Susu
                      </div>
                    </div>
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