"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  Filter, 
  X, 
  Save,
  Bookmark,
  Star,
  Home,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Tv,
  Utensils,
  Car,
  Snowflake,
  Waves
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Types
export interface PropertyFilterValues {
  search: string
  propertyTypes: string[]
  locations: string[]
  bedrooms: [number, number]
  bathrooms: [number, number]
  guests: [number, number]
  amenities: string[]
  status: 'all' | 'mapped' | 'unmapped' | 'error'
}

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilterValues) => void
  availablePropertyTypes: string[]
  availableLocations: string[]
  availableAmenities: string[]
  savedFilters?: SavedFilter[]
  onSaveFilter?: (filter: SavedFilter) => void
}

interface SavedFilter {
  id: string
  name: string
  filters: PropertyFilterValues
}

// Default filter values
const defaultFilters: PropertyFilterValues = {
  search: '',
  propertyTypes: [],
  locations: [],
  bedrooms: [0, 10],
  bathrooms: [0, 10],
  guests: [0, 20],
  amenities: [],
  status: 'all'
}

// Amenity icons mapping
const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi': <Wifi className="h-4 w-4" />,
  'TV': <Tv className="h-4 w-4" />,
  'Kitchen': <Utensils className="h-4 w-4" />,
  'Parking': <Car className="h-4 w-4" />,
  'Air conditioning': <Snowflake className="h-4 w-4" />,
  'Pool': <Waves className="h-4 w-4" />,
  // Add more amenities as needed
}

export function PropertyFilters({ 
  onFilterChange, 
  availablePropertyTypes, 
  availableLocations, 
  availableAmenities,
  savedFilters = [],
  onSaveFilter
}: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilterValues>(defaultFilters)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const [showSaveFilterDialog, setShowSaveFilterDialog] = useState(false)
  const [newFilterName, setNewFilterName] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  
  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(filters.search)
    }, 300)
    
    return () => {
      clearTimeout(handler)
    }
  }, [filters.search])
  
  // Update filters when debounced search changes
  useEffect(() => {
    const updatedFilters = { ...filters, search: debouncedSearch }
    onFilterChange(updatedFilters)
  }, [debouncedSearch, onFilterChange])
  
  // Count active filters
  useEffect(() => {
    let count = 0
    
    if (filters.search) count++
    if (filters.propertyTypes.length > 0) count++
    if (filters.locations.length > 0) count++
    if (filters.bedrooms[0] > 0 || filters.bedrooms[1] < 10) count++
    if (filters.bathrooms[0] > 0 || filters.bathrooms[1] < 10) count++
    if (filters.guests[0] > 0 || filters.guests[1] < 20) count++
    if (filters.amenities.length > 0) count++
    if (filters.status !== 'all') count++
    
    setActiveFiltersCount(count)
  }, [filters])
  
  const updateFilters = (partialFilters: Partial<PropertyFilterValues>) => {
    const updatedFilters = { ...filters, ...partialFilters }
    setFilters(updatedFilters)
    
    // Don't trigger onChange for search (it's debounced)
    if (!('search' in partialFilters)) {
      onFilterChange(updatedFilters)
    }
  }
  
  const togglePropertyType = (type: string) => {
    const updatedTypes = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter(t => t !== type)
      : [...filters.propertyTypes, type]
    
    updateFilters({ propertyTypes: updatedTypes })
  }
  
  const toggleLocation = (location: string) => {
    const updatedLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location]
    
    updateFilters({ locations: updatedLocations })
  }
  
  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity]
    
    updateFilters({ amenities: updatedAmenities })
  }
  
  const resetFilters = () => {
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }
  
  const handleSaveFilter = () => {
    if (newFilterName.trim() && onSaveFilter) {
      onSaveFilter({
        id: Date.now().toString(),
        name: newFilterName.trim(),
        filters: { ...filters }
      })
      setNewFilterName('')
      setShowSaveFilterDialog(false)
    }
  }
  
  const applyFilter = (savedFilter: SavedFilter) => {
    setFilters(savedFilter.filters)
    onFilterChange(savedFilter.filters)
  }
  
  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case 'propertyType':
        updateFilters({ 
          propertyTypes: filters.propertyTypes.filter(t => t !== value) 
        })
        break
      case 'location':
        updateFilters({ 
          locations: filters.locations.filter(l => l !== value) 
        })
        break
      case 'amenity':
        updateFilters({ 
          amenities: filters.amenities.filter(a => a !== value) 
        })
        break
      case 'status':
        updateFilters({ status: 'all' })
        break
      default:
        break
    }
  }
  
  return (
    <div className="space-y-4">
      {/* Search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search properties..."
            className="pl-9"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 sm:w-96 p-0" align="end">
              <div className="p-4 border-b">
                <h3 className="font-medium">Filter Properties</h3>
                <p className="text-sm text-muted-foreground">
                  Narrow down properties by specific criteria
                </p>
              </div>
              
              <div className="p-0 max-h-[60vh] overflow-y-auto">
                <Accordion type="multiple" defaultValue={['property-type', 'location', 'size']}>
                  {/* Property Type */}
                  <AccordionItem value="property-type">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span>Property Type</span>
                        {filters.propertyTypes.length > 0 && (
                          <Badge className="ml-1">{filters.propertyTypes.length}</Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-2">
                        {availablePropertyTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type}`} 
                              checked={filters.propertyTypes.includes(type)}
                              onCheckedChange={() => togglePropertyType(type)}
                            />
                            <label 
                              htmlFor={`type-${type}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Location */}
                  <AccordionItem value="location">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                        {filters.locations.length > 0 && (
                          <Badge className="ml-1">{filters.locations.length}</Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-2">
                        {availableLocations.map(location => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`location-${location}`} 
                              checked={filters.locations.includes(location)}
                              onCheckedChange={() => toggleLocation(location)}
                            />
                            <label 
                              htmlFor={`location-${location}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {location}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Size */}
                  <AccordionItem value="size">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Size</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        {/* Bedrooms */}
                        <div>
                          <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                              <Bed className="h-4 w-4" />
                              <span>Bedrooms</span>
                            </Label>
                            <span className="text-sm">
                              {filters.bedrooms[0]} - {filters.bedrooms[1]}+
                            </span>
                          </div>
                          <Slider 
                            value={filters.bedrooms}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={(value) => updateFilters({ bedrooms: value as [number, number] })}
                            className="mt-2"
                          />
                        </div>
                        
                        {/* Bathrooms */}
                        <div>
                          <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                              <Bath className="h-4 w-4" />
                              <span>Bathrooms</span>
                            </Label>
                            <span className="text-sm">
                              {filters.bathrooms[0]} - {filters.bathrooms[1]}+
                            </span>
                          </div>
                          <Slider 
                            value={filters.bathrooms}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={(value) => updateFilters({ bathrooms: value as [number, number] })}
                            className="mt-2"
                          />
                        </div>
                        
                        {/* Guests */}
                        <div>
                          <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>Max Guests</span>
                            </Label>
                            <span className="text-sm">
                              {filters.guests[0]} - {filters.guests[1]}+
                            </span>
                          </div>
                          <Slider 
                            value={filters.guests}
                            min={0}
                            max={20}
                            step={1}
                            onValueChange={(value) => updateFilters({ guests: value as [number, number] })}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Amenities */}
                  <AccordionItem value="amenities">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span>Amenities</span>
                        {filters.amenities.length > 0 && (
                          <Badge className="ml-1">{filters.amenities.length}</Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-2">
                        {availableAmenities.map(amenity => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`amenity-${amenity}`} 
                              checked={filters.amenities.includes(amenity)}
                              onCheckedChange={() => toggleAmenity(amenity)}
                            />
                            <label 
                              htmlFor={`amenity-${amenity}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                            >
                              {amenityIcons[amenity] || null}
                              <span>{amenity}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Status */}
                  <AccordionItem value="status">
                    <AccordionTrigger className="px-4">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Status</span>
                        {filters.status !== 'all' && (
                          <Badge className="ml-1 capitalize">{filters.status}</Badge>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="status-all" 
                            checked={filters.status === 'all'}
                            onCheckedChange={() => updateFilters({ status: 'all' })}
                          />
                          <label 
                            htmlFor="status-all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            All
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="status-mapped" 
                            checked={filters.status === 'mapped'}
                            onCheckedChange={() => updateFilters({ status: 'mapped' })}
                          />
                          <label 
                            htmlFor="status-mapped"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Mapped
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="status-unmapped" 
                            checked={filters.status === 'unmapped'}
                            onCheckedChange={() => updateFilters({ status: 'unmapped' })}
                          />
                          <label 
                            htmlFor="status-unmapped"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Unmapped
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="status-error" 
                            checked={filters.status === 'error'}
                            onCheckedChange={() => updateFilters({ status: 'error' })}
                          />
                          <label 
                            htmlFor="status-error"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Error
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="p-4 border-t flex justify-between">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset Filters
                </Button>
                
                <div className="flex gap-2">
                  {onSaveFilter && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => setShowSaveFilterDialog(true)}
                    >
                      <Bookmark className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                  )}
                  
                  <Button size="sm" onClick={() => document.body.click()}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {savedFilters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Saved Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Saved Filters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {savedFilters.map(filter => (
                  <DropdownMenuItem 
                    key={filter.id}
                    onClick={() => applyFilter(filter)}
                  >
                    {filter.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {activeFiltersCount > 0 && (
            <Button variant="ghost" onClick={resetFilters}>
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.propertyTypes.map(type => (
            <Badge key={type} variant="secondary" className="gap-1 pl-2">
              {type}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter('propertyType', type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          {filters.locations.map(location => (
            <Badge key={location} variant="secondary" className="gap-1 pl-2">
              {location}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter('location', location)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          {filters.amenities.map(amenity => (
            <Badge key={amenity} variant="secondary" className="gap-1 pl-2">
              {amenity}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter('amenity', amenity)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          {filters.status !== 'all' && (
            <Badge variant="secondary" className="gap-1 pl-2 capitalize">
              Status: {filters.status}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter('status', filters.status)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {(filters.bedrooms[0] > 0 || filters.bedrooms[1] < 10) && (
            <Badge variant="secondary" className="gap-1 pl-2">
              {filters.bedrooms[0]}-{filters.bedrooms[1]}+ beds
            </Badge>
          )}
          
          {(filters.bathrooms[0] > 0 || filters.bathrooms[1] < 10) && (
            <Badge variant="secondary" className="gap-1 pl-2">
              {filters.bathrooms[0]}-{filters.bathrooms[1]}+ baths
            </Badge>
          )}
          
          {(filters.guests[0] > 0 || filters.guests[1] < 20) && (
            <Badge variant="secondary" className="gap-1 pl-2">
              {filters.guests[0]}-{filters.guests[1]}+ guests
            </Badge>
          )}
        </div>
      )}
      
      {/* Save filter dialog */}
      {showSaveFilterDialog && (
        <Card className="p-4 border shadow-md absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80">
          <div className="space-y-4">
            <h3 className="font-medium">Save Filter</h3>
            <Input
              placeholder="Filter name"
              value={newFilterName}
              onChange={(e) => setNewFilterName(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowSaveFilterDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveFilter}>
                Save
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
