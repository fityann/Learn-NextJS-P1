"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  role?: "hrd" | "user";
};

type NavItemProps = {
  label: string;
  iconPath?: string;
  href?: string;
  isDropdown?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
};

const NavItem = ({
  label,
  iconPath,
  href,
  isDropdown = false,
  isOpen = false,
  onClick,
}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = href ? pathname.startsWith(href) : false;

  const content = (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
        isActive
          ? "bg-[#00bcd4]/20 text-white"
          : "text-slate-300 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-4">
        {iconPath && (
          <svg
            className={`w-6 h-6 shrink-0 transition-colors duration-300 ${
              isActive ? "text-[#00bcd4]" : "text-slate-400 group-hover:text-white"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={iconPath} />
          </svg>
        )}

        <span className={`font-medium text-lg ${isActive ? "text-white" : ""}`}>
          {label}
        </span>
      </div>

      {isDropdown && (
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "-rotate-90"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      )}
    </div>
  );

  if (href && !isDropdown) {
    return (
      <Link href={href} className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
};

const SubItem = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link href={href} className="no-underline">
      <div
        className={`flex items-center gap-4 px-4 py-2.5 cursor-pointer transition-colors ${
          isActive ? "text-[#00bcd4]" : "text-slate-400 hover:text-white"
        }`}
      >
        <span className="text-[15px] font-medium tracking-wide">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = ({ role = "hrd" }: SidebarProps) => {
  const base = role === "hrd" ? "/hrd" : "/user";

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    master: true,
    presensi: false,
    cuti: false,
    gaji: false,
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <aside className="w-[280px] h-screen bg-[#073b5c] flex flex-col py-6 px-4 shrink-0 border-r border-white/5 overflow-hidden">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 bg-[#00bcd4] rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg">
          S
        </div>

        <div className="font-bold text-2xl text-white tracking-tight">
          SALARY<span className="text-[#00bcd4]">APP</span>

          <div className="text-[10px] text-slate-400 font-light tracking-[1px] -mt-1 uppercase">
            Payroll System
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto pr-2">

        <div className="text-[11px] font-bold text-slate-400 px-4 mb-2 tracking-widest uppercase opacity-50">
          Main Menu
        </div>

        {/* DASHBOARD */}
        <NavItem
          href={`${base}/dashboard`}
          label="Dashboard"
          iconPath="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />

        {/* DATA MASTER (HRD ONLY) */}
        {role === "hrd" && (
          <div className="flex flex-col">
            <NavItem
              label="Data Master"
              isDropdown
              isOpen={openMenus.master}
              onClick={() => toggleMenu("master")}
              iconPath="M5 19V6a2 2 0 012-2h10a2 2 0 012 2v13M5 19a2 2 0 002 2h10a2 2 0 002-2M5 19h14M9 10h6M9 14h6"
            />

            {openMenus.master && (
              <div className="flex flex-col ml-6 border-l border-white/10">
                <SubItem href={`${base}/divisi`} label="Divisi" />
                <SubItem href={`${base}/jabatan`} label="Jabatan" />
                <SubItem href={`${base}/karyawan`} label="Karyawan" />
                <SubItem href={`${base}/user`} label="User" />
                <SubItem href={`${base}/configurasi`} label="Konfigurasi" />
              </div>
            )}
          </div>
        )}

        {/* PRESENSI */}
        <div className="flex flex-col">
          <NavItem
            label="Presensi"
            isDropdown
            isOpen={openMenus.presensi}
            onClick={() => toggleMenu("presensi")}
            iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />

          {openMenus.presensi && (
            <div className="flex flex-col ml-6 border-l border-white/10">
              {role === "hrd" && (
                <SubItem href={`${base}/presensi`} label="Report Presensi" />
              )}

              {role === "user" && (
                <SubItem href={`${base}/presensi/kehadiran`} label="Kehadiran" />
              )}
            </div>
          )}
        </div>

        {/* CUTI */}
        <div className="flex flex-col">
          <NavItem
            label="Cuti"
            isDropdown
            isOpen={openMenus.cuti}
            onClick={() => toggleMenu("cuti")}
            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />

          {openMenus.cuti && (
            <div className="flex flex-col ml-6 border-l border-white/10">

              {role === "hrd" && (
                <SubItem href={`${base}/cuti`} label="Report Cuti" />
              )}

              {role === "user" && (
                <>
                  <SubItem href={`${base}/cuti/pengajuan`} label="Form Pengajuan" />
                  <SubItem href={`${base}/cuti/riwayat`} label="Riwayat & Saldo Cuti" />
                </>
              )}
            </div>
          )}
        </div>

        {/* GAJI */}
        <div className="flex flex-col">
          <NavItem
            label="Gaji"
            isDropdown
            isOpen={openMenus.gaji}
            onClick={() => toggleMenu("gaji")}
            iconPath="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />

          {openMenus.gaji && (
            <div className="flex flex-col ml-6 border-l border-white/10">

              {role === "hrd" && (
                <>
                  <SubItem href={`${base}/proses-gaji`} label="Proses Gaji" />
                  <SubItem href={`${base}/report-gaji`} label="Report Gaji" />
                </>
              )}

              {role === "user" && (
                <SubItem href={`${base}/gaji/slip`} label="Slip Gaji" />
              )}

            </div>
          )}
        </div>
      </nav>

      {/* LOGOUT */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <Link
          href="/sign-in"
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user");
          }}
          className="flex items-center gap-4 px-4 py-3 text-[#ff4d6d] hover:bg-white/5 rounded-xl font-bold"
        >
          Logout
        </Link>
      </div>

    </aside>
  );
};

export default Sidebar;