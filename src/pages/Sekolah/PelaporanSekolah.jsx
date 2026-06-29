import React, { useEffect, useRef, useState } from 'react'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

const ISSUE_OPTIONS = [
  { value: 'kekurangan_makanan', label: 'Makanan Kurang' },
  { value: 'makanan_basi', label: 'Makanan Basi' },
  { value: 'masalah_alergen', label: 'Masalah Alergen' },
  { value: 'terlambat', label: 'Makanan Terlambat' },
  { value: 'lainnya', label: 'Lainnya' },
]

export default function PelaporanSekolah() {
  const photoRef = useRef()
  const [sppg, setSppg] = useState(null)
  const [form, setForm] = useState({ issue_type: '', description: '', report_date: new Date().toISOString().split('T')[0] })
  const [photoFile, setPhotoFile] = useState(null)
  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/school/sppg-info')
      .then((res) => setSppg(res.data))
      .catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setMsg('')
    try {
      const fd = new FormData()
      fd.append('issue_type', form.issue_type)
      fd.append('description', form.description)
      fd.append('report_date', form.report_date)
      if (photoFile) fd.append('photo', photoFile)
      await api.postForm('/school/reports', fd)
      setMsg('Laporan berhasil dikirim!')
      setForm({ issue_type: '', description: '', report_date: new Date().toISOString().split('T')[0] })
      setPhotoFile(null)
      if (photoRef.current) photoRef.current.value = ''
    } catch (err) {
      setMsg('Gagal: ' + err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-base sm:text-lg font-bold text-[#166534] mt-1">Pelaporan Makanan</p>
            </div>
            <div className="sm:text-right pt-2">
              <p className="text-sm sm:text-lg font-bold text-gray-800">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </header>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl flex items-center gap-3 shadow-sm border border-gray-100 w-fit">
              <span className="text-xl">🍱</span>
              <p className="font-black text-lg text-blue-900">{sppg ? sppg.name : 'Belum ada SPPG'}</p>
            </div>

            {msg && (
              <div className={`p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="bg-[#C6F6D5] p-5 sm:p-8 rounded-3xl sm:rounded-[32px]">
                <h3 className="text-xl sm:text-2xl font-black mb-6">Formulir Pelaporan Masalah</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:w-3/4">
                    <select value={form.issue_type} onChange={(e) => setForm({ ...form, issue_type: e.target.value })} required
                      className="p-3 rounded-xl border-2 border-blue-200 outline-none text-sm font-bold text-gray-600 bg-white cursor-pointer">
                      <option value="" disabled>Jenis Masalah</option>
                      {ISSUE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <input type="date" value={form.report_date} onChange={(e) => setForm({ ...form, report_date: e.target.value })} required
                      className="p-3 rounded-xl border-2 border-blue-200 outline-none text-sm font-bold text-gray-600 bg-white" />
                  </div>
                  <textarea placeholder="Deskripsi masalah ......" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required
                    className="w-full lg:w-3/4 p-4 rounded-xl border-2 border-blue-200 h-28 outline-none text-sm font-semibold resize-none"></textarea>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center w-full lg:w-3/4 sm:justify-end pt-2">
                    <p className="font-bold text-sm text-gray-600 break-words">{photoFile ? photoFile.name : 'Upload Bukti (opsional)'}</p>
                    <button type="button" onClick={() => photoRef.current.click()}
                      className="bg-[#3B82F6] text-white px-6 sm:px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition cursor-pointer shadow-sm self-start sm:self-auto">
                      Upload Foto
                    </button>
                    <input ref={photoRef} type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} className="hidden" />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button type="submit" disabled={sending}
                  className="bg-[#22C55E] text-white px-16 sm:px-24 py-3 rounded-xl font-black text-base hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60 w-full sm:w-auto">
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
