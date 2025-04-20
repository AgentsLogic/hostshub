"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ArrowRight, 
  Check, 
  X, 
  AlertCircle, 
  Loader2,
  MoveHorizontal,
  Link as LinkIcon,
  Unlink,
  Undo2,
  Save
} from "lucide-react"
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
}

interface ChannelProperty {
  id: string
  name: string
  type: string
  location: string
  image?: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  amenities?: string[]
}

interface FieldMapping {
  sourceField: string
  targetField: string
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'custom'
  customTransform?: string
}

interface VisualMapperProps {
  property: Property
  channelProperties: ChannelProperty[]
  onSave: (mapping: {
    propertyId: number,
    channelPropertyId: string,
    fieldMappings: FieldMapping[]
  }) => void
  onCancel: () => void
}

export function VisualMapper({ 
  property, 
  channelProperties, 
  onSave, 
  onCancel 
}: VisualMapperProps) {
  const [selectedChannelProperty, setSelectedChannelProperty] = useState<ChannelProperty | null>(
    channelProperties.find(cp => cp.id === property.channelId) || null
  )
  
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([
    { sourceField: 'name', targetField: 'name', transform: 'none' },
    { sourceField: 'type', targetField: 'type', transform: 'none' },
    { sourceField: 'location', targetField: 'location', transform: 'none' },
    { sourceField: 'bedrooms', targetField: 'bedrooms', transform: 'none' },
    { sourceField: 'bathrooms', targetField: 'bathrooms', transform: 'none' },
    { sourceField: 'maxGuests', targetField: 'maxGuests', transform: 'none' },
  ])
  
  const [draggingField, setDraggingField] = useState<string | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  // Field display names for better UI presentation
  const fieldDisplayNames: Record<string, string> = {
    name: 'Property Name',
    type: 'Property Type',
    location: 'Location',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    maxGuests: 'Maximum Guests',
    amenities: 'Amenities'
  }
  
  // Available transform options
  const transformOptions = [
    { value: 'none', label: 'No transformation' },
    { value: 'uppercase', label: 'UPPERCASE' },
    { value: 'lowercase', label: 'lowercase' },
    { value: 'capitalize', label: 'Capitalize' },
    { value: 'custom', label: 'Custom Function' }
  ]
  
  // Handle drag start
  const handleDragStart = (field: string) => {
    setDraggingField(field)
  }
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent, field: string) => {
    e.preventDefault()
    setDropTarget(field)
  }
  
  // Handle drop
  const handleDrop = (targetField: string) => {
    if (draggingField && targetField) {
      // Update the field mapping
      const updatedMappings = fieldMappings.map(mapping => {
        if (mapping.sourceField === draggingField) {
          return { ...mapping, targetField }
        }
        return mapping
      })
      
      setFieldMappings(updatedMappings)
    }
    
    // Reset drag state
    setDraggingField(null)
    setDropTarget(null)
  }
  
  // Update transform type
  const updateTransform = (sourceField: string, transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'custom') => {
    const updatedMappings = fieldMappings.map(mapping => {
      if (mapping.sourceField === sourceField) {
        return { ...mapping, transform }
      }
      return mapping
    })
    
    setFieldMappings(updatedMappings)
  }
  
  // Update custom transform
  const updateCustomTransform = (sourceField: string, customTransform: string) => {
    const updatedMappings = fieldMappings.map(mapping => {
      if (mapping.sourceField === sourceField) {
        return { ...mapping, customTransform }
      }
      return mapping
    })
    
    setFieldMappings(updatedMappings)
  }
  
  // Reset field mapping
  const resetFieldMapping = (sourceField: string) => {
    const updatedMappings = fieldMappings.map(mapping => {
      if (mapping.sourceField === sourceField) {
        return { 
          sourceField, 
          targetField: sourceField, 
          transform: 'none' as const 
        }
      }
      return mapping
    })
    
    setFieldMappings(updatedMappings)
  }
  
  // Apply transform to preview value
  const applyTransform = (value: any, transform: 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'custom', customTransform?: string) => {
    if (value === undefined || value === null) return ''
    
    const stringValue = String(value)
    
    switch (transform) {
      case 'uppercase':
        return stringValue.toUpperCase()
      case 'lowercase':
        return stringValue.toLowerCase()
      case 'capitalize':
        return stringValue.charAt(0).toUpperCase() + stringValue.slice(1)
      case 'custom':
        try {
          // Simple custom transform using a function string
          // In a real app, this would need more security and validation
          if (customTransform) {
            const transformFn = new Function('value', `return ${customTransform}`)
            return transformFn(value)
          }
          return stringValue
        } catch (error) {
          console.error('Error in custom transform:', error)
          return `Error: ${error}`
        }
      default:
        return stringValue
    }
  }
  
  // Handle save
  const handleSave = async () => {
    if (!selectedChannelProperty) return
    
    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onSave({
        propertyId: property.id,
        channelPropertyId: selectedChannelProperty.id,
        fieldMappings
      })
    } finally {
      setIsSaving(false)
    }
  }
  
  // Get preview value for a field
  const getPreviewValue = (mapping: FieldMapping) => {
    if (!selectedChannelProperty) return ''
    
    const sourceValue = (property as any)[mapping.sourceField]
    return applyTransform(sourceValue, mapping.transform || 'none', mapping.customTransform)
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Visual Property Mapping</CardTitle>
              <CardDescription>
                Map your property fields to channel fields
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={!selectedChannelProperty || isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Mapping
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Property selection */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source property */}
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50 py-3">
                <CardTitle className="text-base">Your Property</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-16 w-16 rounded overflow-hidden bg-muted">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{property.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {property.type} • {property.location}
                    </p>
                    <p className="text-sm">
                      {property.bedrooms} bed • {property.bathrooms} bath • {property.maxGuests} guests
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Target channel property */}
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50 py-3">
                <CardTitle className="text-base">Channel Property</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {selectedChannelProperty ? (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-16 w-16 rounded overflow-hidden bg-muted">
                      <img 
                        src={selectedChannelProperty.image || '/placeholder.jpg'} 
                        alt={selectedChannelProperty.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{selectedChannelProperty.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedChannelProperty.type} • {selectedChannelProperty.location}
                      </p>
                      <p className="text-sm">
                        {selectedChannelProperty.bedrooms} bed • {selectedChannelProperty.bathrooms} bath • {selectedChannelProperty.maxGuests} guests
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-24 text-center">
                    <p className="text-muted-foreground mb-2">No channel property selected</p>
                    <div className="flex gap-2">
                      <select 
                        className="px-3 py-1 border rounded-md"
                        onChange={(e) => {
                          if (e.target.value) {
                            const selected = channelProperties.find(cp => cp.id === e.target.value)
                            if (selected) {
                              setSelectedChannelProperty(selected)
                            }
                          } else {
                            setSelectedChannelProperty(null)
                          }
                        }}
                        value={selectedChannelProperty ? selectedChannelProperty.id : ''}
                      >
                        <option value="">Select a property</option>
                        {channelProperties.map(cp => (
                          <option key={cp.id} value={cp.id}>
                            {cp.name} ({cp.bedrooms} bed, {cp.bathrooms} bath)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Field mapping */}
          {selectedChannelProperty && (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-base">Field Mapping</CardTitle>
                <CardDescription>
                  Drag fields to map them or configure transformations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Your Field</TableHead>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Channel Field</TableHead>
                      <TableHead>Transform</TableHead>
                      <TableHead>Preview</TableHead>
                      <TableHead className="w-12">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fieldMappings.map(mapping => (
                      <TableRow key={mapping.sourceField}>
                        <TableCell>
                          <div
                            draggable
                            onDragStart={() => handleDragStart(mapping.sourceField)}
                            className="p-2 bg-blue-50 border border-blue-200 rounded-md cursor-move"
                          >
                            {fieldDisplayNames[mapping.sourceField] || mapping.sourceField}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <MoveHorizontal className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell
                          onDragOver={(e) => handleDragOver(e, mapping.targetField)}
                          onDrop={() => handleDrop(mapping.targetField)}
                          className={`${dropTarget === mapping.targetField ? 'bg-green-100' : ''}`}
                        >
                          <div className="p-2 bg-green-50 border border-green-200 rounded-md">
                            {fieldDisplayNames[mapping.targetField] || mapping.targetField}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <select
                              className="w-full p-2 border rounded-md"
                              value={mapping.transform || 'none'}
                              onChange={(e) => updateTransform(
                                mapping.sourceField, 
                                e.target.value as 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'custom'
                              )}
                            >
                              {transformOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            
                            {mapping.transform === 'custom' && (
                              <Input
                                placeholder="value => value.trim()"
                                value={mapping.customTransform || ''}
                                onChange={(e) => updateCustomTransform(mapping.sourceField, e.target.value)}
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                            {getPreviewValue(mapping)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => resetFieldMapping(mapping.sourceField)}
                                >
                                  <Undo2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reset to default</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
          
          {/* Mapping tips */}
          <Card className="mt-6">
            <CardHeader className="py-3">
              <CardTitle className="text-base">Mapping Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <MoveHorizontal className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Drag fields from your property to map them to channel fields</span>
                </li>
                <li className="flex items-start gap-2">
                  <LinkIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                  <span>Use transformations to format your data for the channel</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <span>Custom transformations use JavaScript syntax (e.g., <code>value.trim()</code>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Preview shows how your data will appear on the channel</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
