"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AlertCircle, 
  Check, 
  Search, 
  Filter, 
  Plus, 
  Trash2 
} from "lucide-react"

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

// Mock data
const mockProperties = [
  { 
    id: 1, 
    name: 'Beach Villa', 
    type: 'House', 
    location: 'California', 
    image: '/placeholder.jpg',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Air conditioning', 'Parking'],
    status: 'mapped',
    channelId: 'CH123456'
  },
  { 
    id: 2, 
    name: 'Mountain Cabin', 
    type: 'Cabin', 
    location: 'Colorado', 
    image: '/placeholder.jpg',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Heating'],
    status: 'unmapped'
  },
  { 
    id: 3, 
    name: 'City Apartment', 
    type: 'Apartment', 
    location: 'New York', 
    image: '/placeholder.jpg',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Elevator'],
    status: 'error'
  },
  { 
    id: 4, 
    name: 'Lakeside Cottage', 
    type: 'Cottage', 
    location: 'Michigan', 
    image: '/placeholder.jpg',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['WiFi', 'Waterfront', 'Kitchen', 'Parking'],
    status: 'unmapped'
  },
  { 
    id: 5, 
    name: 'Desert Villa', 
    type: 'Villa', 
    location: 'Arizona', 
    image: '/placeholder.jpg',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ['WiFi', 'Pool', 'Kitchen', 'Air conditioning', 'Parking', 'Hot tub'],
    status: 'mapped',
    channelId: 'CH789012'
  },
  { 
    id: 6, 
    name: 'Ski Chalet', 
    type: 'Chalet', 
    location: 'Utah', 
    image: '/placeholder.jpg',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ['WiFi', 'Fireplace', 'Kitchen', 'Heating', 'Ski-in/Ski-out'],
    status: 'unmapped'
  }
]

// Main component
export function PropertyMappingUI() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'mapped' | 'unmapped' | 'error'>('all')
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  
  // Derived state
  const propertyTypes = Array.from(new Set(mockProperties.map(p => p.type)))
  
  const filteredProperties = mockProperties.filter(property => {
    // Search query filter
    const matchesSearch = 
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      property.status === statusFilter
    
    // Type filter
    const matchesType = 
      typeFilter.length === 0 || 
      typeFilter.includes(property.type)
    
    return matchesSearch && matchesStatus && matchesType
  })
  
  // Helper components
  const PropertyCard = ({ property }: { property: Property }) => {
    return (
      <Card 
        className={`cursor-pointer transition-all hover:border-primary ${
          property.status === 'mapped' ? 'border-green-200 bg-green-50' :
          property.status === 'error' ? 'border-red-200 bg-red-50' :
          'border-gray-200'
        }`}
      >
        <div className="relative">
          <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
            <img 
              src={property.image} 
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>
          {property.status && (
            <div className="absolute top-2 right-2">
              <Badge className={
                property.status === 'mapped' ? 'bg-green-100 text-green-800' :
                property.status === 'error' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }>
                {property.status === 'mapped' ? 'Mapped' :
                 property.status === 'unmapped' ? 'Unmapped' :
                 'Error'}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1">{property.name}</h3>
          <div className="text-sm text-muted-foreground mb-2">
            {property.type} • {property.location}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div>{property.bedrooms} bed</div>
            <div>{property.bathrooms} bath</div>
            <div>{property.maxGuests} guests</div>
          </div>
          {property.channelId && (
            <div className="mt-3 pt-3 border-t text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Channel ID:</span>
                <span className="font-mono">{property.channelId}</span>
              </div>
            </div>
          )}
          {property.status === 'error' && (
            <div className="mt-3 p-2 bg-red-100 rounded-md text-sm text-red-800 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Error syncing property</span>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search properties..."
            className="w-full rounded-md border pl-9 p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="rounded-md border p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">All Statuses</option>
            <option value="mapped">Mapped</option>
            <option value="unmapped">Unmapped</option>
            <option value="error">Error</option>
          </select>
          
          <div className="relative">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Total Properties</h3>
              <p className="text-2xl font-bold">{mockProperties.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Mapped</h3>
              <p className="text-2xl font-bold">{mockProperties.filter(p => p.status === 'mapped').length}</p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Check className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Unmapped</h3>
              <p className="text-2xl font-bold">{mockProperties.filter(p => p.status === 'unmapped').length}</p>
            </div>
            <Button size="sm" variant="outline" className="gap-1">
              <Plus className="h-3 w-3" />
              Map
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No properties match your filters</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchQuery('')
              setStatusFilter('all')
              setTypeFilter([])
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">
            Showing {filteredProperties.length} of {mockProperties.length} properties
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            Auto-Map Properties
          </Button>
          <Button>
            Save Mappings
          </Button>
        </div>
      </div>
    </div>
  )
}
