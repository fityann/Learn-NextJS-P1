"use client";

import { useState, useEffect } from "react";

interface Presensi {
  id_karyawan: string | number;
  tanggal: string;
  status: string;
  keterangan: string;
  jam_masuk: string | null;
  jam_keluar: string | null;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
}

export default function ReportPresensiPage() {
  const [reportData, setReportData] = useState<Presensi[]>([]);
  const [listKaryawan, setListKaryawan] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      try {
        const [resPresensi, resKaryawan] = await Promise.all([
          fetch(
            "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/presensi",
            { headers },
          ),
          fetch(
            "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan",
            { headers },
          ),
        ]);

        const jsonPresensi = await resPresensi.json();
        const jsonKaryawan = await resKaryawan.json();

        setReportData(jsonPresensi.data || jsonPresensi || []);
        setListKaryawan(jsonKaryawan.data || jsonKaryawan || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  const getNamaKaryawan = (idOrNik: string | number) => {
    const found = listKaryawan.find(
      (k) => k.id === Number(idOrNik) || k.nik === String(idOrNik),
    );
    return found ? found.nama : "Tidak Diketahui";
  };

  const filteredData = reportData.filter((item) => {
    const nama = getNamaKaryawan(item.id_karyawan).toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      nama.includes(search) ||
      item.id_karyawan?.toString().includes(search) ||
      item.status?.toLowerCase().includes(search)
    );
  });

  const stats = {
    hadir: filteredData.filter((d) => d.status.toLowerCase() === "hadir")
      .length,
    izin: filteredData.filter((d) => d.status.toLowerCase() === "izin").length,
    sakit: filteredData.filter((d) => d.status.toLowerCase() === "sakit")
      .length,
  };

  return (
    <div className="min-h-screen space-y-8 px-8 md:px-10 pt-10 pb-20 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Report Presensi
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 mt-1">
            Monitoring kehadiran seluruh karyawan secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003d5e] text-white font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#002d45] transition-all">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Cetak Laporan
          </button>
        </div>
      </div>

      {/* Filter Card */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-sm border border-slate-100 dark:border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative group">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Cari nama karyawan atau NIK..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <input
            type="date"
            className="px-4 py-3 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 outline-none focus:border-blue-500 transition-all text-sm"
          />
          <select className="px-4 py-3 rounded-2xl border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 outline-none focus:border-blue-500 transition-all text-sm cursor-pointer">
            <option>Semua Divisi</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-lg font-bold">Data Kehadiran Hari Ini</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                Hadir: {stats.hadir}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                Izin: {stats.izin}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                Sakit: {stats.sakit}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/30 text-slate-400 dark:text-zinc-500">
              <tr>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">
                  No
                </th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">
                  Karyawan
                </th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">
                  Divisi
                </th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">
                  Jam Masuk
                </th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px]">
                  Status
                </th>
                <th className="px-8 py-5 font-bold uppercase tracking-widest text-[10px] text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-8 py-12 text-center text-slate-400 italic"
                  >
                    Mengambil data...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((row, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="px-8 py-5 font-bold text-slate-300 dark:text-zinc-700">
                      {i + 1}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-500 dark:text-zinc-400 text-xs shadow-inner">
                          {getNamaKaryawan(row.id_karyawan).charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-700 dark:text-zinc-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {getNamaKaryawan(row.id_karyawan)}
                          </div>
                          <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                            {row.id_karyawan}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-lg bg-slate-50 dark:bg-zinc-800/50 text-[10px] font-bold text-slate-400 dark:text-zinc-500 border border-slate-200/50 dark:border-zinc-700">
                        N/A
                      </span>
                    </td>
                    <td className="px-8 py-5 font-mono text-slate-600 dark:text-zinc-400">
                      {row.jam_masuk || "00:00:00"}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                          row.status.toLowerCase() === "hadir"
                            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20"
                            : row.status.toLowerCase() === "izin"
                              ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20"
                              : "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="h-8 w-8 rounded-lg bg-slate-50 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all inline-flex items-center justify-center">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-8 py-12 text-center text-slate-400"
                  >
                    Tidak ada data untuk ditampilkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
