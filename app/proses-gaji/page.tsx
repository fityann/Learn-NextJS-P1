"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

// 1. Definisikan interface untuk struktur data karyawan
interface Employee {
  id: number;
  name: string;
  nik: string;
  role: string;
  gajiPokok: number;
  uangCuti: number;
  potongan: number;
  totalDiterima: number;
}

// 2. Data tetap ada di sini (sebagai simulasi database hardcoded)
const cutiData: Employee[] = [
  { id: 1, name: "Ahmad Fauzi", nik: "EMP001", role: "Manager IT", gajiPokok: 15000000, uangCuti: 500000, potongan: 200000, totalDiterima: 15300000 },
  { id: 2, name: "Siti Aminah", nik: "EMP002", role: "HR Specialist", gajiPokok: 8000000, uangCuti: 0, potongan: 100000, totalDiterima: 7900000 },
  { id: 3, name: "Budi Santoso", nik: "EMP003", role: "Frontend Developer", gajiPokok: 10000000, uangCuti: 200000, potongan: 0, totalDiterima: 10200000 },
];

const ReportCutiPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 3. Berikan tipe data Employee | null pada state
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // 4. Tambahkan tipe data 'number' pada parameter
  const formatRupiah = (number: number): string => 
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(number);

  return (
    <div className="w-full h-screen flex bg-white dark:bg-[#050505] text-slate-900 dark:text-white font-sans overflow-hidden transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between px-10 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] shrink-0">
          <h2 className="text-sm font-bold uppercase tracking-wider italic">Proses</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold tracking-tight">Administrator</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Payroll Management</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-[10px] font-black text-blue-600 dark:text-blue-400">A</div>
          </div>
        </header>

        <main className="p-12 max-w-[1400px] mx-auto w-full">
          {/* Bagian Header Konten */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Proses Gaji Bulanan</h1>
              <p className="text-slate-500 text-sm font-medium">Generate dan hitung gaji seluruh karyawan dalam satu klik.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-100 dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-2xl px-6 py-3.5 text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center shadow-inner">
                March 2024 <span className="mx-3 text-slate-300 dark:text-slate-700">|</span> 📅
              </div>
              <button className="bg-blue-600 dark:bg-[#0052cc] hover:bg-blue-700 dark:hover:bg-[#0066ff] px-8 py-3.5 rounded-2xl text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all active:scale-95">
                <span>▶</span> Proses Gaji
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: "TOTAL PENGELUARAN GAJI", value: "Rp 33.400.000" },
              { label: "TOTAL KARYAWAN", value: "120 Orang" },
              { label: "STATUS PERIODE", value: "DRAFT", isBadge: true },
            ].map((card, idx) => (
              <div key={idx} className="bg-white dark:bg-[#111] p-10 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-xl">
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">{card.label}</p>
                {card.isBadge ? (
                  <span className="bg-yellow-50 dark:bg-[#fff9e6]/5 text-yellow-600 px-5 py-2 rounded-full text-[10px] font-black tracking-widest border border-yellow-200 dark:border-[#ffcc00]/20 italic inline-block">DRAFT</span>
                ) : (
                  <h3 className="text-3xl font-black">{card.value}</h3>
                )}
              </div>
            ))}
          </div>

          {/* Tabel */}
          <div className="bg-white dark:bg-[#111] rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 uppercase text-[9px] font-black tracking-[0.2em]">
                    <th className="px-12 py-10">Karyawan</th>
                    <th className="px-10 py-10 text-center">Gaji Pokok</th>
                    <th className="px-10 py-10 text-center">Uang Cuti</th>
                    <th className="px-10 py-10 text-center">Potongan</th>
                    <th className="px-10 py-10 text-center">Total Diterima</th>
                    <th className="px-12 py-10 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/[0.03]">
                  {cutiData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                      <td className="px-12 py-9">
                        <p className="font-bold text-[15px]">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1">{item.nik} • {item.role}</p>
                      </td>
                      <td className="px-10 py-9 text-center font-bold text-slate-500 dark:text-slate-400 text-sm">{formatRupiah(item.gajiPokok)}</td>
                      <td className="px-10 py-9 text-center text-green-600 dark:text-[#00e676] font-black text-sm">+{formatRupiah(item.uangCuti).replace("Rp", "Rp ")}</td>
                      <td className="px-10 py-9 text-center text-red-500 font-bold text-sm">-{formatRupiah(item.potongan).replace("Rp", "Rp ")}</td>
                      <td className="px-10 py-9 text-center font-black text-sm">{formatRupiah(item.totalDiterima)}</td>
                      <td className="px-12 py-9 text-right">
                        <button onClick={() => { setSelectedEmployee(item); setIsModalOpen(true); }} className="h-10 w-10 bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-center ml-auto transition-all active:scale-90">📝</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-[#18181b] rounded-[2.5rem] w-full max-w-[500px] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
            <div className="p-10 pb-6 flex justify-between items-start">
              <div>
                <p className="text-[9px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">Calculation Breakdown</p>
                <h2 className="text-2xl font-black mt-1">{selectedEmployee.name}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-colors">✕</button>
            </div>
            <div className="px-10 py-4 space-y-4">
              <div className="flex justify-between font-bold text-sm"><span>Gaji Pokok</span> <span>{formatRupiah(selectedEmployee.gajiPokok)}</span></div>
              <div className="flex justify-between font-bold text-sm text-green-600 dark:text-[#00e676]"><span>Uang Cuti</span> <span>+{formatRupiah(selectedEmployee.uangCuti).replace("Rp", "Rp ")}</span></div>
              <div className="flex justify-between font-bold text-sm text-red-500"><span>Potongan</span> <span>-{formatRupiah(selectedEmployee.potongan).replace("Rp", "Rp ")}</span></div>
              <div className="h-px bg-slate-200 dark:bg-white/5 my-2"></div>
              <div className="bg-slate-100 dark:bg-[#111] rounded-3xl p-6 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest">Total Gaji Netto</span>
                <span className="text-xl font-black text-blue-600 dark:text-blue-500">{formatRupiah(selectedEmployee.totalDiterima)}</span>
              </div>
            </div>
            <div className="p-10 pt-6 flex gap-4">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-blue-600 dark:bg-[#004a8f] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCutiPage;