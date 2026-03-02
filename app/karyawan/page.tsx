"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function KaryawanPage() {
  // Data dummy lengkap untuk simulasi detail
  const [dataKaryawan] = useState([
    {
      id: 1,
      nik: "EMP001",
      nama: "Ahmad Fauzi",
      email: "ahmad.fauzi@company.com",
      jabatan: "Manager IT",
      status: "AKTIF",
      tempatLahir: "Bandung",
      tglLahir: "15 Mei 1990",
      alamat: "Jl. Merdeka No. 123",
      kantor: "Headquarters",
    },
    {
      id: 2,
      nik: "EMP002",
      nama: "Siti Aminah",
      email: "siti.aminah@company.com",
      jabatan: "HR Specialist",
      status: "AKTIF",
      tempatLahir: "Jakarta",
      tglLahir: "20 Juni 1992",
      alamat: "Jl. Sudirman No. 45",
      kantor: "Headquarters",
    },
  ]);

  // State untuk mengontrol Modal Detail
  const [selectedKaryawan, setSelectedKaryawan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetail = (karyawan: any) => {
    setSelectedKaryawan(karyawan);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto relative">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0 transition-colors">
          <h1 className="text-xl font-bold">
            Karyawan
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white border border-white/10 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Management Karyawan
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
              Manage employee records and information.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Tambah Karyawan */}
            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl font-bold">
                    +
                  </div>
                  <h3 className="text-xl font-bold">Tambah Karyawan</h3>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                        NIK
                      </label>
                      <input
                        type="text"
                        placeholder="NIK"
                        className="input-style"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                        Nama
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Lengkap"
                        className="input-style"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      className="input-style"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                        Tempat Lahir
                      </label>
                      <input
                        type="text"
                        placeholder="Kota"
                        className="input-style"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                        Tanggal Lahir
                      </label>
                      <input type="date" className="input-style" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                      Alamat
                    </label>
                    <textarea
                      placeholder="Alamat Lengkap"
                      rows={3}
                      className="input-style resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                      Jabatan
                    </label>
                    <select className="input-style appearance-none cursor-pointer">
                      <option>Pilih Jabatan</option>
                      <option>Manager IT</option>
                      <option>HR Specialist</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">
                      Status Aktif
                    </label>
                    <select className="input-style appearance-none cursor-pointer">
                      <option value="Aktif">Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                  </div>

                  <button className="w-full bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all mt-4 active:scale-95">
                    Simpan Karyawan
                  </button>
                </div>
              </div>
            </div>

            {/* Tabel Data Karyawan */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data Karyawan</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataKaryawan.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 dark:text-slate-500 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Nama</th>
                        <th className="px-6 py-6 font-bold">Jabatan</th>
                        <th className="px-6 py-6 font-bold">Status</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataKaryawan.map((item, index) => (
                        <tr
                          key={item.id}
                          className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300"
                        >
                          <td className="px-6 py-6 font-bold text-slate-400 dark:text-slate-50">
                            {index + 1}
                          </td>
                          <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-100">
                            {item.nama}
                          </td>
                          <td className="px-6 py-6">
                            <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold px-3 py-1.5 rounded-full text-slate-500 dark:text-slate-400 uppercase">
                              {item.jabatan}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 pr-8">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              {/* Icon Info (i) untuk Detail */}
                              <button
                                onClick={() => openDetail(item)}
                                className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                              <button className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* MODAL DETAILED VIEW (Sesuai Gambar Referensi) */}
        {isModalOpen && selectedKaryawan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Blur - Menyesuaikan kegelapan saat mode berubah */}
            <div
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm transition-all"
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Modal Box */}
            <div className="relative w-full max-w-[480px] bg-white dark:bg-[#0f0f0f] rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in duration-300">
              {/* Header: Blue Gradient (Tetap biru karena ini aksen brand, tapi teks tetap terjaga) */}
              <div className="bg-gradient-to-r from-[#003d5e] to-[#005a8d] p-8 relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold text-white">
                  {selectedKaryawan.nama}
                </h3>
                <p className="text-white/70 font-medium">
                  {selectedKaryawan.jabatan}
                </p>
              </div>

              {/* Body Content */}
              <div className="p-8 space-y-8">
                {/* Row 1: NIK & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                      NIK
                    </p>
                    <p className="font-bold text-slate-900 dark:text-white tracking-wide">
                      {selectedKaryawan.nik}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                      Status
                    </p>
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20 uppercase">
                      {selectedKaryawan.status}
                    </span>
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                    Email Address
                  </p>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {selectedKaryawan.email}
                    </p>
                  </div>
                </div>

                {/* Row 3: Birth & Office */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                      Birth Information
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {selectedKaryawan.tempatLahir},{" "}
                      {selectedKaryawan.tglLahir}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                      Office Location
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {selectedKaryawan.kantor}
                    </p>
                  </div>
                </div>

                {/* Row 4: Home Address */}
                <div className="pt-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                    Home Address
                  </p>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 italic text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    "{selectedKaryawan.alamat}"
                  </div>
                </div>

                {/* Footer Action */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-sm mt-4"
                >
                  Close Detailed View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          background-color: transparent;
          border: 1px solid rgba(203, 213, 225, 0.5);
          border-radius: 1rem;
          padding: 0.875rem 1.25rem;
          color: inherit;
          transition: all 0.3s;
        }
        :global(.dark) .input-style {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .input-style:focus {
          outline: none;
          border-color: #06b6d4;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
        }
      `}</style>
    </div>
  );
}
