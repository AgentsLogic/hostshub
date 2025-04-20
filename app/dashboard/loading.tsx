import { DashboardSkeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="container py-6 space-y-6">
      <div className="h-8 w-48 skeleton mb-4" />
      <DashboardSkeleton />
    </div>
  )
}
