"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface RatesPricingSettingsProps {
  // Define any props needed from the parent, if necessary
  // For now, manage state locally within this component
}

export function RatesPricingSettings({}: RatesPricingSettingsProps) {
  // Moved state from parent component
  const [currency, setCurrency] = useState('USD ($)')
  const [baseRate, setBaseRate] = useState(100)
  const [seasonalRates, setSeasonalRates] = useState<any[]>([]) // Use a more specific type if available
  const [discounts, setDiscounts] = useState<any[]>([]) // Use a more specific type if available
  const [fees, setFees] = useState({
    cleaning: 50,
    securityDeposit: 200
  })

  // Basic validation for numeric inputs
  const handleNumericChange = (setter: (value: number) => void, value: string) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      setter(num);
    }
  };

  const handleFeeChange = (key: keyof typeof fees, value: string) => {
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      setFees(prev => ({ ...prev, [key]: num }));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Base Pricing</CardTitle>
          <CardDescription>
            Set your default nightly rates and currency for this channel
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={currency}
              onValueChange={setCurrency}
            >
              <SelectTrigger id="currency" className="mt-1">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD ($)">USD ($)</SelectItem>
                <SelectItem value="EUR (€)">EUR (€)</SelectItem>
                <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                {/* Add more currencies as needed */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="baseRate">Default Nightly Rate</Label>
            <Input
              id="baseRate"
              type="number"
              className="mt-1"
              value={baseRate}
              onChange={(e) => handleNumericChange(setBaseRate, e.target.value)}
              min="0"
              step="1"
              placeholder="e.g., 150"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Seasonal Pricing Adjustments</CardTitle>
          <CardDescription>
            Define specific date ranges with adjusted pricing (e.g., high season, holidays)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for seasonal rates list */}
          {seasonalRates.length === 0 && (
            <div className="text-center text-muted-foreground py-4 border border-dashed rounded-md">
              No seasonal pricing rules added yet.
            </div>
          )}
          {/* Add logic here to display and manage seasonalRates */}
          <div className="mt-4">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Seasonal Pricing Rule
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Fees</CardTitle>
          <CardDescription>
            Set standard fees like cleaning or security deposits for this channel
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="cleaningFee">Cleaning Fee</Label>
            <Input
              id="cleaningFee"
              type="number"
              className="mt-1"
              value={fees.cleaning}
              onChange={(e) => handleFeeChange('cleaning', e.target.value)}
              min="0"
              step="1"
              placeholder="e.g., 50"
            />
          </div>
          <div>
            <Label htmlFor="securityDeposit">Security Deposit</Label>
            <Input
              id="securityDeposit"
              type="number"
              className="mt-1"
              value={fees.securityDeposit}
              onChange={(e) => handleFeeChange('securityDeposit', e.target.value)}
              min="0"
              step="1"
              placeholder="e.g., 200"
            />
          </div>
          {/* Add more fee types if needed */}
        </CardContent>
      </Card>

      {/* Placeholder for Discounts section */}
      <Card>
        <CardHeader>
          <CardTitle>Discounts</CardTitle>
          <CardDescription>
            Configure length-of-stay or promotional discounts (optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-4 border border-dashed rounded-md">
            Discount configuration coming soon.
          </div>
           {/* Add logic here to display and manage discounts */}
           <div className="mt-4">
             <Button variant="outline" disabled>
               <Plus className="mr-2 h-4 w-4" />
               Add Discount Rule
             </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
