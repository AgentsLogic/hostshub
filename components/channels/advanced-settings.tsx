"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox" // Use Checkbox instead of raw input

interface AdvancedSettingsProps {
  // Define any props needed from the parent, if necessary
}

export function AdvancedSettings({}: AdvancedSettingsProps) {
  // Moved state from parent component
  const [syncBehavior, setSyncBehavior] = useState('full') // 'full' or 'incremental'
  const [errorHandling, setErrorHandling] = useState('strict') // 'strict' or 'lenient'
  const [debugLogging, setDebugLogging] = useState(false)
  const [validateResponses, setValidateResponses] = useState(true)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sync Behavior</CardTitle>
          <CardDescription>
            Configure how data synchronization operates for this channel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="syncMode">Sync Mode</Label>
            <Select
              value={syncBehavior}
              onValueChange={setSyncBehavior}
            >
              <SelectTrigger id="syncMode" className="mt-1">
                <SelectValue placeholder="Select sync mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Sync (Slower, more comprehensive)</SelectItem>
                <SelectItem value="incremental">Incremental Sync (Faster, syncs only changes)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Incremental sync is generally recommended for faster updates. Use Full Sync periodically or for troubleshooting.
            </p>
          </div>
          {/* Add other sync behavior settings if needed */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Error Handling</CardTitle>
          <CardDescription>
            Define how synchronization errors should be managed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="errorHandlingMode">Error Handling Mode</Label>
            <Select
              value={errorHandling}
              onValueChange={setErrorHandling}
            >
              <SelectTrigger id="errorHandlingMode" className="mt-1">
                <SelectValue placeholder="Select error handling mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strict">Strict (Fail entire sync on any error)</SelectItem>
                <SelectItem value="lenient">Lenient (Attempt to continue sync despite errors)</SelectItem>
              </SelectContent>
            </Select>
             <p className="text-xs text-muted-foreground mt-1">
              Strict mode ensures data integrity but may halt syncs. Lenient mode prioritizes continuity.
            </p>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="validateResponses"
              checked={validateResponses}
              onCheckedChange={(checked) => setValidateResponses(Boolean(checked))}
            />
            <Label htmlFor="validateResponses" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Validate API Responses
            </Label>
          </div>
           <p className="text-xs text-muted-foreground mt-1 pl-6">
              Enable extra checks on data received from the channel API (may slightly impact performance).
            </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debugging</CardTitle>
          <CardDescription>
            Options for troubleshooting connection or sync issues.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="debugLogging"
              checked={debugLogging}
              onCheckedChange={(checked) => setDebugLogging(Boolean(checked))}
            />
            <Label htmlFor="debugLogging" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Enable Detailed Debug Logging
            </Label>
          </div>
           <p className="text-xs text-muted-foreground mt-1 pl-6">
              Logs extensive details about sync operations. Only enable when requested by support or for debugging.
            </p>
        </CardContent>
      </Card>
    </div>
  )
}
