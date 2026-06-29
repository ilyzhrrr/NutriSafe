import React, { useEffect, useState } from 'react'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

export default function DataAlergi() {
  const [allergies, setAllergies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/school/allergy-data')
      .then((res) => setAllergies(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-base sm:text-lg font-bold text-[#166534] mt-1">Rekap Data Alergi Siswa</p>
            </div>
            <div className="sm:text-right pt-2">
              <p className="text-sm sm:text-lg font-bold text-gray-800">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </header>

          <div className="bg-white p-5 sm:p-8 rounded-3xl sm:rounded-[32px] border-2 border-[#22C55E] shadow-sm">
            <h3 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-2 text-gray-800">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span> Daftar Lengkap Siswa Alergi
            </h3>
            {loading ? (
              <div className="text-center py-10 text-gray-400 font-bold">Memuat data...</div>
            ) : allergies.length === 0 ? (
              <div className="text-center py-10 text-gray-400 font-bold">Belum ada data alergi</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left border-collapse">
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
                    {allergies.map((a) => (
                      <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-800 text-sm">{a.student_name}</td>
                        <td className="p-4 font-bold text-gray-600 text-sm">{a.class_name}</td>
                        <td className="p-4 font-bold text-red-600 text-sm">{a.allergy_type}</td>
                        <td className="p-4 font-bold text-gray-600 text-sm">{a.severity || '-'}</td>
                        <td className="p-4 font-bold text-gray-600 text-sm">{a.action_required || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
