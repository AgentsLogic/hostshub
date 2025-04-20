"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header";
import { Footer } from "@/components/footer";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full">
      <div className="grid grid-cols-[auto_1fr] w-full">
        <Sidebar className="overflow-y-auto" />
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
