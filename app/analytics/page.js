import { Metadata } from "next"
import { SafeAnalyticsDashboard } from "@/components/analytics/safe-analytics-dashboard"

export const metadata = {
  title: "Analytics",
  description: "View your property analytics",
}

// Define generateStaticParams to ensure the page gets pre-rendered properly
export function generateStaticParams() {
  return []
}

export default function AnalyticsPage() {
  return <SafeAnalyticsDashboard />
}
