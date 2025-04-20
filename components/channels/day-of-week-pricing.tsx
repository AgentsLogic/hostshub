"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  Info,
  Save,
  RefreshCw,
} from "lucide-react"

// Types
export interface DayOfWeekPricing {
  enabled: boolean;
  adjustmentType: 'percentage' | 'fixed';
  selectedTemplateId?: string;
  adjustments: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  customized: boolean;
}

export interface PricingTemplate {
  id: string;
  name: string;
  description: string;
  propertyTypes: string[];
  adjustmentType: 'percentage' | 'fixed';
  adjustments: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  icon?: string;
}

// Predefined templates
const pricingTemplates: PricingTemplate[] = [
  {
    id: 'weekend-boost',
    name: 'Weekend Boost',
    description: 'Higher rates on weekends, standard rates on weekdays',
    propertyTypes: ['All'],
    adjustmentType: 'percentage',
    adjustments: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 10,
      saturday: 15,
      sunday: 5
    }
  },
  {
    id: 'business-district',
    name: 'Business District',
    description: 'Higher rates on weekdays, lower rates on weekends',
    propertyTypes: ['Apartment', 'Condo'],
    adjustmentType: 'percentage',
    adjustments: {
      monday: 10,
      tuesday: 10,
      wednesday: 10,
      thursday: 10,
      friday: -5,
      saturday: -10,
      sunday: -5
    }
  },
  {
    id: 'beach-resort',
    name: 'Beach/Resort',
    description: 'Significantly higher weekend rates, discounted weekdays',
    propertyTypes: ['House', 'Villa', 'Cottage'],
    adjustmentType: 'percentage',
    adjustments: {
      monday: -15,
      tuesday: -15,
      wednesday: -15,
      thursday: -5,
      friday: 15,
      saturday: 25,
      sunday: 10
    }
  },
  {
    id: 'balanced',
    name: 'Balanced Week',
    description: 'Even pricing throughout the week',
    propertyTypes: ['All'],
    adjustmentType: 'percentage',
    adjustments: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
    }
  }
];

// Default pricing data
const defaultPricingData: DayOfWeekPricing = {
  enabled: false,
  adjustmentType: 'percentage',
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
};

interface DayOfWeekPricingProps {
  basePrice: number;
  pricingData?: DayOfWeekPricing;
  onChange: (data: DayOfWeekPricing) => void;
  onSaveTemplate?: (template: Omit<PricingTemplate, 'id'>) => void;
}

export function DayOfWeekPricing({
  basePrice = 100,
  pricingData = defaultPricingData,
  onChange,
  onSaveTemplate
}: DayOfWeekPricingProps) {
  const [pricing, setPricing] = useState<DayOfWeekPricing>(pricingData);
  const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDescription, setNewTemplateDescription] = useState('');
  
  // Update local state when props change
  useEffect(() => {
    setPricing(pricingData);
  }, [pricingData]);
  
  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = pricingTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    setPricing({
      ...pricing,
      selectedTemplateId: templateId,
      adjustmentType: template.adjustmentType,
      adjustments: { ...template.adjustments },
      customized: false
    });
    
    onChange({
      ...pricing,
      selectedTemplateId: templateId,
      adjustmentType: template.adjustmentType,
      adjustments: { ...template.adjustments },
      customized: false
    });
  };
  
  // Handle adjustment type change
  const handleAdjustmentTypeChange = (type: 'percentage' | 'fixed') => {
    setPricing({
      ...pricing,
      adjustmentType: type,
      customized: true
    });
    
    onChange({
      ...pricing,
      adjustmentType: type,
      customized: true
    });
  };
  
  // Handle day adjustment change
  const handleDayAdjustmentChange = (day: keyof typeof pricing.adjustments, value: number) => {
    const newAdjustments = {
      ...pricing.adjustments,
      [day]: value
    };
    
    setPricing({
      ...pricing,
      adjustments: newAdjustments,
      customized: true
    });
    
    onChange({
      ...pricing,
      adjustments: newAdjustments,
      customized: true
    });
  };
  
  // Handle enable/disable toggle
  const handleEnableToggle = (enabled: boolean) => {
    setPricing({
      ...pricing,
      enabled
    });
    
    onChange({
      ...pricing,
      enabled
    });
  };
  
  // Handle save as template
  const handleSaveTemplate = () => {
    if (!newTemplateName.trim() || !onSaveTemplate) return;
    
    const newTemplate: Omit<PricingTemplate, 'id'> = {
      name: newTemplateName.trim(),
      description: newTemplateDescription.trim() || 'Custom template',
      propertyTypes: ['All'],
      adjustmentType: pricing.adjustmentType,
      adjustments: { ...pricing.adjustments }
    };
    
    onSaveTemplate(newTemplate);
    setShowSaveTemplateDialog(false);
    setNewTemplateName('');
    setNewTemplateDescription('');
  };
  
  // Reset to template defaults
  const handleResetToTemplate = () => {
    if (!pricing.selectedTemplateId) return;
    
    const template = pricingTemplates.find(t => t.id === pricing.selectedTemplateId);
    if (!template) return;
    
    setPricing({
      ...pricing,
      adjustmentType: template.adjustmentType,
      adjustments: { ...template.adjustments },
      customized: false
    });
    
    onChange({
      ...pricing,
      adjustmentType: template.adjustmentType,
      adjustments: { ...template.adjustments },
      customized: false
    });
  };
  
  // Calculate adjusted prices
  const calculateAdjustedPrices = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
    
    return days.reduce((prices, day) => {
      if (pricing.adjustmentType === 'percentage') {
        prices[day] = Math.round(basePrice * (1 + pricing.adjustments[day] / 100));
      } else {
        prices[day] = basePrice + pricing.adjustments[day];
      }
      return prices;
    }, {} as Record<typeof days[number], number>);
  };
  
  // Calculate weekly revenue
  const calculateWeeklyRevenue = (prices: Record<string, number>) => {
    return Object.values(prices).reduce((sum, price) => sum + price, 0);
  };
  
  // Get current template
  const currentTemplate = pricingTemplates.find(t => t.id === pricing.selectedTemplateId);
  
  // Calculate prices and revenue
  const adjustedPrices = calculateAdjustedPrices();
  const weeklyRevenue = calculateWeeklyRevenue(adjustedPrices);
  const flatRevenue = basePrice * 7;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">Day of Week Pricing</CardTitle>
              <Badge variant={pricing.enabled ? "default" : "outline"}>
                {pricing.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <Switch 
              checked={pricing.enabled} 
              onCheckedChange={handleEnableToggle}
            />
          </div>
          <CardDescription>
            Set different prices for different days of the week to optimize revenue
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Pricing Template</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSaveTemplateDialog(true)}
                  disabled={!pricing.customized}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save as Template
                </Button>
              </div>
            </div>
            
            <Select
              value={pricing.selectedTemplateId}
              onValueChange={handleTemplateSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {pricingTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {currentTemplate && (
              <p className="text-sm text-muted-foreground">
                {currentTemplate.description}
              </p>
            )}
          </div>
          
          {/* Day Adjustment Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Day Adjustments</h3>
              <Select
                value={pricing.adjustmentType}
                onValueChange={(value) => handleAdjustmentTypeChange(value as 'percentage' | 'fixed')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Adjustment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {/* Monday */}
              <div className="space-y-2">
                <Label>Monday</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={pricing.adjustments.monday}
                    onChange={(e) => handleDayAdjustmentChange('monday', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    {pricing.adjustmentType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  ${adjustedPrices.monday}
                </p>
              </div>
              
              {/* Tuesday */}
              <div className="space-y-2">
                <Label>Tuesday</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={pricing.adjustments.tuesday}
                    onChange={(e) => handleDayAdjustmentChange('tuesday', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    {pricing.adjustmentType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  ${adjustedPrices.tuesday}
                </p>
              </div>
              
              {/* Wednesday */}
              <div className="space-y-2">
                <Label>Wednesday</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={pricing.adjustments.wednesday}
                    onChange={(e) => handleDayAdjustmentChange('wednesday', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    {pricing.adjustmentType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  ${adjustedPrices.wednesday}
                </p>
              </div>
              
              {/* Thursday */}
              <div className="space-y-2">
                <Label>Thursday</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={pricing.adjustments.thursday}
                    onChange={(e) => handleDayAdjustmentChange('thursday', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    {pricing.adjustmentType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  ${adjustedPrices.thursday}
                </p>
              </div>
              
              {/* Friday */}
              <div className="space-y-2">
                <Label>Friday</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={pricing.adjustments.friday}
                    onChange={(e) => handleDayAdjustmentChange('friday', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    {pricing.adjustmentType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  ${adjustedPrices.friday}
                </p>
              </div>
              
              {/* Saturday */}
              <div className="space-y-2">
                <Label>Saturday</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={pricing.adjustments.saturday}
                    onChange={(e) => handleDayAdjustmentChange('saturday', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    {pricing.adjustmentType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  ${adjustedPrices.saturday}
                </p>
              </div>
              
              {/* Sunday */}
              <div className="space-y-2">
                <Label>Sunday</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={pricing.adjustments.sunday}
                    onChange={(e) => handleDayAdjustmentChange('sunday', Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm font-medium">
                    {pricing.adjustmentType === 'percentage' ? '%' : '$'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  ${adjustedPrices.sunday}
                </p>
              </div>
            </div>
          </div>
          
          {/* Preview */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="text-sm font-medium">Preview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">Base price: ${basePrice}</p>
                <p className="text-sm">Weekly revenue: ${weeklyRevenue}</p>
              </div>
              <div>
                <p className="text-sm">Flat pricing revenue: ${flatRevenue}</p>
                <p className="text-sm">Difference: ${weeklyRevenue - flatRevenue} ({((weeklyRevenue / flatRevenue) - 1) * 100}%)</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetToTemplate}
                disabled={!pricing.customized}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset to Template
              </Button>
            </div>
          </div>
          
          {/* Save Template Dialog */}
          {showSaveTemplateDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Save as Template</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                      placeholder="My Custom Template"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template-description">Description (Optional)</Label>
                    <Input
                      id="template-description"
                      value={newTemplateDescription}
                      onChange={(e) => setNewTemplateDescription(e.target.value)}
                      placeholder="Description of this template"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowSaveTemplateDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveTemplate}>
                      Save Template
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
