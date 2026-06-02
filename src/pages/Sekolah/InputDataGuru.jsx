import React, { useState } from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function InputDataGuru() {
  const [form, setForm] = useState({ nama: '', nip: '', jabatan: '', gender: '', alamat: '' })
  
  // Data dummy guru sesuai gambar
  const [dataGuru, setDataGuru] = useState([
    { id: 1, nama: 'Wesly Adam Rismahadi', nip: '1234567890', jabatan: 'Kepala Sekolah', gender: 'Laki-Laki' },
    { id: 2, nama: 'Vina Namira', nip: '1234567890', jabatan: 'Wakil Kepala Sekolah', gender: 'Perempuan' },
    { id: 3, nama: 'Zahra Illiyin', nip: '1234567890', jabatan: 'Guru SDN 1 Subang', gender: 'Perempuan' },
    { id: 4, nama: 'Ahmad fauzi', nip: '1234567890', jabatan: 'Guru SDN 1 Subang', gender: 'Laki-Laki' },
    { id: 5, nama: 'Icha Aulia Ambarwati', nip: '1234567890', jabatan: 'Guru SDN 1 Subang', gender: 'Perempuan' },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newGuru = { ...form, id: Date.now() }
    setDataGuru([...dataGuru, newGuru])
    setForm({ nama: '', nip: '', jabatan: '', gender: '', alamat: '' })
    alert('Data guru berhasil disimpan!')
  }

  // Mengelompokkan guru berdasarkan jabatan
  const guruByJabatan = dataGuru.reduce((acc, guru) => {
    if (!acc[guru.jabatan]) acc[guru.jabatan] = []
    acc[guru.jabatan].push(guru)
    return acc
  }, {})

  // Urutan grup yang ingin ditampilkan
  const urutanJabatan = ['Kepala Sekolah', 'Wakil Kepala Sekolah', 'Guru SDN 1 Subang']

  return (
    <div className="flex min-h-screen bg-[#cbf4c9] font-sans">
      <SidebarSekolah />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <header className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#1E3A8A]">Dashboard Sekolah</h2>
              <p className="text-xl font-bold text-[#1E3A8A] mt-1">Input Data Guru</p>
              <h3 className="text-xl font-black text-black mt-2">SDN 1 Subang</h3>
            </div>
            <div className="bg-[#D1D5DB] text-gray-800 font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm mt-2">
              <span>📅</span> Rabu, 4 Februari 2026
            </div>
          </header>

          <div className="flex flex-col gap-8">
            
            {/* FORMULIR DATA GURU */}
            <div className="bg-[#A7F3D0] p-8 rounded-2xl shadow-sm w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-black">Formulir Data Guru</h3>
                <button type="button" className="bg-[#15803D] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-green-800 transition shadow-sm cursor-pointer">
                  Import Data dari Excel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-black">
                <div>
                  <label className="block text-sm font-bold mb-2">Nama Guru</label>
                  <input type="text" placeholder="Masukkan nama Lengkap" value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required
                    className="w-full p-4 rounded-xl border-none outline-none text-sm font-semibold bg-white" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">NIP</label>
                    <input type="text" placeholder="10 Digit Angka" value={form.nip} onChange={(e) => setForm({ ...form, nip: e.target.value.replace(/\D/g, '') })} required maxLength={10}
                      className="w-full p-4 rounded-xl border-none outline-none text-sm font-semibold bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Jabatan</label>
                    <select value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} required
                      className="w-full p-4 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600">
                      <option value="" disabled>Pilih Jabatan</option>
                      <option value="Kepala Sekolah">Kepala Sekolah</option>
                      <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                      <option value="Guru SDN 1 Subang">Guru SDN 1 Subang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Jenis Kelamin</label>
                  <div className="flex gap-6 bg-white p-4 rounded-xl w-fit">
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input type="radio" name="gender" value="Laki-Laki" checked={form.gender === 'Laki-Laki'} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-4 h-4 accent-green-600" required /> Laki-Laki
                    </label>
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input type="radio" name="gender" value="Perempuan" checked={form.gender === 'Perempuan'} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-4 h-4 accent-green-600" required /> Perempuan
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Alamat Domisili</label>
                  <textarea placeholder="Masukkan Alamat lengkap Siswa" value={form.alamat} onChange={(e) => setForm({ ...form, alamat: e.target.value })} required
                    className="w-full p-4 rounded-xl border-none outline-none h-24 text-sm font-semibold resize-none bg-white"></textarea>
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button type="button" onClick={() => setForm({ nama: '', nip: '', jabatan: '', gender: '', alamat: '' })}
                    className="bg-white text-gray-600 px-10 py-3 rounded-xl text-sm font-black hover:bg-gray-100 transition cursor-pointer shadow-sm">Batal</button>
                  <button type="submit"
                    className="bg-[#22C55E] text-white px-10 py-3 rounded-xl text-sm font-black hover:bg-green-600 transition shadow-md cursor-pointer">
                    Simpan Data
                  </button>
                </div>
              </form>
            </div>

            {/* DAFTAR GURU */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm w-full mb-10">
              <h3 className="text-2xl font-black text-black mb-8 border-b-2 border-gray-100 pb-4">Data Guru</h3>
              
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
                              <p className="font-black text-sm truncate">{g.nama}</p>
                              <p className="text-xs font-bold mt-1">NIP: {g.nip}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  )
}