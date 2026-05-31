import React, { useEffect, useState } from 'react'
import SidebarMitra from './SidebarMitra'
import { api } from '../../api'

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false)
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', lokasi: '', institution_name: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/sppg/profile')
      .then((res) => {
        setProfile(res.data)
        setForm({
          name: res.data.name || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          lokasi: res.data.lokasi || '',
          institution_name: res.data.institution_name || '',
        })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMsg('')
    try {
      const res = await api.put('/sppg/profile', form)
      setProfile((prev) => ({ ...prev, ...res.data }))
      setIsEditMode(false)
      setMsg('Profil berhasil disimpan!')
    } catch (e) {
      setMsg('Gagal: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) setForm({ name: profile.name || '', email: profile.email || '', phone: profile.phone || '', lokasi: profile.lokasi || '', institution_name: profile.institution_name || '' })
    setIsEditMode(false)
    setMsg('')
  }

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="w-3/4 p-10 flex flex-col items-center">
        <div className="w-full max-w-3xl mb-8">
          <h1 className="text-3xl font-black text-[#1E3A8A]">Profil Akun</h1>
          <h2 className="text-sm font-bold text-[#3B82F6] mt-1">Kelola informasi pribadi dan data mitra Anda</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold">Memuat data...</div>
        ) : (
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
            <div className="bg-[#CFFAFE] p-8 flex flex-col items-center border-b border-cyan-100 relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl shadow-md border-4 border-blue-500 mb-4 z-10">
                👨‍🍳
              </div>
              <h3 className="text-xl font-black text-[#1E3A8A]">{profile?.name || '-'}</h3>
              <p className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mt-2">
                Mitra SPPG {profile?.sppg_status === 'active' ? 'Aktif' : profile?.sppg_status || ''}
              </p>
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className="absolute top-6 right-6 bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-50 transition border border-blue-100"
              >
                {isEditMode ? '❌ Batal Edit' : '✏️ Edit Profil'}
              </button>
            </div>

            <div className="p-8 space-y-6">
              {msg && (
                <div className={`p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {msg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Nama Lengkap', key: 'name', type: 'text' },
                  { label: 'Nomor Telepon', key: 'phone', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Instansi', key: 'institution_name', type: 'text' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-500 mb-1">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      readOnly={!isEditMode}
                      className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Alamat Lengkap SPPG</label>
                <textarea
                  value={form.lokasi}
                  onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                  rows="3"
                  readOnly={!isEditMode}
                  className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-800 outline-none resize-none ${isEditMode ? 'bg-white focus:border-blue-500 shadow-inner' : 'bg-gray-50'}`}
                />
              </div>

              {isEditMode && (
                <div className="pt-4 flex justify-end gap-3">
                  <button onClick={handleCancel} className="px-8 py-2.5 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">Batal</button>
                  <button onClick={handleSave} disabled={saving} className="px-8 py-2.5 rounded-xl text-sm font-bold shadow-md bg-[#2563EB] text-white hover:bg-blue-700 transition disabled:opacity-60">
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
