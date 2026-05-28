import React from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarMitra from './SidebarMitra'

export default function Pengaturan() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="w-3/4 p-10 flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-3xl mb-8">
          <h1 className="text-3xl font-black text-[#1E3A8A]">Pengaturan</h1>
          <h2 className="text-sm font-bold text-[#3B82F6] mt-1">Kelola keamanan dan preferensi aplikasi Anda</h2>
        </div>

        <div className="w-full max-w-3xl space-y-6">

          {/* Bagian Keamanan */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-blue-50">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <span>🔒</span> Keamanan Akun
            </h3>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Password Lama</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-700" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Password Baru</label>
                <input 
                  type="password" 
                  placeholder="Minimal 8 karakter" 
                  className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-blue-500 font-bold text-gray-700" 
                />
              </div>
              <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition mt-2 shadow-sm">
                Ganti Password
              </button>
            </div>
          </div>

          {/* Bagian Preferensi */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-blue-50">
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

          {/* Bagian Zona Bahaya */}
          <div className="bg-red-50 rounded-3xl shadow-sm p-8 border border-red-100">
            <h3 className="text-xl font-black text-red-700 mb-2">Zona Bahaya</h3>
            <p className="text-sm text-red-600 font-medium mb-4">Keluar dari akun aplikasi NutriSafe.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-700 transition shadow-sm"
            >
              Log Out
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}