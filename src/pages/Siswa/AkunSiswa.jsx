import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarSiswa from './SidebarSiswa'

export default function AkunSiswa() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [siswaData, setSiswaData] = useState({
    nama: 'Zahra Illiyin',
    nisn: '0023456789',
    sekolah: 'SDN 1 Subang',
    email: 'zahra.illiyin@siswa.sch.id',
    kelas: '5C'
  })

  return (
    <div className="flex min-h-screen bg-[#FFEDD5] font-sans">
      <SidebarSiswa />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto mt-6">
          <h2 className="text-4xl font-black text-[#1E3A8A] mb-8">Informasi Pribadi</h2>

          <div className="bg-white rounded-3xl shadow-sm p-10 flex gap-10">
            <div className="w-1/3 flex flex-col items-center border-r border-gray-100 pr-10">
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-[#F97316]">
                👩‍🎓
              </div>
              <h3 className="font-bold text-gray-800 text-center text-lg">{siswaData.nama}</h3>
              <p className="text-sm font-bold text-gray-500 mb-2">Siswa</p>
              <button className="text-orange-600 text-xs font-bold mt-2 hover:underline">Ubah Foto</button>
            </div>

            <div className="w-2/3 space-y-5">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Nama Lengkap</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none focus:border-orange-500 text-sm font-bold text-gray-700"
                      value={siswaData.nama} 
                      onChange={(e) => setSiswaData({...siswaData, nama: e.target.value})}
                    />
                  ) : (
                    <p className="font-bold text-gray-800">{siswaData.nama}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">E-mail</label>
                  <p className="font-bold text-gray-800">{siswaData.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">NISN</label>
                  <p className="font-bold text-gray-800">{siswaData.nisn}</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Kelas</label>
                  <p className="font-bold text-gray-800">{siswaData.kelas}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Asal Sekolah</label>
                  <p className="font-bold text-gray-800">{siswaData.sekolah}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-4">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-700 transition"
                    >
                      Simpan
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-xl font-bold hover:bg-gray-300 transition"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-[#F97316] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition"
                    >
                      Edit Profil
                    </button>
                    <button 
                      onClick={() => navigate('/')}
                      className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-700 transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>🚪</span> Keluar Akun
                    </button>
                  </>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}