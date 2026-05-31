import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

export default function DataAlergi() {
  const navigate = useNavigate()
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
      <main className="flex-1 p-6">
        <header className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => navigate(-1)} className="text-[#166534] hover:text-green-700 font-black text-xl">&lt;</button>
              <h2 className="text-2xl font-black text-[#166534]">Dashboard Sekolah</h2>
            </div>
            <p className="text-lg font-bold text-[#166534]">Rekap Data Alergi Siswa</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </header>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mt-4">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span> Daftar Lengkap Siswa Alergi
          </h3>
          {loading ? (
            <div className="text-center py-10 text-gray-400 font-bold">Memuat data...</div>
          ) : allergies.length === 0 ? (
            <div className="text-center py-10 text-gray-400 font-bold">Belum ada data alergi</div>
          ) : (
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
      </main>
    </div>
  )
}
