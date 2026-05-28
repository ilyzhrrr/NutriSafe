import React, { useState } from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function InputAlergi() {
  const [siswaAlergi] = useState([
    { nama: 'Icha Aulia Ambarwati', kelas: '6A', jenis: 'Alergi Kacang' },
    { nama: 'Vina Namira', kelas: '4B', jenis: 'Alergi Kacang' },
    { nama: 'Wesly Adam Rismahadi', kelas: '1B', jenis: 'Alergi Kacang' },
    { nama: 'Zahra Illiyin', kelas: '5B', jenis: 'Alergi Kacang' },
  ])

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <header className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-lg font-bold text-[#166534] mt-1">Input Data Alergi Siswa</p>
              <h3 className="text-xl font-bold mt-3 text-gray-800">SDN 1 Subang</h3>
            </div>
            <div className="text-right pt-2">
              <p className="text-lg font-bold text-gray-800">Rabu, 4 Februari 2026</p>
            </div>
          </header>

          <div className="flex gap-8">
            {/* FORM INPUT */}
            <div className="flex-1 bg-[#C6F6D5] p-8 rounded-[32px] shadow-sm">
              <h3 className="text-2xl font-black mb-6">Formulir Alergi Siswa</h3>
              <div className="space-y-4 text-gray-800">
                
                <div>
                  <label className="block text-sm font-bold mb-1.5">Nama Siswa</label>
                  <input type="text" placeholder="Masukkan nama siswa" className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5">Kelas</label>
                  <select defaultValue="" className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600">
                    <option value="" disabled>Pilih Kelas</option>
                    {['1A','1B','2A','2B','3A','3B','4A','4B','5A','5B','6A','6B'].map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5">Jenis Alergi</label>
                  <input type="text" placeholder="Contoh: Alergi Kacang" className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-1.5">Deskripsi Alergi</label>
                  <textarea placeholder="Contoh: gatal-gatal saat mengkonsumsi kacang" className="w-full p-3 rounded-xl border-none outline-none h-24 text-sm font-semibold resize-none"></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Tingkat Keparahan</label>
                    <select defaultValue="" className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white cursor-pointer text-gray-600">
                      <option value="" disabled>Pilih</option>
                      <option value="ringan">Ringan</option>
                      <option value="sedang">Sedang</option>
                      <option value="berat">Berat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1.5">Tindakan Yang Diperlukan</label>
                    <input type="text" placeholder="Contoh: Bawa ke UKS" className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 bg-white text-gray-500 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition cursor-pointer">Batal</button>
                  <button className="flex-1 bg-[#22C55E] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer">Simpan</button>
                </div>

              </div>
            </div>

            {/* DAFTAR ALERGI SISWA */}
            <div className="w-[350px] bg-white p-8 rounded-[32px] border-2 border-[#22C55E] shadow-sm flex flex-col">
              <h3 className="text-xl font-black mb-2 text-gray-800">Daftar Alergi Siswa</h3>
              <p className="text-sm font-bold text-green-700 bg-green-100 px-3 py-1.5 rounded-lg w-fit mb-6">SDN 1 Subang</p>
              
              <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                {siswaAlergi.map((s, i) => (
                  <div key={i} className="border border-gray-200 bg-gray-50/50 p-4 rounded-xl hover:shadow-sm transition">
                    <p className="font-black text-gray-800 text-sm mb-1">{s.nama}</p>
                    <p className="text-xs font-bold text-gray-500 mb-2">Kelas: {s.kelas}</p>
                    <p className="text-xs font-bold text-red-600 flex items-center gap-2 bg-red-50 w-fit px-2 py-1 rounded-md">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span> {s.jenis}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}