import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function FormulirPendaftaran() {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [proposalName, setProposalName] = useState('')
  const [kitchenName, setKitchenName] = useState('')
  const proposalRef = useRef()
  const kitchenRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const fd = new FormData(e.target)
      await api.postForm('/register/sppg', fd)
      setShowSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#E0F2FE] font-sans py-10 px-4 relative">
      <div className="max-w-4xl mx-auto flex items-center mb-8 relative">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#93C5FD] text-[#1E3A8A] w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm hover:bg-blue-300 transition cursor-pointer"
        >
          ‹
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-black text-[#1E3A8A] text-center w-full pointer-events-none">
          Formulir Pendaftaran Mitra SPPG Baru
        </h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-blue-50">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#1E3A8A] border-b-2 border-blue-100 pb-2">Data Mitra</h3>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nama Pendaftar</label>
                <input name="registrant_name" type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nama Instansi <span className="text-red-500 italic ml-1">*opsional</span></label>
                <input name="institution_name" type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">NIK / NPWP (16 digit)</label>
                  <input name="nik_npwp" type="text" maxLength={16} minLength={16}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">E-Mail</label>
                  <input name="email" type="email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nomor HP</label>
                <input name="phone" type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#1E3A8A] border-b-2 border-blue-100 pb-2">Data SPPG</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Nama SPPG</label>
                <input name="sppg_name" type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Alamat SPPG</label>
                <input name="sppg_address" type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Kapasitas Produksi <span className="text-gray-400 font-normal ml-1">(Porsi / Hari)</span>
                </label>
                <input name="production_capacity" type="number" min={1}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none transition" required />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-[#1E3A8A] border-b-2 border-blue-100 pb-2">Upload Dokumen</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Proposal (PDF)</label>
                <div
                  onClick={() => proposalRef.current.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition cursor-pointer ${proposalName ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-blue-50'}`}
                >
                  {proposalName ? (
                    <>
                      <p className="text-sm">📄</p>
                      <p className="text-xs font-bold text-blue-700 mt-1 text-center break-all">{proposalName}</p>
                      <p className="text-[10px] text-blue-400 mt-1">Klik untuk ganti file</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-bold text-gray-500">Upload Proposal (PDF)</p>
                      <p className="text-[10px] text-gray-400 mt-1">Klik untuk memilih file</p>
                    </>
                  )}
                </div>
                <input ref={proposalRef} name="proposal" type="file" accept=".pdf" className="hidden" required
                  onChange={(e) => setProposalName(e.target.files?.[0]?.name || '')} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Foto Dapur</label>
                <div
                  onClick={() => kitchenRef.current.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition cursor-pointer ${kitchenName ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-blue-50'}`}
                >
                  {kitchenName ? (
                    <>
                      <p className="text-sm">🖼️</p>
                      <p className="text-xs font-bold text-blue-700 mt-1 text-center break-all">{kitchenName}</p>
                      <p className="text-[10px] text-blue-400 mt-1">Klik untuk ganti file</p>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-bold text-gray-500">Upload Foto Dapur</p>
                      <p className="text-[10px] text-gray-400 mt-1">Format JPG, PNG, WEBP (maks 5MB)</p>
                    </>
                  )}
                </div>
                <input ref={kitchenRef} name="kitchen_photo" type="file" accept="image/*" className="hidden" required
                  onChange={(e) => setKitchenName(e.target.files?.[0]?.name || '')} />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563EB] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:bg-blue-700 transition cursor-pointer disabled:opacity-60"
            >
              {loading ? 'Mengirim...' : 'Daftar'}
            </button>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-50">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl">✓</div>
            <h2 className="text-xl font-black text-[#1E3A8A] mb-2">Formulir Terkirim!</h2>
            <p className="text-xs font-bold text-gray-600 text-center mb-8">
              Silahkan tunggu verifikasi selanjutnya melalui e-mail
            </p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-black text-sm shadow-md hover:bg-blue-700 transition cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
