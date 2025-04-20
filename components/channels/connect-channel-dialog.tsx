"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ConnectChannelDialog() {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Connect Channel</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect a New Channel</DialogTitle>
          <DialogDescription>Connect your properties to distribution channels to expand your reach.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="popular" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="popular">Popular Channels</TabsTrigger>
            <TabsTrigger value="custom">Custom Channel</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <img src="/placeholder.svg?height=32&width=32" alt="Airbnb" className="h-8 w-8" />
                Airbnb
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <img src="/placeholder.svg?height=32&width=32" alt="Booking.com" className="h-8 w-8" />
                Booking.com
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <img src="/placeholder.svg?height=32&width=32" alt="VRBO" className="h-8 w-8" />
                VRBO
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <img src="/placeholder.svg?height=32&width=32" alt="Expedia" className="h-8 w-8" />
                Expedia
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="channel-name">Channel Name</Label>
                <Input id="channel-name" placeholder="Enter channel name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel-type">Channel Type</Label>
                <Select>
                  <SelectTrigger id="channel-type">
                    <SelectValue placeholder="Select channel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api">API Integration</SelectItem>
                    <SelectItem value="ical">iCal Sync</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" placeholder="Enter API key" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

