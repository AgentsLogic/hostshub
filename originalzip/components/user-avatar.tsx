"use client"

import { useMockAuth } from "@/contexts/mock-auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserAvatar() {
  const { user } = useMockAuth()

  if (!user) {
    return null
  }

  // Get initials from name
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user.avatar} alt={user.name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}

