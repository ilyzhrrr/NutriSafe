import React from 'react'
import SidebarUmum from './SidebarUmum'

export default function PengaturanUmum() {
  return (
    <div className="flex min-h-screen bg-[#FFEDD5] font-sans">
      <SidebarUmum />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto mt-6">
          <h2 className="text-4xl font-black text-[#1E3A8A] mb-8">Pengaturan</h2>

          <div className="space-y-6">
            {/* Keamanan */}
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <span>🔒</span> Keamanan Akun
              </h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password Lama</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-orange-500 font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Password Baru</label>
                  <input type="password" placeholder="Minimal 8 karakter" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none focus:border-orange-500 font-bold" />
                </div>
                <button className="bg-[#2563EB] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition mt-2">
                  Ganti Password
                </button>
              </div>
            </div>

            {/* Bahaya */}
            <div className="bg-red-50 rounded-3xl shadow-sm p-8 border border-red-100">
              <h3 className="text-xl font-black text-red-700 mb-2">Zona Bahaya</h3>
              <p className="text-sm text-red-600 font-medium mb-4">Keluar dari akun aplikasi NutriSafe.</p>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-red-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-red-700 transition shadow-sm"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}