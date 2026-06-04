import React, { useRef, useState } from 'react'
import SidebarMitra from './SidebarMitra'
import { api } from '../../api'

export default function ScanMakanan() {
  const imageRef = useRef()
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [totalPortions, setTotalPortions] = useState('')
  const [menuName, setMenuName] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Editable nutrition override
  const [isEditing, setIsEditing] = useState(false)
  const [editedNutrition, setEditedNutrition] = useState({ kalori: '', protein: '', karbohidrat: '', lemak: '' })

  // Submit report
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setResult(null)
    setError('')
    setSubmitted(false)
    if (!menuName) {
      setMenuName(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '))
    }
  }

  const handleScan = async () => {
    if (!imageFile) { setError('Pilih gambar terlebih dahulu'); return }
    if (!totalPortions || Number(totalPortions) <= 0) { setError('Masukkan jumlah porsi yang valid'); return }
    setLoading(true)
    setError('')
    setSubmitted(false)
    try {
      const fd = new FormData()
      fd.append('image', imageFile)
      fd.append('total_portions', totalPortions)
      const res = await api.postForm('/sppg/scan', fd)
      setResult(res.data)
      setIsEditing(false)
      setEditedNutrition({
        kalori: res.data.menu_detail.kalori,
        protein: res.data.menu_detail.protein,
        karbohidrat: res.data.menu_detail.karbohidrat,
        lemak: res.data.menu_detail.lemak,
      })
    } catch (e) {
      setError('Gagal: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setImageFile(null)
    setImagePreview(null)
    setTotalPortions('')
    setMenuName('')
    setResult(null)
    setError('')
    setIsEditing(false)
    setEditedNutrition({ kalori: '', protein: '', karbohidrat: '', lemak: '' })
    setSubmitted(false)
    if (imageRef.current) imageRef.current.value = ''
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setResult(prev => ({
        ...prev,
        menu_detail: {
          ...prev.menu_detail,
          kalori: parseFloat(editedNutrition.kalori) || 0,
          protein: parseFloat(editedNutrition.protein) || 0,
          karbohidrat: parseFloat(editedNutrition.karbohidrat) || 0,
          lemak: parseFloat(editedNutrition.lemak) || 0,
        },
      }))
    } else {
      setEditedNutrition({
        kalori: result.menu_detail.kalori,
        protein: result.menu_detail.protein,
        karbohidrat: result.menu_detail.karbohidrat,
        lemak: result.menu_detail.lemak,
      })
    }
    setIsEditing(!isEditing)
  }

  const handleSubmitReport = async () => {
    setSubmitting(true)
    setError('')
    try {
      const kaloriVal = isEditing ? parseFloat(editedNutrition.kalori) : result.menu_detail.kalori
      const kaloriPerPorsi = Number(totalPortions) > 0 ? kaloriVal / Number(totalPortions) : 0
      await api.post('/sppg/menu-reports', {
        menu_name: menuName,
        kalori: kaloriVal,
        protein: isEditing ? parseFloat(editedNutrition.protein) : result.menu_detail.protein,
        karbohidrat: isEditing ? parseFloat(editedNutrition.karbohidrat) : result.menu_detail.karbohidrat,
        lemak: isEditing ? parseFloat(editedNutrition.lemak) : result.menu_detail.lemak,
        total_porsi: Number(totalPortions),
        kalori_per_porsi: parseFloat(kaloriPerPorsi.toFixed(1)),
        status_gizi: result.status_gizi,
      })
      setSubmitted(true)
      setIsEditing(false)
    } catch (e) {
      setError('Gagal kirim laporan: ' + e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const displayNutrition = (field) => {
    if (!result) return null
    return isEditing ? editedNutrition[field] : result.menu_detail[field]
  }

  const hasDanger = result && (result.peringatan_alergi || []).length > 0
  const allergenIngredients = result ? (result.bahan_terdeteksi || []).filter(b => b.is_allergen) : []

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 flex flex-col gap-5 overflow-y-auto min-w-0">
        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1E3A8A]">Dashboard Mitra</h1>
          <h2 className="text-sm font-bold text-[#3B82F6] mt-0.5">Scan & Pelaporan Menu Makanan Oleh SPPG</h2>
          <p className="text-xs text-gray-500 italic">Scan untuk mendeteksi makanan mengandung alergi</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-bold rounded-lg">{error}</div>
        )}

        {submitted && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-lg">
            ✓ Laporan menu berhasil dikirim!
          </div>
        )}

        {/* Detail Menu Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-base text-gray-900">Detail Menu</h3>
            {result && (
              <button
                onClick={handleEditToggle}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isEditing
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isEditing ? 'Simpan' : 'Edit'}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-600 w-28 shrink-0">Nama Menu</span>
              <span className="text-gray-400 mr-1">:</span>
              <input
                type="text"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="Nama menu..."
                className="flex-1 border-b border-gray-200 outline-none text-gray-700 font-semibold bg-transparent pb-0.5 placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>

            {/* Kalori */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-600 w-28 shrink-0">Kalori</span>
              <span className="text-gray-400 mr-1">:</span>
              {isEditing ? (
                <input
                  type="number" step="0.01"
                  value={editedNutrition.kalori}
                  onChange={(e) => setEditedNutrition(p => ({ ...p, kalori: e.target.value }))}
                  className="flex-1 border-b border-blue-300 outline-none text-gray-700 font-semibold bg-transparent pb-0.5"
                />
              ) : (
                <span className="font-semibold text-gray-700">
                  {loading ? <span className="text-gray-300">...</span> : result ? `${result.menu_detail.kalori} kcal` : <span className="text-gray-300">-</span>}
                </span>
              )}
              {isEditing && <span className="text-gray-400 text-xs">kcal</span>}
            </div>

            {/* Protein */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-600 w-28 shrink-0">Protein</span>
              <span className="text-gray-400 mr-1">:</span>
              {isEditing ? (
                <input
                  type="number" step="0.01"
                  value={editedNutrition.protein}
                  onChange={(e) => setEditedNutrition(p => ({ ...p, protein: e.target.value }))}
                  className="flex-1 border-b border-blue-300 outline-none text-gray-700 font-semibold bg-transparent pb-0.5"
                />
              ) : (
                <span className="font-semibold text-gray-700">
                  {loading ? <span className="text-gray-300">...</span> : result ? `${result.menu_detail.protein} g` : <span className="text-gray-300">-</span>}
                </span>
              )}
              {isEditing && <span className="text-gray-400 text-xs">g</span>}
            </div>

            {/* Karbohidrat */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-600 w-28 shrink-0">Karbohidrat</span>
              <span className="text-gray-400 mr-1">:</span>
              {isEditing ? (
                <input
                  type="number" step="0.01"
                  value={editedNutrition.karbohidrat}
                  onChange={(e) => setEditedNutrition(p => ({ ...p, karbohidrat: e.target.value }))}
                  className="flex-1 border-b border-blue-300 outline-none text-gray-700 font-semibold bg-transparent pb-0.5"
                />
              ) : (
                <span className="font-semibold text-gray-700">
                  {loading ? <span className="text-gray-300">...</span> : result ? `${result.menu_detail.karbohidrat} g` : <span className="text-gray-300">-</span>}
                </span>
              )}
              {isEditing && <span className="text-gray-400 text-xs">g</span>}
            </div>

            {/* Lemak */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-600 w-28 shrink-0">Lemak</span>
              <span className="text-gray-400 mr-1">:</span>
              {isEditing ? (
                <input
                  type="number" step="0.01"
                  value={editedNutrition.lemak}
                  onChange={(e) => setEditedNutrition(p => ({ ...p, lemak: e.target.value }))}
                  className="flex-1 border-b border-blue-300 outline-none text-gray-700 font-semibold bg-transparent pb-0.5"
                />
              ) : (
                <span className="font-semibold text-gray-700">
                  {loading ? <span className="text-gray-300">...</span> : result ? `${result.menu_detail.lemak} g` : <span className="text-gray-300">-</span>}
                </span>
              )}
              {isEditing && <span className="text-gray-400 text-xs">g</span>}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-600 w-28 shrink-0">Lainnya</span>
              <span className="text-gray-400 mr-1">:</span>
              <span className="text-gray-300 font-semibold">-</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#14A8E5] text-black rounded-xl p-4 flex flex-col items-center justify-center shadow-sm min-h-[90px]">
            <p className="font-bold text-sm mb-1">Kalori / Porsi</p>
            {loading ? (
              <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin my-1"></div>
            ) : result ? (
              <p className="text-4xl font-black leading-tight">{result.kalori_per_porsi} <span className="text-sm font-semibold">Kalori</span></p>
            ) : (
              <p className="text-4xl font-black">-</p>
            )}
          </div>
          <div className="bg-[#14A8E5] text-black rounded-xl p-4 flex flex-col items-center justify-center shadow-sm min-h-[90px]">
            <p className="font-bold text-sm mb-1">Total Porsi</p>
            <p className="text-4xl font-black leading-tight">
              {totalPortions || '-'} <span className="text-sm font-semibold">{totalPortions ? 'Porsi' : ''}</span>
            </p>
          </div>
          <div className="bg-[#14A8E5] text-black rounded-xl p-4 flex flex-col items-center justify-center shadow-sm min-h-[90px]">
            <p className="font-bold text-sm mb-1">Status Gizi</p>
            {loading ? (
              <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin my-1"></div>
            ) : result ? (
              <p className="text-2xl font-black">{result.status_gizi}</p>
            ) : (
              <p className="text-2xl font-black">-</p>
            )}
          </div>
        </div>

        {/* Scan + Bahan Terdeteksi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scan Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col border border-gray-100">
            <h4 className="font-bold text-sm mb-3 text-center">Scan Makanan disini</h4>

            <div className="mb-3">
              <label className="block text-xs font-bold text-gray-600 mb-1">Total Porsi</label>
              <input
                type="number" min={1} value={totalPortions}
                onChange={(e) => setTotalPortions(e.target.value)}
                placeholder="Masukkan jumlah porsi"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div
              onClick={() => imageRef.current.click()}
              className="w-full h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center mb-2 bg-gray-50 cursor-pointer hover:bg-blue-50 transition relative overflow-hidden"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-500">Upload File</span>
                </>
              )}
            </div>

            {imageFile && (
              <p className="text-[11px] text-gray-400 text-center mb-2 truncate px-2">{imageFile.name}</p>
            )}

            <input ref={imageRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />

            {!result ? (
              <button onClick={handleScan} disabled={loading}
                className="mt-auto w-full bg-[#16A34A] text-white font-bold py-2.5 rounded-lg text-sm shadow-sm disabled:opacity-60 flex justify-center items-center gap-2 cursor-pointer">
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Menganalisis...</>
                ) : 'Analisis dengan ML'}
              </button>
            ) : (
              <button onClick={handleReset}
                className="mt-auto w-full bg-[#16A34A] text-white font-bold py-2.5 rounded-lg text-sm shadow-sm cursor-pointer">
                Analisis Ulang
              </button>
            )}
          </div>

          {/* Bahan Terdeteksi */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col border border-gray-100">
            <h4 className="font-bold text-sm mb-4 text-center">Bahan Terdeteksi</h4>
            <div className="flex-1 flex flex-col justify-start min-h-[12rem]">
              {loading ? (
                <div className="flex-1 flex justify-center items-center">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : result ? (
                <div className="w-full">
                  {result.gemini_failed ? (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <span className="text-2xl">⚠️</span>
                      <span className="text-xs font-bold text-orange-600 text-center">Deteksi bahan gagal</span>
                      <span className="text-[11px] text-gray-400 text-center">Layanan AI sedang sibuk. Coba scan ulang.</span>
                    </div>
                  ) : (result.bahan_terdeteksi || []).length === 0 ? (
                    <span className="text-xs text-gray-400 text-center block pt-4">Tidak ada bahan terdeteksi</span>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      {result.bahan_terdeteksi.map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                          <span className="text-sm font-semibold text-gray-700 capitalize">{item.name}</span>
                          {item.is_allergen ? (
                            <span className="bg-red-100 text-red-700 text-[11px] font-black px-2.5 py-1 rounded-full whitespace-nowrap">
                              Alergen! ⚠
                            </span>
                          ) : (
                            <span className="bg-teal-100 text-teal-700 text-[11px] font-black px-2.5 py-1 rounded-full whitespace-nowrap">
                              Bebas Alergen
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex justify-center items-center">
                  <span className="text-xs text-gray-400">Menunggu data...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rekomendasi + Peringatan Alergi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rekomendasi Menu Siswa Alergi */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h4 className="font-bold text-sm mb-4">Rekomendasi Menu Siswa Alergi</h4>
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : result && allergenIngredients.length > 0 ? (
              <div className="flex flex-col gap-3">
                {allergenIngredients.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
                    <div>
                      <p className="text-sm font-bold text-gray-700 capitalize">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Ganti dengan alternatif yang tidak mengandung {item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : result ? (
              <p className="text-sm text-green-600 font-bold text-center py-4">✓ Tidak ada alergen terdeteksi</p>
            ) : (
              <p className="text-xs text-gray-400 text-center py-4">Menunggu data...</p>
            )}
          </div>

          {/* Peringatan Alergi */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="bg-[#FF6B6B] py-3 px-4 font-bold text-sm text-white flex items-center gap-2">
              <span>🚨</span> Peringatan Alergi
            </div>
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                </div>
              ) : result && (result.peringatan_alergi || []).length > 0 ? (
                <div className="flex flex-col gap-2">
                  {result.peringatan_alergi.map((w, i) => (
                    <div key={i} className="border border-orange-200 rounded-xl px-3 py-2.5 bg-orange-50">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-orange-500">⚠</span>
                        <span className="text-xs font-black text-orange-700">{w.allergen_type}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-bold text-gray-600 flex items-center gap-1">🏫 {w.school_name}</span>
                        <span className="text-xs text-red-600 font-bold">{w.student_count} siswa alergi</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : result ? (
                <p className="text-center text-green-600 font-bold text-sm py-4">✓ Tidak ada peringatan alergi</p>
              ) : (
                <p className="text-center text-xs text-gray-400 py-4">Menunggu data...</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {hasDanger && (
          <p className="text-center text-red-600 font-black text-base">⚠ Menu Makanan Berbahaya!</p>
        )}

        {!result ? (
          <button
            onClick={handleScan}
            disabled={loading}
            className="w-full bg-[#2563EB] text-white font-black py-4 rounded-2xl text-lg shadow-md disabled:opacity-60 flex justify-center items-center gap-2 cursor-pointer"
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Menganalisis...</>
            ) : 'Mulai Analisis'}
          </button>
        ) : hasDanger ? (
          <button
            onClick={handleReset}
            className="w-full bg-[#2563EB] text-white font-black py-4 rounded-2xl text-lg shadow-md cursor-pointer"
          >
            Analisis Ulang
          </button>
        ) : (
          <button
            onClick={submitted ? handleReset : handleSubmitReport}
            disabled={submitting}
            className={`w-full font-black py-4 rounded-2xl text-lg shadow-md disabled:opacity-60 flex justify-center items-center gap-2 cursor-pointer transition ${
              submitted ? 'bg-gray-400 text-white' : 'bg-[#16A34A] text-white hover:bg-green-700'
            }`}
          >
            {submitting ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Mengirim...</>
            ) : submitted ? 'Scan Makanan Baru' : 'Kirim Laporan'}
          </button>
        )}
      </main>
    </div>
  )
}
