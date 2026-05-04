"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface AbsenItem {
  tanggal: string;
  jam_masuk: string | null;
  jam_keluar: string | null;
  status: string;
  keterangan: string | null;
}

export default function PresensiUserPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState<"HADIR" | "IZIN" | "SAKIT">("HADIR");
  const [keterangan, setKeterangan] = useState("");
  const [hasAbsen, setHasAbsen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [historyAbsen, setHistoryAbsen] = useState<AbsenItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  const ID_KARYAWAN = 1; // Ganti nanti dengan ID dari user login
  const API_URL =
    "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/presensi";

  // Ambil token + realtime clock
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Sesi berakhir. Silakan login kembali.");
      setFetching(false);
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch riwayat presensi
  const fetchHistory = useCallback(
    async (activeToken?: string) => {
      const tokenToUse = activeToken || token;
      if (!tokenToUse) {
        setFetching(false);
        return;
      }

      try {
        setFetching(true);
        setError(null);

        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          const dataArray: AbsenItem[] = Array.isArray(data)
            ? data
            : data.data || [];

          const sorted = [...dataArray].reverse();
          setHistoryAbsen(sorted);

          // Cek apakah sudah absen hari ini
          const today = new Date().toISOString().split("T")[0];
          const sudahAbsen = sorted.some((item) => item.tanggal === today);
          setHasAbsen(sudahAbsen);
        } else {
          setError(data.message || "Gagal mengambil data riwayat.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal menyambung ke server. Periksa koneksi Anda.");
      } finally {
        setFetching(false);
      }
    },
    [token],
  );

  // Jalankan fetch setelah token tersedia
  useEffect(() => {
    if (token) {
      fetchHistory();
    }
  }, [token, fetchHistory]);

  // Handle Submit Presensi
  const handleSubmit = async () => {
    const activeToken = token || localStorage.getItem("access_token");

    if (!activeToken) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    if (hasAbsen) {
      alert("Anda sudah melakukan presensi hari ini.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      id_karyawan: ID_KARYAWAN,
      tanggal: currentTime.toISOString().split("T")[0],
      status: status,
      keterangan: keterangan.trim() || "-",
      jam_masuk: currentTime.toLocaleTimeString("en-GB"),
      jam_keluar: "17:00:00",
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${activeToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Presensi berhasil disimpan!");
        setKeterangan("");

        // Refresh data setelah submit berhasil
        await fetchHistory(activeToken);
      } else {
        alert(`❌ Gagal: ${result.message || "Periksa input Anda"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* HEADER */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Presensi Kehadiran
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Silahkan melakukan presensi harian Anda.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-5">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <Clock size={28} />
          </div>
          <div>
            <span className="text-3xl font-mono font-bold text-slate-900 dark:text-white">
              {currentTime.toLocaleTimeString("en-GB")}
            </span>
            <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* FORM PRESENSI */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={24} />
              Form Presensi
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                  Status Kehadiran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["HADIR", "IZIN", "SAKIT"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        setStatus(opt as "HADIR" | "IZIN" | "SAKIT")
                      }
                      className={`py-3.5 rounded-2xl text-xs font-bold transition-all ${
                        status === opt
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">
                  Keterangan (Opsional)
                </label>
                <textarea
                  placeholder="Contoh: Sakit flu, Izin urusan keluarga..."
                  rows={4}
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-transparent focus:border-indigo-300 rounded-2xl text-sm focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={hasAbsen || loading}
                className={`w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  hasAbsen || loading
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : hasAbsen ? (
                  "✅ Sudah Absen Hari Ini"
                ) : (
                  "Submit Kehadiran"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIWAYAT PRESENSI */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-xl">Riwayat Kehadiran</h3>
            <button
              onClick={() => fetchHistory()}
              disabled={fetching}
              className="text-slate-400 hover:text-indigo-600 disabled:opacity-50"
            >
              <RefreshCw size={20} className={fetching ? "animate-spin" : ""} />
            </button>
          </div>

          <div className="overflow-x-auto">
            {error && (
              <div className="m-8 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  <th className="px-8 py-5">Tanggal</th>
                  <th className="px-6 py-5">Masuk</th>
                  <th className="px-6 py-5">Keluar</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-8 py-5">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {fetching ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <Loader2
                        className="animate-spin mx-auto text-indigo-500"
                        size={32}
                      />
                    </td>
                  </tr>
                ) : historyAbsen.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-center text-slate-400"
                    >
                      Belum ada riwayat presensi.
                    </td>
                  </tr>
                ) : (
                  historyAbsen.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b last:border-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-8 py-4 text-sm font-medium">
                        {item.tanggal}
                      </td>
                      <td className="px-6 py-4 font-mono text-sm">
                        {item.jam_masuk || "-"}
                      </td>
                      <td className="px-6 py-4 font-mono text-sm">
                        {item.jam_keluar || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-bold ${
                            item.status === "HADIR"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-sm text-slate-500 dark:text-slate-400 italic">
                        {item.keterangan || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
