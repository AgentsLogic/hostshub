"use client";

import type { ReactNode } from "react";
// Removed Sidebar import
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header";
import { Footer } from "@/components/footer";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      {/* Removed grid layout and Sidebar component */}
      <div className="w-full"> 
        {/* <Sidebar className="overflow-y-auto" /> */}
        <div className="flex flex-col w-full">
          <DashboardHeader className="flex-none" />
          <main className="overflow-y-auto container py-[var(--page-padding)]">
            {children}
            <Footer className="mt-auto" />
          </main>
        </div>
      </div>
    </div>
  );
}
