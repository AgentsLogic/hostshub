"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMockAuth } from "@/contexts/mock-auth-context"

export function LogoutButton() {
  const { logout } = useMockAuth()

  return (
    <Button variant="ghost" size="sm" onClick={logout} className="flex items-center gap-2">
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  )
}

