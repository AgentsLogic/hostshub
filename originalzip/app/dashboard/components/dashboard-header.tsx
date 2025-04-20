import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-bold text-3xl md:text-4xl" style={{ color: "#4682B4" }}>
          {heading}
        </h1>
        {text && (
          <p className="text-lg" style={{ color: "#4A5568" }}>
            {text}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Link href="/dashboard/white-label">
          <Button variant="outline" className="hidden md:flex">
            White-Label Settings
          </Button>
        </Link>
        {children}
      </div>
    </div>
  )
}

