import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, saveAuth } from "../api";

const ROLE_ROUTES = {
  sppg: "/mitra/status-kemitraan",
  school: "/sekolah/data-siswa",
  umum: "/umum/pelaporan",
  siswa: "/siswa/pelaporan",
};

export default function Login() {
  const navigate = useNavigate()

  // State Navigasi View ('login' atau 'forgot')
  const [view, setView] = useState('login')

  // State Form Login
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // State Form Lupa Password
  const [forgotEmail, setForgotEmail] = useState('')
  const [verifCode, setVerifCode] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // State Bantuan
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [info, setInfo] = useState('')

  // -- FUNGSI LOGIN UTAMA --
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email dan Password wajib diisi");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      const { token, role } = res;
      if (role === "admin") {
        setError("Akun admin hanya dapat login melalui portal Admin BGN");
        return;
      }
      saveAuth(token, role);
      navigate(ROLE_ROUTES[role] || "/umum/pelaporan");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // -- FUNGSI KIRIM KODE VERIFIKASI --
  const handleRequestCode = async () => {
    if (!forgotEmail) {
      setError('Email wajib diisi')
      setInfo('')
      return
    }
    setError('')
    setInfo('')
    setLoading(true)
    try {
      await api.post('/forgot-password/request', { email: forgotEmail })
      setInfo('Jika email terdaftar, kode verifikasi akan dikirim. Periksa inbox Anda.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // -- FUNGSI RESET PASSWORD --
  const handleResetPassword = async () => {
    if (!forgotEmail || !verifCode || !newPassword) {
      setError('Semua kolom wajib diisi')
      return
    }
    if (newPassword.length < 8) {
      setError('Password baru minimal 8 karakter')
      return
    }
    setError('')
    setInfo('')
    setLoading(true)
    try {
      await api.post('/forgot-password/verify', {
        email: forgotEmail,
        code: verifCode,
        new_password: newPassword,
      })
      setView('login')
      setShowSuccessToast(true)
      setForgotEmail('')
      setVerifCode('')
      setNewPassword('')
      setTimeout(() => setShowSuccessToast(false), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-blue-100 font-sans relative">

      {/* -- POPUP NOTIFIKASI SUKSES (TOAST) -- */}
      {showSuccessToast && (
        <div className="fixed top-6 left-1/2 lg:left-3/4 -translate-x-1/2 bg-[#B5C9D9] text-gray-800 px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-md text-center font-bold text-xs sm:text-sm z-50 animate-bounce max-w-[90vw]">
          Kata sandi berhasil Diperbarui!<br/>Silahkan Masuk
        </div>
      )}

      {/* --- PANEL KIRI (ILUSTRASI) --- */}
      <div className="w-full lg:w-2/5 bg-[#3B82F6] text-white p-6 sm:p-10 flex flex-col items-center justify-center relative lg:min-h-screen">
        <div className="lg:absolute lg:top-8 lg:left-8 flex items-center gap-3 sm:gap-4 self-start mb-6 lg:mb-0">
          <button
            onClick={() => navigate("/")}
            className="text-2xl sm:text-3xl font-bold hover:text-blue-200 cursor-pointer"
          >
            &lt;
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <span className="text-lg sm:text-xl font-bold">NutriSafe MBG</span>
          </div>
        </div>
        <h2 className="text-center text-base sm:text-lg font-semibold mb-6 sm:mb-8 lg:mt-12 px-2 sm:px-4">
          Platform Monitoring & Pelaporan Keamanan Makanan Siswa (MBG)
        </h2>
        <img src="/utama.png" alt="Ilustrasi Utama" className="w-full max-w-xs sm:max-w-sm rounded-xl mb-6 sm:mb-8 shadow-md bg-white object-cover" />
        <p className="text-left mb-4 sm:mb-6 text-[13px] leading-relaxed">
          Membantu sekolah, mitra, dan masyarakat dalam memantau serta melaporkan keamanan dan kualitas makanan siswa
        </p>
        <div className="w-full flex flex-col gap-3 text-xs font-semibold">
          <div className="bg-white/20 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-base">📊</span><span>Monitoring Alergi Siswa</span>
          </div>
          <div className="bg-white/20 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-base">📱</span><span>Pelaporan Makanan</span>
          </div>
          <div className="bg-white/20 py-3 px-4 rounded-lg flex items-center gap-3">
            <span className="text-base">📋</span><span>Input & Laporan Menu Harian</span>
          </div>
        </div>
      </div>

      {/* --- PANEL KANAN (FORMULIR) --- */}
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center relative py-10 lg:py-0 px-4">

        {/* TAMPILAN 1: MASUK AKUN */}
        {view === 'login' && (
          <>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A8A] mb-6 sm:mb-10">Masuk Akun</h1>
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm w-full max-w-md">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-lg text-center">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm">
                  <span>✉️</span> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-semibold text-gray-800"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm">
                  <span>🔒</span> Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-11 text-sm focus:outline-none focus:border-blue-500 font-semibold text-gray-800"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                    {showPw
                      ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <span onClick={() => {setView('forgot'); setError(''); setInfo('');}} className="text-[#3B82F6] text-xs font-bold cursor-pointer hover:underline">
                    Lupa Password?
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-[#0084FF] text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition shadow-md disabled:opacity-60 cursor-pointer"
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
              
              <p className="text-center mt-6 text-xs text-gray-500 font-semibold">
                Belum Punya Akun?{' '}
                <span onClick={() => navigate('/daftar')} className="text-[#3B82F6] cursor-pointer font-bold hover:underline">
                  Daftar
                </span>
              </p>
            </div>
          </>
        )}

        {/* TAMPILAN 2: LUPA PASSWORD */}
        {view === 'forgot' && (
          <>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A8A] mb-6 sm:mb-10">Lupa Password</h1>
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm w-full max-w-md">
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              {info && (
                <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold p-3 rounded-lg text-center">
                  {info}
                </div>
              )}

              <div className="mb-5">
                <label className="block text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm">
                  <span>✉️</span> Masukkan Email
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-semibold text-gray-800"
                  />
                  <button
                    type="button"
                    onClick={handleRequestCode}
                    disabled={loading}
                    className="bg-[#3B82F6] text-white text-xs font-bold px-4 rounded-lg hover:bg-blue-700 disabled:opacity-60 cursor-pointer whitespace-nowrap"
                  >
                    Kirim Kode
                  </button>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-gray-800 font-bold mb-2 text-sm ml-7">
                  Masukkan Kode Verifikasi (6 digit)
                </label>
                <input
                  type="text"
                  value={verifCode}
                  onChange={(e) => setVerifCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-semibold text-gray-800 tracking-widest"
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-800 font-bold mb-2 flex items-center gap-2 text-sm">
                  <span>🔒</span> Masukkan Kata Sandi Baru
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 font-semibold text-gray-800"
                />
              </div>

              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-[#0084FF] text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition shadow-md disabled:opacity-60 cursor-pointer"
              >
                {loading ? 'Memproses...' : 'Atur ulang Kata Sandi'}
              </button>

              <p className="text-center mt-6 text-xs text-gray-500 font-semibold">
                Belum Punya Akun?{' '}
                <span onClick={() => navigate('/daftar')} className="text-[#3B82F6] cursor-pointer font-bold hover:underline">
                  Daftar
                </span>
              </p>

              <p className="text-center mt-2 text-xs">
                <span onClick={() => {setView('login'); setError(''); setInfo('');}} className="text-gray-400 cursor-pointer hover:text-gray-600 hover:underline">
                  Kembali ke Halaman Login
                </span>
              </p>

            </div>
          </>
        )}

      </div>
    </div>
  )
}
