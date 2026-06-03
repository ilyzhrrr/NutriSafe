import React, { useEffect, useState } from 'react'
import SidebarMitra from './SidebarMitra'
import { api } from '../../api'

const bulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

const issueLabel = {
  kekurangan_makanan: 'Makanan Kurang',
  makanan_basi: 'Makanan Basi',
  masalah_alergen: 'Makanan Mengandung Alergen',
  terlambat: 'Pengiriman Terlambat',
  lainnya: 'Lainnya',
}

const formatTanggal = (iso) => {
  if (!iso) return '-'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`
}

export default function MakananBermasalah() {
  const now = new Date()
  const [selectedMonth, setSelectedMonth] = useState(bulan[now.getMonth()])
  const [laporan, setLaporan] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const monthNum = bulan.indexOf(selectedMonth) + 1
    const year = now.getFullYear()
    setLoading(true)
    setError('')
    api
      .get(`/sppg/food-reports?month=${monthNum}&year=${year}`)
      .then((res) => setLaporan(res.data || []))
      .catch((err) => setError(err.message || 'Gagal memuat data'))
      .finally(() => setLoading(false))
  }, [selectedMonth])

  return (
    <div className="flex min-h-screen bg-[#BAE1FF] font-sans">
      <SidebarMitra />

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-[32px] font-black text-[#0B1A73] leading-tight mb-2">
              Dashboard Mitra
            </h1>
            <h2 className="text-xl font-bold text-[#0D3B9E]">
              Laporan Makanan Bermasalah
            </h2>
          </div>

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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-6xl">
          <div className="p-6 text-center">
            <h3 className="text-lg font-black text-gray-900">Laporan Masuk</h3>
          </div>

          <table className="w-full text-left border-collapse">
            <thead className="bg-[#E5E5E5] text-gray-800 text-sm border-y border-gray-300">
              <tr>
                <th className="py-4 px-8 font-black w-1/4">Tanggal</th>
                <th className="py-4 px-8 font-black w-1/4 text-center">Pelapor</th>
                <th className="py-4 px-8 font-black w-1/3 text-center">Masalah</th>
                <th className="py-4 px-8 w-32"></th>
              </tr>
            </thead>

            <tbody className="text-sm font-bold text-gray-800">
              {loading && (
                <tr>
                  <td colSpan={4} className="py-10 px-8 text-center text-gray-500 font-semibold">
                    Memuat data...
                  </td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td colSpan={4} className="py-10 px-8 text-center text-red-600 font-semibold">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && laporan.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-10 px-8 text-center text-gray-500 font-semibold">
                    Belum ada laporan untuk bulan ini.
                  </td>
                </tr>
              )}
              {!loading && !error && laporan.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="py-5 px-8">{formatTanggal(item.report_date)}</td>
                  <td className="py-5 px-8 text-center">{item.reporter || '-'}</td>
                  <td className="py-5 px-8 text-center">{issueLabel[item.issue_type] || item.issue_type}</td>
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
