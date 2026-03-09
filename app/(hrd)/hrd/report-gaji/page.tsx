"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

// Interface untuk data layout
interface ReportItem {
  id: number;
  name: string;
  nik: string;
  role: string;
  gajiPokok: number;
  uangCuti: number;
  potongan: number;
  totalNetto: number;
  status: string;
}

// Data simulasi (Hardcoded)
const reportData: ReportItem[] = [
  { id: 1, name: "Ahmad Fauzi", nik: "EMP001", role: "Manager IT", gajiPokok: 15000000, uangCuti: 500000, potongan: 200000, totalNetto: 15300000, status: "PAID" },
  { id: 2, name: "Siti Aminah", nik: "EMP002", role: "HR Specialist", gajiPokok: 8000000, uangCuti: 0, potongan: 100000, totalNetto: 7900000, status: "PAID" },
  { id: 3, name: "Budi Santoso", nik: "EMP003", role: "Frontend Developer", gajiPokok: 10000000, uangCuti: 200000, potongan: 0, totalNetto: 10200000, status: "PAID" },
  { id: 4, name: "Rina Wijaya", nik: "EMP004", role: "Marketing", gajiPokok: 7500000, uangCuti: 100000, potongan: 50000, totalNetto: 7550000, status: "PAID" },
];

const LaporanGajiPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatRupiah = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const filteredData = reportData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Menghitung total Netto dari data yang terfilter
  const totalNettoKeseluruhan = filteredData.reduce((acc, curr) => acc + curr.totalNetto, 0);

  return (
    <div className="w-full h-screen flex bg-white dark:bg-[#050505] text-slate-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">

      <div className="flex-1 flex flex-col overflow-y-auto">

        <main className="p-12 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Laporan Gaji Karyawan</h1>
              <p className="text-slate-500 text-sm font-medium">Laporan rekapitulasi penggajian seluruh divisi.</p>
            </div>
            <button className="bg-blue-600 dark:bg-[#0052cc] hover:bg-blue-700 dark:hover:bg-[#0066ff] px-8 py-4 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg transition-all">
              📥 Export Excel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: "TOTAL PAYROLL", val: "Rp 40.950.000", color: "text-blue-600 dark:text-blue-500" },
              { label: "TOTAL POTONGAN", val: "Rp 350.000", color: "text-rose-600 dark:text-rose-500" },
              { label: "UANG CUTI", val: "Rp 800.000", color: "text-green-600 dark:text-[#00e676]" },
              { label: "KARYAWAN", val: "120", color: "text-slate-900 dark:text-white" },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#111] p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-xl">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{item.label}</p>
                <h3 className={`text-2xl font-black ${item.color} tracking-tighter`}>{item.val}</h3>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#111] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
            <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <h3 className="text-lg font-black">Rincian Laporan Gaji</h3>
              <input
                type="text"
                placeholder="Cari karyawan..."
                className="w-full max-w-sm bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-2xl py-3 px-6 text-sm focus:outline-none focus:border-blue-500 transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 uppercase text-[9px] font-black tracking-[0.2em] bg-slate-50 dark:bg-white/[0.01]">
                    <th className="px-12 py-6">Karyawan</th>
                    <th className="px-8 py-6">Gaji Pokok</th>
                    <th className="px-8 py-6">Uang Cuti</th>
                    <th className="px-8 py-6">Potongan</th>
                    <th className="px-8 py-6">Total Netto</th>
                    <th className="px-12 py-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                      <td className="px-12 py-8 font-bold text-[14px]">{item.name}<p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{item.nik}</p></td>
                      <td className="px-8 py-8 text-slate-500 text-sm font-bold">{formatRupiah(item.gajiPokok)}</td>
                      <td className="px-8 py-8 text-green-600 dark:text-[#00e676] font-black text-sm">+{formatRupiah(item.uangCuti).replace("Rp", "Rp ")}</td>
                      <td className="px-8 py-8 text-rose-600 dark:text-rose-500 font-bold text-sm">-{formatRupiah(item.potongan).replace("Rp", "Rp ")}</td>
                      <td className="px-8 py-8 font-black text-sm">{formatRupiah(item.totalNetto)}</td>
                      <td className="px-12 py-8 text-right"><span className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-[#00e676] px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border border-emerald-100 dark:border-emerald-500/20">{item.status}</span></td>
                    </tr>
                  ))}
                  {/* Baris Total Dinamis */}
                  <tr className="bg-slate-50 dark:bg-white/[0.02] font-black">
                    <td colSpan={4} className="px-12 py-6 text-right uppercase tracking-[0.2em] text-[10px]">Total Netto Keseluruhan</td>
                    <td className="px-8 py-6 text-sm">{formatRupiah(totalNettoKeseluruhan)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LaporanGajiPage;