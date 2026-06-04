import React, { useEffect, useState } from 'react'
import SidebarMitra from './SidebarMitra'
import { api } from '../../api'

export default function MonitoringAlergi() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/sppg/allergy-dashboard')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const breakdown = data?.allergy_breakdown || []
  const schools = data?.schools || []
  const totalStudents = data?.total_allergy_students || 0

  const COLORS = ['#DC2626', '#FACC15', '#C026D3', '#3B82F6', '#22C55E', '#F97316']

  const totalCount = breakdown.reduce((sum, b) => sum + b.count, 0)
  let cumulative = 0
  const gradient = breakdown.map((b, i) => {
    const start = totalCount > 0 ? (cumulative / totalCount) * 100 : 0
    cumulative += b.count
    const end = totalCount > 0 ? (cumulative / totalCount) * 100 : 0
    return `${COLORS[i % COLORS.length]} ${start.toFixed(1)}% ${end.toFixed(1)}%`
  }).join(', ')

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="flex-1 lg:w-3/4 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-[#1E3A8A]">Dashboard Mitra</h1>
          <h2 className="text-base sm:text-lg font-bold text-[#3B82F6] mt-0.5">Monitoring Alergi Siswa</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold">Memuat data...</div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 w-full max-w-3xl">
              <div className="flex-1 bg-[#FF8A8A] text-gray-900 p-5 rounded-2xl flex items-center justify-center gap-4 shadow-sm border border-red-300">
                <span className="text-4xl text-[#D83B3B]">📋</span>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-base">Jenis Alergi</p>
                  <p className="text-3xl font-black">{data?.total_allergy_types || 0} <span className="text-lg font-bold">Tipe Alergi</span></p>
                </div>
              </div>
              <div className="flex-1 bg-[#FDBA74] text-gray-900 p-5 rounded-2xl flex items-center justify-center gap-4 shadow-sm border border-orange-300">
                <span className="text-4xl text-[#C2410C]">🎓</span>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-base">Total Siswa Alergi</p>
                  <p className="text-3xl font-black">{totalStudents} <span className="text-lg font-bold">Siswa Alergi</span></p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full">
              <div className="w-full lg:w-1/2 bg-white rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-black text-gray-800 mb-6">Jenis Alergi Siswa</h3>
                {breakdown.length === 0 ? (
                  <p className="text-center text-gray-400 font-bold py-6">Tidak ada data alergi</p>
                ) : (
                  <>
                    <div className="flex justify-center mb-6">
                      <div
                        className="w-40 h-40 sm:w-56 sm:h-56 rounded-full"
                        style={{ background: `conic-gradient(${gradient || '#e5e7eb 0% 100%'})` }}
                      ></div>
                    </div>
                    <div className="flex flex-col gap-2 font-bold text-xs text-gray-800 ml-4">
                      {breakdown.map((b, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i % COLORS.length] }}></div>
                          <span>Alergi {b.allergy_type} ({b.count})</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm flex-1">
                  <h3 className="text-base font-black text-gray-800 mb-4">Daftar Sekolah dengan Data Alergi</h3>
                  {schools.length === 0 ? (
                    <p className="text-center text-gray-400 font-bold py-4">Belum ada data</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {schools.map((s) => (
                        <div key={s.id} className="bg-[#CFFAFE] rounded-xl p-3 border border-cyan-100">
                          <h4 className="font-black text-sm text-gray-800">{s.name}</h4>
                          <p className="text-[10px] font-bold">⚠️ {s.allergy_count} Siswa Alergi</p>
                          <p className="text-[10px] text-gray-500 font-semibold">Total: {s.total_students} Siswa</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
