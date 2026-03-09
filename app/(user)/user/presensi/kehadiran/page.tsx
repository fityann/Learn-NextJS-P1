"use client";

import React from "react";

const PresensiPage = () => {
  return (
    <main className="p-10 bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Presensi Kehadiran</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Silahkan melakukan presensi harian Anda.</p>
        </div>
        <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-2xl py-3 px-6 flex items-center gap-4 shadow-sm dark:shadow-none">
          <div className="text-xl">🕒</div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">06.52.59</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">SENIN, 9 MARET 2026</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Presensi */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-[#111] p-8 rounded-3xl border border-slate-200 dark:border-white/5 mb-6 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">📝</div>
              <h2 className="text-lg font-bold">Form Presensi</h2>
            </div>

            <p className="text-[10px] uppercase text-slate-500 font-bold mb-3 tracking-widest">Status Kehadiran</p>
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button className="py-3 rounded-xl bg-[#00bcd4] text-white font-bold text-sm hover:opacity-90">Hadir</button>
              <button className="py-3 rounded-xl bg-slate-100 dark:bg-[#1a1a1a] text-slate-600 dark:text-slate-400 font-bold text-sm border border-slate-200 dark:border-white/5">Izin</button>
              <button className="py-3 rounded-xl bg-slate-100 dark:bg-[#1a1a1a] text-slate-600 dark:text-slate-400 font-bold text-sm border border-slate-200 dark:border-white/5">Sakit</button>
            </div>

            <p className="text-[10px] uppercase text-slate-500 font-bold mb-3 tracking-widest">Keterangan (Opsional)</p>
            <textarea 
              className="w-full bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-sm h-32 mb-6 focus:outline-none focus:border-[#00bcd4]" 
              placeholder="Contoh: Sakit flu, Izin urusan keluarga..."
            />
            
            <button className="w-full py-4 bg-[#005a66] text-[#00bcd4] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#004a54]">
              <span>✓</span> Submit Kehadiran
            </button>
          </div>

          {/* Gradient Info Box */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-500 p-6 rounded-3xl">
            <div className="flex items-center gap-2 mb-2 text-white">
              <span className="text-xl">ⓘ</span>
              <h4 className="font-bold">Info Penting</h4>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              Batas waktu presensi masuk adalah pukul 08:30 WIB. Keterlambatan akan dicatat secara otomatis oleh sistem.
            </p>
          </div>
        </div>

        {/* Right Column: Riwayat */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-[#111] rounded-3xl border border-slate-200 dark:border-white/5 p-8 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-lg font-bold">Riwayat Kehadiran</h2>
              <button className="text-xs text-cyan-600 dark:text-cyan-400 font-bold">Lihat Semua</button>
            </div>

            <div className="grid grid-cols-5 text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-4 px-4">
              <div>Tanggal</div>
              <div>Masuk</div>
              <div>Pulang</div>
              <div>Status</div>
              <div>Ket</div>
            </div>

            <div className="space-y-1">
              {[
                { tgl: "1 Mar 2024", msk: "08:00", plg: "17:00", stt: "HADIR", sttColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", ket: "-" },
                { tgl: "28 Feb 2024", msk: "08:15", plg: "17:05", stt: "HADIR", sttColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", ket: "-" },
                { tgl: "27 Feb 2024", msk: "-", plg: "-", stt: "IZIN", sttColor: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400", ket: "Urusan Keluarga" },
                { tgl: "26 Feb 2024", msk: "07:55", plg: "17:00", stt: "HADIR", sttColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400", ket: "-" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-5 items-center px-4 py-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors text-sm">
                  <div className="font-bold text-slate-900 dark:text-white">{row.tgl}</div>
                  <div className="text-slate-500 dark:text-slate-400">{row.msk}</div>
                  <div className="text-slate-500 dark:text-slate-400">{row.plg}</div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.sttColor}`}>
                      {row.stt}
                    </span>
                  </div>
                  <div className="text-slate-400 dark:text-slate-500 italic text-xs">{row.ket}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PresensiPage;