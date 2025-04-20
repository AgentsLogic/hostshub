"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateWhiteLabelSettings } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { WhiteLabelSettings } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface WhiteLabelFormProps {
  initialSettings: Partial<WhiteLabelSettings>
}

export function WhiteLabelForm({ initialSettings }: WhiteLabelFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<Partial<WhiteLabelSettings>>({
    company_name: "",
    logo_url: "",
    primary_color: "#2E9D4E", // Default to our green
    secondary_color: "#4682B4", // Default to steel blue
    accent_color: "#F59E0B", // Default to amber
    font_family: "Inter, sans-serif",
    custom_domain: "",
    contact_email: "",
    contact_phone: "",
    custom_css: "",
    enable_white_label: false,
    ...initialSettings,
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, you'd get the user ID from the session
      const userId = "current-user-id"
      const { error } = await updateWhiteLabelSettings(userId, settings)

      if (error) {
        throw new Error(error.message)
      }

      toast({
        title: "Settings updated",
        description: "Your white label settings have been updated successfully.",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your white label settings could not be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Tabs defaultValue="branding">
        <TabsList className="mb-4">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="domain">Domain</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>Customize the look and feel of the platform for your clients.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={settings.company_name || ""}
                  onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                  placeholder="Your Company Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  value={settings.logo_url || ""}
                  onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                  placeholder="https://your-company.com/logo.png"
                />
                <p className="text-sm text-muted-foreground">
                  Enter the URL of your logo image. Recommended size: 200x50px.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="primary_color"
                      type="color"
                      value={settings.primary_color || "#2E9D4E"}
                      onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={settings.primary_color || "#2E9D4E"}
                      onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary_color">Secondary Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="secondary_color"
                      type="color"
                      value={settings.secondary_color || "#4682B4"}
                      onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={settings.secondary_color || "#4682B4"}
                      onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent_color">Accent Color</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="accent_color"
                      type="color"
                      value={settings.accent_color || "#F59E0B"}
                      onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={settings.accent_color || "#F59E0B"}
                      onChange={(e) => setSettings({ ...settings, accent_color: e.target.value })}
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font_family">Font Family</Label>
                <Input
                  id="font_family"
                  value={settings.font_family || "Inter, sans-serif"}
                  onChange={(e) => setSettings({ ...settings, font_family: e.target.value })}
                  placeholder="Inter, sans-serif"
                />
                <p className="text-sm text-muted-foreground">
                  Enter a valid CSS font-family value. Default: Inter, sans-serif.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle>Domain Settings</CardTitle>
              <CardDescription>Configure a custom domain for your white-labeled platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom_domain">Custom Domain</Label>
                <Input
                  id="custom_domain"
                  value={settings.custom_domain || ""}
                  onChange={(e) => setSettings({ ...settings, custom_domain: e.target.value })}
                  placeholder="properties.yourcompany.com"
                />
                <p className="text-sm text-muted-foreground">
                  Enter a domain or subdomain you own. You'll need to set up DNS records.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">DNS Configuration</h4>
                <p className="text-sm mb-2">To use your custom domain, add the following DNS records:</p>
                <div className="bg-background p-3 rounded border text-sm font-mono">
                  <p>Type: CNAME</p>
                  <p>Name: {settings.custom_domain?.split(".")[0] || "properties"}</p>
                  <p>Value: hostshub-custom.vercel.app</p>
                  <p>TTL: 3600</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Set the contact information displayed to your clients.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email || ""}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  placeholder="support@yourcompany.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone || ""}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Fine-tune your white-label experience with advanced options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="custom_css">Custom CSS</Label>
                <Textarea
                  id="custom_css"
                  value={settings.custom_css || ""}
                  onChange={(e) => setSettings({ ...settings, custom_css: e.target.value })}
                  placeholder="/* Add your custom CSS here */"
                  className="font-mono h-32"
                />
                <p className="text-sm text-muted-foreground">
                  Add custom CSS to further customize the appearance of your platform.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enable_white_label"
                  checked={settings.enable_white_label || false}
                  onCheckedChange={(checked) => setSettings({ ...settings, enable_white_label: checked })}
                />
                <Label htmlFor="enable_white_label">Enable White Labeling</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                When enabled, all HostsHub.ai branding will be replaced with your company's branding.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  )
}

