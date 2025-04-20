import type { Metadata } from "next"
import { SettingsDashboard } from "@/components/settings/settings-dashboard"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return <SettingsDashboard />
}

