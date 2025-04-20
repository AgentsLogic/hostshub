import type { Metadata } from "next"
import { TemplatesDashboard } from "@/components/templates/templates-dashboard"

export const metadata: Metadata = {
  title: "Templates",
  description: "Browse and select website templates for your properties",
}

export default function TemplatesPage() {
  return <TemplatesDashboard />
}

