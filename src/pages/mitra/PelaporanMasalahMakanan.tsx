import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMitra from "./SidebarMitra";
import { api, clearAuth } from "../../api";

const REPORT_ENDPOINT = "/pelaporan-masalah-makanan";

export default function PelaporanMasalahMakanan() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    namaSekolah: "",
    namaMakanan: "",
    jenisMasalah: "Makanan basi",
    porsiTerdampak: "",
    prioritas: "Sedang",
    deskripsiMasalah: "",
  });

  const [fotoMasalah, setFotoMasalah] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const jenisMasalahOptions = [
    "Makanan basi",
    "Kemasan rusak",
    "Porsi kurang",
    "Makanan tumpah",
    "Kualitas tidak sesuai",
    "Ditemukan benda asing",
    "Lainnya",
  ];

  const prioritasOptions = ["Rendah", "Sedang", "Tinggi"];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setIsSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFotoMasalah(file);
    setMessage("");
    setIsSuccess(false);
  };

  const resetForm = () => {
    setForm({
      namaSekolah: "",
      namaMakanan: "",
      jenisMasalah: "Makanan basi",
      porsiTerdampak: "",
      prioritas: "Sedang",
      deskripsiMasalah: "",
    });

    setFotoMasalah(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.namaSekolah.trim() ||
      !form.namaMakanan.trim() ||
      !form.porsiTerdampak ||
      !form.deskripsiMasalah.trim()
    ) {
      setIsSuccess(false);
      setMessage("Lengkapi semua data wajib terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const formData = new FormData();

      formData.append("namaSekolah", form.namaSekolah);
      formData.append("namaMakanan", form.namaMakanan);
      formData.append("jenisMasalah", form.jenisMasalah);
      formData.append("porsiTerdampak", form.porsiTerdampak);
      formData.append("prioritas", form.prioritas);
      formData.append("deskripsiMasalah", form.deskripsiMasalah);

      if (fotoMasalah) {
        formData.append("fotoMasalah", fotoMasalah);
      }

      await api.postForm(REPORT_ENDPOINT, formData);

      setIsSuccess(true);
      setMessage("Laporan masalah makanan berhasil dikirim.");
      resetForm();
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);

      if (error.message?.toLowerCase().includes("unauthorized")) {
        alert("Sesi Anda telah habis. Silakan login kembali.");
        clearAuth();
        navigate("/login");
        return;
      }

      setIsSuccess(false);
      setMessage(error.message || "Terjadi kesalahan saat mengirim laporan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarMitra />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">Dashboard SPPG</p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Pelaporan Masalah Makanan
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Kirim laporan jika ditemukan masalah pada makanan yang akan
            didistribusikan.
          </p>
        </div>

        <section className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {message && (
            <div
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                isSuccess
                  ? "border-green-100 bg-green-50 text-green-700"
                  : "border-red-100 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nama Sekolah
              </label>
              <input
                type="text"
                name="namaSekolah"
                value={form.namaSekolah}
                onChange={handleChange}
                placeholder="Contoh: SDN 01 Sukamaju"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nama Makanan
              </label>
              <input
                type="text"
                name="namaMakanan"
                value={form.namaMakanan}
                onChange={handleChange}
                placeholder="Contoh: Nasi ayam sayur"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Jenis Masalah
                </label>
                <select
                  name="jenisMasalah"
                  value={form.jenisMasalah}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {jenisMasalahOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Prioritas
                </label>
                <select
                  name="prioritas"
                  value={form.prioritas}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {prioritasOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Porsi Terdampak
              </label>
              <input
                type="number"
                name="porsiTerdampak"
                value={form.porsiTerdampak}
                onChange={handleChange}
                min="1"
                placeholder="Contoh: 25"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Deskripsi Masalah
              </label>
              <textarea
                name="deskripsiMasalah"
                value={form.deskripsiMasalah}
                onChange={handleChange}
                rows={5}
                placeholder="Jelaskan detail masalah makanan yang ditemukan."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Foto Masalah
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />

              {fotoMasalah && (
                <p className="mt-2 text-xs text-slate-500">
                  File dipilih: {fotoMasalah.name}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Laporan"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
