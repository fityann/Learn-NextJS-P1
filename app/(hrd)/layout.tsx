import Sidebar from "@/components/layout/Sidebar"
import { ReactNode } from "react"
import Headers from "@/components/layout/Header"

export default function HRDLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-screen flex bg-slate-50 dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden">
      <Sidebar role="hrd" />

      <main className="flex flex-1 flex-col overflow-y-auto bg-slate-50 dark:bg-black">
        <Headers />
        {children}
      </main>
    </div>
  )
}