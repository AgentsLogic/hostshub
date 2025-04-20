"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BulkMapping } from "@/components/channels/bulk-mapping"
import { PropertyFilters } from "@/components/channels/property-filters"
import { VisualMapper } from "@/components/channels/visual-mapper"
import { 
  ArrowLeft, 
  Filter, 
  ListFilter, 
  Grid3X3, 
  Layers, 
  RefreshCw,
  Plus,
  Search,
  Check
} from "lucide-react"
import Link from "next/link"

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    name: "Beachfront Villa",
    type: "Villa",
    location: "California",
    image: "/placeholder.jpg",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Pool", "Kitchen", "Parking"],
    status: "mapped" as const,
    channelId: "CH001"
  },
  {
    id: 2,
    name: "Mountain Retreat",
    type: "Cabin",
    location: "Colorado",
    image: "/placeholder.jpg",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ["WiFi", "Fireplace", "Kitchen"],
    status: "unmapped" as const
  },
  {
    id: 3,
    name: "Downtown Loft",
    type: "Apartment",
    location: "New York",
    image: "/placeholder.jpg",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ["WiFi", "TV", "Kitchen"],
    status: "unmapped" as const
  },
  {
    id: 4,
    name: "Lakeside Cottage",
    type: "Cottage",
    location: "Michigan",
    image: "/placeholder.jpg",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ["WiFi", "Waterfront", "Kitchen", "Parking"],
    status: "error" as const,
    channelId: "CH004"
  },
  {
    id: 5,
    name: "Desert Oasis",
    type: "Villa",
    location: "Arizona",
    image: "/placeholder.jpg",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Air conditioning"],
    status: "unmapped" as const
  },
]

// Mock data for channel properties
const mockChannelProperties = [
  { id: 'CH001', name: 'Beachfront Villa', type: 'Villa', location: 'California', bedrooms: 3, bathrooms: 2, maxGuests: 6 },
  { id: 'CH002', name: 'Mountain Retreat', type: 'Cabin', location: 'Colorado', bedrooms: 2, bathrooms: 1, maxGuests: 4 },
  { id: 'CH003', name: 'Downtown Loft', type: 'Apartment', location: 'New York', bedrooms: 1, bathrooms: 1, maxGuests: 2 },
  { id: 'CH004', name: 'Lakeside Cottage', type: 'Cottage', location: 'Michigan', bedrooms: 2, bathrooms: 1, maxGuests: 4 },
  { id: 'CH005', name: 'Desert Oasis', type: 'Villa', location: 'Arizona', bedrooms: 4, bathrooms: 3, maxGuests: 8 },
  { id: 'CH006', name: 'Ski Lodge', type: 'Chalet', location: 'Utah', bedrooms: 3, bathrooms: 2, maxGuests: 6 },
]

// Available property types, locations, and amenities for filters
const availablePropertyTypes = ["Villa", "Cabin", "Apartment", "Cottage", "Chalet", "House"]
const availableLocations = ["California", "Colorado", "New York", "Michigan", "Arizona", "Utah"]
const availableAmenities = ["WiFi", "Pool", "Kitchen", "Parking", "Air conditioning", "TV", "Fireplace", "Waterfront"]

export default function PropertyMappingPage() {
  const [properties, setProperties] = useState(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [selectedProperty, setSelectedProperty] = useState<typeof mockProperties[0] | null>(null)
  const [showBulkMapping, setShowBulkMapping] = useState(false)
  const [showVisualMapper, setShowVisualMapper] = useState(false)
  const [savedFilters, setSavedFilters] = useState<Array<{
    id: string;
    name: string;
    filters: any;
  }>>([])
  
  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    // Apply filters to properties
    let filtered = [...properties]
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.type.toLowerCase().includes(searchLower)
      )
    }
    
    // Property type filter
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(p => filters.propertyTypes.includes(p.type))
    }
    
    // Location filter
    if (filters.locations.length > 0) {
      filtered = filtered.filter(p => filters.locations.includes(p.location))
    }
    
    // Bedrooms filter
    filtered = filtered.filter(p => 
      p.bedrooms >= filters.bedrooms[0] && p.bedrooms <= filters.bedrooms[1]
    )
    
    // Bathrooms filter
    filtered = filtered.filter(p => 
      p.bathrooms >= filters.bathrooms[0] && p.bathrooms <= filters.bathrooms[1]
    )
    
    // Guests filter
    filtered = filtered.filter(p => 
      p.maxGuests >= filters.guests[0] && p.maxGuests <= filters.guests[1]
    )
    
    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(p => 
        filters.amenities.every((amenity: string) => p.amenities.includes(amenity))
      )
    }
    
    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status)
    }
    
    setFilteredProperties(filtered)
  }
  
  // Handle save filter
  const handleSaveFilter = (filter: any) => {
    setSavedFilters([...savedFilters, filter])
  }
  
  // Handle bulk mapping save
  const handleBulkMappingSave = (mappings: {propertyId: number, channelPropertyId: string}[]) => {
    // Update properties with new mappings
    const updatedProperties = properties.map(property => {
      const mapping = mappings.find(m => m.propertyId === property.id)
      if (mapping) {
        return {
          ...property,
          status: 'mapped' as const,
          channelId: mapping.channelPropertyId
        }
      }
      return property
    })
    
    setProperties(updatedProperties)
    setFilteredProperties(updatedProperties)
    setShowBulkMapping(false)
  }
  
  // Handle visual mapper save
  const handleVisualMapperSave = (mapping: {
    propertyId: number,
    channelPropertyId: string,
    fieldMappings: any[]
  }) => {
    // Update property with new mapping
    const updatedProperties = properties.map(property => {
      if (property.id === mapping.propertyId) {
        return {
          ...property,
          status: 'mapped' as const,
          channelId: mapping.channelPropertyId
        }
      }
      return property
    })
    
    setProperties(updatedProperties)
    setFilteredProperties(updatedProperties)
    setShowVisualMapper(false)
    setSelectedProperty(null)
  }
  
  // Render bulk mapping UI
  if (showBulkMapping) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowBulkMapping(false)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Bulk Property Mapping</h1>
        </div>
        
        <BulkMapping 
          channelName="Airbnb"
          properties={properties}
          onSave={handleBulkMappingSave}
          onCancel={() => setShowBulkMapping(false)}
        />
      </div>
    )
  }
  
  // Render visual mapper UI
  if (showVisualMapper && selectedProperty) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              setShowVisualMapper(false)
              setSelectedProperty(null)
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Visual Property Mapping</h1>
        </div>
        
        <VisualMapper 
          property={selectedProperty}
          channelProperties={mockChannelProperties}
          onSave={handleVisualMapperSave}
          onCancel={() => {
            setShowVisualMapper(false)
            setSelectedProperty(null)
          }}
        />
      </div>
    )
  }
  
  // Render main property mapping UI
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/channel-manager">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Property Mapping</h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setShowBulkMapping(true)}
          >
            <Layers className="mr-2 h-4 w-4" />
            Bulk Mapping
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Properties
          </Button>
        </div>
      </div>
      
      {/* Property Mapping Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>What is Property Mapping?</CardTitle>
          <CardDescription>
            Property mapping connects your HostsHub properties with listings on channels like Airbnb and VRBO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium">Why Map Properties?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Prevent double bookings</strong> by syncing availability across all channels</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Update content once</strong> and publish to all connected channels</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Manage pricing</strong> from a single dashboard for all platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Centralize bookings</strong> from all sources in one calendar</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium">How Property Mapping Works</h3>
              <ol className="space-y-2 list-decimal pl-5">
                <li><strong>Connect your channel</strong> - Authorize HostsHub to access your channel account</li>
                <li><strong>Match properties</strong> - Link your HostsHub properties to their channel counterparts</li>
                <li><strong>Configure sync settings</strong> - Choose what to sync (rates, availability, content)</li>
                <li><strong>Start syncing</strong> - Your properties will stay in sync automatically</li>
              </ol>
              <div className="mt-4 pt-3 border-t">
                <p className="text-sm text-muted-foreground">
                  You can map properties individually or use bulk mapping to connect multiple properties at once.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Filters */}
      <PropertyFilters 
        onFilterChange={handleFilterChange}
        availablePropertyTypes={availablePropertyTypes}
        availableLocations={availableLocations}
        availableAmenities={availableAmenities}
        savedFilters={savedFilters}
        onSaveFilter={handleSaveFilter}
      />
      
      {/* Property list */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Properties</CardTitle>
            <div className="text-sm text-muted-foreground">
              {filteredProperties.length} of {properties.length} properties
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">Property</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Type</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Location</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Size</th>
                  <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-10 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                      No properties match your filters
                    </td>
                  </tr>
                ) : (
                  filteredProperties.map(property => (
                    <tr key={property.id} className="border-b">
                      <td className="p-4">
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
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{property.type}</td>
                      <td className="p-4">{property.location}</td>
                      <td className="p-4">
                        {property.bedrooms} bed • {property.bathrooms} bath • {property.maxGuests} guests
                      </td>
                      <td className="p-4">
                        {property.status === 'mapped' && (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Mapped
                          </span>
                        )}
                        {property.status === 'unmapped' && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                            Unmapped
                          </span>
                        )}
                        {property.status === 'error' && (
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            Error
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedProperty(property)
                            setShowVisualMapper(true)
                          }}
                        >
                          {property.status === 'mapped' ? 'Edit Mapping' : 'Map Property'}
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
