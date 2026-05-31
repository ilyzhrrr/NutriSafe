import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarMitra from './SidebarMitra'
import { api } from '../../api'

export default function StatusKemitraan() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/sppg/status')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const sppgList = data?.sppg_list || []

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="w-3/4 flex flex-col">
        <div className="bg-white p-0 relative overflow-hidden h-56 flex flex-col pt-8 rounded-b-3xl shadow-sm border-b border-blue-50">
          <img src="/status.png" alt="Status Banner" className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none" />
          <div className="relative z-10 px-12 ml-6 max-w-lg">
            <h1 className="text-2xl font-black text-[#1E3A8A] leading-tight">Dashboard Mitra</h1>
            <p className="text-[#3B82F6] font-bold text-base mt-1">Status Kemitraan & Daftar SPPG</p>
          </div>
        </div>

        <div className="px-8 pt-6 pb-8 flex flex-col items-center">
          {loading ? (
            <div className="py-20 text-gray-400 font-bold">Memuat data...</div>
          ) : (
            <>
              <div className="flex flex-col items-center mb-6">
                <div className={`${data?.is_partner ? 'bg-[#22C55E]' : 'bg-yellow-400'} text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-2 shadow-md`}>
                  {data?.is_partner ? '✓' : '!'}
                </div>
                <h3 className="text-xl font-bold text-[#1E3A8A]">Status Kemitraan</h3>
                <p className="text-[#3B82F6] font-bold text-sm">
                  {data?.is_partner ? 'Anda telah menjadi mitra SPPG!' : 'Belum terdaftar sebagai mitra SPPG'}
                </p>
              </div>

              <div className="flex gap-4 w-full max-w-3xl mb-10">
                <div className="flex-1 bg-[#F97316] text-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                  <span className="text-3xl">🏢</span>
                  <div>
                    <p className="text-2xl font-black">{data?.sppg_count || 0}</p>
                    <p className="font-semibold text-xs">Daftar SPPG</p>
                  </div>
                </div>
                <div className="flex-1 bg-[#3B82F6] text-white p-4 rounded-xl flex items-center gap-4 shadow-sm">
                  <span className="text-3xl">🏫</span>
                  <div>
                    <p className="text-2xl font-black">{data?.school_count || 0}</p>
                    <p className="font-semibold text-xs">Daftar Sekolah</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-800 mb-6 text-center">SPPG Saya</h3>

              {sppgList.length === 0 ? (
                <p className="text-gray-400 font-bold mb-8">Belum ada SPPG terdaftar</p>
              ) : (
                sppgList.map((sppg) => (
                  <div key={sppg.id} className="w-full max-w-3xl bg-white rounded-2xl p-5 shadow-sm border border-blue-100 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <span className="text-4xl">🏢</span>
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-lg font-black text-[#1E3A8A]">{sppg.name}</h4>
                        <div className="text-gray-600 font-semibold space-y-0.5 text-xs">
                          <p>Status: <span className="text-blue-500">{sppg.status === 'active' ? 'Aktif' : sppg.status}</span></p>
                          <p>Alamat: {sppg.address || '-'}</p>
                          <p>Kapasitas: {sppg.capacity} Porsi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <button
                onClick={() => navigate('/formulir-pendaftaran')}
                className="bg-[#2563EB] text-white px-10 py-3.5 rounded-lg font-bold text-base hover:bg-blue-700 shadow-md transition w-full max-w-xl mb-12 cursor-pointer mt-4"
              >
                Daftar SPPG Baru
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
