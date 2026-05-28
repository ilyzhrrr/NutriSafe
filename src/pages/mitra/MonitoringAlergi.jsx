import React from 'react'
import SidebarMitra from './SidebarMitra'

export default function MonitoringAlergi() {
  return (
    <div className="flex min-h-screen bg-[#E0F2FE] font-sans">
      <SidebarMitra />

      <main className="w-3/4 p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#1E3A8A]">Dashboard Mitra</h1>
          <h2 className="text-lg font-bold text-[#3B82F6] mt-0.5">Monitoring Alergi siswa</h2>
        </div>

        <div className="flex gap-6 mb-6 w-full max-w-3xl">
          <div className="flex-1 bg-[#FF8A8A] text-gray-900 p-5 rounded-2xl flex items-center justify-center gap-4 shadow-sm border border-red-300">
            <span className="text-4xl text-[#D83B3B]">📋</span>
            <div className="flex flex-col items-center">
              <p className="font-bold text-base">Jenis Alergi</p>
              <p className="text-3xl font-black">3 <span className="text-lg font-bold">Tipe Alergi</span></p>
            </div>
          </div>
          
          <div className="flex-1 bg-[#FDBA74] text-gray-900 p-5 rounded-2xl flex items-center justify-center gap-4 shadow-sm border border-orange-300">
            <span className="text-4xl text-[#C2410C]">🎓</span>
            <div className="flex flex-col items-center">
              <p className="font-bold text-base">Total Siswa Alergi</p>
              <p className="text-3xl font-black">19 <span className="text-lg font-bold">Siswa Alergi</span></p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-stretch w-full">
          <div className="w-1/2 bg-white rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-lg font-black text-gray-800 mb-6">Jenis Alergi Siswa</h3>
            
            <div className="flex justify-center mb-6 relative">
              <div 
                className="w-56 h-56 rounded-full" 
                style={{ background: 'conic-gradient(#DC2626 0% 52.63%, #C026D3 52.63% 73.68%, #FACC15 73.68% 100%)' }}
              ></div>
              <span className="absolute top-0 right-12 text-[10px] font-bold text-gray-700">52,63%</span>
              <span className="absolute bottom-2 right-8 text-[10px] font-bold text-gray-700">21,05%</span>
              <span className="absolute bottom-12 left-4 text-[10px] font-bold text-gray-700">26,32%</span>
            </div>

            <div className="flex flex-col gap-2 font-bold text-xs text-gray-800 ml-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#DC2626] rounded-full"></div>
                <span>Alergi Kacang</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#FACC15] rounded-full"></div>
                <span>Alergi Telur</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#C026D3] rounded-full"></div>
                <span>Alergi Susu</span>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-black text-gray-800 mb-6">Jumlah Siswa Alergi</h3>
              
              <div className="relative h-32 border-l border-b border-gray-300 ml-6 mb-4 flex items-end justify-around pb-0 px-4">
                <div className="absolute w-full h-full flex flex-col justify-between -z-10 left-0">
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                  <div className="border-t border-gray-200 w-full h-0"></div>
                </div>
                <div className="absolute -left-6 h-full flex flex-col justify-between text-[10px] font-bold text-gray-500 py-1">
                  <span>20</span><span>15</span><span>10</span><span>5</span><span>0</span>
                </div>
                
                <div className="w-1/4 bg-[#DC2626] h-[50%]"></div>
                <div className="w-1/4 bg-[#FACC15] h-[25%]"></div>
                <div className="w-1/4 bg-[#C026D3] h-[20%]"></div>
              </div>
              
              <div className="flex justify-around text-[10px] font-bold text-gray-500 ml-6 mb-4">
                <span className="w-1/4 text-center">Alergi Kacang</span>
                <span className="w-1/4 text-center">Alergi Telur</span>
                <span className="w-1/4 text-center">Alergi Susu</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm flex-1">
              <h3 className="text-base font-black text-gray-800 mb-4">Daftar Sekolah dengan Data Alergi</h3>
              <div className="flex flex-col gap-4">
                <div className="bg-[#CFFAFE] rounded-xl p-3 border border-cyan-100">
                  <h4 className="font-black text-sm text-gray-800">SDN 1 Subang</h4>
                  <p className="text-[10px] font-bold">⚠️ 7 Siswa Alergi</p>
                </div>
                <div className="bg-[#CFFAFE] rounded-xl p-3 border border-cyan-100">
                  <h4 className="font-black text-sm text-gray-800">SMPN 1 Subang</h4>
                  <p className="text-[10px] font-bold">⚠️ 12 Siswa Alergi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}