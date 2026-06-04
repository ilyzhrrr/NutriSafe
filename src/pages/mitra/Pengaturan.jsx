import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarMitra from './SidebarMitra'
import { api, clearAuth } from '../../api'

export default function Pengaturan() {
  const navigate = useNavigate()
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const handleChangePw = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      await api.post('/change-password', { old_password: oldPw, new_password: newPw })
      setMsg('Password berhasil diubah!')
      setOldPw('')
      setNewPw('')
    } catch (err) {
      setMsg('Gagal: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuth()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="flex-1 lg:w-3/4 p-4 sm:p-6 lg:p-10 pt-16 lg:pt-10 flex flex-col items-center overflow-y-auto min-w-0">
        <div className="w-full max-w-3xl mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E3A8A]">Pengaturan</h1>
          <h2 className="text-sm font-bold text-[#3B82F6] mt-1">Kelola keamanan dan preferensi aplikasi Anda</h2>
        </div>

        <div className="w-full max-w-3xl space-y-6">
          <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-8 border border-blue-50">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <span>🔒</span> Keamanan Akun
            </h3>
            {msg && (
              <div className={`mb-4 p-3 rounded-lg text-sm font-bold ${msg.startsWith('Gagal') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {msg}
              </div>
            )}
            <form onSubmit={handleChangePw} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Password Lama</label>
                <div className="relative">
                  <input type={showOld ? 'text' : 'password'} placeholder="••••••••" value={oldPw} onChange={(e) => setOldPw(e.target.value)} required
                    className="w-full bg-gray-50 border border-gray-200 p-3 pr-11 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-700" />
                  <button type="button" onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showOld
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Password Baru</label>
                <div className="relative">
                  <input type={showNew ? 'text' : 'password'} placeholder="Minimal 8 karakter" value={newPw} onChange={(e) => setNewPw(e.target.value)} required minLength={8}
                    className="w-full bg-gray-50 border border-gray-200 p-3 pr-11 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-700" />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition mt-2 shadow-sm disabled:opacity-60">
                {loading ? 'Memproses...' : 'Ganti Password'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-8 border border-blue-50">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <span>⚙️</span> Preferensi Aplikasi
            </h3>
            <div className="space-y-4 font-bold text-sm text-gray-700">
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div>
                  <p className="text-gray-800">Notifikasi Pesanan Baru</p>
                  <p className="text-xs text-gray-500 font-medium">Terima pemberitahuan saat ada pembaruan SPPG</p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6 accent-blue-600 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div>
                  <p className="text-gray-800">Laporan Mingguan</p>
                  <p className="text-xs text-gray-500 font-medium">Kirim rekap laporan makanan ke email</p>
                </div>
                <input type="checkbox" defaultChecked className="w-6 h-6 accent-blue-600 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-3xl shadow-sm p-5 sm:p-8 border border-red-100">
            <h3 className="text-xl font-black text-red-700 mb-2">Zona Bahaya</h3>
            <p className="text-sm text-red-600 font-medium mb-4">Keluar dari akun aplikasi NutriSafe.</p>
            <button onClick={handleLogout} className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-700 transition shadow-sm">
              Log Out
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
