import type { Metadata } from "next"
import { WhiteLabelDashboard } from "@/components/white-label/white-label-dashboard"

export const metadata: Metadata = {
  title: "White Label Dashboard",
  description: "Manage your white label properties and settings",
}

export default function WhiteLabelPage() {
  return <WhiteLabelDashboard />
}

