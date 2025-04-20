"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModernTemplate } from "@/app/templates/components/modern-template"
import { LuxuryTemplate } from "@/app/templates/components/luxury-template"
import { RusticTemplate } from "@/app/templates/components/rustic-template"

export function TemplatePreview({ templateId, templateType }: { templateId: string; templateType: string }) {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isCustomizing, setIsCustomizing] = useState(false)

  const renderTemplate = () => {
    switch (templateType.toLowerCase()) {
      case "modern":
        return <ModernTemplate isPreview={true} />
      case "luxury":
        return <LuxuryTemplate isPreview={true} />
      case "rustic":
        return <RusticTemplate isPreview={true} />
      default:
        return <div>Template not found</div>
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Template Preview</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsCustomizing(!isCustomizing)}>{isCustomizing ? "Cancel" : "Customize"}</Button>
          {isCustomizing && <Button>Save Changes</Button>}
        </div>
      </div>
      <Tabs defaultValue="preview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Template Preview</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("desktop")}
                  >
                    Desktop
                  </Button>
                  <Button
                    variant={viewMode === "tablet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("tablet")}
                  >
                    Tablet
                  </Button>
                  <Button
                    variant={viewMode === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("mobile")}
                  >
                    Mobile
                  </Button>
                </div>
              </div>
              <CardDescription>Preview how your website will look to visitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`
                border rounded-md mx-auto overflow-hidden transition-all duration-300
                ${viewMode === "desktop" ? "w-full" : ""}
                ${viewMode === "tablet" ? "w-[768px]" : ""}
                ${viewMode === "mobile" ? "w-[375px]" : ""}
              `}
              >
                {renderTemplate()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Settings</CardTitle>
              <CardDescription>Configure template settings</CardDescription>
            </CardHeader>
            <CardContent>{/* Template settings form */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Edit website content</CardDescription>
            </CardHeader>
            <CardContent>{/* Content management form */}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your website for search engines</CardDescription>
            </CardHeader>
            <CardContent>{/* SEO settings form */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TemplatePreview

