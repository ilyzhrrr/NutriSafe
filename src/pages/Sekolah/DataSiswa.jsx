import React, { useEffect, useState } from 'react'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

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
                <button type="button" className="bg-green-700 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-green-800 transition cursor-pointer shadow-sm self-start">
                  Import Data dari Excel
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
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">Daftar Siswa Terdaftar</h3>
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