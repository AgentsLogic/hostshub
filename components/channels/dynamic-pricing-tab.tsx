"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DollarSign, TrendingUp, AlertCircle, Info, Calendar } from "lucide-react"
import { DayOfWeekPricing } from "./day-of-week-pricing"

export function DynamicPricingTab({ channelId }: { channelId: string }) {
  // State for dynamic pricing settings
  const [enableDynamicPricing, setEnableDynamicPricing] = useState(false)
  const [pricingStrategy, setPricingStrategy] = useState('balanced')
  const [autoApprove, setAutoApprove] = useState(false)
  const [minPriceAdjustment, setMinPriceAdjustment] = useState(5) // %
  const [maxPriceAdjustment, setMaxPriceAdjustment] = useState(25) // %
  const [minPrice, setMinPrice] = useState(100)
  const [maxPrice, setMaxPrice] = useState(500)
  const [syncFrequency, setSyncFrequency] = useState('daily')
  const [overrideChannelRules, setOverrideChannelRules] = useState(false)
  
  // Day of week pricing state
  const [dayOfWeekPricing, setDayOfWeekPricing] = useState({
    enabled: false,
    adjustmentType: 'percentage' as const,
    selectedTemplateId: 'weekend-boost',
    adjustments: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 10,
      saturday: 15,
      sunday: 5
    },
    customized: false
  })
  
  // Handle day of week pricing changes
  const handleDayOfWeekPricingChange = (newPricing: any) => {
    setDayOfWeekPricing(newPricing)
  }
  
  // Handle saving a new template
  const handleSaveTemplate = (template: any) => {
    // In a real app, this would save to the database
    console.log('Saving template:', template)
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Dynamic Pricing Integration
          </CardTitle>
          <CardDescription>
            Configure how dynamic pricing works with this channel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Dynamic Pricing */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Enable Dynamic Pricing</h3>
              <p className="text-xs text-muted-foreground">
                Automatically adjust prices based on demand, seasonality, and market conditions
              </p>
            </div>
            <Switch 
              checked={enableDynamicPricing} 
              onCheckedChange={setEnableDynamicPricing} 
            />
          </div>
          
          {enableDynamicPricing && (
            <>
              {/* Pricing Strategy */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pricing Strategy</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={pricingStrategy === "conservative" ? "default" : "outline"}
                    onClick={() => setPricingStrategy("conservative")}
                  >
                    Conservative
                  </Button>
                  <Button 
                    variant={pricingStrategy === "balanced" ? "default" : "outline"}
                    onClick={() => setPricingStrategy("balanced")}
                  >
                    Balanced
                  </Button>
                  <Button 
                    variant={pricingStrategy === "aggressive" ? "default" : "outline"}
                    onClick={() => setPricingStrategy("aggressive")}
                  >
                    Aggressive
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {pricingStrategy === "conservative" 
                    ? "Smaller price adjustments with focus on stability" 
                    : pricingStrategy === "balanced" 
                    ? "Moderate adjustments balancing revenue and occupancy" 
                    : "Larger adjustments to maximize revenue potential"}
                </p>
              </div>
              
              {/* Day of Week Pricing */}
              <Card className="border-dashed">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Day of Week Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <DayOfWeekPricing
                    basePrice={minPrice}
                    pricingData={dayOfWeekPricing}
                    onChange={handleDayOfWeekPricingChange}
                    onSaveTemplate={handleSaveTemplate}
                  />
                </CardContent>
              </Card>
              
              {/* Auto-Approve Settings */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Auto-Approve Price Changes</h3>
                    <p className="text-xs text-muted-foreground">
                      Automatically apply price recommendations without review
                    </p>
                  </div>
                  <Switch 
                    checked={autoApprove} 
                    onCheckedChange={setAutoApprove} 
                  />
                </div>
                
                {autoApprove && (
                  <div className="space-y-4 mt-4 p-4 border rounded-md">
                    <div>
                      <div className="flex items-center justify-between">
                        <Label>Minimum Price Change to Apply (%)</Label>
                        <span className="text-sm font-medium">{minPriceAdjustment}%</span>
                      </div>
                      <Slider 
                        value={[minPriceAdjustment]} 
                        onValueChange={(values) => setMinPriceAdjustment(values[0])} 
                        min={1} 
                        max={20}
                        step={1}
                        className="mt-2" 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1%</span>
                        <span>20%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between">
                        <Label>Maximum Price Change to Apply (%)</Label>
                        <span className="text-sm font-medium">{maxPriceAdjustment}%</span>
                      </div>
                      <Slider 
                        value={[maxPriceAdjustment]} 
                        onValueChange={(values) => setMaxPriceAdjustment(values[0])} 
                        min={5} 
                        max={50}
                        step={1}
                        className="mt-2" 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>5%</span>
                        <span>50%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Price Constraints */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Constraints</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Minimum Price ($)</Label>
                    <div className="flex items-center mt-2">
                      <span className="text-muted-foreground mr-2">$</span>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Maximum Price ($)</Label>
                    <div className="flex items-center mt-2">
                      <span className="text-muted-foreground mr-2">$</span>
                      <Input 
                        type="number" 
                        placeholder="1000" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sync Settings */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Sync Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Sync Frequency</Label>
                    <Select 
                      value={syncFrequency}
                      onValueChange={setSyncFrequency}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="override-rules"
                        checked={overrideChannelRules} 
                        onCheckedChange={setOverrideChannelRules}
                      />
                      <Label htmlFor="override-rules">Override Channel Rules</Label>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  When enabled, dynamic pricing rules will take precedence over channel-specific rules
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Insights
          </CardTitle>
          <CardDescription>
            Configure how market data is used for this channel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Use Competitor Pricing</h3>
              <p className="text-xs text-muted-foreground">
                Adjust prices based on competitor rates in your area
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Use Local Events</h3>
              <p className="text-xs text-muted-foreground">
                Adjust prices based on local events and demand drivers
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Use Seasonal Trends</h3>
              <p className="text-xs text-muted-foreground">
                Adjust prices based on historical seasonal patterns
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex gap-3">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-blue-800">Dynamic Pricing Integration</h3>
          <p className="text-xs text-blue-700 mt-1">
            Changes to dynamic pricing settings will take effect after the next sync. 
            You can view pricing recommendations in the Dynamic Pricing dashboard before they are applied.
          </p>
        </div>
      </div>
    </div>
  )
}
