import React, { useEffect, useRef, useState } from 'react'
import SidebarUmum from './SidebarUmum'
import { api } from '../../api'

const ISSUE_OPTIONS = [
  { value: 'kekurangan_makanan', label: 'Makanan Kurang' },
  { value: 'makanan_basi', label: 'Makanan Basi' },
  { value: 'masalah_alergen', label: 'Masalah Alergen' },
  { value: 'terlambat', label: 'Makanan Terlambat' },
  { value: 'lainnya', label: 'Lainnya' },
]

export default function PelaporanUmum() {
  const photoRef = useRef()
  const [schools, setSchools] = useState([])
  const [form, setForm] = useState({ school_id: '', issue_type: '', report_date: new Date().toISOString().split('T')[0], description: '' })
  const [photoFile, setPhotoFile] = useState(null)
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/umum/schools')
      .then((res) => setSchools(res.data || []))
      .catch(() => {})
  }, [])

  const selectedSchool = schools.find((s) => String(s.school_id) === String(form.school_id))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setMsg('')
    try {
      const fd = new FormData()
      fd.append('school_id', form.school_id)
      fd.append('issue_type', form.issue_type)
      fd.append('report_date', form.report_date)
      fd.append('description', form.description)
      if (photoFile) fd.append('photo', photoFile)
      await api.postForm('/umum/reports', fd)
      setMsg('Laporan berhasil dikirim!')
      setForm({ school_id: '', issue_type: '', report_date: new Date().toISOString().split('T')[0], description: '' })
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
      <SidebarUmum />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl relative">

          <div className="flex justify-between items-start mb-6">
            <div className="relative z-10 pt-4">
              <h2 className="text-4xl font-black text-[#1E3A8A]">Dashboard Umum</h2>
              <p className="text-xl font-bold text-[#1E3A8A] mt-1">Pelaporan Makanan</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm relative z-10">

            <div className="px-8 py-6 border-b border-gray-100">
              <h3 className="text-2xl font-black text-gray-900">Formulir Pelaporan Masalah</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="flex items-center gap-2 text-[#3B82F6] font-bold border-b border-gray-100 pb-4">
                <span className="text-xl">📋</span> Informasi Laporan
              </div>

              {msg && (
                <div className={`p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {msg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">🏫</div>
                  <select value={form.school_id} onChange={(e) => setForm({ ...form, school_id: e.target.value })} required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 outline-none font-bold text-gray-700 bg-white cursor-pointer">
                    <option value="" disabled>Pilih Sekolah</option>
                    {schools.map((s) => (
                      <option key={s.school_id} value={s.school_id}>{s.school_name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-3 pl-4 py-4 rounded-xl border border-gray-200 bg-blue-50/50 font-bold select-none min-h-[58px]">
                  <span>📍</span>
                  <span className={selectedSchool?.address ? 'text-gray-700' : 'text-gray-400 font-normal'}>
                    {selectedSchool?.address || 'Alamat otomatis terisi'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
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

              <div className="flex justify-between items-center pt-2">
                <div className="flex-1 flex items-center gap-4">
                  <div className="font-bold text-sm text-gray-700">
                    {photoFile ? photoFile.name : <>Upload<br />Bukti</>}
                  </div>
                  <hr className="flex-1 border-gray-300" />
                </div>
                <button type="button" onClick={() => photoRef.current.click()}
                  className="bg-[#2563EB] text-white px-10 py-3 rounded-xl font-bold ml-6 hover:bg-blue-700 transition flex flex-col items-center leading-tight cursor-pointer">
                  <span className="text-lg">Upload</span>
                  <span className="text-xs font-normal">Foto</span>
                </button>
                <input ref={photoRef} type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} className="hidden" />
              </div>

              <div className="flex justify-center pt-2">
                <button type="submit" disabled={sending}
                  className="bg-[#F97316] text-white px-32 py-4 rounded-2xl font-black text-xl hover:bg-orange-600 transition shadow-md cursor-pointer disabled:opacity-60">
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
