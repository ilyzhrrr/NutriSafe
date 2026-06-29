import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

const FIELD_ALIASES = {
  name: ['nama lengkap siswa', 'nama lengkap', 'nama siswa', 'nama', 'name'],
  nisn: ['nisn'],
  class: ['kelas', 'class'],
  gender: ['jenis kelamin', 'jk', 'gender'],
  address: ['alamat domisili', 'alamat lengkap', 'alamat', 'address'],
}

const cleanHeader = (k) =>
  String(k)
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const normalizeRow = (raw) => {
  const out = { name: '', nisn: '', class: '', gender: '', address: '' }
  const cleanedKeys = {}
  Object.keys(raw).forEach((k) => { cleanedKeys[cleanHeader(k)] = raw[k] })
  const keyList = Object.keys(cleanedKeys)
  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    for (const a of aliases) {
      const exact = cleanedKeys[a]
      if (exact !== undefined && exact !== null && String(exact).trim() !== '') {
        out[field] = String(exact).trim()
        break
      }
      const partial = keyList.find((k) => k.includes(a))
      if (partial && cleanedKeys[partial] !== undefined && String(cleanedKeys[partial]).trim() !== '') {
        out[field] = String(cleanedKeys[partial]).trim()
        break
      }
    }
  }
  if (out.nisn) out.nisn = out.nisn.replace(/\D/g, '')
  if (out.gender) {
    const g = out.gender.toLowerCase().trim()
    if (g === 'l' || g === 'm' || g === 'male' || g.startsWith('lak')) out.gender = 'Laki-laki'
    else if (g === 'p' || g === 'f' || g === 'female' || g.startsWith('per')) out.gender = 'Perempuan'
  }
  return out
}

export default function DataSiswa() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterKelas, setFilterKelas] = useState('Semua')
  const [form, setForm] = useState({ name: '', nisn: '', class: '', gender: '', address: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const [kelasList, setKelasList] = useState([])
  const [showTambahKelas, setShowTambahKelas] = useState(false)
  const [newKelasLevel, setNewKelasLevel] = useState('')
  const [newKelasSuffix, setNewKelasSuffix] = useState('')
  const [savingKelas, setSavingKelas] = useState(false)
  const [kelasMsg, setKelasMsg] = useState('')
  const [schoolGrade, setSchoolGrade] = useState('')

  const [showImport, setShowImport] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [importRows, setImportRows] = useState([])
  const [importing, setImporting] = useState(false)
  const [importMsg, setImportMsg] = useState('')
  const [importSummary, setImportSummary] = useState(null)

  const gradeOptions = {
    'SD/MI':            ['1', '2', '3', '4', '5', '6'],
    'SMP/MTs/MTsN':     ['VII', 'VIII', 'IX'],
    'SMA/SMK/MA/MAN':   ['X', 'XI', 'XII'],
  }
  const levelOptions = gradeOptions[schoolGrade] || []

  const loadKelas = () => {
    api.get('/school/classes')
      .then((res) => setKelasList(res.data || []))
      .catch(() => {})
  }

  const load = () => {
    api.get('/school/students')
      .then((res) => setStudents(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    loadKelas()
    api.get('/school/profile')
      .then((res) => setSchoolGrade(res.data?.grade || ''))
      .catch(() => {})
  }, [])

  const handleTambahKelas = async (e) => {
    e.preventDefault()
    if (!newKelasLevel) return
    const name = newKelasSuffix.trim() ? `${newKelasLevel}-${newKelasSuffix.trim()}` : newKelasLevel
    setSavingKelas(true)
    setKelasMsg('')
    try {
      await api.post('/school/classes', { name })
      setKelasMsg('Kelas berhasil ditambahkan!')
      setNewKelasLevel('')
      setNewKelasSuffix('')

      loadKelas()
      setTimeout(() => { setShowTambahKelas(false); setKelasMsg('') }, 1000)
    } catch (err) {
      setKelasMsg('Gagal: ' + err.message)
    } finally {
      setSavingKelas(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await api.post('/school/students', form)
      setMsg('Data siswa berhasil disimpan!')
      setForm({ name: '', nisn: '', class: '', gender: '', address: '' })
      load()
    } catch (err) {
      setMsg('Gagal: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const resetImport = () => {
    setShowImport(false)
    setImportFile(null)
    setImportRows([])
    setImportMsg('')
    setImporting(false)
    setImportSummary(null)
  }

  const handleImportFile = async (file) => {
    if (!file) return
    setImportFile(file)
    setImportMsg('')
    try {
      const buf = await file.arrayBuffer()
      const wb = XLSX.read(buf, { type: 'array' })
      const sheet = wb.Sheets[wb.SheetNames[0]]
      const json = XLSX.utils.sheet_to_json(sheet, { defval: '' })
      const rows = json.map(normalizeRow).filter((r) => r.name && r.nisn)
      if (rows.length === 0) {
        setImportRows([])
        setImportMsg('Tidak ditemukan baris valid. Pastikan kolom Nama dan NISN terisi sesuai template.')
        return
      }
      setImportRows(rows)
    } catch {
      setImportRows([])
      setImportMsg('Gagal membaca berkas. Pastikan format .xlsx atau .xls.')
    }
  }

  const handleImportSubmit = async () => {
    if (importRows.length === 0) return
    setImporting(true)
    setImportMsg('')
    setImportSummary(null)
    try {
      const res = await api.post('/school/students/bulk', { students: importRows })
      const s = res.summary || { total: 0, success: 0, skipped: 0, error: 0, classes_created: 0 }
      setImportSummary(s)
      load()
      loadKelas()
      const kelasNote = s.classes_created > 0 ? ` ${s.classes_created} kelas baru otomatis ditambahkan.` : ''
      if (s.error === 0 && s.skipped === 0) {
        setImportMsg(`Berhasil mengimport ${s.success} data siswa.${kelasNote}`)
        setTimeout(() => resetImport(), 2500)
      } else {
        setImportMsg(`Proses selesai. Berhasil: ${s.success}, dilewati: ${s.skipped}, gagal: ${s.error}.${kelasNote}`)
      }
    } catch (err) {
      setImportMsg('Gagal: ' + (err.message || 'Tidak dapat menghubungi server.'))
    } finally {
      setImporting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus data siswa ini?')) return
    try {
      await api.del(`/school/students/${id}`)
      setStudents((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      alert('Gagal hapus: ' + err.message)
    }
  }

  const kelasFilter = [...new Set(students.map((s) => s.class).filter(Boolean))].sort()
  const filtered = filterKelas === 'Semua' ? students : students.filter((s) => s.class === filterKelas)

  const byClass = filtered.reduce((acc, s) => {
    const k = s.class || '-'
    if (!acc[k]) acc[k] = []
    acc[k].push(s)
    return acc
  }, {})

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-base sm:text-lg font-bold text-[#166534] mt-1">Input Data Siswa</p>
            </div>
            <div className="sm:text-right pt-2">
              <p className="text-sm sm:text-lg font-bold text-gray-800">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </header>

          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="bg-[#C6F6D5] p-5 sm:p-8 rounded-3xl sm:rounded-[32px] shadow-sm w-full">

              {/* Bagian Judul dan Tombol Import Excel */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">Formulir Data Siswa</h3>
                <button type="button" onClick={() => setShowImport(true)} className="bg-green-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-green-800 transition cursor-pointer shadow-sm self-start">
                  Import Data
                </button>
              </div>

              {msg && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {msg}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
                <div>
                  <label className="block text-sm font-bold mb-1.5">Nama Lengkap Siswa</label>
                  <input type="text" placeholder="Masukkan nama lengkap" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">NISN</label>
                    <input type="text" placeholder="10 digit angka" maxLength={10} minLength={10} value={form.nisn}
                      onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); setForm({ ...form, nisn: v }) }}
                      required inputMode="numeric" pattern="\d{10}"
                      className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-bold">Kelas</label>
                      <button type="button" onClick={() => { setShowTambahKelas(true); setKelasMsg(''); setNewKelasLevel(''); setNewKelasSuffix('') }}
                        className="text-xs font-bold text-white bg-[#22C55E] hover:bg-green-600 px-3 py-1 rounded-lg transition cursor-pointer">
                        + Tambah Kelas
                      </button>
                    </div>
                    <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })} required
                      className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600">
                      <option value="" disabled>Pilih Kelas</option>
                      {kelasList.map(k => (
                        <option key={k.id ?? k.name} value={k.name}>{k.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Jenis Kelamin</label>
                  <div className="flex gap-6 bg-white p-3 rounded-xl w-fit">
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input type="radio" name="jk" value="Laki-laki" checked={form.gender === 'Laki-laki'} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-4 h-4 accent-green-600" /> Laki-laki
                    </label>
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input type="radio" name="jk" value="Perempuan" checked={form.gender === 'Perempuan'} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-4 h-4 accent-green-600" /> Perempuan
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Alamat Domisili</label>
                  <textarea placeholder="Masukkan alamat lengkap siswa" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full p-3 rounded-xl border-none outline-none h-24 text-sm font-semibold resize-none"></textarea>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-3">
                  <button type="button" onClick={() => setForm({ name: '', nisn: '', class: '', gender: '', address: '' })}
                    className="bg-white text-gray-500 px-6 sm:px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition cursor-pointer order-2 sm:order-1">Batal</button>
                  <button type="submit" disabled={saving}
                    className="bg-[#22C55E] text-white px-6 sm:px-10 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60 order-1 sm:order-2">
                    {saving ? 'Menyimpan...' : 'Simpan Data'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-5 sm:p-8 rounded-3xl sm:rounded-[32px] border-2 border-[#22C55E] shadow-sm w-full mb-10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6 border-b-2 border-gray-100 pb-4">
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">Daftar Siswa</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <select value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)}
                    className="bg-white border-2 border-green-200 text-green-800 text-sm font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer">
                    <option value="Semua">Semua Kelas</option>
                    {kelasFilter.map(k => <option key={k} value={k}>Kelas {k}</option>)}
                  </select>
                  <p className="text-sm font-bold bg-green-100 text-green-800 px-3 py-1.5 rounded-lg border-2 border-green-100">
                    Total: {filtered.length} Siswa
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-10 text-gray-400 font-bold">Memuat data...</div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-400 font-bold">Belum ada data siswa.</div>
              ) : (
                <div className="space-y-8">
                  {Object.keys(byClass).sort().map((kelas) => (
                    <div key={kelas}>
                      <div className="flex items-center gap-3 mb-4">
                        <h4 className="text-lg font-black text-[#166534] bg-green-100 px-3 py-1 rounded-md">Kelas {kelas}</h4>
                        <div className="h-[2px] flex-1 bg-green-100"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {byClass[kelas].map((s) => (
                          <div key={s.id} className="bg-green-50 border border-green-200 p-3 rounded-xl flex items-center gap-3 hover:shadow-sm transition group">
                            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border border-green-100 shrink-0">
                              {s.gender === 'Laki-laki' ? '👦' : '👧'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="font-black text-gray-800 text-sm truncate">{s.name}</p>
                              <p className="text-xs font-bold text-gray-500 mt-0.5">NISN: {s.nisn}</p>
                            </div>
                            {!s.account_generated && (
                              <button onClick={() => handleDelete(s.id)} className="text-red-400 hover:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition">Hapus</button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showImport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => !importing && resetImport()}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-xl sm:text-2xl font-black text-[#166534] mb-1">Import Data Siswa dari Excel</h4>
            <p className="text-xs text-gray-500 font-bold mb-6">Ikuti dua langkah berikut untuk mengimport data siswa secara massal.</p>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4 sm:p-5 mb-5">
              <p className="text-sm font-black text-[#166534] mb-2">Langkah 1 — Unduh Template Excel</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-4 leading-relaxed">
                Silakan unduh template Excel resmi yang telah disediakan. Template ini memuat format kolom standar yang wajib digunakan: Nama Lengkap Siswa, NISN, Kelas, Jenis Kelamin, dan Alamat Domisili.
              </p>
              <a href="/template-data-siswa.xlsx" download
                className="inline-block bg-[#22C55E] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-sm">
                Unduh Template Excel
              </a>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5 mb-4">
              <p className="text-sm font-black text-gray-800 mb-2">Langkah 2 — Unggah Berkas Data Siswa</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 leading-relaxed">
                Setelah template diisi, silakan unggah berkas Excel berisi data siswa. Mohon pastikan format kolom tidak diubah agar proses import berhasil.
              </p>
              <p className="text-xs font-bold text-gray-400 mb-4">Format yang didukung: .xlsx atau .xls &middot; Ukuran maksimal: 5 MB</p>

              <input id="import-excel-file" type="file" accept=".xlsx,.xls"
                onChange={(e) => handleImportFile(e.target.files?.[0] || null)} className="hidden" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="import-excel-file"
                  className="bg-white border-2 border-[#22C55E] text-[#166534] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-50 transition cursor-pointer self-start">
                  Pilih Berkas Excel
                </label>
                <p className="text-xs sm:text-sm font-bold text-gray-500 truncate flex-1">
                  {importFile ? importFile.name : 'Belum ada berkas dipilih'}
                </p>
              </div>
            </div>

            {importMsg && (
              <div className={`mb-4 p-3 rounded-lg text-xs sm:text-sm font-bold ${importMsg.startsWith('Gagal') || importMsg.startsWith('Tidak') ? 'bg-red-50 text-red-700' : importMsg.startsWith('Selesai') ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                {importMsg}
              </div>
            )}

            {importRows.length > 0 && (
              <div className="mb-4">
                <p className="text-xs sm:text-sm font-black text-gray-800 mb-2">Preview ({Math.min(5, importRows.length)} dari {importRows.length} baris)</p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full min-w-[560px] text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#C6F6D5] text-[#166534]">
                        <th className="p-2.5 font-black">Nama</th>
                        <th className="p-2.5 font-black">NISN</th>
                        <th className="p-2.5 font-black">Kelas</th>
                        <th className="p-2.5 font-black">Jenis Kelamin</th>
                        <th className="p-2.5 font-black">Alamat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importRows.slice(0, 5).map((r, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0">
                          <td className="p-2.5 font-bold text-gray-800">{r.name || '-'}</td>
                          <td className="p-2.5 font-semibold text-gray-700">{r.nisn || '-'}</td>
                          <td className="p-2.5 font-semibold text-gray-700">{r.class || '-'}</td>
                          <td className="p-2.5 font-semibold text-gray-700">{r.gender ? r.gender[0] : '-'}</td>
                          <td className="p-2.5 font-semibold text-gray-700 truncate max-w-[180px]">{r.address || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs font-bold text-gray-500 mt-2">Total: {importRows.length} baris siap diimport.</p>
              </div>
            )}

            {importing && (
              <div className="mb-4 flex items-center justify-center gap-2 text-sm font-bold text-[#166534]">
                <span className="w-4 h-4 border-2 border-[#166534] border-t-transparent rounded-full animate-spin"></span>
                Mengimport data...
              </div>
            )}

            {importSummary && !importing && (
              <div className="mb-4 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                  <p className="font-black text-green-700 text-base">{importSummary.success}</p>
                  <p className="font-bold text-green-600">Berhasil</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
                  <p className="font-black text-yellow-700 text-base">{importSummary.skipped}</p>
                  <p className="font-bold text-yellow-600">Dilewati</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                  <p className="font-black text-red-700 text-base">{importSummary.error}</p>
                  <p className="font-bold text-red-600">Gagal</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2 border-t border-gray-100">
              <button type="button" onClick={resetImport} disabled={importing}
                className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition cursor-pointer disabled:opacity-60">
                Batal
              </button>
              <button type="button" onClick={handleImportSubmit} disabled={importing || importRows.length === 0}
                className="bg-[#22C55E] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60">
                {importing ? 'Mengimport...' : `Mulai Import ${importRows.length || ''} Data`.trim()}
              </button>
            </div>
          </div>
        </div>
      )}

      {showTambahKelas && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => { setShowTambahKelas(false); setKelasMsg('') }}>
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h4 className="text-xl font-black text-[#166534] mb-1">Tambah Kelas</h4>
            <p className="text-xs text-gray-400 font-bold mb-6">
              Tingkat sekolah: <span className="text-green-700">{schoolGrade || '—'}</span>
            </p>
            <form onSubmit={handleTambahKelas}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs font-black text-[#166534] mb-2 uppercase tracking-wide">Tingkat</p>
                  {levelOptions.length > 0 ? (
                    <select
                      value={newKelasLevel}
                      onChange={(e) => setNewKelasLevel(e.target.value)}
                      required
                      autoFocus
                      className="w-full p-2.5 rounded-lg border-2 border-green-200 outline-none text-sm font-bold bg-white focus:border-green-500 transition cursor-pointer"
                    >
                      <option value="" disabled>Pilih</option>
                      {levelOptions.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  ) : (
                    <p className="text-xs text-gray-400 font-bold mt-2">Data tingkat sekolah belum tersedia.</p>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-black text-gray-500 mb-2 uppercase tracking-wide">Nama Kelas <span className="font-normal normal-case">(opsional)</span></p>
                  <input
                    type="text"
                    placeholder="Contoh: A, B, Unggulan..."
                    value={newKelasSuffix}
                    onChange={(e) => setNewKelasSuffix(e.target.value)}
                    className="w-full p-2.5 rounded-lg border-2 border-gray-200 outline-none text-sm font-bold focus:border-green-400 transition"
                  />
                </div>
              </div>
              {newKelasLevel && (
                <p className="text-xs text-gray-500 font-bold mb-4">
                  Nama kelas yang akan dibuat: <span className="text-green-700 font-black">
                    {newKelasSuffix.trim() ? `${newKelasLevel}-${newKelasSuffix.trim()}` : newKelasLevel}
                  </span>
                </p>
              )}
              {kelasMsg && (
                <p className={`text-xs font-bold mb-3 ${kelasMsg.startsWith('Gagal') ? 'text-red-600' : 'text-green-600'}`}>{kelasMsg}</p>
              )}
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => { setShowTambahKelas(false); setKelasMsg('') }}
                  className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition cursor-pointer">
                  Batal
                </button>
                <button type="submit" disabled={savingKelas || !newKelasLevel}
                  className="bg-[#22C55E] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60">
                  {savingKelas ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}