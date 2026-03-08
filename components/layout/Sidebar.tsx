"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sub-komponen NavItem (Menu Utama/Parent)
const NavItem = ({ label, iconPath, href, isDropdown = false, isOpen = false, onClick }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const content = (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
        isActive ? "bg-[#00bcd4]/20 text-white" : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-4">
        <svg
          className={`w-6 h-6 ${isActive ? "text-[#00bcd4]" : "opacity-70 group-hover:opacity-100"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
        </svg>
        <span className={`font-medium text-lg ${isActive ? "text-white" : ""}`}>{label}</span>
      </div>
      
      {isDropdown && (
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "-rotate-90"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );

  return href && !isDropdown ? <Link href={href} className="no-underline">{content}</Link> : content;
};

// Sub-komponen SubItem
const SubItem = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="no-underline">
      <div className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer transition-colors group ${
        isActive ? "text-[#00bcd4]" : "text-slate-400 hover:text-white"
      }`}>
        <span className="text-[15px] font-medium tracking-wide">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    master: true,
    presensi: false,
    cuti: false,
    gaji: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="w-[280px] h-screen bg-[#073b5c] flex flex-col py-6 px-4 shrink-0 border-r border-white/5 overflow-hidden">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
          S
        </div>
        <div className="font-bold text-2xl text-white tracking-tight">
          SALARY<span className="text-[#00bcd4]">APP</span>
          <div className="text-[10px] text-slate-400 font-light tracking-[1px] -mt-1 uppercase">Payroll System</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="text-[11px] font-bold text-slate-400 px-4 mb-2 tracking-widest uppercase opacity-50">Main Menu</div>
        
        <NavItem
          href="/dashboard"
          label="Dashboard"
          iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />

        {/* --- DATA MASTER --- */}
        <div className="flex flex-col">
          <NavItem
            label="Data Master"
            isDropdown
            isOpen={openMenus.master}
            onClick={() => toggleMenu("master")}
            iconPath="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM4 7c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3M4 12c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3"
          />
          <div className={`grid transition-all duration-300 ease-in-out ${openMenus.master ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden flex flex-col ml-6 border-l border-white/10">
              <SubItem href="/divisi" label="Divisi" />
              <SubItem href="/jabatan" label="Jabatan" />
              <SubItem href="/karyawan" label="Karyawan" />
              <SubItem href="/user" label="User" />
              <SubItem href="/configurasi" label="Konfigurasi" />
            </div>
          </div>
        </div>

        {/* --- PRESENSI --- */}
        <div className="flex flex-col">
          <NavItem
            label="Presensi"
            isDropdown
            isOpen={openMenus.presensi}
            onClick={() => toggleMenu("presensi")}
            iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
          <div className={`grid transition-all duration-300 ease-in-out ${openMenus.presensi ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden flex flex-col ml-6 border-l border-white/10">
              <SubItem href="/presensi" label="Report Presensi" />
            </div>
          </div>
        </div>

        {/* --- CUTI --- */}
        <div className="flex flex-col">
          <NavItem
            label="Cuti"
            isDropdown
            isOpen={openMenus.cuti}
            onClick={() => toggleMenu("cuti")}
            iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <div className={`grid transition-all duration-300 ease-in-out ${openMenus.cuti ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden flex flex-col ml-6 border-l border-white/10">
              <SubItem href="/cuti" label="Report Cuti" />
            </div>
          </div>
        </div>

        {/* --- GAJI --- */}
        <div className="flex flex-col">
          <NavItem
            label="Gaji"
            isDropdown
            isOpen={openMenus.gaji}
            onClick={() => toggleMenu("gaji")}
            iconPath="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
          <div className={`grid transition-all duration-300 ease-in-out ${openMenus.gaji ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden flex flex-col ml-6 border-l border-white/10">
              <SubItem href="/proses-gaji" label="Proses Gaji" />
              <SubItem href="/report-gaji" label="Report Gaji" />
            </div>
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <Link href="/sign-in" className="flex items-center gap-4 px-4 py-3 text-[#ff4d6d] hover:bg-white/5 rounded-xl transition-all group no-underline font-bold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;