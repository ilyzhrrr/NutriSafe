import React, { useEffect, useRef, useState } from 'react'
import SidebarSekolah from './SidebarSekolah'
import { api } from '../../api'

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

  const tanggal = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const jam = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

  return (
    <div className="flex min-h-screen bg-[#F0FFF4] font-sans">
      <SidebarSekolah />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#166534]">Dashboard Sekolah</h2>
              <p className="text-base sm:text-lg font-bold text-[#166534] mt-1">Penerimaan Makanan</p>
            </div>
            <div className="sm:text-right pt-2">
              <p className="text-sm sm:text-lg font-bold text-gray-800">{tanggal}</p>
              <p className="text-xs sm:text-sm font-bold text-gray-500 mt-1">Pukul {jam}</p>
            </div>
          </header>

          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="bg-[#C6F6D5] p-5 sm:p-8 rounded-3xl sm:rounded-[32px] shadow-sm w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">Konfirmasi Kedatangan Pangan</h3>
              </div>

              {message && (
                <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
                <div>
                  <label className="block text-sm font-bold mb-1.5">SPPG Pemasok</label>
                  <input
                    type="text"
                    value={delivery?.sppg_name || 'Belum ada pengiriman pending'}
                    disabled
                    className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white text-gray-600 cursor-not-allowed"
                  />
                  {delivery && (
                    <p className="mt-2 text-xs font-bold text-gray-600">
                      Tanggal pengiriman: {delivery.delivery_date} &middot; Total porsi: {delivery.total_portions}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5">Jumlah Porsi Diterima</label>
                  <input
                    type="number"
                    value={jumlahPorsi}
                    onChange={(e) => setJumlahPorsi(e.target.value)}
                    min="0"
                    placeholder="Masukkan jumlah porsi"
                    className="w-full p-3 rounded-xl border-none outline-none text-sm font-semibold bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1.5">Upload Bukti</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-3 rounded-xl">
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
                      className="bg-[#22C55E] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition cursor-pointer shadow-sm self-start"
                    >
                      Pilih Foto
                    </label>
                    <p className="text-xs font-bold text-gray-500 truncate flex-1">
                      {foto ? foto.name : 'Belum ada file dipilih'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => { setJumlahPorsi(''); setFoto(null); if (fileRef.current) fileRef.current.value = '' }}
                    className="bg-white text-gray-500 px-6 sm:px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition cursor-pointer order-2 sm:order-1"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !delivery}
                    className="bg-[#22C55E] text-white px-6 sm:px-10 py-2.5 rounded-xl text-sm font-bold hover:bg-green-600 transition shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed order-1 sm:order-2"
                  >
                    {submitting ? 'Menyimpan...' : 'Konfirmasi Diterima'}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-5 sm:p-8 rounded-3xl sm:rounded-[32px] border-2 border-[#22C55E] shadow-sm w-full mb-10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6 border-b-2 border-gray-100 pb-4">
                <h3 className="text-xl sm:text-2xl font-black text-gray-800">Detail Pengiriman</h3>
                <p className="text-sm font-bold bg-green-100 text-green-800 px-3 py-1.5 rounded-lg border-2 border-green-100">
                  {delivery ? 'Menunggu konfirmasi' : 'Tidak ada pengiriman'}
                </p>
              </div>

              {delivery ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 mb-1">SPPG Pemasok</p>
                    <p className="font-black text-gray-800 text-sm">{delivery.sppg_name || '-'}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 mb-1">Tanggal Pengiriman</p>
                    <p className="font-black text-gray-800 text-sm">{delivery.delivery_date || '-'}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                    <p className="text-xs font-bold text-gray-500 mb-1">Total Porsi</p>
                    <p className="font-black text-gray-800 text-sm">{delivery.total_portions || '-'}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-gray-400 font-bold">Belum ada pengiriman pending.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
