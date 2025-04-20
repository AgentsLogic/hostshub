"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandingSettings } from "@/components/white-label/branding-settings"
import { DomainSettings } from "@/components/white-label/domain-settings"
import { EmailSettings } from "@/components/white-label/email-settings"

export function WhiteLabelDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">White Label Settings</h2>
        <div className="flex items-center space-x-2">
          <Button>Save Changes</Button>
        </div>
      </div>
      <Tabs defaultValue="branding" className="space-y-4">
        <TabsList>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>Customize the look and feel of your white label solution</CardDescription>
            </CardHeader>
            <CardContent>
              <BrandingSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="domains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Domain Settings</CardTitle>
              <CardDescription>Manage custom domains for your white label solution</CardDescription>
            </CardHeader>
            <CardContent>
              <DomainSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email settings for your white label solution</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WhiteLabelDashboard

