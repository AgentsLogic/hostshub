"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

interface NavLinkProps {
  href: string
  icon: keyof typeof Icons
  children: React.ReactNode
  exact?: boolean
}

export function NavLink({ href, icon, children, exact = false }: NavLinkProps) {
  const pathname = usePathname()
  const Icon = Icons[icon]
  const isActive = exact ? pathname === href : pathname.startsWith(href)
  
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center w-full rounded-md px-3 py-2 text-sm font-medium",
        "transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
        "cursor-pointer select-none touch-none"
      )}
    >
      <Icon className="mr-2 h-4 w-4 shrink-0" />
      <span className="truncate">{children}</span>
    </Link>
  )
}

