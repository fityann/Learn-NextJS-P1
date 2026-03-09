"use client";

import React, { useState } from "react";

const CutiPage = () => {
  // State untuk melacak jenis cuti yang dipilih
  const [selectedType, setSelectedType] = useState("Cuti Tahunan");

  const cutiTypes = [
    { name: 'Cuti Tahunan', icon: '📅' },
    { name: 'Cuti Sakit', icon: '🤒' },
    { name: 'Alasan Penting', icon: '🏠' },
    { name: 'Cuti Bersama', icon: '🤝' }
  ];

  return (
    <main className="p-10 bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Form Pengajuan Cuti</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Silahkan lengkapi data di bawah ini untuk mengajukan cuti.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-8 bg-white dark:bg-[#111] p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
          <p className="text-[10px] uppercase text-slate-500 font-bold mb-4 tracking-widest">Pilih Jenis Cuti</p>
          
          {/* Grid Jenis Cuti dengan Logika Klik */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {cutiTypes.map((item) => (
              <div 
                key={item.name} 
                onClick={() => setSelectedType(item.name)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all cursor-pointer group active:scale-95 ${
                  selectedType === item.name 
                    ? "bg-cyan-50 dark:bg-cyan-950/30 border-[#00bcd4] ring-1 ring-[#00bcd4]" 
                    : "bg-slate-50 dark:bg-[#1a1a1a] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                <div className={`text-2xl mb-3 transition-transform group-hover:scale-110 ${selectedType === item.name ? "grayscale-0" : "grayscale"}`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-bold transition-colors ${
                  selectedType === item.name ? "text-[#00bcd4]" : "text-slate-500 dark:text-slate-400"
                }`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-tighter">Tanggal Mulai</label>
              <input type="date" className="w-full bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#00bcd4] text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-tighter">Tanggal Berakhir</label>
              <input type="date" className="w-full bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-[#00bcd4] text-slate-900 dark:text-white" />
            </div>
          </div>

          <label className="text-xs font-bold text-slate-400 mb-2 block uppercase tracking-tighter">Alasan Cuti</label>
          <textarea 
            className="w-full bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm h-32 mb-8 focus:outline-none focus:border-[#00bcd4] text-slate-900 dark:text-white transition-all" 
            placeholder={`Jelaskan alasan detail pengajuan ${selectedType} Anda...`}
          ></textarea>

          <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center mb-8 bg-slate-50 dark:bg-[#050505] hover:bg-slate-100 dark:hover:bg-[#0a0a0a] transition-colors cursor-pointer">
            <div className="text-3xl mb-2">☁️</div>
            <p className="text-sm font-bold">Upload Dokumen Pendukung (Opsional)</p>
            <p className="text-[10px] text-slate-500">PDF, JPG, atau PNG (Maks 2MB)</p>
          </div>

          <button className="w-full py-4 bg-[#005a66] text-[#00bcd4] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#004a54] transition-all active:scale-[0.99] shadow-lg shadow-cyan-900/10">
            <span>✈️</span> Kirim Pengajuan {selectedType}
          </button>
        </div>

        {/* Right Column: Ketentuan */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-slate-200 dark:border-white/5 h-fit shadow-sm dark:shadow-none">
            <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
              <span className="text-xl">ⓘ</span>
              <h3 className="font-bold">Ketentuan Cuti</h3>
            </div>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 mb-8">
              {[
                "Pengajuan cuti dilakukan minimal 3 hari sebelum tanggal mulai.",
                "Cuti sakit wajib melampirkan surat keterangan dokter.",
                "Persetujuan cuti bergantung pada kebijakan manajer divisi."
              ].map((text, i) => (
                <li key={i} className="flex gap-3">
                  <span className="h-6 w-6 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px] shrink-0 font-bold text-slate-600 dark:text-slate-300">{i + 1}</span>
                  {text}
                </li>
              ))}
            </ul>
            
            <div className="bg-slate-50 dark:bg-[#050505] p-5 rounded-2xl border border-slate-200 dark:border-white/5">
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Butuh Bantuan?</p>
              <p className="text-xs text-slate-700 dark:text-slate-300">Hubungi HRD melalui email <strong>hrd@company.com</strong></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CutiPage;