import { Suspense } from "react"
import { getWhiteLabelSettings } from "@/lib/supabase"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { WhiteLabelForm } from "@/app/dashboard/white-label/white-label-form"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function WhiteLabelPage() {
  // In a real app, you'd get the user ID from the session
  const userId = "current-user-id"
  const { data: settings, error } = await getWhiteLabelSettings(userId)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="White Label Settings"
        text="Customize the platform for your clients with your own branding."
      />
      <div className="grid gap-8">
        <Suspense fallback={<SettingsLoading />}>
          <WhiteLabelForm initialSettings={settings || {}} />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  )
}

