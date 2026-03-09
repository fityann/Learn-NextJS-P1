"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Headers() {

  const pathname = usePathname();

  const getTitle = () => {

    if (pathname.includes("dashboard")) return "Dashboard";

    if (pathname.includes("divisi")) return "Divisi";
    if (pathname.includes("jabatan")) return "Jabatan";
    if (pathname.includes("karyawan")) return "Karyawan";
    if (pathname.includes("user")) return "User Management";
    if (pathname.includes("configurasi")) return "Konfigurasi";

    if (pathname.includes("presensi") && pathname.includes("report")) return "Report Presensi";
    if (pathname.includes("kehadiran")) return "Kehadiran";

    if (pathname.includes("cuti") && pathname.includes("report")) return "Report Cuti";
    if (pathname.includes("pengajuan")) return "Form Pengajuan Cuti";
    if (pathname.includes("riwayat")) return "Riwayat & Saldo Cuti";

    if (pathname.includes("proses")) return "Proses Gaji";
    if (pathname.includes("report-gaji")) return "Report Gaji";
    if (pathname.includes("slip")) return "Slip Gaji";

    return "Dashboard";
  };

  const getRole = () => {
    if (pathname.includes('hrd')) return 'Administrator';
    if (pathname.includes('user')) return 'User';
  }

  return (
    <header className="flex h-16 items-center justify-between px-8 border-b border-slate-200 dark:border-white/5 shrink-0 bg-white dark:bg-black">

      <h1 className="text-xl font-bold text-slate-800 dark:text-white">
        {getTitle()}
      </h1>

      <div className="flex items-center gap-4">

        <div className="text-right">
          <p className="text-sm font-bold leading-tight text-slate-900 dark:text-white">
            {getRole()}
          </p>

          <p className="text-xs text-slate-500">
            Payroll Management
          </p>
        </div>

        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-white/10 font-bold">
          A
        </div>

      </div>

    </header>
  );
}