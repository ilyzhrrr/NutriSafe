import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarUmum from './SidebarUmum'
import { api, clearAuth } from '../../api'

export default function AkunUmum() {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', lokasi: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/umum/profile')
      .then((res) => {
        setProfile(res.data)
        setForm({ name: res.data.name || '', email: res.data.email || '', phone: res.data.phone || '', lokasi: res.data.lokasi || '' })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMsg('')
    try {
      const res = await api.put('/umum/profile', form)
      setProfile((prev) => ({ ...prev, ...res.data }))
      setIsEditing(false)
      setMsg('Profil berhasil disimpan!')
    } catch (e) {
      setMsg('Gagal: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    clearAuth()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-[#FFEDD5] font-sans">
      <SidebarUmum />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto mt-6">
          <h2 className="text-4xl font-black text-[#1E3A8A] mb-8">Informasi Pribadi</h2>

          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold">Memuat data...</div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm p-10 flex gap-10">
              <div className="w-1/3 flex flex-col items-center border-r border-gray-100 pr-10">
                <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-[#F97316]">
                  🧑‍💼
                </div>
                <h3 className="font-bold text-gray-800 text-center text-lg">{profile?.name || '-'}</h3>
                <p className="text-sm font-bold text-gray-500 mb-2">Umum</p>
              </div>

              <div className="w-2/3 space-y-5">
                {msg && (
                  <div className={`p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {msg}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">Nama Lengkap</label>
                    {isEditing ? (
                      <input className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none focus:border-orange-500 text-sm font-bold text-gray-700"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    ) : (
                      <p className="font-bold text-gray-800">{profile?.name || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">E-mail</label>
                    {isEditing ? (
                      <input type="email" className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none focus:border-orange-500 text-sm font-bold text-gray-700"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    ) : (
                      <p className="font-bold text-gray-800">{profile?.email || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">No. Telepon</label>
                    {isEditing ? (
                      <input className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none focus:border-orange-500 text-sm font-bold text-gray-700"
                        value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    ) : (
                      <p className="font-bold text-gray-800">{profile?.phone || '-'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">Alamat</label>
                    {isEditing ? (
                      <input className="w-full bg-gray-50 border border-gray-200 p-2.5 rounded-lg outline-none focus:border-orange-500 text-sm font-bold text-gray-700"
                        value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} />
                    ) : (
                      <p className="font-bold text-gray-800">{profile?.lokasi || '-'}</p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-4">
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} disabled={saving}
                        className="bg-green-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-60 cursor-pointer">
                        {saving ? 'Menyimpan...' : 'Simpan'}
                      </button>
                      <button onClick={() => setIsEditing(false)}
                        className="bg-gray-200 text-gray-700 px-8 py-2.5 rounded-xl font-bold hover:bg-gray-300 transition cursor-pointer">
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)}
                        className="bg-[#F97316] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition cursor-pointer">
                        Edit Profil
                      </button>
                      <button onClick={handleLogout}
                        className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-700 transition flex items-center gap-2 cursor-pointer">
                        <span>🚪</span> Keluar Akun
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
