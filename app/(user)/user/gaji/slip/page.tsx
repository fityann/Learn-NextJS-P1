"use client";

import React, { useState } from "react";

// --- KOMPONEN MODAL ---
const SlipModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Modal Container - Warna tetap konsisten agar profesional */}
      <div className="bg-white dark:bg-[#0f2030] border border-slate-200 dark:border-white/10 w-full max-w-md rounded-[32px] p-8 shadow-2xl transition-colors duration-300">
        <div className="mb-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">SALARY<span className="text-[#00bcd4]">APP</span></h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Official Payslip</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-100 dark:bg-[#1a3044] p-4 rounded-3xl">
            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-1">Periode</p>
            <p className="font-bold text-slate-900 dark:text-white text-sm">Maret 2024</p>
          </div>
          <div className="bg-slate-100 dark:bg-[#1a3044] p-4 rounded-3xl">
            <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold mb-1">Pay Date</p>
            <p className="font-bold text-slate-900 dark:text-white text-sm">2024-03-25</p>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-white rounded-3xl p-6 text-black mb-6 border border-slate-200 dark:border-none">
          <p className="font-bold uppercase text-[10px] text-slate-500 mb-4">Earnings</p>
          <div className="space-y-3 text-sm font-medium">
            <div className="flex justify-between"><span>Gaji Pokok</span><span>Rp 15.000.000</span></div>
            <div className="flex justify-between text-[#00bcd4]"><span>Uang Cuti</span><span>+Rp 500.000</span></div>
            <div className="flex justify-between text-red-500"><span>Potongan</span><span>-Rp 200.000</span></div>
          </div>
          <div className="border-t border-dashed border-slate-300 mt-6 pt-6">
            <div className="bg-slate-900 dark:bg-[#0f2030] text-white p-4 rounded-2xl flex justify-between items-center">
              <span className="font-bold text-[10px]">TOTAL NETTO</span>
              <span className="text-[#00bcd4] font-black text-lg">Rp 15.300.000</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-[2] py-3 bg-slate-200 dark:bg-[#1a3044] text-slate-900 dark:text-white rounded-2xl font-bold text-xs hover:bg-slate-300 dark:hover:bg-[#254562]">Print Payslip</button>
          <button onClick={onClose} className="flex-1 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-xs hover:bg-slate-700 dark:hover:bg-slate-100">Close</button>
        </div>
      </div>
    </div>
  );
};

// --- HALAMAN UTAMA ---
export default function SlipGajiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = [
    { periode: "Maret 2024", total: "Rp 15.300.000", tgl: "2024-03-25", status: "PAID" },
    { periode: "Februari 2024", total: "Rp 14.800.000", tgl: "2024-02-25", status: "PAID" },
    { periode: "Januari 2024", total: "Rp 15.150.000", tgl: "2024-01-25", status: "PAID" },
  ];

  return (
    <main className="p-10 bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans transition-colors duration-300">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Riwayat Slip Gaji</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Unduh slip gaji bulanan Anda dengan mudah.</p>
      </div>

      <div className="bg-white dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-white/5 p-8 shadow-sm dark:shadow-none">
        <div className="grid grid-cols-5 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-6 px-6">
          <div>Periode</div>
          <div>Total Gaji Netto</div>
          <div>Tanggal Pembayaran</div>
          <div>Status</div>
          <div className="text-right">Aksi</div>
        </div>

        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="grid grid-cols-5 items-center px-6 py-5 bg-slate-50 dark:bg-[#0a0a0a] rounded-2xl border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all">
              <div className="font-bold text-sm text-slate-900 dark:text-white">{item.periode}</div>
              <div className="font-bold text-sm text-[#00bcd4]">{item.total}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{item.tgl}</div>
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                  {item.status}
                </span>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >👁️</button>
                <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">⬇️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}