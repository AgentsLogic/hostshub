"use client"

import { useState } from "react"
import { WhiteLabelProvider } from "@/contexts/white-label-context"
import { WhiteLabelHeader } from "@/components/white-label-header"
import { WhiteLabelFooter } from "@/components/white-label-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { WhiteLabelSettings } from "@/lib/types"

interface WhiteLabelPreviewProps {
  settings: Partial<WhiteLabelSettings>
}

export function WhiteLabelPreview({ settings }: WhiteLabelPreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Preview</h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("desktop")}
          >
            Desktop
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

      <div
        className={`border rounded-lg overflow-hidden ${viewMode === "mobile" ? "max-w-[375px] mx-auto" : "w-full"}`}
      >
        <div className="bg-background">
          <WhiteLabelProvider initialSettings={settings}>
            <div className="flex flex-col min-h-[600px]">
              <WhiteLabelHeader />

              <main className="flex-1 p-4">
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold">Welcome to {settings.company_name || "Your Company"}</h1>
                  <p>This is a preview of your white-labeled platform.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Property Management</h3>
                        <p className="text-sm text-muted-foreground">Manage all your properties in one place.</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">Booking System</h3>
                        <p className="text-sm text-muted-foreground">Handle bookings and availability.</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center mt-4">
                    <Button>Get Started</Button>
                  </div>
                </div>
              </main>

              <WhiteLabelFooter />
            </div>
          </WhiteLabelProvider>
        </div>
      </div>
    </div>
  )
}

