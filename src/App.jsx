import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Utama from './pages/Utama'
import Login from './pages/Login'
import Daftar from './pages/Daftar'
import FormulirPendaftaran from './pages/FormulirPendaftaran'

import StatusKemitraan from './pages/mitra/StatusKemitraan'
import RiwayatLaporan from './pages/mitra/RiwayatLaporan'
import MonitoringAlergi from './pages/mitra/MonitoringAlergi'
import ScanMakanan from './pages/mitra/ScanMakanan'
import DaftarSekolah from './pages/mitra/DaftarSekolah'
import Profile from './pages/mitra/Profile'
import Pengaturan from './pages/mitra/Pengaturan'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Utama />} />
      <Route path="/login" element={<Login />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/formulir-pendaftaran" element={<FormulirPendaftaran />} />
      
      <Route path="/mitra/status-kemitraan" element={<StatusKemitraan />} />
      <Route path="/mitra/riwayat-laporan" element={<RiwayatLaporan />} />
      <Route path="/mitra/monitoring-alergi" element={<MonitoringAlergi />} />
      <Route path="/mitra/scan-makanan" element={<ScanMakanan />} />
      <Route path="/mitra/daftar-sekolah" element={<DaftarSekolah />} />
      <Route path="/mitra/profile" element={<Profile />} />
      <Route path="/mitra/pengaturan" element={<Pengaturan />} />
    </Routes>
  )
}