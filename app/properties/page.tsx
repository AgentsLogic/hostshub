import type { Metadata } from "next"
import { PropertiesDashboard } from "@/components/properties/properties-dashboard"

export const metadata: Metadata = {
  title: "Properties",
  description: "Manage your properties",
}

export default function PropertiesPage() {
  return <PropertiesDashboard />
}

