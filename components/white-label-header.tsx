"use client"

import Link from "next/link"
import { useWhiteLabel } from "@/contexts/white-label-context"
import { Home } from "lucide-react"

export function WhiteLabelHeader() {
  const { isWhiteLabeled, companyName, logoUrl } = useWhiteLabel()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          {logoUrl ? (
            <img src={logoUrl || "/placeholder-logo.png"} alt={companyName} className="h-8" />
          ) : (
            <Home className="h-6 w-6 text-primary" />
          )}
          <span>{companyName}</span>
        </Link>

        {/* Rest of your header content */}
      </div>
    </header>
  )
}
