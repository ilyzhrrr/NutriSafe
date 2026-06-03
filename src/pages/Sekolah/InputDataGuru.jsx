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
    <div className="flex min-h-screen bg-[#cbf4c9] font-sans">
      <SidebarSekolah />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#1E3A8A]">Dashboard Sekolah</h2>
              <p className="text-xl font-bold text-[#1E3A8A] mt-1">Input Data Guru</p>
              <h3 className="text-xl font-black text-black mt-2">{schoolName || 'Sekolah'}</h3>
            </div>
          </header>

          {message && (
            <div
              className={`mb-6 rounded-xl border px-4 py-3 text-sm font-bold ${
                isSuccess
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex flex-col gap-8">
            <div className="bg-[#A7F3D0] p-8 rounded-2xl shadow-sm w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-black">Formulir Data Guru</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-black">
                <div>
                  <label className="block text-sm font-bold mb-2">Nama Guru</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama Lengkap"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full p-4 rounded-xl border-none outline-none text-sm font-semibold bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">NIP</label>
                    <input
                      type="text"
                      placeholder="10-18 Digit Angka"
                      value={form.nip}
                      onChange={(e) => setForm({ ...form, nip: e.target.value.replace(/\D/g, '') })}
                      required
                      maxLength={18}
                      className="w-full p-4 rounded-xl border-none outline-none text-sm font-semibold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Jabatan</label>
                    <select
                      value={form.position}
                      onChange={(e) => setForm({ ...form, position: e.target.value })}
                      required
                      className="w-full p-4 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600"
                    >
                      <option value="" disabled>Pilih Jabatan</option>
                      <option value="Kepala Sekolah">Kepala Sekolah</option>
                      <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                      <option value="Guru">Guru</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Jenis Kelamin</label>
                  <div className="flex gap-6 bg-white p-4 rounded-xl w-fit">
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
                  <label className="block text-sm font-bold mb-2">Alamat Domisili</label>
                  <textarea
                    placeholder="Masukkan Alamat lengkap"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full p-4 rounded-xl border-none outline-none h-24 text-sm font-semibold resize-none bg-white"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setForm(emptyForm)}
                    className="bg-white text-gray-600 px-10 py-3 rounded-xl text-sm font-black hover:bg-gray-100 transition cursor-pointer shadow-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#22C55E] text-white px-10 py-3 rounded-xl text-sm font-black hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? 'Menyimpan...' : 'Simpan Data'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm w-full mb-10">
              <h3 className="text-2xl font-black text-black mb-8 border-b-2 border-gray-100 pb-4">Data Guru</h3>

              {loading ? (
                <p className="text-center text-gray-500 font-semibold py-10">Memuat data...</p>
              ) : dataGuru.length === 0 ? (
                <p className="text-center text-gray-500 font-semibold py-10">Belum ada data guru.</p>
              ) : (
                <div className="space-y-8">
                  {urutanJabatan.map((jabatan) => {
                    if (!guruByJabatan[jabatan] || guruByJabatan[jabatan].length === 0) return null
                    return (
                      <div key={jabatan}>
                        <div className="flex items-center gap-3 mb-4">
                          <h4 className="text-sm font-black text-[#15803D] bg-[#A7F3D0] px-4 py-1.5 rounded-lg">{jabatan}</h4>
                          <div className="h-[2px] flex-1 bg-gray-100"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {guruByJabatan[jabatan].map((g) => (
                            <div key={g.id} className="bg-[#A7F3D0] p-4 rounded-xl flex items-center gap-4 shadow-sm border border-transparent hover:border-green-400 transition">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm shrink-0">
                                {g.gender === 'Laki-Laki' ? '👦' : '👧'}
                              </div>
                              <div className="flex-1 overflow-hidden text-black">
                                <p className="font-black text-sm truncate">{g.name}</p>
                                <p className="text-xs font-bold mt-1">NIP: {g.nip}</p>
                              </div>
                              <button
                                onClick={() => handleDelete(g.id)}
                                className="text-red-600 hover:text-red-800 text-xs font-bold cursor-pointer"
                                title="Hapus"
                              >
                                ✕
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
