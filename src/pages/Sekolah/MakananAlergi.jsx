import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

export default function MakananAlergi() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])

  const load = (date) => {
    setLoading(true)
    api.get(`/school/allergy-menu?date=${date}`)
      .then((res) => setGroups(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load(dateFilter) }, [])

  const handleDateChange = (e) => {
    setDateFilter(e.target.value)
    load(e.target.value)
  }

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-start mb-8">
            <div className="pt-2">
              <h2 className="text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-lg font-bold text-[#166534] mt-1">Makanan Khusus Siswa Alergi</p>
            </div>
            <div className="text-right flex flex-col items-end pt-2">
              <p className="text-lg font-bold text-gray-800 mb-4">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <Link to="/sekolah/data-alergi" className="bg-[#22C55E] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-600 transition cursor-pointer inline-block shadow-md">
                Lihat Data Alergi Siswa
              </Link>
            </div>
          </header>

          <div className="mb-4">
            <input type="date" value={dateFilter} onChange={handleDateChange}
              className="p-3 rounded-xl border-2 border-green-200 outline-none text-sm font-bold text-gray-600 bg-white cursor-pointer" />
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-400 font-bold">Memuat data...</div>
          ) : groups.length === 0 ? (
            <div className="bg-[#C6F6D5] p-8 rounded-[32px] text-center">
              <p className="font-bold text-gray-600">Belum ada menu khusus alergi untuk tanggal ini.</p>
            </div>
          ) : (
            groups.map((group, i) => (
              <div key={i} className="bg-[#C6F6D5] p-8 rounded-[32px] mb-6">
                <div className="bg-white p-5 rounded-2xl mb-8 w-fit shadow-sm border border-gray-100">
                  <p className="font-black text-xl flex items-center gap-3 mb-1 text-gray-800">
                    <span className="w-4 h-4 bg-red-500 rounded-full"></span> Alergi {group.allergy_type}
                  </p>
                  <p className="text-sm font-bold text-gray-500">{group.student_count} Siswa Alergi {group.allergy_type}</p>
                </div>

                <h3 className="text-2xl font-black mb-6 text-center text-gray-800">Menu Makanan Khusus Siswa Alergi</h3>

                <div className="space-y-4 max-w-3xl mx-auto pb-4">
                  {(group.menu_items || []).map((item, j) => (
                    <div key={j} className="bg-white p-5 rounded-2xl border-2 border-[#22C55E] shadow-sm">
                      <p className="font-bold text-lg text-gray-800 text-center">{item.menu_name}</p>
                      {item.category && <p className="text-xs text-gray-500 text-center font-semibold mt-1">{item.category}</p>}
                      <p className="text-xs text-center font-bold text-gray-600 mt-1">{item.portions} Porsi</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
