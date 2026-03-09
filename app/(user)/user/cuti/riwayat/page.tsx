"use client";

import React, { useState } from "react";

const DataCutiPage = () => {
  // State untuk melacak tab filter yang aktif
  const [activeTab, setActiveTab] = useState("Semua");

  const tabs = ['Semua', 'Pending', 'Approved', 'Rejected'];

  const allData = [
    { jenis: "Tahunan", tgl: "15 Feb - 17 Feb 2024", durasi: "3 Hari", alasan: "Acara Keluarga", status: "APPROVED", color: "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20 dark:border-emerald-500/20" },
    { jenis: "Sakit", tgl: "10 Jan - 11 Jan 2024", durasi: "1 Hari", alasan: "Flu & Demam", status: "APPROVED", color: "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/20 dark:border-emerald-500/20" },
    { jenis: "Tahunan", tgl: "10 Mar - 12 Mar 2024", durasi: "3 Hari", alasan: "Liburan Akhir Pekan", status: "PENDING", color: "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/20 dark:border-amber-500/20" },
  ];

  // Logika filter data berdasarkan tab (opsional, untuk simulasi)
  const filteredData = activeTab === "Semua" 
    ? allData 
    : allData.filter(item => item.status === activeTab.toUpperCase());

  return (
    <main className="p-10 bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Data & Saldo Cuti</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Informasi kuota dan riwayat pengajuan cuti Anda.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "TOTAL CUTI", val: "12", sub: "Hari / Tahun", icon: "📅" },
          { label: "CUTI DIAMBIL", val: "4", sub: "Hari", icon: "🗓️" },
          { label: "SISA CUTI", val: "8", sub: "Hari Tersisa", icon: "🕒" },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-slate-200 dark:border-white/5 flex justify-between items-center shadow-sm dark:shadow-none hover:scale-[1.02] transition-transform">
            <div>
              <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">{item.label}</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{item.val} <span className="text-sm font-medium text-slate-500">{item.sub}</span></p>
            </div>
            <div className="h-12 w-12 bg-slate-50 dark:bg-[#050505] rounded-2xl flex items-center justify-center text-xl border border-slate-200 dark:border-white/5">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Riwayat Pengajuan */}
      <div className="bg-white dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-white/5 p-8 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Riwayat Pengajuan</h2>
          
          {/* Tab Filter Interaktif */}
          <div className="flex bg-slate-100 dark:bg-[#050505] rounded-full p-1 border border-slate-200 dark:border-white/5">
            {tabs.map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab 
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-[#00bcd4] shadow-sm dark:shadow-none' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-5 text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-4 px-4">
          <div>Jenis Cuti</div>
          <div>Tanggal</div>
          <div>Durasi</div>
          <div>Alasan</div>
          <div>Status</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {filteredData.length > 0 ? (
            filteredData.map((row, i) => (
              <div key={i} className="grid grid-cols-5 items-center px-4 py-4 bg-slate-50 dark:bg-[#0a0a0a] rounded-2xl border border-slate-200 dark:border-white/5 text-sm transition-all hover:border-slate-300 dark:hover:border-white/20">
                <div className="text-xs font-bold bg-white dark:bg-white/5 w-fit px-3 py-1 rounded-full text-slate-800 dark:text-white border dark:border-none shadow-sm">{row.jenis}</div>
                <div className="text-slate-600 dark:text-slate-300">{row.tgl}</div>
                <div className="font-bold text-slate-900 dark:text-white">{row.durasi}</div>
                <div className="italic text-slate-500 dark:text-slate-500 truncate pr-4">{row.alasan}</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${row.color}`}>
                    {row.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-slate-400 italic text-sm">
              Tidak ada data pengajuan dengan status {activeTab}.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DataCutiPage;