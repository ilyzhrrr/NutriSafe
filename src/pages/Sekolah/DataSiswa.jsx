import React, { useState } from 'react'
import SidebarSekolah from './SidebarSekolah'

export default function DataSiswa() {
  const [daftarSiswa] = useState([
    { nama: 'Ahmad Fauzi', nisn: '0012345678', kelas: '6A', jk: 'L' },
    { nama: 'Vina Namira', nisn: '002345666', kelas: '4A', jk: 'P' },
    { nama: 'Icha Aulia Ambarwati', nisn: '0023456789', kelas: '6A', jk: 'P' },
    { nama: 'Zahra Illiyin', nisn: '0034567890', kelas: '5B', jk: 'P' },
    { nama: 'Wesly Adam Rismahadi', nisn: '0045678901', kelas: '1B', jk: 'L' },
    { nama: 'Budi Santoso', nisn: '0056789012', kelas: '1B', jk: 'L' },
  ])

  // State untuk menyimpan pilihan filter kelas
  const [filterKelas, setFilterKelas] = useState('Semua')

  const siswaBerdasarkanKelas = daftarSiswa.reduce((acc, siswa) => {
    if (!acc[siswa.kelas]) {
      acc[siswa.kelas] = []
    }
    acc[siswa.kelas].push(siswa)
    return acc
  }, {})

  const kelasBerurutan = Object.keys(siswaBerdasarkanKelas).sort()
  
  // Logika untuk menentukan kelas mana yang akan ditampilkan
  const kelasYangDitampilkan = filterKelas === 'Semua' 
    ? kelasBerurutan 
    : kelasBerurutan.filter(k => k === filterKelas)

  // Menghitung total siswa sesuai filter yang dipilih
  const totalDitampilkan = filterKelas === 'Semua'
    ? daftarSiswa.length
    : daftarSiswa.filter(s => s.kelas === filterKelas).length

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <header className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-lg font-bold text-[#166534] mt-1">Input Data Siswa</p>
              <h3 className="text-xl font-bold mt-3 text-gray-800">SDN 1 Subang</h3>
            </div>
            <div className="text-right pt-2">
              <p className="text-lg font-bold text-gray-800">Rabu, 4 Februari 2026</p>
            </div>
          </header>

          <div className="flex flex-col gap-8">
            {/* FORM INPUT */}
            <div className="bg-[#C6F6D5] p-8 rounded-[32px] shadow-sm w-full">
              <h3 className="text-2xl font-black mb-6">Formulir Data Siswa</h3>
              <div className="space-y-4 text-gray-800">
                <div>
                  <label className="block text-sm font-bold mb-1.5">Nama Lengkap Siswa</label>
                  <input type="text" placeholder="Masukkan nama lengkap" className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-1.5">NISN</label>
                    <input type="text" placeholder="10 digit angka" className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold" />
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
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Jenis Kelamin</label>
                  <div className="flex gap-6 bg-white p-3 rounded-xl w-fit">
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input type="radio" name="jk" className="w-4 h-4 accent-green-600" /> Laki-laki
                    </label>
                    <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                      <input type="radio" name="jk" className="w-4 h-4 accent-green-600" /> Perempuan
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1.5">Alamat Domisili</label>
                  <textarea placeholder="Masukkan alamat lengkap siswa" className="w-full p-3 rounded-xl border-none outline-none h-24 text-sm font-semibold resize-none"></textarea>
                </div>
                
                <div className="flex justify-end gap-3 pt-3">
                  <button className="bg-white text-gray-500 px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition cursor-pointer">Batal</button>
                  <button className="bg-[#22C55E] text-white px-10 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer">Simpan Data</button>
                </div>
              </div>
            </div>

            {/* DAFTAR SISWA */}
            <div className="bg-white p-8 rounded-[32px] border-2 border-[#22C55E] shadow-sm w-full mb-10">
              
              <div className="flex justify-between items-end mb-6 border-b-2 border-gray-100 pb-4">
                <h3 className="text-2xl font-black text-gray-800">Daftar Siswa Terdaftar</h3>
                
                {/* Fitur Filter Kelas & Total Siswa */}
                <div className="flex items-center gap-3">
                  <select 
                    value={filterKelas}
                    onChange={(e) => setFilterKelas(e.target.value)}
                    className="bg-white border-2 border-green-200 text-green-800 text-sm font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="Semua">Semua Kelas</option>
                    {['1A','1B','2A','2B','3A','3B','4A','4B','5A','5B','6A','6B'].map(k => (
                      <option key={k} value={k}>Kelas {k}</option>
                    ))}
                  </select>
                  
                  <p className="text-sm font-bold bg-green-100 text-green-800 px-3 py-1.5 rounded-lg border-2 border-green-100">
                    Total: {totalDitampilkan} Siswa
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {kelasYangDitampilkan.map((kelas) => (
                  <div key={kelas}>
                    <div className="flex items-center gap-3 mb-4">
                      <h4 className="text-lg font-black text-[#166534] bg-green-100 px-3 py-1 rounded-md">
                        Kelas {kelas}
                      </h4>
                      <div className="h-[2px] flex-1 bg-green-100"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {siswaBerdasarkanKelas[kelas].map((siswa, i) => (
                        <div key={i} className="bg-green-50 border border-green-200 p-3 rounded-xl flex items-center gap-3 hover:shadow-sm transition">
                          <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-sm border border-green-100 shrink-0">
                            {siswa.jk === 'L' ? '👦' : '👧'}
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-black text-gray-800 text-sm truncate">{siswa.nama}</p>
                            <p className="text-xs font-bold text-gray-500 mt-0.5">NISN: {siswa.nisn}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {kelasYangDitampilkan.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-400 font-bold">
                  Belum ada data siswa untuk kelas ini.
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}