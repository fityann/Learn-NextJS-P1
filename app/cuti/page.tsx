"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

// Definisi Tipe Data
interface Employee {
  id: number;
  name: string;
  nik: string;
  division: string;
  total: number;
  used: number;
  remaining: number;
}

// Data Karyawan
const cutiData: Employee[] = [
  { id: 1, name: "Ahmad Fauzi", nik: "EMP001", division: "IT", total: 12, used: 4, remaining: 8 },
  { id: 2, name: "Siti Aminah", nik: "EMP002", division: "HR", total: 12, used: 2, remaining: 10 },
  { id: 3, name: "Budi Santoso", nik: "EMP003", division: "Finance", total: 12, used: 12, remaining: 0 },
  { id: 4, name: "Rina Wijaya", nik: "EMP004", division: "Marketing", total: 15, used: 5, remaining: 10 },
];

const employeeHistory: Record<string, any[]> = {
  "EMP001": [
    { date: "2024-02-15", type: "Tahunan", duration: "3 Hari", reason: "Acara Keluarga", status: "APPROVED" },
    { date: "2024-01-10", type: "Sakit", duration: "1 Hari", reason: "Demam", status: "APPROVED" },
  ],
};

const ReportCutiPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = cutiData.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white font-sans overflow-hidden transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header Tetap Mempertahankan Info Administrator */}
        <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] shrink-0">
          <h2 className="text-lg font-bold">Report</h2>
          <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/10 pl-6">
            <div className="text-right">
              <p className="text-sm font-bold">Administrator</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Payroll Management</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center border border-slate-200 dark:border-white/10 text-xs font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          {/* Judul Sejajar dengan Tombol */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Report Saldo Cuti</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Monitor saldo dan penggunaan cuti seluruh karyawan.</p>
            </div>
            <button className="bg-[#00bcd4] px-5 py-2.5 rounded-xl text-white font-bold text-sm hover:bg-[#00acc1] transition-all shadow-lg shadow-cyan-500/20">
              Download Report
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <input 
              type="text" 
              placeholder="Cari nama karyawan..." 
              className="flex-1 bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/5 rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center gap-3 bg-green-200 p-5 rounded-2xl">
              <p className="font-bold text-green-600 text-sm">TOTAL SALDO</p>
              <h1 className="font-extrabold text-green-600">450 HARI</h1>
            </div>
            <div className="flex items-center gap-3 bg-red-200 p-5 rounded-2xl">
              <p className="font-bold text-red-600 text-sm">TERPAKAI</p>
              <h1 className="font-extrabold text-red-600">124 HARI</h1>
            </div>
          </div>

          <div className="bg-white dark:bg-[#161616] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-transparent text-slate-500 uppercase text-[10px] tracking-widest">
                <tr>
                  {["Karyawan", "Divisi", "Total", "Terpakai", "Sisa Saldo", "Aksi"].map((h) => (
                    <th key={h} className="px-8 py-5 font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-[11px] text-slate-500">{item.nik}</p>
                    </td>
                    <td className="px-8 py-6"><span className="bg-slate-100 dark:bg-[#2a2a2a] px-3 py-1 rounded-md text-[10px] font-bold">{item.division}</span></td>
                    <td className="px-8 py-6 text-sm font-medium">{item.total}</td>
                    <td className="px-8 py-6 text-sm text-rose-500 font-bold">{item.used}</td>
                    <td className="px-8 py-6 text-sm text-emerald-500 font-bold">{item.remaining}</td>
                    <td className="px-8 py-6">
                      <button onClick={() => openModal(item)} className="p-2 hover:bg-cyan-500/10 rounded-full text-cyan-500">ⓘ</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#161616] p-8 rounded-3xl w-full max-w-2xl border border-white/5">
            <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
            <div className="overflow-hidden mt-4 border border-slate-100 dark:border-white/5 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 text-[10px]">
                  <tr>{["Tanggal", "Jenis", "Durasi", "Alasan", "Status"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {(employeeHistory[selectedEmployee.nik] || []).map((h, i) => (
                    <tr key={i}>
                      <td className="px-4 py-4 text-xs">{h.date}</td>
                      <td className="px-4 py-4">{h.type}</td>
                      <td className="px-4 py-4 text-cyan-500">{h.duration}</td>
                      <td className="px-4 py-4">{h.reason}</td>
                      <td className="px-4 py-4">{h.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => setIsModalOpen(false)} className="w-full mt-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold">Tutup Riwayat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCutiPage;