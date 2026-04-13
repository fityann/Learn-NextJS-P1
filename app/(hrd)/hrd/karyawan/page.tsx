"use client";

import React, { useState, useEffect } from "react";

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean;
  jabatan?: { jabatan: string }; // Relasi dari API
}

interface Jabatan {
  id: number;
  jabatan: string;
}

export default function KaryawanPage() {
  // State Data
  const [dataKaryawan, setDataKaryawan] = useState<Karyawan[]>([]);
  const [dataJabatan, setDataJabatan] = useState<Jabatan[]>([]);
  
  // State Form
  const [form, setForm] = useState({
    nik: "",
    nama: "",
    email: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    id_jabatan: "",
    status_aktif: "1", // 1 untuk true, 0 untuk false
  });

  // State UI
  const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const [resKaryawan, resJabatan] = await Promise.all([
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", { headers }),
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", { headers })
      ]);

      const jsonKaryawan = await resKaryawan.json();
      const jsonJabatan = await resJabatan.json();

      setDataKaryawan(jsonKaryawan.data || jsonKaryawan);
      setDataJabatan(jsonJabatan.data || jsonJabatan);
    } catch (err) {
      setError("Gagal mengambil data dari server.");
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

    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          ...form,
          id_jabatan: parseInt(form.id_jabatan),
          status_aktif: form.status_aktif === "1"
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data karyawan.");

      setForm({ nik: "", nama: "", email: "", tempat_lahir: "", tanggal_lahir: "", alamat: "", id_jabatan: "", status_aktif: "1" });
      fetchData();
      alert("Karyawan berhasil ditambahkan!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus karyawan ini?")) return;
    try {
      await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert("Gagal menghapus data.");
    }
  };

  const openDetail = (karyawan: Karyawan) => {
    setSelectedKaryawan(karyawan);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden font-sans">
      <div className="flex flex-1 flex-col overflow-y-auto relative">
        <main className="p-8">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-extrabold tracking-tight">Management Karyawan</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Manage employee records and information.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Tambah Karyawan */}
            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] p-8 border border-slate-200 dark:border-white/5 shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 text-xl font-bold">+</div>
                  <h3 className="text-xl font-bold">Tambah Karyawan</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">NIK</label>
                      <input type="text" required value={form.nik} onChange={(e) => setForm({...form, nik: e.target.value})} placeholder="NIK" className="input-style" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">Nama</label>
                      <input type="text" required value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} placeholder="Nama Lengkap" className="input-style" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="email@company.com" className="input-style" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">Tempat Lahir</label>
                      <input type="text" required value={form.tempat_lahir} onChange={(e) => setForm({...form, tempat_lahir: e.target.value})} placeholder="Kota" className="input-style" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">Tanggal Lahir</label>
                      <input type="date" required value={form.tanggal_lahir} onChange={(e) => setForm({...form, tanggal_lahir: e.target.value})} className="input-style" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Alamat</label>
                    <textarea required value={form.alamat} onChange={(e) => setForm({...form, alamat: e.target.value})} placeholder="Alamat Lengkap" rows={3} className="input-style resize-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">Jabatan</label>
                      <select required value={form.id_jabatan} onChange={(e) => setForm({...form, id_jabatan: e.target.value})} className="input-style appearance-none cursor-pointer">
                        <option value="">Pilih Jabatan</option>
                        {dataJabatan.map((j) => (
                          <option key={j.id} value={j.id}>{j.jabatan}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">Status Aktif</label>
                      <select value={form.status_aktif} onChange={(e) => setForm({...form, status_aktif: e.target.value})} className="input-style appearance-none cursor-pointer">
                        <option value="1">Aktif</option>
                        <option value="0">Non-Aktif</option>
                      </select>
                    </div>
                  </div>

                  {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

                  <button disabled={loading} className="w-full bg-[#005a8d] hover:bg-[#0077b6] text-white font-bold py-4 rounded-2xl shadow-lg transition-all mt-4 active:scale-95 disabled:opacity-50">
                    {loading ? "Menyimpan..." : "Simpan Karyawan"}
                  </button>
                </form>
              </div>
            </div>

            {/* Tabel Data Karyawan */}
            <div className="lg:col-span-7">
              <div className="rounded-[32px] bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden transition-all">
                <div className="p-8 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                  <h3 className="text-xl font-bold">Data Karyawan</h3>
                  <span className="bg-cyan-500/10 text-cyan-600 text-[11px] font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                    ● {dataKaryawan.length} Items Total
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-slate-400 text-[12px] uppercase tracking-widest bg-slate-50/50 dark:bg-transparent">
                        <th className="px-6 py-6 font-bold">No</th>
                        <th className="px-6 py-6 font-bold">Nama</th>
                        <th className="px-6 py-6 font-bold">Jabatan</th>
                        <th className="px-6 py-6 font-bold">Status</th>
                        <th className="px-6 py-6 font-bold text-right pr-8">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {dataKaryawan.map((item, index) => (
                        <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-all duration-300">
                          <td className="px-6 py-6 font-bold text-slate-400">{index + 1}</td>
                          <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-100">{item.nama}</td>
                          <td className="px-6 py-6">
                            <span className="bg-slate-100 dark:bg-white/5 border border-slate-200 text-[10px] font-bold px-3 py-1.5 rounded-full text-slate-500 uppercase">
                              {dataJabatan.find(j => j.id === item.id_jabatan)?.jabatan || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${item.status_aktif ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border-rose-500/20'}`}>
                              {item.status_aktif ? "AKTIF" : "NON-AKTIF"}
                            </span>
                          </td>
                          <td className="px-6 py-6 pr-8 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button onClick={() => openDetail(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              </button>
                              <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* MODAL DETAILED VIEW */}
        {isModalOpen && selectedKaryawan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-[480px] bg-white dark:bg-[#0f0f0f] rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 animate-in fade-in zoom-in duration-300">
              <div className="bg-gradient-to-r from-[#003d5e] to-[#005a8d] p-8 relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 h-8 w-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">✕</button>
                <h3 className="text-2xl font-bold text-white">{selectedKaryawan.nama}</h3>
                <p className="text-white/70 font-medium">{dataJabatan.find(j => j.id === selectedKaryawan.id_jabatan)?.jabatan}</p>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">NIK</p>
                    <p className="font-bold">{selectedKaryawan.nik}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status</p>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${selectedKaryawan.status_aktif ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {selectedKaryawan.status_aktif ? "AKTIF" : "NON-AKTIF"}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email</p>
                  <p className="text-sm font-medium">{selectedKaryawan.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Birth Info</p>
                  <p className="text-sm font-bold">{selectedKaryawan.tempat_lahir}, {selectedKaryawan.tanggal_lahir}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Home Address</p>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl italic text-sm">"{selectedKaryawan.alamat}"</div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-white/5 border font-bold text-sm">Close Detailed View</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          background-color: transparent;
          border: 1px solid rgba(203, 213, 225, 0.5);
          border-radius: 1rem;
          padding: 0.875rem 1.25rem;
          color: inherit;
          transition: all 0.3s;
        }
        :global(.dark) .input-style {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        .input-style:focus {
          outline: none;
          border-color: #06b6d4;
          box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
        }
      `}</style>
    </div>
  );
}