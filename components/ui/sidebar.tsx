"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { DashboardNav } from "@/app/dashboard/components/dashboard-nav"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn("flex flex-col bg-background w-64 shrink-0", className)}>
      <div className="px-4 py-4 border-b">
        <Link href="/dashboard" className="flex items-center">
          <span className="font-semibold text-xl">HostsHub.ai</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <DashboardNav />
      </div>
    </aside>
  )
}
