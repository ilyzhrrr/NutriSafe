import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api, saveAuth } from '../api'

const ROLE_ROUTES = {
  sppg:   '/mitra/status-kemitraan',
  school: '/sekolah/data-siswa',
  umum:   '/umum/pelaporan',
  siswa:  '/siswa/pelaporan',
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email dan Password wajib diisi')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/login', { email, password })
      const { token, role } = res
      if (role === 'admin') {
        setError('Akun admin hanya dapat login melalui portal Admin BGN')
        return
      }
      saveAuth(token, role)
      navigate(ROLE_ROUTES[role] || '/umum/pelaporan')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-blue-100 font-sans">
      <div className="w-2/5 bg-blue-500 text-white p-10 flex flex-col items-center justify-center relative">
        <div className="absolute top-8 left-8 flex items-center gap-4">
          <button onClick={() => navigate('/')} className="text-3xl font-bold hover:text-blue-200 cursor-pointer">
            &lt;
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold">NutriSafe MBG</span>
          </div>
        </div>
        <h2 className="text-center text-xl font-semibold mb-8 mt-12">
          Platform Monitoring & Pelaporan Keamanan Makanan Siswa (MBG)
        </h2>
        <img src="/utama.png" alt="Ilustrasi Utama" className="w-4/5 rounded-xl mb-8 shadow-lg bg-white" />
        <p className="text-center mb-6 px-4 text-sm">
          Membantu sekolah, mitra, dan masyarakat dalam memantau serta melaporkan keamanan dan kualitas makanan siswa
        </p>
        <div className="w-full flex flex-col gap-3 px-8 text-sm font-semibold">
          <div className="bg-blue-400/50 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-xl">📊</span><span>Monitoring Alergi Siswa</span>
          </div>
          <div className="bg-blue-400/50 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-xl">📱</span><span>Pelaporan Makanan</span>
          </div>
          <div className="bg-blue-400/50 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-xl">📋</span><span>Input & Laporan Menu Harian</span>
          </div>
        </div>
      </div>

      <div className="w-3/5 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-10">Masuk Akun</h1>
        <div className="bg-white p-10 rounded-2xl shadow-xl w-3/5 max-w-md">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>✉️</span> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2">
              <span>🔒</span> Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 focus:outline-none focus:border-blue-500"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPw
                  ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
              </button>
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
          <p className="text-center mt-6 text-sm text-gray-600">
            Belum Punya Akun?{' '}
            <span onClick={() => navigate('/daftar')} className="text-blue-500 cursor-pointer font-bold hover:underline">
              Daftar
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
