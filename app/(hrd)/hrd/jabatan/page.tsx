"use client";

import React, { useEffect, useState } from "react";

interface Divisi {
  id: number;
  divisi: string;
}

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
  divisi?: { divisi: string }; // Relasi dari API jika ada
}

export default function JabatanPage() {
  // State Data
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  
  // State Form
  const [form, setForm] = useState({
    jabatan: "",
    id_divisi: "",
    gaji_pokok: "",
  });
  
  // State UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // ===============================
  // FETCH DATA
  // ===============================
  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Accept": "application/json",
    };

    try {
      // Ambil Data Jabatan & Divisi secara paralel
      const [resJabatan, resDivisi] = await Promise.all([
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", { headers }),
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", { headers })
      ]);

      const dataJabatan = await resJabatan.json();
      const dataDivisi = await resDivisi.json();

      setJabatanList(dataJabatan.data || dataJabatan);
      setDivisiList(dataDivisi.data || dataDivisi);
    } catch (err) {
      setError("Gagal memuat data dari server.");
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // ===============================
  // HANDLERS
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan`;
    
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          jabatan: form.jabatan,
          id_divisi: parseInt(form.id_divisi),
          gaji_pokok: parseInt(form.gaji_pokok),
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data jabatan.");

      setForm({ jabatan: "", id_divisi: "", gaji_pokok: "" });
      setEditingId(null);
      fetchData();
      alert("Data berhasil disimpan!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert("Gagal menghapus data.");
    }
  };

  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setForm({
      jabatan: item.jabatan,
      id_divisi: item.id_divisi.toString(),
      gaji_pokok: item.gaji_pokok.toString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper untuk mencari nama divisi berdasarkan ID
  const getDivisiName = (id: number) => {
    return divisiList.find(d => d.id === id)?.divisi || "Tidak Diketahui";
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="p-8">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Management Jabatan</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Configure positions and salary structures.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Tambah/Edit Jabatan */}
            <div className="lg:col-span-4">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all h-fit sticky top-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 text-xl font-bold">
                    {editingId ? "✏️" : "+"}
                  </div>
                  <h3 className="text-xl font-bold">{editingId ? "Edit Jabatan" : "Tambah Jabatan"}</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Nama Jabatan</label>
                    <input 
                      type="text" 
                      required
                      value={form.jabatan}
                      onChange={(e) => setForm({...form, jabatan: e.target.value})}
                      placeholder="Contoh: Manager IT"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Pilih Divisi</label>
                    <select 
                      required
                      value={form.id_divisi}
                      onChange={(e) => setForm({...form, id_divisi: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3.5 focus:border-cyan-500 outline-none cursor-pointer appearance-none"
                    >
                      <option value="">Pilih Divisi</option>
                      {divisiList.map((d) => (
                        <option key={d.id} value={d.id}>{d.divisi}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">Gaji Pokok</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                      <input 
                        type="number" 
                        required
                        value={form.gaji_pokok}
                        onChange={(e) => setForm({...form, gaji_pokok: e.target.value})}
                        placeholder="0"
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-5 py-3.5 focus:border-cyan-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {error && <p className="text-rose-500 text-xs font-bold ml-1">{error}</p>}
                  
                  <div className="flex gap-2">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all disabled:opacity-50"
                    >
                      {loading ? "Processing..." : editingId ? "Update Jabatan" : "Simpan Jabatan"}
                    </button>
                    {editingId && (
                      <button 
                        type="button"
                        onClick={() => {setEditingId(null); setForm({jabatan:"", id_divisi:"", gaji_pokok:""})}}
                        className="bg-slate-200 dark:bg-white/10 px-6 rounded-2xl font-bold"
                      >
                        X
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Tabel Data Jabatan */}
            <div className="lg:col-span-8">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data Jabatan</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {jabatanList.length} Total Posisi
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Jabatan</th>
                        <th className="px-6 py-6 font-bold">Divisi</th>
                        <th className="px-6 py-6 font-bold">Gaji Pokok</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {jabatanList.length === 0 ? (
                        <tr><td colSpan={5} className="p-10 text-center text-slate-400">Belum ada data jabatan.</td></tr>
                      ) : (
                        jabatanList.map((item, index) => (
                          <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300">
                            <td className="px-6 py-6 font-bold text-slate-400">{index + 1}</td>
                            <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-200 uppercase">{item.jabatan}</td>
                            <td className="px-6 py-6">
                              <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold px-3 py-1.5 rounded-full text-slate-500 uppercase">
                                {getDivisiName(item.id_divisi)}
                              </span>
                            </td>
                            <td className="px-6 py-6 font-bold text-emerald-600 dark:text-emerald-400">
                              Rp {new Intl.NumberFormat("id-ID").format(item.gaji_pokok)}
                            </td>
                            <td className="px-6 py-6 pr-8">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-all">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
        </main>
      </div>
    </div>
  );
}