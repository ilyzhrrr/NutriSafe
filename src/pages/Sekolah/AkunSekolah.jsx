import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarSekolah from './SidebarSekolah'

export default function AkunSekolah() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [sekolahData, setSekolahData] = useState({
    nama: 'SDN 1 Subang',
    npsn: '10293847',
    alamat: 'Jl. Ki Hajar Dewantara No. 1, Subang',
    email: 'admin@sdn1subang.sch.id',
    penanggungJawab: 'Princess Squad, S.Pd'
  })

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto mt-6">
          <h2 className="text-4xl font-black text-[#166534] mb-8">Informasi Profil Sekolah</h2>

          <div className="bg-white rounded-3xl shadow-sm p-10 flex gap-10">
            <div className="w-1/3 flex flex-col items-center border-r border-gray-100 pr-10">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-[#22C55E]">
                🏫
              </div>
              <h3 className="font-bold text-gray-800 text-center text-lg">{sekolahData.nama}</h3>
              <p className="text-sm font-bold text-gray-500 mb-2">Mitra Sekolah</p>
              <button className="text-green-600 text-xs font-bold mt-2 hover:underline">Ubah Logo</button>
            </div>

            <div className="w-2/3 space-y-5">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Nama Sekolah</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none focus:border-green-500 text-sm font-bold text-gray-700"
                      value={sekolahData.nama} 
                      onChange={(e) => setSekolahData({...sekolahData, nama: e.target.value})}
                    />
                  ) : (
                    <p className="font-bold text-gray-800">{sekolahData.nama}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">NPSN</label>
                  <p className="font-bold text-gray-800">{sekolahData.npsn}</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">E-mail Resmi</label>
                  <p className="font-bold text-gray-800">{sekolahData.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Penanggung Jawab</label>
                  <p className="font-bold text-gray-800">{sekolahData.penanggungJawab}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Alamat Lengkap</label>
                  <p className="font-bold text-gray-800">{sekolahData.alamat}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
                <div className="flex gap-4">
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
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-[#22C55E] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-600 transition"
                    >
                      Edit Profil
                    </button>
                  )}
                </div>

                {!isEditing && (
                  <div className="pt-2">
                    <button 
                      onClick={() => navigate('/')}
                      className="text-red-600 font-bold text-sm hover:text-red-700 transition flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <span>🚪</span> Keluar Akun
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}