import React, { useEffect, useState } from 'react'
import SidebarMitra from './SidebarMitra'
import { api } from '../../api'

export default function DaftarSekolah() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Modal tambah sekolah
  const [showModal, setShowModal] = useState(false)
  const [availableSchools, setAvailableSchools] = useState([])
  const [loadingSchools, setLoadingSchools] = useState(false)
  const [pickedIds, setPickedIds] = useState(new Set())
  const [modalSearch, setModalSearch] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [assignMsg, setAssignMsg] = useState('')

  const load = () => {
    setLoading(true)
    api.get('/sppg/schools')
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openModal = () => {
    setShowModal(true)
    setPickedIds(new Set())
    setModalSearch('')
    setAssignMsg('')
    setLoadingSchools(true)
    api.get('/sppg/available-schools')
      .then((res) => setAvailableSchools(res.data || []))
      .catch(() => setAvailableSchools([]))
      .finally(() => setLoadingSchools(false))
  }

  const togglePick = (id) => {
    setPickedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAssign = async () => {
    if (pickedIds.size === 0) return
    setAssigning(true)
    setAssignMsg('')
    try {
      await api.post('/sppg/assign-schools', { school_ids: Array.from(pickedIds) })
      setShowModal(false)
      setAssignMsg(`${pickedIds.size} sekolah berhasil ditambahkan.`)
      load()
    } catch (e) {
      setAssignMsg('Gagal: ' + e.message)
    } finally {
      setAssigning(false)
    }
  }

  const schools = data?.schools || []
  const modalFiltered = availableSchools.filter((s) =>
    !modalSearch || s.name.toLowerCase().includes(modalSearch.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="flex-1 lg:w-3/4 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 min-w-0">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-[#1E3A8A]">Dashboard Pengelola</h1>
          <h2 className="text-base sm:text-lg font-bold text-[#3B82F6] mt-0.5">Daftar Sekolah Mitra</h2>
        </div>

        {assignMsg && (
          <div className={`mb-4 p-3 rounded-xl text-sm font-bold ${assignMsg.startsWith('Gagal') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
            {assignMsg}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold">Memuat data...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-2xl">🏫</div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">Total Sekolah</p>
                  <p className="text-2xl font-black text-gray-800">{data?.total_school || 0} <span className="text-sm font-semibold text-gray-500">Sekolah</span></p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-xl text-2xl">👤</div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">Total Siswa Terdaftar</p>
                  <p className="text-2xl font-black text-gray-800">{data?.total_students || 0} <span className="text-sm font-semibold text-gray-500">Siswa</span></p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-xl text-2xl">🍱</div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">Kebutuhan Porsi Harian</p>
                  <p className="text-2xl font-black text-gray-800">{data?.total_students || 0} <span className="text-sm font-semibold text-gray-500">Porsi</span></p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-3 mb-6 sm:mb-8">
              <div className="sm:col-start-3">
                <button
                  onClick={openModal}
                  className="w-full bg-[#3B82F6] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="text-lg leading-none">+</span> Tambah Sekolah
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-800 text-sm">Data Lengkap Sekolah</h3>
              </div>

              {schools.length === 0 ? (
                <p className="text-center py-10 text-gray-400 font-bold">Belum ada sekolah yang dilayani</p>
              ) : (
                <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-xs text-left">
                  <thead className="bg-gray-100/50 text-gray-500">
                    <tr>
                      <th className="px-6 py-3 font-bold">Nama Sekolah</th>
                      <th className="px-6 py-3 font-bold">Alamat Lengkap</th>
                      <th className="px-6 py-3 font-bold">Info Utama</th>
                      <th className="px-6 py-3 font-bold">Data Alergi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {schools.map((s) => (
                      <tr key={s.id} className="hover:bg-blue-50/30 transition">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-800 text-sm">{s.name}</div>
                          <div className="text-gray-500 font-semibold mt-0.5">{s.Grade || '-'}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium max-w-[200px] leading-relaxed">
                          {s.address || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-800 flex items-center gap-2 mb-1">
                            <span className="text-sm">👤</span> {s.student_count} Siswa
                          </div>
                          <div className="font-bold text-gray-800 flex items-center gap-2">
                            <span className="text-sm">🧑‍🏫</span> {s.teacher_count} Guru
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {(s.allergy_types || []).length === 0 ? (
                            <span className="text-gray-400 font-semibold">Tidak ada</span>
                          ) : (
                            <div className="text-xs font-bold text-gray-700 space-y-1">
                              {s.allergy_types.map((t, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                                  {t}
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* ── MODAL TAMBAH SEKOLAH ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-gray-800">Tambah Sekolah</h3>
                <p className="text-xs text-gray-500 mt-0.5">Pilih sekolah yang belum memiliki SPPG</p>
              </div>
              <button onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none">&times;</button>
            </div>

            {/* Search */}
            <div className="px-6 py-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Cari sekolah..."
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-sm outline-none bg-[#EFF6FF] border border-blue-200 text-gray-700 placeholder-gray-400 focus:border-[#3B82F6] transition"
              />
            </div>

            {/* List sekolah */}
            <div className="flex-1 overflow-y-auto px-6 py-3">
              {loadingSchools ? (
                <p className="text-center text-gray-400 font-semibold py-8">Memuat data sekolah...</p>
              ) : modalFiltered.length === 0 ? (
                <p className="text-center text-gray-400 font-semibold py-8">Tidak ada sekolah tersedia</p>
              ) : (
                <div className="space-y-2">
                  {modalFiltered.map((s) => (
                    <label key={s.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${pickedIds.has(s.id) ? 'bg-[#EFF6FF] border-[#3B82F6]' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="checkbox"
                        checked={pickedIds.has(s.id)}
                        onChange={() => togglePick(s.id)}
                        className="w-4 h-4 accent-[#3B82F6] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.grade || 'Jenjang belum diisi'} · {s.student_count || 0} siswa</p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-3">
              <span className="text-xs text-gray-500 font-semibold">
                {pickedIds.size} sekolah dipilih
              </span>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
                  Batal
                </button>
                <button
                  onClick={handleAssign}
                  disabled={pickedIds.size === 0 || assigning}
                  className="px-6 py-2 rounded-lg bg-[#3B82F6] text-white text-sm font-bold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {assigning ? 'Menyimpan...' : 'Pilih'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
