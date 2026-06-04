import React, { useEffect, useRef, useState } from 'react'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const bulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

const formatTanggalIndo = (d) =>
  `${hari[d.getDay()]}, ${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`

export default function PenerimaanMakanan() {
  const fileRef = useRef(null)
  const [delivery, setDelivery] = useState(null)
  const [schoolName, setSchoolName] = useState('')
  const [jumlahPorsi, setJumlahPorsi] = useState('')
  const [foto, setFoto] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    api.get('/school/profile').then((res) => {
      setSchoolName(res.data?.name || res.data?.school_name || '')
    }).catch(() => {})

    api.get('/school/pending-delivery').then((res) => {
      setDelivery(res.data || null)
    }).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!jumlahPorsi) {
      setIsSuccess(false)
      setMessage('Jumlah porsi diterima wajib diisi.')
      return
    }
    setSubmitting(true)
    setMessage('')
    try {
      const fd = new FormData()
      fd.append('received_portions', jumlahPorsi)
      if (delivery?.id) fd.append('delivery_id', String(delivery.id))
      if (foto) fd.append('photo', foto)
      await api.postForm('/school/delivery-receipt', fd)
      setIsSuccess(true)
      setMessage('Konfirmasi makanan diterima berhasil disimpan!')
      setJumlahPorsi('')
      setFoto(null)
      if (fileRef.current) fileRef.current.value = ''
      const fresh = await api.get('/school/pending-delivery').catch(() => null)
      setDelivery(fresh?.data || null)
    } catch (err) {
      setIsSuccess(false)
      setMessage(err.message || 'Gagal menyimpan konfirmasi.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#cbf4c9] font-sans">
      <SidebarSekolah />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 relative min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1E3A8A]">Dashboard Sekolah</h1>
            <h2 className="text-lg sm:text-xl font-bold text-[#2563EB] mt-1">Penerimaan Makanan</h2>
            <h3 className="text-lg sm:text-xl font-black text-black mt-2">{schoolName || 'Sekolah'}</h3>
          </div>

          <div className="bg-[#D1D5DB] text-gray-800 font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm text-xs sm:text-sm self-start">
            <span>📅</span> <span className="truncate">{formatTanggalIndo(now)}</span>
          </div>
        </div>

        <div className="flex justify-end sm:pr-4 mb-4">
          <div className="border-4 border-black font-black text-xl px-2 py-0.5 rounded shadow-sm bg-[#cbf4c9]">
            {now.getHours().toString().padStart(2, '0')}:{now.getMinutes().toString().padStart(2, '0')}
          </div>
        </div>

        <div className="max-w-4xl bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-4 border-b-2 border-gray-100">
            <h2 className="text-xl sm:text-2xl font-black text-black">Konfirmasi Kedatangan Pangan</h2>
          </div>

          {message && (
            <div
              className={`mx-5 sm:mx-8 mt-4 rounded-xl border px-4 py-3 text-sm font-bold ${
                isSuccess
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
            <div>
              <label className="block text-lg font-bold text-black mb-2">SPPG Pemasok</label>
              <input
                type="text"
                value={delivery?.sppg_name || 'Belum ada pengiriman pending'}
                disabled
                className="w-full bg-[#E5E7EB] border border-gray-300 rounded-lg px-4 py-4 text-black font-medium cursor-not-allowed outline-none"
              />
              {delivery && (
                <p className="mt-2 text-xs font-bold text-gray-600">
                  Tanggal pengiriman: {delivery.delivery_date} &middot; Total porsi: {delivery.total_portions}
                </p>
              )}
            </div>

            <div>
              <label className="block text-lg font-bold text-black mb-2">Jumlah Porsi Diterima</label>
              <input
                type="number"
                value={jumlahPorsi}
                onChange={(e) => setJumlahPorsi(e.target.value)}
                min="0"
                className="w-full border border-gray-400 rounded-lg px-4 py-4 text-black font-medium outline-none focus:border-blue-500 transition"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center pt-4 gap-3">
              <span className="text-base font-bold text-black sm:w-20 leading-tight">
                Upload Bukti
              </span>
              <div className="flex-1 border-b border-gray-400 sm:mx-6 min-h-[1.5rem]">
                {foto && <p className="text-xs font-bold text-gray-700 pb-1 break-all">{foto.name}</p>}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files?.[0] || null)}
                className="hidden"
                id="upload-bukti-penerimaan"
              />
              <label
                htmlFor="upload-bukti-penerimaan"
                className="bg-[#2577F1] text-white px-6 sm:px-8 py-3 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition shadow-sm cursor-pointer text-center"
              >
                Upload Foto
              </label>
            </div>
          </form>
        </div>

        <div className="max-w-4xl mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={submitting || !delivery}
            className="bg-[#22C55E] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-md cursor-pointer text-center leading-tight disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Menyimpan...' : (<>Konfirmasi makanan<br />Diterima</>)}
          </button>
        </div>
      </main>
    </div>
  )
}
