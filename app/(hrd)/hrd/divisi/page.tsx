"use client";

import { useEffect, useState } from "react";

interface Divisi {
  id: number;
  divisi: string;
}

export default function DivisiPage() {
  const [namaDivisi, setNamaDivisi] = useState("");
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Mengambil token dengan aman di sisi klien
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  // ===============================
  // GET DATA DIVISI
  // ===============================
  const fetchDivisi = async () => {
    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil data");
      }

      // Menyesuaikan jika response API dibungkus dalam properti 'data'
      setDivisiList(Array.isArray(data) ? data : data.data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (token) fetchDivisi();
  }, [token]);

  // ===============================
  // SIMPAN / UPDATE DIVISI
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaDivisi.trim()) return;

    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi";
    
    // Gunakan PUT untuk update sesuai standar RESTful, atau PATCH jika API mengharuskan
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          divisi: namaDivisi, // Menggunakan field 'divisi' sesuai instruksi
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || `Gagal ${editingId ? 'mengupdate' : 'menambahkan'} divisi`);
      }

      // Reset Form & Refresh Data
      setNamaDivisi("");
      setEditingId(null);
      fetchDivisi(); 
      alert(editingId ? "Divisi berhasil diupdate!" : "Divisi berhasil ditambah!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // EDIT DIVISI (Trigger Form)
  // ===============================
  const handleEdit = (item: Divisi) => {
    setEditingId(item.id);
    setNamaDivisi(item.divisi);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ===============================
  // DELETE DIVISI
  // ===============================
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus divisi ini?")) return;

    try {
      const res = await fetch(
        `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus divisi");
      }

      fetchDivisi();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNamaDivisi("");
    setError("");
  };

  return (
    <div className="space-y-8 px-8 py-10">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Management Divisi</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Konfigurasi dan kelola departemen perusahaan.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* ================= FORM (4/12) ================= */}
        <div className="lg:col-span-4 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 h-fit lg:sticky lg:top-24">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              {editingId ? "✏️" : "➕"}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? "Edit Divisi" : "Tambah Divisi"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Nama Divisi
              </label>
              <input
                type="text"
                placeholder="Contoh: IT Support"
                value={namaDivisi}
                onChange={(e) => setNamaDivisi(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-600 dark:bg-rose-900/10 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20">
                ⚠️ {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-[#005a8d] hover:bg-[#0077b6] text-white px-4 py-3 text-sm font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Memproses..." : editingId ? "Update" : "Simpan"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ================= TABLE (8/12) ================= */}
        <div className="lg:col-span-8 rounded-3xl bg-white shadow-xl shadow-slate-200/50 dark:bg-zinc-900 dark:shadow-none border border-slate-100 dark:border-zinc-800 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 dark:border-zinc-800 flex justify-between items-center">
             <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Data Divisi
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full border border-blue-100">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              {divisiList.length} Total Divisi
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 border-b border-slate-50 dark:border-zinc-800">
                <tr>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">No</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px]">Nama Divisi</th>
                  <th className="px-8 py-4 font-bold uppercase tracking-wider text-[10px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
                {divisiList.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-8 py-16 text-center text-slate-400 italic">
                      {loading ? "Memuat data..." : "Belum ada data divisi."}
                    </td>
                  </tr>
                ) : (
                  divisiList.map((item, index) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-8 py-5 font-bold text-slate-400">{index + 1}</td>
                      <td className="px-8 py-5 font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">
                        {item.divisi}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3 md:opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => handleEdit(item)}
                            className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            title="Hapus"
                          >
                            🗑️
                          </button>
                        </div>
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