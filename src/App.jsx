import React from "react";
import { Routes, Route } from "react-router-dom";

import Utama from "./pages/Utama";
import Login from "./pages/Login";
import Daftar from "./pages/Daftar";
import FormulirPendaftaran from "./pages/FormulirPendaftaran";
import StatusKemitraan from "./pages/mitra/StatusKemitraan";
import RiwayatLaporan from "./pages/mitra/RiwayatLaporan";
import MonitoringAlergi from "./pages/mitra/MonitoringAlergi";
import ScanMakanan from "./pages/mitra/ScanMakanan";
import DaftarSekolah from "./pages/mitra/DaftarSekolah";
import Profile from "./pages/mitra/Profile";
import Pengaturan from "./pages/mitra/Pengaturan";

import PelaporanMasalahMakanan from "./pages/mitra/PelaporanMasalahMakanan";

//Sekolah
import DataSiswa from "./pages/Sekolah/DataSiswa";
import InputAlergi from "./pages/Sekolah/InputAlergi";
import PelaporanSekolah from "./pages/Sekolah/PelaporanSekolah";
import MakananAlergi from "./pages/Sekolah/MakananAlergi";
import AkunSekolah from "./pages/Sekolah/AkunSekolah";
import PengaturanSekolah from "./pages/Sekolah/PengaturanSekolah";
import DataAlergi from "./pages/Sekolah/DataAlergi";

//Siswa
import PelaporanSiswa from "./pages/Siswa/PelaporanSiswa";
import AkunSiswa from "./pages/Siswa/AkunSiswa";
import PengaturanSiswa from "./pages/Siswa/PengaturanSiswa";

//Umum
import PelaporanUmum from "./pages/Umum/PelaporanUmum";
import AkunUmum from "./pages/Umum/AkunUmum";
import PengaturanUmum from "./pages/Umum/PengaturanUmum";

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
      <Route
        path="/mitra/pelaporan-masalah-makanan"
        element={<PelaporanMasalahMakanan />}
      />

      <Route path="/sekolah/data-siswa" element={<DataSiswa />} />
      <Route path="/sekolah/input-alergi" element={<InputAlergi />} />
      <Route path="/sekolah/pelaporan" element={<PelaporanSekolah />} />
      <Route path="/sekolah/makanan-alergi" element={<MakananAlergi />} />
      <Route path="/sekolah/akun" element={<AkunSekolah />} />
      <Route path="/sekolah/pengaturan" element={<PengaturanSekolah />} />
      <Route path="/sekolah/data-alergi" element={<DataAlergi />} />

      <Route path="/siswa/pelaporan" element={<PelaporanSiswa />} />
      <Route path="/siswa/akun" element={<AkunSiswa />} />
      <Route path="/siswa/pengaturan" element={<PengaturanSiswa />} />

      <Route path="/umum/pelaporan" element={<PelaporanUmum />} />
      <Route path="/umum/akun" element={<AkunUmum />} />
      <Route path="/umum/pengaturan" element={<PengaturanUmum />} />
    </Routes>
  );
}
