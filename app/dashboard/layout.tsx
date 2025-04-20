"use client";

import Link from "next/link"
import { NavLink } from "@/components/nav-link"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainHeader } from "@/components/main-header"
import { Footer } from "@/components/footer"
import { Menu } from "lucide-react"
import { Logo } from "@/components/logo";
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header";
import React, { useState } from "react";
import { AuthProvider } from "@/contexts/auth-context"; // Import AuthProvider

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:block`}
      >
        <div className="h-full py-4 px-3">
          <div className="px-2 mb-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:underline underline-offset-4">
              <Logo />
            </Link>
          </div>
          <nav className="space-y-1">
            <NavLink href="/dashboard" exact icon="LayoutDashboard">Dashboard</NavLink>
            <NavLink href="/dashboard/properties" icon="Home">Properties</NavLink>
            <NavLink href="/dashboard/websites" icon="Globe">Websites</NavLink>
            <NavLink href="/dashboard/channel-manager" icon="Layers">Channel Manager</NavLink>
            <NavLink href="/dashboard/bookings" icon="Calendar">Bookings</NavLink>
            <NavLink href="/dashboard/communications" icon="MessageSquare">Communications</NavLink>
            <NavLink href="/dashboard/analytics" icon="BarChart">Analytics</NavLink>
            <NavLink href="/dashboard/financial" icon="DollarSign">Financial</NavLink>
            <NavLink href="/dashboard/smart-insights" icon="Lightbulb">Smart Insights</NavLink>
            <NavLink href="/dashboard/billing" icon="CreditCard">Billing</NavLink>
            <NavLink href="/dashboard/team" icon="Users">Team</NavLink>
            <NavLink href="/dashboard/settings" icon="Settings">Settings</NavLink>
          </nav>
        </div>
      </aside>

      {/* Content area with header and footer */}
      <div className="flex flex-col min-h-screen w-full md:ml-64">
        <div className="flex items-center justify-between border-b px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md border hover:bg-muted transition"
            aria-label="Toggle navigation"
            aria-expanded={sidebarOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold">Menu</span>
        </div>
        <AuthProvider> {/* Wrap content with AuthProvider */}
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </AuthProvider>
      </div>
    </div>
  )
}
