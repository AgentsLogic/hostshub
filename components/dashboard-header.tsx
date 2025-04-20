"use client"

import { UserNav } from "./user-nav"
import { ThemeToggle } from "./theme-toggle"
import { Search } from "./search"

export function DashboardHeader() {
  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1">
          <Search />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}