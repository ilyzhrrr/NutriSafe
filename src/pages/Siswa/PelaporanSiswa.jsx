import React, { useEffect, useRef, useState } from 'react'
import SidebarSiswa from './SidebarSiswa'
import { api } from '../../api'

const ISSUE_OPTIONS = [
  { value: 'kekurangan_makanan', label: 'Makanan Kurang' },
  { value: 'makanan_basi', label: 'Makanan Basi' },
  { value: 'masalah_alergen', label: 'Masalah Alergen' },
  { value: 'terlambat', label: 'Makanan Terlambat' },
  { value: 'lainnya', label: 'Lainnya' },
]

export default function PelaporanSiswa() {
  const photoRef = useRef()
  const [mySchool, setMySchool] = useState(null)
  const [loadingSchool, setLoadingSchool] = useState(true)
  const [form, setForm] = useState({ issue_type: '', report_date: new Date().toISOString().split('T')[0], description: '' })
  const [photoFile, setPhotoFile] = useState(null)
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/umum/siswa-school')
      .then((res) => setMySchool(res.data || null))
      .catch(() => setMySchool(null))
      .finally(() => setLoadingSchool(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!mySchool?.school_id) {
      setMsg('Gagal: Data sekolah tidak ditemukan.')
      return
    }
    setSending(true)
    setMsg('')
    try {
      const fd = new FormData()
      fd.append('school_id', mySchool.school_id)
      fd.append('issue_type', form.issue_type)
      fd.append('report_date', form.report_date)
      fd.append('description', form.description)
      if (photoFile) fd.append('photo', photoFile)
      await api.postForm('/umum/reports', fd)
      setMsg('Laporan berhasil dikirim!')
      setForm({ issue_type: '', report_date: new Date().toISOString().split('T')[0], description: '' })
      setPhotoFile(null)
      if (photoRef.current) photoRef.current.value = ''
    } catch (err) {
      setMsg('Gagal: ' + err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FFEDD5] font-sans">
      <SidebarSiswa />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="max-w-4xl relative">

          <div className="flex justify-between items-start mb-6">
            <div className="relative z-10 pt-2 sm:pt-4">
              <h2 className="text-2xl sm:text-4xl font-black text-[#1E3A8A]">Dashboard Siswa</h2>
              <p className="text-lg sm:text-xl font-bold text-[#1E3A8A] mt-1">Pelaporan Makanan</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm relative z-10">

            <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100">
              <h3 className="text-xl sm:text-2xl font-black text-gray-900">Formulir Pelaporan Masalah</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 text-[#3B82F6] font-bold border-b border-gray-100 pb-4">
                <span className="text-xl">📋</span> Informasi Laporan
              </div>

              {msg && (
                <div className={`p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {msg}
                </div>
              )}

              {/* Info sekolah otomatis dari akun siswa */}
              {loadingSchool ? (
                <div className="bg-blue-50 p-4 rounded-xl text-sm font-bold text-gray-400">Memuat data sekolah...</div>
              ) : mySchool ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-center gap-3 pl-4 py-4 rounded-xl border border-gray-200 bg-blue-50/50 font-bold text-gray-700 select-none">
                    <span>🏫</span>
                    <span>{mySchool.school_name || '-'}</span>
                  </div>
                  <div className="flex items-center gap-3 pl-4 py-4 rounded-xl border border-gray-200 bg-blue-50/50 font-bold text-gray-700 select-none">
                    <span>📍</span>
                    <span>{mySchool.address || '-'}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded-xl text-sm font-bold text-red-600 border border-red-200">
                  Data sekolah tidak ditemukan. Pastikan akun siswa terhubung ke sekolah.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">📑</div>
                  <select value={form.issue_type} onChange={(e) => setForm({ ...form, issue_type: e.target.value })} required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 bg-white cursor-pointer">
                    <option value="" disabled>Jenis Masalah</option>
                    {ISSUE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">📅</div>
                  <input type="date" value={form.report_date} onChange={(e) => setForm({ ...form, report_date: e.target.value })} required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 bg-white" />
                </div>
              </div>

              <textarea placeholder="Deskripsi masalah ...." value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} required
                className="w-full p-4 rounded-2xl border border-gray-200 h-28 outline-none font-bold text-gray-700 resize-none"></textarea>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-2">
                <div className="flex-1 flex items-center gap-4 min-w-0">
                  <div className="font-bold text-sm text-gray-700 break-words">
                    {photoFile ? photoFile.name : 'Upload Bukti'}
                  </div>
                  <hr className="flex-1 border-gray-300 hidden sm:block" />
                </div>
                <button type="button" onClick={() => photoRef.current.click()}
                  className="bg-[#2563EB] text-white px-6 sm:px-10 py-3 rounded-xl font-bold sm:ml-6 hover:bg-blue-700 transition flex flex-col items-center leading-tight cursor-pointer">
                  <span className="text-base sm:text-lg">Upload</span>
                  <span className="text-xs font-normal">Foto</span>
                </button>
                <input ref={photoRef} type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} className="hidden" />
              </div>

              <div className="flex justify-center pt-2">
                <button type="submit" disabled={sending || !mySchool}
                  className="bg-[#F97316] text-white px-16 sm:px-32 py-4 rounded-2xl font-black text-lg sm:text-xl hover:bg-orange-600 transition shadow-md cursor-pointer disabled:opacity-60 w-full sm:w-auto">
                  {sending ? 'Mengirim...' : 'Kirim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
