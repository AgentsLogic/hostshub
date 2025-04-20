"use client"

import Link from "next/link"
import { useWhiteLabel } from "@/contexts/white-label-context"
import { Home } from "lucide-react"

export function WhiteLabelFooter() {
  const { isWhiteLabeled, companyName, logoUrl } = useWhiteLabel()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <div className="container flex flex-col gap-6 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              {logoUrl ? (
                <img src={logoUrl || "/placeholder-logo.png"} alt={companyName} className="h-8" />
              ) : (
                <Home className="h-6 w-6 text-primary" />
              )}
              <span>{companyName}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {isWhiteLabeled ? `Powered by ${companyName}` : "Showcasing your properties with style since 2023."}
            </p>
          </div>

          {/* Rest of your footer content */}
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>

          {/* Social links */}
        </div>
      </div>
    </footer>
  )
}
