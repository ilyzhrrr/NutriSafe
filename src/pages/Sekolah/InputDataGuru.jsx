import React, { useEffect, useState } from 'react'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

const urutanJabatan = ['Kepala Sekolah', 'Wakil Kepala Sekolah', 'Guru']

const emptyForm = { name: '', nip: '', position: '', gender: '', address: '' }

export default function InputDataGuru() {
  const [form, setForm] = useState(emptyForm)
  const [dataGuru, setDataGuru] = useState([])
  const [schoolName, setSchoolName] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const loadTeachers = () => {
    setLoading(true)
    api
      .get('/school/teachers')
      .then((res) => setDataGuru(res.data || []))
      .catch((err) => setMessage(err.message || 'Gagal memuat data guru'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadTeachers()
    api.get('/school/profile').then((res) => setSchoolName(res.data?.name || '')).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    try {
      await api.post('/school/teachers', form)
      setForm(emptyForm)
      setIsSuccess(true)
      setMessage('Data guru berhasil disimpan!')
      loadTeachers()
    } catch (err) {
      setIsSuccess(false)
      setMessage(err.message || 'Gagal menyimpan data guru.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data guru ini?')) return
    try {
      await api.del(`/school/teachers/${id}`)
      loadTeachers()
    } catch (err) {
      setIsSuccess(false)
      setMessage(err.message || 'Gagal menghapus data guru.')
    }
  }

  const guruByJabatan = dataGuru.reduce((acc, g) => {
    const key = urutanJabatan.includes(g.position) ? g.position : 'Guru'
    if (!acc[key]) acc[key] = []
    acc[key].push(g)
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
              <p className="text-base sm:text-lg font-bold text-[#166534] mt-1">Input Data Guru</p>
            </div>
            <div className="sm:text-right pt-2">
              <p className="text-sm sm:text-lg font-bold text-gray-800">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </header>

          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="bg-[#C6F6D5] p-5 sm:p-8 rounded-3xl sm:rounded-[32px] shadow-sm w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">Formulir Data Guru</h3>
              </div>

              {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
                <div>
                  <label className="block text-sm font-bold mb-1.5">Nama Guru</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">NIP</label>
                    <input
                      type="text"
                      placeholder="10-18 digit angka"
                      value={form.nip}
                      onChange={(e) => setForm({ ...form, nip: e.target.value.replace(/\D/g, '') })}
                      required
                      maxLength={18}
                      inputMode="numeric"
                      className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Jabatan</label>
                    <select
                      value={form.position}
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                      required
                      className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600"
                    >
                      <option value="" disabled>Pilih Jabatan</option>
                      <option value="Kepala Sekolah">Kepala Sekolah</option>
                      <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                      <option value="Guru">Guru</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5">Jenis Kelamin</label>
                  <div className="flex gap-6 bg-white p-3 rounded-xl w-fit">
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Laki-Laki"
                        checked={form.gender === 'Laki-Laki'}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        className="w-4 h-4 accent-green-600"
                        required
                      />{' '}
                      Laki-Laki
                    </label>
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Perempuan"
                        checked={form.gender === 'Perempuan'}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        className="w-4 h-4 accent-green-600"
                        required
                      />{' '}
                      Perempuan
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5">Alamat Domisili</label>
                  <textarea
                    placeholder="Masukkan alamat lengkap"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full p-3 rounded-xl border-none outline-none h-24 text-sm font-semibold resize-none bg-white"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setForm(emptyForm)}
                    className="bg-white text-gray-500 px-6 sm:px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition cursor-pointer order-2 sm:order-1"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#22C55E] text-white px-6 sm:px-10 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60 order-1 sm:order-2"
                  >
                    {submitting ? 'Menyimpan...' : 'Simpan Data'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-5 sm:p-8 rounded-3xl sm:rounded-[32px] border-2 border-[#22C55E] shadow-sm w-full mb-10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6 border-b-2 border-gray-100 pb-4">
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">Daftar Guru Terdaftar</h3>
                <p className="text-sm font-bold bg-green-100 text-green-800 px-3 py-1.5 rounded-lg border-2 border-green-100">
                  Total: {dataGuru.length} Guru
                </p>
              </div>

              {loading ? (
                <div className="text-center py-10 text-gray-400 font-bold">Memuat data...</div>
              ) : dataGuru.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-400 font-bold">Belum ada data guru.</div>
              ) : (
                <div className="space-y-8">
                  {urutanJabatan.map((jabatan) => {
                    if (!guruByJabatan[jabatan] || guruByJabatan[jabatan].length === 0) return null
                    return (
                      <div key={jabatan}>
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="text-lg font-black text-[#166534] bg-green-100 px-3 py-1 rounded-md">{jabatan}</h4>
                          <div className="h-[2px] flex-1 bg-green-100"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {guruByJabatan[jabatan].map((g) => (
                            <div key={g.id} className="bg-green-50 border border-green-200 p-3 rounded-xl flex items-center gap-3 hover:shadow-sm transition group">
                              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border border-green-100 shrink-0">
                                {g.gender === 'Laki-Laki' ? '👦' : '👧'}
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="font-black text-gray-800 text-sm truncate">{g.name}</p>
                                <p className="text-xs font-bold text-gray-500 mt-0.5">NIP: {g.nip}</p>
                              </div>
                              <button
                                onClick={() => handleDelete(g.id)}
                                className="text-red-400 hover:text-red-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition"
                              >
                                Hapus
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
