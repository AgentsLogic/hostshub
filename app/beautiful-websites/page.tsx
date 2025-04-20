"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutTemplate } from "lucide-react"

export default function BeautifulWebsitesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Beautiful Websites</h1>
        <p className="text-muted-foreground">
          Create stunning, custom websites for each of your properties with our easy-to-use templates and design tools.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutTemplate className="h-5 w-5 text-primary" />
              Feature Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Professional templates designed for vacation rentals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Mobile-optimized designs that look great on any device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Easy customization with no coding required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Integrated booking system</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>SEO optimized to help guests find your properties</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Website Preview</span>
              </div>
            </CardContent>
          </Card>
          <Button className="w-full">
            Get Started with Beautiful Websites
          </Button>
        </div>
      </div>
    </div>
  )
}
