"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";

const attendanceData = [
  { id: 1, name: "Ahmad Fauzi", nik: "EMP001", division: "IT", time: "08:00", status: "HADIR", initial: "A" },
  { id: 2, name: "Siti Aminah", nik: "EMP002", division: "HR", time: "08:15", status: "HADIR", initial: "S" },
  { id: 3, name: "Budi Santoso", nik: "EMP003", division: "Finance", time: "-", status: "IZIN", initial: "B" },
  { id: 4, name: "Rina Wijaya", nik: "EMP004", division: "Marketing", time: "-", status: "SAKIT", initial: "R" },
];

const ReportPresensiPage = () => {
  return (
    // Memastikan kontainer utama mendukung dark mode secara eksplisit
    <div className="w-full h-screen flex bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-[#0a0a0a]">
        {/* Header/Navbar */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 shrink-0 bg-white dark:bg-[#0a0a0a]">
          <h1 className="text-xl font-bold">Report Presensi</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold">Administrator</p>
              <p className="text-xs text-slate-500">Payroll Management</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center border border-slate-200 dark:border-white/10 font-bold">
              A
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* Action Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold">Monitoring Kehadiran</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Lihat data kehadiran karyawan secara real-time.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                Export PDF
              </button>
              <button className="bg-[#00bcd4] hover:bg-[#00acc1] px-4 py-2 rounded-lg text-white dark:text-black font-bold text-sm transition-colors">
                Cetak Laporan
              </button>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white dark:bg-[#161616] p-4 rounded-2xl border border-slate-200 dark:border-white/5 mb-8 flex flex-wrap gap-4 items-center shadow-sm">
            <input 
              type="text" 
              placeholder="Cari nama karyawan atau NIK..." 
              className="flex-1 min-w-[200px] bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-[#00bcd4] outline-none" 
            />
            <input 
              type="date" 
              className="w-full md:w-48 bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm outline-none" 
            />
            <select className="w-full md:w-48 bg-slate-50 dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-sm outline-none">
              <option>Semua Divisi</option>
              <option>IT</option>
              <option>HR</option>
            </select>
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-[#161616] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="p-6 flex justify-between items-center border-b border-slate-200 dark:border-white/5">
              <h2 className="text-lg font-bold">Data Kehadiran Hari Ini</h2>
              <div className="flex gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <span className="flex items-center gap-1"><span className="text-emerald-500">●</span> Hadir: 120</span>
                <span className="flex items-center gap-1"><span className="text-amber-500">●</span> Izin: 5</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 dark:bg-transparent text-slate-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">Karyawan</th>
                    <th className="px-6 py-4">Divisi</th>
                    <th className="px-6 py-4">Jam Masuk</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {attendanceData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-400">{item.id}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-[#2a2a2a] flex items-center justify-center text-sm font-bold">
                          {item.initial}
                        </div>
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-[11px] text-slate-500">{item.nik}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 dark:bg-[#2a2a2a] px-2 py-1 rounded text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                          {item.division}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{item.time}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                          item.status === "HADIR" ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400" : 
                          item.status === "IZIN" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-[#00bcd4] transition-colors">👁</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportPresensiPage;