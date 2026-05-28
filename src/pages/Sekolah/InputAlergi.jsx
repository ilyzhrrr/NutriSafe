import React, { useState } from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function InputAlergi() {
  const [siswaAlergi] = useState([
    { nama: 'Icha Aulia Ambarwati', kelas: '6A', jenis: 'Alergi Kacang' },
    { nama: 'Vina Namira', kelas: '4B', jenis: 'Alergi Kacang' },
    { nama: 'Westy Adam Rismahadi', kelas: '1B', jenis: 'Alergi Kacang' },
    { nama: 'Zahra Illiyin', kelas: '5C', jenis: 'Alergi Kacang' },
  ])

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-black text-[#166534]">Dashboard Sekolah</h2>
            <p className="text-xl font-bold text-[#166534]">Input Data Alergi Siswa</p>
            <h3 className="text-2xl font-bold mt-2 text-gray-800">SDN 1 Subang</h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-800">Rabu, 4 Februari 2026</p>
          </div>
        </header>

        <div className="flex gap-8">
          <div className="flex-1 bg-[#C6F6D5] p-8 rounded-3xl shadow-sm">
            <h3 className="text-2xl font-black mb-6">Formulir Alergi Siswa</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-1">Nama Siswa</label>
                <input type="text" className="w-full p-3 rounded-xl border-none outline-none" />
              </div>

              {/* Dropdown Kelas */}
              <div>
                <label className="block font-bold mb-1">Kelas</label>
                <select defaultValue="" className="w-full p-3 rounded-xl border-none outline-none text-gray-700 bg-white">
                  <option value="" disabled>Pilih Kelas</option>
                  <option value="1A">1A</option>
                  <option value="1B">1B</option>
                  <option value="2A">2A</option>
                  <option value="2B">2B</option>
                  <option value="3A">3A</option>
                  <option value="3B">3B</option>
                  <option value="4A">4A</option>
                  <option value="4B">4B</option>
                  <option value="5A">5A</option>
                  <option value="5B">5B</option>
                  <option value="6A">6A</option>
                  <option value="6B">6B</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Jenis Alergi</label>
                <input type="text" placeholder="Contoh: Alergi Kacang" className="w-full p-3 rounded-xl border-none outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1">Deskripsi Alergi</label>
                <textarea placeholder="Contoh: gatal-gatal saat mengkonsumsi kacang" className="w-full p-3 rounded-xl border-none outline-none h-24"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Tingkat Keparahan</label>
                  <select defaultValue="" className="w-full p-3 rounded-xl border-none outline-none text-gray-700 bg-white">
                    <option value="" disabled>Pilih</option>
                    <option value="ringan">Ringan</option>
                    <option value="sedang">Sedang</option>
                    <option value="berat">Berat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Tindakan Yang Diperlukan</label>
                  <input type="text" className="w-full p-3 rounded-xl border-none outline-none" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-[#22C55E] text-white py-3 rounded-2xl font-bold text-xl hover:bg-green-600 transition">Simpan</button>
                <button className="flex-1 bg-[#FB923C] text-white py-3 rounded-2xl font-bold text-xl hover:bg-orange-500 transition">Batal</button>
              </div>
            </div>
          </div>

          <div className="w-[350px] bg-white p-6 rounded-3xl border-2 border-[#22C55E]">
            <h3 className="text-xl font-black mb-4">Daftar Alergi Siswa</h3>
            <p className="text-sm font-bold mb-4">SDN 1 Subang</p>
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {siswaAlergi.map((s, i) => (
                <div key={i} className="border-2 border-gray-100 p-4 rounded-2xl">
                  <p className="font-black text-gray-800">{s.nama}</p>
                  <p className="text-xs font-bold text-gray-500 mb-1">Kelas: {s.kelas}</p>
                  <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span> {s.jenis}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}