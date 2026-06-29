import React, { useEffect, useState } from 'react'
import SidebarSiswa from './SidebarSiswa'
import { api } from '../../api'

export default function AkunSiswa() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    api.get('/profile/detail')
      .then((res) => {
        setProfile(res.data)
        setForm({ name: res.data.name || '', email: res.data.email || '', phone: res.data.phone || '' })
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMsg('')
    try {
      const res = await api.put('/profile/detail', form)
      setProfile((prev) => ({ ...prev, ...res.data }))
      setIsEditing(false)
      setMsg('Profil berhasil disimpan!')
    } catch (e) {
      setMsg('Gagal: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[#FFEDD5] font-sans">
      <SidebarSiswa />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 overflow-y-auto min-w-0">
        <div className="max-w-4xl mx-auto mt-4 sm:mt-6">
          <h2 className="text-2xl sm:text-4xl font-black text-[#1E3A8A] mb-6 sm:mb-8">Informasi Pribadi</h2>

          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold">Memuat data...</div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="w-full md:w-1/3 flex flex-col items-center md:border-r md:border-gray-100 md:pr-10 pb-6 md:pb-0 border-b md:border-b-0 border-gray-100">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-orange-100 rounded-full flex items-center justify-center text-4xl sm:text-5xl mb-4 border-4 border-[#F97316]">
                  👩‍🎓
                </div>
                <h3 className="font-bold text-gray-800 text-center text-base sm:text-lg break-words">{profile?.name || '-'}</h3>
                <p className="text-sm font-bold text-gray-500 mb-2">Siswa</p>
              </div>

              <div className="w-full md:w-2/3 space-y-5">
                {msg && (
                  <div className={`p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                    {msg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    <label className="block text-xs font-black text-gray-400 uppercase mb-1">Role</label>
                    <p className="font-bold text-gray-800">{profile?.role_name || 'Siswa'}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                    <button onClick={() => setIsEditing(true)}
                      className="bg-[#F97316] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition cursor-pointer">
                      Edit Profil
                    </button>
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
