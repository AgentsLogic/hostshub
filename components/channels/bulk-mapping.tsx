"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  AlertCircle, 
  Check, 
  Filter, 
  Plus, 
  Trash2,
  ArrowRight,
  Loader2,
  RefreshCw
} from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Types
interface Property {
  id: number
  name: string
  type: string
  location: string
  image: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  amenities: string[]
  status?: 'mapped' | 'unmapped' | 'error'
  channelId?: string
  selected?: boolean
}

interface ChannelProperty {
  id: string
  name: string
  type: string
  location: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
}

interface BulkMappingProps {
  channelName: string
  properties: Property[]
  onSave: (mappings: {propertyId: number, channelPropertyId: string}[]) => void
  onCancel: () => void
}

export function BulkMapping({ channelName, properties, onSave, onCancel }: BulkMappingProps) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>(
    properties.filter(p => p.status === 'unmapped')
  )
  const [mappingInProgress, setMappingInProgress] = useState(false)
  const [mappingProgress, setMappingProgress] = useState(0)
  const [mappingResults, setMappingResults] = useState<{
    success: number;
    failed: number;
    total: number;
  }>({ success: 0, failed: 0, total: 0 })
  const [mappings, setMappings] = useState<{propertyId: number, channelPropertyId: string}[]>([])
  
  // Mock channel properties that could be fetched from the channel API
  const [channelProperties, setChannelProperties] = useState<ChannelProperty[]>([
    { id: 'CH001', name: 'Beachfront Villa', type: 'Villa', location: 'California', bedrooms: 3, bathrooms: 2, maxGuests: 6 },
    { id: 'CH002', name: 'Mountain Retreat', type: 'Cabin', location: 'Colorado', bedrooms: 2, bathrooms: 1, maxGuests: 4 },
    { id: 'CH003', name: 'Downtown Loft', type: 'Apartment', location: 'New York', bedrooms: 1, bathrooms: 1, maxGuests: 2 },
    { id: 'CH004', name: 'Lakeside Cottage', type: 'Cottage', location: 'Michigan', bedrooms: 2, bathrooms: 1, maxGuests: 4 },
    { id: 'CH005', name: 'Desert Oasis', type: 'Villa', location: 'Arizona', bedrooms: 4, bathrooms: 3, maxGuests: 8 },
    { id: 'CH006', name: 'Ski Lodge', type: 'Chalet', location: 'Utah', bedrooms: 3, bathrooms: 2, maxGuests: 6 },
  ])
  
  const [propertyMappings, setPropertyMappings] = useState<{[key: number]: string}>(
    selectedProperties.reduce((acc, property) => {
      // Try to find a matching channel property by name similarity
      const matchingProperty = channelProperties.find(cp => 
        cp.name.toLowerCase().includes(property.name.toLowerCase()) || 
        property.name.toLowerCase().includes(cp.name.toLowerCase())
      )
      
      return {
        ...acc,
        [property.id]: matchingProperty?.id || ''
      }
    }, {})
  )
  
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProperties(properties.filter(p => p.status === 'unmapped'))
    } else {
      setSelectedProperties([])
    }
  }
  
  const toggleSelectProperty = (property: Property, checked: boolean) => {
    if (checked) {
      setSelectedProperties([...selectedProperties, property])
    } else {
      setSelectedProperties(selectedProperties.filter(p => p.id !== property.id))
    }
  }
  
  const updatePropertyMapping = (propertyId: number, channelPropertyId: string) => {
    setPropertyMappings({
      ...propertyMappings,
      [propertyId]: channelPropertyId
    })
  }
  
  const runAutoMapping = () => {
    // Simple auto-mapping algorithm that matches properties based on:
    // 1. Similar names
    // 2. Same location
    // 3. Similar bedrooms/bathrooms/guests count
    
    const newMappings = { ...propertyMappings }
    
    selectedProperties.forEach(property => {
      if (newMappings[property.id]) return // Skip if already mapped
      
      // Find best match
      const potentialMatches = channelProperties
        .filter(cp => !Object.values(newMappings).includes(cp.id)) // Exclude already mapped channel properties
        .map(cp => {
          let score = 0
          
          // Name similarity (simple contains check)
          if (cp.name.toLowerCase().includes(property.name.toLowerCase()) || 
              property.name.toLowerCase().includes(cp.name.toLowerCase())) {
            score += 3
          }
          
          // Location match
          if (cp.location === property.location) {
            score += 2
          }
          
          // Bedroom match
          if (cp.bedrooms === property.bedrooms) {
            score += 2
          }
          
          // Bathroom match
          if (cp.bathrooms === property.bathrooms) {
            score += 1
          }
          
          // Max guests match
          if (cp.maxGuests === property.maxGuests) {
            score += 1
          }
          
          return { channelProperty: cp, score }
        })
        .sort((a, b) => b.score - a.score)
      
      // Assign best match if score is at least 3
      if (potentialMatches.length > 0 && potentialMatches[0].score >= 3) {
        newMappings[property.id] = potentialMatches[0].channelProperty.id
      }
    })
    
    setPropertyMappings(newMappings)
  }
  
  const startMapping = async () => {
    // Filter out properties without mappings
    const validMappings = Object.entries(propertyMappings)
      .filter(([_, channelPropertyId]) => channelPropertyId)
      .map(([propertyId, channelPropertyId]) => ({
        propertyId: Number(propertyId),
        channelPropertyId
      }))
    
    if (validMappings.length === 0) {
      return
    }
    
    setMappingInProgress(true)
    setMappingProgress(0)
    setMappingResults({ success: 0, failed: 0, total: validMappings.length })
    
    // Simulate mapping process with progress
    let success = 0
    let failed = 0
    
    for (let i = 0; i < validMappings.length; i++) {
      // Simulate API call to map property
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate success/failure (90% success rate)
      const isSuccess = Math.random() < 0.9
      
      if (isSuccess) {
        success++
      } else {
        failed++
      }
      
      setMappingProgress(((i + 1) / validMappings.length) * 100)
      setMappingResults({ success, failed, total: validMappings.length })
    }
    
    // Wait a bit before completing
    await new Promise(resolve => setTimeout(resolve, 1000))
    setMappingInProgress(false)
    setMappings(validMappings)
  }
  
  const handleSave = () => {
    onSave(mappings)
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Bulk Property Mapping</CardTitle>
              <CardDescription>
                Map multiple properties to {channelName} at once
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={runAutoMapping}>
                Auto-Map Properties
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Selection controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="select-all" 
                checked={selectedProperties.length === properties.filter(p => p.status === 'unmapped').length && selectedProperties.length > 0}
                onCheckedChange={toggleSelectAll}
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Select All Unmapped Properties
              </label>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedProperties.length} properties selected
            </div>
          </div>
          
          {/* Mapping table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Your Property</TableHead>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>{channelName} Property</TableHead>
                  <TableHead className="w-24">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties
                  .filter(p => p.status === 'unmapped')
                  .map(property => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedProperties.some(p => p.id === property.id)}
                          onCheckedChange={(checked) => toggleSelectProperty(property, !!checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded overflow-hidden bg-muted">
                            <img 
                              src={property.image} 
                              alt={property.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{property.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {property.type} • {property.bedrooms} bed • {property.bathrooms} bath
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={propertyMappings[property.id] || ''}
                          onValueChange={(value) => updatePropertyMapping(property.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a property" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Not mapped</SelectItem>
                            {channelProperties.map(cp => (
                              <SelectItem key={cp.id} value={cp.id}>
                                {cp.name} ({cp.bedrooms} bed, {cp.bathrooms} bath)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {propertyMappings[property.id] ? (
                          <Badge className="bg-green-100 text-green-800">Ready</Badge>
                        ) : (
                          <Badge variant="outline">Unmapped</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          
          {/* No unmapped properties message */}
          {properties.filter(p => p.status === 'unmapped').length === 0 && (
            <div className="py-8 text-center">
              <h3 className="text-lg font-medium">No unmapped properties</h3>
              <p className="text-muted-foreground mt-1">All your properties are already mapped</p>
            </div>
          )}
          
          {/* Mapping progress */}
          {mappingInProgress && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Mapping Progress</h3>
                <span className="text-sm">{Math.round(mappingProgress)}%</span>
              </div>
              <Progress value={mappingProgress} />
              <div className="flex justify-between text-sm">
                <span>Success: {mappingResults.success}</span>
                <span>Failed: {mappingResults.failed}</span>
                <span>Total: {mappingResults.total}</span>
              </div>
            </div>
          )}
          
          {/* Action buttons */}
          <div className="mt-6 flex justify-end gap-2">
            {mappingInProgress ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mapping in progress...
              </Button>
            ) : mappings.length > 0 ? (
              <Button onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" />
                Save Mappings
              </Button>
            ) : (
              <Button 
                onClick={startMapping}
                disabled={Object.values(propertyMappings).filter(Boolean).length === 0}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Mapping
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Mapping tips */}
      <Card>
        <CardHeader>
          <CardTitle>Mapping Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Use <strong>Auto-Map</strong> to quickly match properties based on name, location, and size</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Verify each mapping before starting the process</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Properties with similar characteristics will be suggested first</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              <span>Once properties are mapped, their content will be synced according to your settings</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
