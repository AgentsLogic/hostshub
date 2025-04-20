"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"

export function ConnectVrboDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"connect" | "map" | "sync">("connect")
  const { toast } = useToast()
  const router = useRouter()

  async function handleConnect() {
    setIsLoading(true)
    try {
      // Initiate VRBO OAuth flow
      window.location.href = `https://api.vrbo.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${window.location.origin}/dashboard/channel-manager/vrbo/callback&response_type=code`
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate VRBO connection",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        {step === "connect" && (
          <>
            <DialogHeader>
              <DialogTitle>Connect VRBO Account</DialogTitle>
              <DialogDescription>
                Connect your VRBO account to sync properties and bookings
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="vrbo-account">VRBO Account Email</Label>
                <Input id="vrbo-account" placeholder="your@email.com" disabled />
              </div>
              <div className="space-y-2">
                <Label>Connection Method</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full" disabled>
                    API Key
                  </Button>
                  <Button className="w-full" onClick={handleConnect} disabled={isLoading}>
                    {isLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.vrbo className="mr-2 h-4 w-4" />
                    )}
                    OAuth Connection
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setStep("map")} disabled={isLoading}>
                Next
                <Icons.chevronRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "map" && (
          <>
            <DialogHeader>
              <DialogTitle>Map Your Properties</DialogTitle>
              <DialogDescription>
                Match your VRBO properties to existing listings or create new ones
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Property Mapping</Label>
                <div className="border rounded-md p-4">
                  <p className="text-sm text-muted-foreground">
                    VRBO properties will be listed here after connection
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Default Settings</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sync-calendar" className="h-4 w-4" />
                  <Label htmlFor="sync-calendar">Sync calendar automatically</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sync-pricing" className="h-4 w-4" />
                  <Label htmlFor="sync-pricing">Sync pricing automatically</Label>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep("connect")}>
                Back
              </Button>
              <Button onClick={() => setStep("sync")}>
                Next
                <Icons.chevronRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "sync" && (
          <>
            <DialogHeader>
              <DialogTitle>Sync Settings</DialogTitle>
              <DialogDescription>
                Configure how often your VRBO data should sync with HostsHub
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">Hourly</Button>
                  <Button variant="outline">Daily</Button>
                  <Button>Manual</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Initial Sync</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sync-bookings" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="sync-bookings">Import past bookings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sync-reviews" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="sync-reviews">Import reviews</Label>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep("map")}>
                Back
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Success",
                    description: "VRBO account connected successfully",
                  })
                  onOpenChange(false)
                  router.refresh()
                }}
              >
                Complete Setup
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
