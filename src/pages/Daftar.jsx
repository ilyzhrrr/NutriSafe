import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Daftar() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', role_name: 'umum',
    school_name: '', npsn: '', address: '', grade: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const isSchool = form.role_name === 'school'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSchool) {
        await api.post('/register/school', {
          name: form.name,
          email: form.email,
          phone: form.phone,
          school_name: form.school_name,
          npsn: form.npsn,
          address: form.address,
          grade: form.grade,
        })
      } else {
        await api.post('/register', {
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
          role_name: form.role_name,
        })
      }
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E0F2FE] font-sans">
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center max-w-sm w-full">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-3xl">✓</div>
          <h2 className="text-xl font-black text-[#1E3A8A] mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-xs font-bold text-gray-500 text-center mb-6">
            Akun Anda telah dibuat. Silakan masuk untuk melanjutkan.
          </p>
          <button onClick={() => navigate('/login')}
            className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-black text-sm hover:bg-blue-700 transition">
            Masuk Sekarang
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen font-sans">
      <div className="w-5/12 bg-[#3B82F6] text-white flex flex-col items-center justify-center p-10 relative">
        <div onClick={() => navigate('/')} className="absolute top-8 left-8 flex items-center gap-2 cursor-pointer hover:text-blue-200 transition">
          <span className="text-2xl font-bold">‹</span>
          <span className="text-xl font-black">NutriSafe MBG</span>
        </div>
        <div className="max-w-sm mt-10">
          <h2 className="text-xl font-bold text-center leading-snug mb-6">
            Platform Monitoring & Pelaporan Keamanan Makanan Siswa (MBG)
          </h2>
          <img src="/utama.png" alt="Ilustrasi" className="w-full rounded-2xl mb-6 shadow-md object-cover" />
          <div className="space-y-3">
            <div className="bg-white/20 py-3 px-5 rounded-xl flex items-center gap-3 text-sm font-bold">
              <span>🟣</span> Monitoring Alergi Siswa
            </div>
            <div className="bg-white/20 py-3 px-5 rounded-xl flex items-center gap-3 text-sm font-bold">
              <span>📱</span> Pelaporan Makanan
            </div>
            <div className="bg-white/20 py-3 px-5 rounded-xl flex items-center gap-3 text-sm font-bold">
              <span>📋</span> Input & Laporan Menu Harian
            </div>
          </div>
        </div>
      </div>

      <div className="w-7/12 bg-[#E0F2FE] flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-black text-[#1E3A8A] mb-10">Daftar Akun</h1>
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10 border border-blue-50">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <span>👤</span> Nama Lengkap
                </label>
                <input type="text" value={form.name} onChange={set('name')}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <span>📧</span> Email
                </label>
                <input type="email" value={form.email} onChange={set('email')}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
              </div>
              {!isSchool && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <span>🔒</span> Password
                  </label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-blue-500 transition" required={!isSchool} />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPw
                        ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                    </button>
                  </div>
                </div>
              )}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <span>📱</span> No. Handphone
                </label>
                <input type="tel" value={form.phone} onChange={set('phone')}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <span>🏷️</span> Daftar Sebagai
              </label>
              <select value={form.role_name} onChange={set('role_name')}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-white">
                <option value="umum">Masyarakat Umum</option>
                <option value="school">Sekolah</option>
              </select>
            </div>

            {isSchool && (
              <div className="grid grid-cols-2 gap-6 border-t border-gray-100 pt-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <span>🏫</span> Nama Sekolah
                  </label>
                  <input type="text" value={form.school_name} onChange={set('school_name')}
                    placeholder="Contoh: SDN 1 Subang"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <span>🔢</span> NPSN
                  </label>
                  <input type="text" value={form.npsn} onChange={set('npsn')}
                    placeholder="Contoh: 20202020"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <span>🎓</span> Tingkat
                  </label>
                  <select value={form.grade} onChange={set('grade')} required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 bg-white">
                    <option value="" disabled>Pilih Tingkat Sekolah</option>
                    <option value="SD/MI">SD/MI</option>
                    <option value="SMP/MTs/MTsN">SMP/MTs/MTsN</option>
                    <option value="SMA/SMK/MA/MAN">SMA/SMK/MA/MAN</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                    <span>📍</span> Alamat Lengkap
                  </label>
                  <input type="text" value={form.address} onChange={set('address')}
                    placeholder="Contoh: Jl. Merdeka No. 1, Subang"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition" required />
                </div>
              </div>
            )}

            <div className="pt-2">
              <button type="submit" disabled={loading}
                className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition shadow-md disabled:opacity-60">
                {loading ? 'Mendaftar...' : 'Daftar'}
              </button>
            </div>

            <div className="text-center text-xs font-bold text-gray-500 mt-6">
              Sudah Punya Akun?{' '}
              <span onClick={() => navigate('/login')} className="text-[#2563EB] cursor-pointer hover:underline">Masuk</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
