import type { Metadata } from "next"
import { TemplatePreview } from "@/components/templates/template-preview"

export const metadata: Metadata = {
  title: "Template Preview",
  description: "Preview and customize your selected template",
}

export default function TemplatePreviewPage({ params }: { params: { id: string } }) {
  return <TemplatePreview templateId={params.id} />
}

