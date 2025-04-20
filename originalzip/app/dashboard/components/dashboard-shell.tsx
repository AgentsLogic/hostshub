import type { ReactNode } from "react"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return <div className="flex flex-col gap-8 p-4 md:p-8">{children}</div>
}

