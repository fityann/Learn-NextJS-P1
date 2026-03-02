"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function KonfigurasiPage() {
  // Data dummy sesuai gambar referensi (hanya 1 data biasanya untuk config tahunan)
  const [dataConfig] = useState([
    { id: 1, tahun: "2024", jatahCuti: "12 Hari", nilaiUang: "Rp 150.000", status: "AKTIF" },
  ]);

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-black shrink-0">
          <h1 className="text-xl font-bold">Konfigurasi</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold leading-tight">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-white border border-white/10 font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-extrabold tracking-tight">Konfigurasi Tahun</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Setup annual leave and compensation parameters.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Tambah Konfigurasi (Kiri) */}
            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-xl font-bold">
                    +
                  </div>
                  <h3 className="text-xl font-bold">Tambah Konfigurasi</h3>
                </div>

                {/* Info Alert Box (Sesuai Gambar) */}
                <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start">
                  <div className="h-5 w-5 rounded bg-amber-500 flex items-center justify-center text-[10px] text-black font-bold shrink-0 mt-0.5">i</div>
                  <p className="text-xs text-amber-600 dark:text-amber-500 font-medium leading-relaxed">
                    Jika sudah terdapat satu data maka tidak dapat menambah data lagi.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Tahun</label>
                    <input type="text" placeholder="2024" className="input-style" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Jatah Cuti Tahunan</label>
                    <div className="relative">
                      <input type="number" placeholder="12" className="input-style pr-16" />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hari</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Nilai Uang Per Cuti</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                      <input type="number" className="input-style pl-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">Status</label>
                    <select className="input-style appearance-none cursor-pointer">
                      <option value="Aktif">Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                  </div>
                  
                  <button className="w-full bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all mt-4 active:scale-95">
                    Simpan
                  </button>
                </div>
              </div>
            </div>

            {/* Tabel Data Konfigurasi (Kanan) */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data Konfigurasi</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataConfig.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 dark:text-slate-500 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Tahun</th>
                        <th className="px-6 py-6 font-bold">Jatah Cuti</th>
                        <th className="px-6 py-6 font-bold">Nilai Uang</th>
                        <th className="px-6 py-6 font-bold text-center">Status</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataConfig.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300 font-sans">
                          <td className="px-6 py-6 font-bold text-slate-400 dark:text-slate-50">{index + 1}</td>
                          <td className="px-6 py-6 font-black text-slate-700 dark:text-slate-100 text-lg tracking-tight">{item.tahun}</td>
                          <td className="px-6 py-6 font-medium text-slate-600 dark:text-slate-300">{item.jatahCuti}</td>
                          <td className="px-6 py-6 font-black text-emerald-500 dark:text-emerald-400 tracking-wide">
                            {item.nilaiUang}
                          </td>
                          <td className="px-6 py-6 text-center">
                            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-500/20">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-6 pr-8">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                              </button>
                              <button className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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