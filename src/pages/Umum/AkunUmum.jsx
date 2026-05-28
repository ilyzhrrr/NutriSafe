import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarUmum from './SidebarUmum' 

export default function AkunUmum() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [umumData, setUmumData] = useState({
    nama: 'Princess Squad',
    nik: '3201234567890001',
    instansi: 'Warga Kelurahan Subang',
    email: 'princess.squad@gmail.com',
    pekerjaan: 'Wiraswasta'
  })

  return (
    <div className="flex min-h-screen bg-[#FFEDD5] font-sans">
      <SidebarUmum />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto mt-6">
          <h2 className="text-4xl font-black text-[#1E3A8A] mb-8">Informasi Pribadi</h2>

          <div className="bg-white rounded-3xl shadow-sm p-10 flex gap-10">
            <div className="w-1/3 flex flex-col items-center border-r border-gray-100 pr-10">
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-[#F97316]">
                🧑‍💼
              </div>
              <h3 className="font-bold text-gray-800 text-center text-lg">{umumData.nama}</h3>
              <p className="text-sm font-bold text-gray-500 mb-2">Umum</p>
              <button className="text-orange-600 text-xs font-bold mt-2 hover:underline cursor-pointer">Ubah Foto</button>
            </div>

            <div className="w-2/3 space-y-5">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Nama Lengkap</label>
                  {isEditing ? (
                    <input 
                      className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none focus:border-orange-500 text-sm font-bold text-gray-700"
                      value={umumData.nama} 
                      onChange={(e) => setUmumData({...umumData, nama: e.target.value})}
                    />
                  ) : (
                    <p className="font-bold text-gray-800">{umumData.nama}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">E-mail</label>
                  <p className="font-bold text-gray-800">{umumData.email}</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">NIK</label>
                  <p className="font-bold text-gray-800">{umumData.nik}</p>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1">Pekerjaan</label>
                  <p className="font-bold text-gray-800">{umumData.pekerjaan}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-1"> Alamat</label>
                  <p className="font-bold text-gray-800">{umumData.instansi}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-4">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-700 transition cursor-pointer"
                    >
                      Simpan
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-xl font-bold hover:bg-gray-300 transition cursor-pointer"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-[#F97316] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition cursor-pointer"
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