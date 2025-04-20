"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export default function TestDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Show toast and redirect to dashboard
    toast({
      title: "Test Mode",
      description: "Redirecting to dashboard in test mode...",
    })

    // Redirect to dashboard
    router.push("/dashboard")
  }, [router, toast])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Redirecting to dashboard...</p>
    </div>
  )
}

