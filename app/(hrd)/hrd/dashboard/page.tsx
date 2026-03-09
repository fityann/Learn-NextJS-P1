"use client";

import React from "react";

const DashboardPage = () => {
  return (
    <main className="p-10 bg-[#f8fafc] dark:bg-[#050505] min-h-screen text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back, user!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
          Here's your overview for this month.
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          { label: "Kehadiran Bulan Ini", val: "22/24", badge: "On Track" },
          { label: "Sisa Cuti", val: "8 Hari", badge: "Stable" },
          { label: "Gaji Terakhir", val: "Rp 5.5M", badge: "Paid" },
          { label: "Tugas Pending", val: "3", badge: "Action Required" },
        ].map((item, idx) => (
          <div 
            key={idx} 
            className="rounded-3xl bg-white dark:bg-[#111] p-8 border border-slate-200 dark:border-white/5 flex flex-col justify-between h-40 shadow-sm dark:shadow-none transition-all hover:border-slate-300 dark:hover:border-white/10"
          >
            <div className="flex justify-between items-start">
              <div className="h-10 w-10 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-xl">
                📅
              </div>
              <span className="text-[10px] uppercase font-bold bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full text-slate-500 dark:text-slate-400">
                {item.badge}
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {item.label}
              </p>
              <p className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                {item.val}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent History */}
        <div className="rounded-3xl bg-white dark:bg-[#111] p-8 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <span className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400"></span>
            Your Recent History
          </h3>
          <div className="space-y-6">
            {[
              { title: "Gaji Bulan Januari Telah Dibayar", time: "2 hours ago" },
              { title: "Gaji Bulan Januari Telah Dibayar", time: "4 hours ago" },
            ].map((act, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl">
                  💳
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {act.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {act.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement Section */}
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#111] shadow-sm dark:shadow-none">
          <div className="h-14 w-14 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-2xl">
            📢
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Pengumuman Kantor
          </h4>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Libur nasional jatuh pada tanggal 25 Maret.
          </p>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;