import React, { useEffect, useState } from 'react'
import SidebarMitra from './SidebarMitra'
import { api } from '../../api'

export default function RiwayatLaporan() {
  const [groups, setGroups] = useState([])
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    api.get('/sppg/delivery-reports')
      .then((res) => setGroups(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const openDetail = async (reportId) => {
    setDetailLoading(true)
    try {
      const res = await api.get(`/sppg/delivery-reports/${reportId}`)
      setDetail(res.data)
      setSelected(reportId)
    } catch {}
    finally { setDetailLoading(false) }
  }

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'

  if (selected && detail) {
    return (
      <div className="min-h-screen bg-[#E0F2FE] font-sans p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => { setSelected(null); setDetail(null) }} className="text-[#1E3A8A] text-2xl font-bold hover:text-blue-600">
              &lt;
            </button>
            <div>
              <h1 className="text-xl font-black text-[#1E3A8A]">Riwayat Laporan Makanan</h1>
              <h2 className="text-sm font-bold text-[#3B82F6] mt-0.5">Detail Laporan #{detail.id}</h2>
            </div>
          </div>

          {detailLoading ? (
            <div className="text-center py-20 text-gray-400 font-bold">Memuat detail...</div>
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex items-start gap-4 border border-blue-50">
                <div className="bg-blue-50 p-2 rounded-xl text-2xl">🏫</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{detail.school?.name || '-'}</h3>
                  <p className="text-xs text-gray-600 font-medium mb-3">{detail.school?.address || '-'}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-[#93C5FD] text-[#1E3A8A] font-bold px-3 py-1.5 rounded-md flex items-center gap-1">
                      📅 {fmtDate(detail.delivery_date)}
                    </span>
                    <span className={`font-bold px-3 py-1.5 rounded-md flex items-center gap-1 ${detail.status === 'diterima' ? 'bg-[#86EFAC] text-green-900' : 'bg-yellow-100 text-yellow-800'}`}>
                      {detail.status === 'diterima' ? '✓ Diterima' : detail.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/3 flex flex-col gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-blue-50">
                    <h4 className="font-bold text-sm mb-2 text-gray-800">Total Porsi</h4>
                    <p className="text-2xl font-black text-gray-900">{detail.total_portions}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-center border border-blue-50">
                    <h4 className="font-bold text-sm mb-2 text-gray-800">Terdistribusi</h4>
                    <p className="text-2xl font-black text-gray-900">{detail.distributed_portions} <span className="text-sm font-bold text-gray-500">Porsi</span></p>
                    <p className="text-xs text-gray-400 mt-1 font-semibold">{detail.distribution_pct}% Selesai</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-50">
                    <h4 className="font-bold text-sm text-center mb-3 text-gray-800">Siswa Alergi</h4>
                    <p className="text-2xl font-black text-center mb-4 text-gray-900">{detail.allergy_students?.total || 0} <span className="text-sm font-bold text-gray-500">Siswa</span></p>
                    <div className="flex flex-col gap-2 font-bold text-xs text-gray-700">
                      {(detail.allergy_students?.breakdown || []).map((b, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                          <span>{b.count} Siswa Alergi {b.allergy_type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-2/3 flex flex-col gap-4">
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-blue-50">
                    <h3 className="font-bold text-center py-4 text-base text-gray-800">Menu Makanan</h3>
                    {(detail.menu_items || []).length === 0 ? (
                      <p className="text-center py-4 text-gray-400 text-sm">Tidak ada data menu</p>
                    ) : (
                      <table className="w-full text-xs">
                        <thead className="bg-gray-200/50 text-left">
                          <tr>
                            <th className="px-4 py-2 font-bold text-gray-600">Nama Menu</th>
                            <th className="px-4 py-2 font-bold text-gray-600 text-right">Porsi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detail.menu_items.map((item, i) => (
                            <tr key={i} className="border-t border-gray-100">
                              <td className="px-4 py-2">
                                <div className="font-bold text-gray-800">{item.menu_name}</div>
                                {item.category && <div className="text-[10px] font-semibold text-gray-500 mt-0.5">{item.category}</div>}
                                {item.is_allergy_substitute && <div className="text-[10px] text-orange-500 font-bold">Menu Pengganti Alergi</div>}
                              </td>
                              <td className="px-4 py-2 text-right font-bold text-gray-800">{item.portions} Porsi</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-4 text-center border border-blue-50">
                    <h3 className="font-bold text-base mb-4 text-gray-800">Foto Dokumentasi</h3>
                    <div className="flex gap-4 justify-center">
                      {detail.photos?.photo1 ? (
                        <img src={detail.photos.photo1} alt="Foto 1" className="w-48 h-32 object-cover rounded-xl border border-gray-200" />
                      ) : (
                        <div className="w-48 h-32 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 text-xs font-bold">Foto 1</div>
                      )}
                      {detail.photos?.photo2 ? (
                        <img src={detail.photos.photo2} alt="Foto 2" className="w-48 h-32 object-cover rounded-xl border border-gray-200" />
                      ) : (
                        <div className="w-48 h-32 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 text-xs font-bold">Foto 2</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold">Memuat data...</div>
        ) : groups.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400 font-bold border border-blue-50">
            Belum ada laporan pengiriman
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.date} className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-blue-50">
              <h3 className="text-gray-500 font-bold mb-4 text-xs">
                {new Date(group.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </h3>
              {(group.schools || []).map((s) => (
                <div key={s.report_id} className="bg-[#CFFAFE] rounded-xl p-4 mb-3 flex justify-between items-center border border-cyan-100">
                  <div className="flex gap-4 items-center">
                    <div className="bg-white p-2 rounded-xl shadow-sm text-2xl">🏫</div>
                    <div>
                      <h4 className="font-bold text-base text-gray-800 mb-0.5">{s.school_name}</h4>
                      <p className="text-xs font-semibold text-gray-600 mb-1">{s.address || '-'}</p>
                      <p className="text-xs font-bold text-gray-800">{s.total_portions} Porsi</p>
                    </div>
                  </div>
                  <button onClick={() => openDetail(s.report_id)} className="bg-[#2563EB] text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-blue-700 transition text-xs">
                    Detail
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
      </main>
    </div>
  )
}
