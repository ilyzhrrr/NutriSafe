import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Akun() {
  const navigate = useNavigate()
  
  const [isEditMode, setIsEditMode] = useState(false)
  
  const [formData, setFormData] = useState({
    nama: 'Budi Santoso',
    telepon: '0812-3456-7890',
    email: 'budi.sppg@gmail.com',
    namaSppg: 'SPPG Indonesia',
    instansi: '-',
    alamat: 'Jl. Merdeka No. 45, Kecamatan Subang, Kabupaten Subang, Jawa Barat, 41211'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAction = () => {
    if (isEditMode) {
      setIsEditMode(false)
    } else {
      navigate('/') 
    }
  }

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      
      {/* --- SIDEBAR LEFT --- */}
      <aside className="w-1/4 bg-[#3B82F6] text-white p-4 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-bold">NutriSafe MBG</span>
        </div>
        
        <div className="mb-4">
          <img src="/utama.png" alt="Illustration" className="w-full rounded-xl shadow-md bg-white/20 p-1" />
        </div>

        <h2 className="text-xl font-bold leading-tight mb-6">
          Dashboard Mitra <br /> & Pengelola
        </h2>

        <nav className="flex-1 space-y-4 pr-2">
          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">📋</span> Menu Mitra</p>
            <div className="space-y-1">
              <div onClick={() => navigate('/mitra/status-kemitraan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Status Kemitraan & Daftar SPPG</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/riwayat-laporan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Riwayat Laporan</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>

          <div>
            <p className="flex items-center gap-2 font-bold mb-2 text-sm"><span className="text-lg">🏢</span> Menu Pengelola</p>
            <div className="space-y-1">
              <div onClick={() => navigate('/mitra/monitoring-alergi')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Monitoring Alergi Siswa</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/scan-makanan')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Scan & Pelaporan Menu Makanan</span><span className="font-bold">&gt;</span>
              </div>
              <div onClick={() => navigate('/mitra/daftar-sekolah')} className="flex justify-between items-center pl-4 pr-3 py-2 hover:bg-blue-400/30 rounded-lg cursor-pointer text-xs">
                <span>Daftar Sekolah</span><span className="font-bold">&gt;</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-4 border-t border-white/20 space-y-3 mt-auto pr-2 pb-4">
          <div className="flex items-center gap-3 bg-[#2563EB] rounded-lg py-2 pl-3 border-l-4 border-white cursor-default text-xs font-semibold">
            <span className="text-base">👤</span><span>Akun</span>
          </div>
          <div onClick={() => navigate('/mitra/pengaturan')} className="flex items-center gap-3 cursor-pointer hover:text-blue-200 text-xs font-semibold transition">
            <span className="text-base">⚙️</span><span>Pengaturan</span>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT RIGHT --- */}
      <main className="w-3/4 p-10 flex flex-col items-center">
        
        <div className="w-full max-w-3xl mb-8">
          <h1 className="text-3xl font-black text-[#1E3A8A]">Profil Akun</h1>
          <h2 className="text-sm font-bold text-[#3B82F6] mt-1">Kelola informasi pribadi dan data mitra Anda</h2>
        </div>

        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
          
          <div className="bg-[#CFFAFE] p-8 flex flex-col items-center border-b border-cyan-100 relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-md border-4 border-blue-500 mb-4 z-10">
              👨‍🍳
            </div>
            <h3 className="text-xl font-black text-[#1E3A8A]">{formData.nama}</h3>
            <p className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mt-2">Mitra SPPG Aktif</p>
            
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className="absolute top-6 right-6 bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-50 transition border border-blue-100"
            >
              {isEditMode ? '❌ Batal Edit' : '✏️ Edit Profil'}
            </button>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  name="nama"
                  value={formData.nama} 
                  onChange={handleChange}
                  readOnly={!isEditMode} 
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Nomor Telepon</label>
                <input 
                  type="text" 
                  name="telepon"
                  value={formData.telepon} 
                  onChange={handleChange}
                  readOnly={!isEditMode} 
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`} 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  readOnly={!isEditMode} 
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">ID Mitra SPPG</label>
                <input 
                  type="text" 
                  value="SPPG-IDN-9982" 
                  readOnly 
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-400 bg-gray-200 outline-none cursor-not-allowed" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Nama SPPG</label>
                <input 
                  type="text" 
                  name="namaSppg"
                  value={formData.namaSppg} 
                  onChange={handleChange}
                  readOnly={!isEditMode} 
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`} 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Instansi</label>
                <input 
                  type="text" 
                  name="instansi"
                  value={formData.instansi} 
                  onChange={handleChange}
                  readOnly={!isEditMode} 
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Alamat Lengkap SPPG</label>
              <textarea 
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                rows="3" 
                readOnly={!isEditMode} 
                className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none resize-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`}
              ></textarea>
            </div>
            
            <div className="pt-4 flex justify-end">
               <button 
                 onClick={handleAction}
                 className={`px-8 py-2.5 rounded-xl text-sm font-bold shadow-md transition ${isEditMode ? 'bg-[#2563EB] text-white hover:bg-blue-700' : 'bg-[#EF4444] text-white hover:bg-red-600'}`}
               >
                 {isEditMode ? 'Simpan Perubahan' : 'Keluar'}
               </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}