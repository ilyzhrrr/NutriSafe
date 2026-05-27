import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FormulirPendaftaran() {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[#E0F2FE] font-sans py-10 px-4 relative">
      
      {/* Tombol Kembali & Judul Utama */}
      <div className="max-w-4xl mx-auto flex items-center mb-8 relative">
        <button 
          onClick={() => navigate('/')} 
          className="bg-[#93C5FD] text-[#1E3A8A] w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm hover:bg-blue-300 transition"
        >
          ‹
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-black text-[#1E3A8A] text-center w-full pointer-events-none">
          Formulir Pendaftaran Mitra SPPG Baru
        </h1>
      </div>

      {/* Kontainer Formulir */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-blue-50">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* SEKSI: DATA MITRA */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#1E3A8A] border-b-2 border-blue-100 pb-2">Data Mitra</h3>
            
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nama Pendaftar</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nama Instansi <span className="text-red-500 italic ml-1">*opsional</span></label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">NIK / NPWP</label>
                  <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">E-Mail</label>
                  <input type="email" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nomor HP</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
            </div>
          </div>

          {/* SEKSI: DATA SPPG */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#1E3A8A] border-b-2 border-blue-100 pb-2">Data SPPG</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nama SPPG</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Alamat SPPG</label>
                <input type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kapasitas Produksi <span className="text-gray-400 font-normal ml-1">(Porsi / Hari)</span></label>
                <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
            </div>
          </div>

          {/* SEKSI: UPLOAD DOKUMEN */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#1E3A8A] border-b-2 border-blue-100 pb-2">Upload Dokumen</h3>
            
            <div className="space-y-5">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 transition cursor-pointer">
                <p className="text-xs font-bold text-gray-500">Upload Proposal (PDF)</p>
                <p className="text-[10px] text-gray-400 mt-1">Klik untuk memilih file</p>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 transition cursor-pointer">
                <p className="text-xs font-bold text-gray-500">Upload Foto Dapur</p>
                <p className="text-[10px] text-gray-400 mt-1">Format JPG, PNG, WEBP</p>
              </div>
            </div>
          </div>

          {/* Tombol Daftar */}
          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-[#2563EB] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 transition"
            >
              Daftar
            </button>
          </div>

        </form>
      </div>

      {/* --- MODAL SUKSES --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-50 animate-in fade-in zoom-in duration-300">
            <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl">
              ✓
            </div>
            <h2 className="text-xl font-black text-[#1E3A8A] mb-2">Formulir Terkirim!</h2>
            <p className="text-xs font-bold text-gray-600 text-center mb-8">
              Silahkan tunggu verifikasi selanjutnya melalui e-mail
            </p>
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-black text-sm shadow-md hover:bg-blue-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  )
}