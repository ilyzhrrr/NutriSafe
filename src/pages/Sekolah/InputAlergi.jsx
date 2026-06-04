import React, { useEffect, useState } from 'react'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

export default function InputAlergi() {
  const [allergies, setAllergies] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ student_name: '', class_name: '', allergy_type: '', description: '', severity: '', action_required: '' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [kelasList, setKelasList] = useState([])
  const [students, setStudents] = useState([])
  const [studentSearch, setStudentSearch] = useState('')
  const [showStudentPicker, setShowStudentPicker] = useState(false)
  const pickerRef = React.useRef(null)

  const load = () => {
    api.get('/school/allergy-data')
      .then((res) => setAllergies(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    api.get('/school/classes').then((res) => setKelasList(res.data || [])).catch(() => {})
    api.get('/school/students').then((res) => setStudents(res.data || [])).catch(() => {})
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowStudentPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s.class && s.class.toLowerCase().includes(studentSearch.toLowerCase()))
  )

  const selectStudent = (s) => {
    setForm({ ...form, student_name: s.name, class_name: s.class || '' })
    setStudentSearch('')
    setShowStudentPicker(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await api.post('/school/allergy-data', form)
      setMsg('Data alergi berhasil disimpan!')
      setForm({ student_name: '', class_name: '', allergy_type: '', description: '', severity: '', action_required: '' })
      load()
    } catch (err) {
      setMsg('Gagal: ' + err.message)
    } finally {
      setSaving(false)
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
              <p className="text-base sm:text-lg font-bold text-[#166534] mt-1">Input Data Alergi Siswa</p>
            </div>
            <div className="sm:text-right pt-2">
              <p className="text-sm sm:text-lg font-bold text-gray-800">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
            <div className="flex-1 bg-[#C6F6D5] p-5 sm:p-8 rounded-3xl sm:rounded-[32px] shadow-sm">
              <h3 className="text-xl sm:text-2xl font-black mb-6">Formulir Alergi Siswa</h3>
              {msg && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {msg}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
                <div className="relative" ref={pickerRef}>
                  <label className="block text-sm font-bold mb-1.5">Nama Siswa</label>
                  <div
                    className="w-full p-3 rounded-xl bg-white text-sm font-semibold cursor-pointer flex items-center justify-between"
                    onClick={() => { setShowStudentPicker(true); setStudentSearch('') }}
                  >
                    <span className={form.student_name ? 'text-gray-800' : 'text-gray-400'}>
                      {form.student_name || 'Cari nama siswa...'}
                    </span>
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </div>
                  {showStudentPicker && (
                    <div className="absolute z-20 top-full mt-1 w-full bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                      <div className="p-3 border-b border-gray-100">
                        <input
                          autoFocus
                          type="text"
                          placeholder="Cari nama atau kelas..."
                          value={studentSearch}
                          onChange={(e) => setStudentSearch(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border-2 border-green-200 outline-none text-sm font-semibold focus:border-green-500 transition"
                        />
                      </div>
                      <ul className="max-h-52 overflow-y-auto">
                        {filteredStudents.length === 0 ? (
                          <li className="px-4 py-6 text-center text-sm text-gray-400 font-bold">
                            {students.length === 0 ? 'Belum ada siswa terdaftar' : 'Siswa tidak ditemukan'}
                          </li>
                        ) : (
                          filteredStudents.map((s) => (
                            <li
                              key={s.id}
                              onClick={() => selectStudent(s)}
                              className="flex items-center justify-between px-4 py-3 hover:bg-green-50 cursor-pointer transition border-b border-gray-50 last:border-0"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{s.gender === 'Laki-laki' ? '👦' : '👧'}</span>
                                <div>
                                  <p className="text-sm font-black text-gray-800">{s.name}</p>
                                  <p className="text-xs font-bold text-gray-400">NISN: {s.nisn}</p>
                                </div>
                              </div>
                              {s.class && (
                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">{s.class}</span>
                              )}
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                  <input type="text" required value={form.student_name} onChange={() => {}} className="sr-only" tabIndex={-1} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Kelas</label>
                  <select value={form.class_name} onChange={(e) => setForm({ ...form, class_name: e.target.value })} required
                    className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600">
                    <option value="" disabled>Pilih Kelas</option>
                    {kelasList.map(k => (
                      <option key={k.id ?? k.name} value={k.name}>{k.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Jenis Alergi</label>
                  <input type="text" placeholder="Contoh: Kacang" value={form.allergy_type} onChange={(e) => setForm({ ...form, allergy_type: e.target.value })} required
                    className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Deskripsi Alergi</label>
                  <textarea placeholder="Contoh: gatal-gatal saat mengkonsumsi kacang" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 rounded-xl border-none outline-none h-24 text-sm font-semibold resize-none"></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Tingkat Keparahan</label>
                    <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })} required
                      className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600">
                      <option value="" disabled>Pilih</option>
                      <option value="ringan">Ringan</option>
                      <option value="sedang">Sedang</option>
                      <option value="berat">Berat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Tindakan Yang Diperlukan</label>
                    <input type="text" placeholder="Contoh: Bawa ke UKS" value={form.action_required} onChange={(e) => setForm({ ...form, action_required: e.target.value })}
                      className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setForm({ student_name: '', class_name: '', allergy_type: '', description: '', severity: '', action_required: '' })}
                    className="flex-1 bg-white text-gray-500 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition cursor-pointer">Batal</button>
                  <button type="submit" disabled={saving}
                    className="flex-1 bg-[#22C55E] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60">
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full lg:w-[350px] bg-white p-5 sm:p-8 rounded-3xl sm:rounded-[32px] border-2 border-[#22C55E] shadow-sm flex flex-col">
              <h3 className="text-xl font-black mb-6 text-gray-800">Daftar Alergi Siswa</h3>
              {loading ? (
                <p className="text-center text-gray-400 font-bold text-sm">Memuat data...</p>
              ) : allergies.length === 0 ? (
                <p className="text-center text-gray-400 font-bold text-sm">Belum ada data alergi</p>
              ) : (
                <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
                  {allergies.map((a) => (
                    <div key={a.id} className="border border-gray-200 bg-gray-50/50 p-4 rounded-xl hover:shadow-sm transition">
                      <p className="font-black text-gray-800 text-sm mb-1">{a.student_name}</p>
                      <p className="text-xs font-bold text-gray-500 mb-2">Kelas: {a.class_name}</p>
                      <p className="text-xs font-bold text-red-600 flex items-center gap-2 bg-red-50 w-fit px-2 py-1 rounded-md">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span> Alergi {a.allergy_type}
                      </p>
                      {a.severity && <p className="text-xs text-gray-400 font-semibold mt-1">Tingkat: {a.severity}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
