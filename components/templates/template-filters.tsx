"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function TemplateFilters() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <div className="flex-1">
          <Input placeholder="Search templates..." />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="rustic">Rustic</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="newest">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="free-only" />
          <Label htmlFor="free-only">Free Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="premium" />
          <Label htmlFor="premium">Premium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="mobile-optimized" defaultChecked />
          <Label htmlFor="mobile-optimized">Mobile Optimized</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="seo-optimized" defaultChecked />
          <Label htmlFor="seo-optimized">SEO Optimized</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="booking-enabled" defaultChecked />
          <Label htmlFor="booking-enabled">Booking Enabled</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset</Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  )
}

