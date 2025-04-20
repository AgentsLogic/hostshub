"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Template {
  id: string
  name: string
  description: string
  image: string
  category: "modern" | "classic" | "minimal" | "rustic"
  tags: string[]
  price: number | null
  isFree: boolean
}

const templates: Template[] = [
  {
    id: "t1",
    name: "Modern Loft",
    description: "A sleek, contemporary design perfect for urban properties.",
    image: "/placeholder.svg?height=300&width=400",
    category: "modern",
    tags: ["Urban", "Apartment", "Minimalist"],
    price: null,
    isFree: true,
  },
  {
    id: "t2",
    name: "Coastal Retreat",
    description: "Bright and airy design inspired by beachfront properties.",
    image: "/placeholder.svg?height=300&width=400",
    category: "modern",
    tags: ["Beach", "Vacation", "Bright"],
    price: 49,
    isFree: false,
  },
  {
    id: "t3",
    name: "Rustic Cabin",
    description: "Warm and cozy design with natural elements.",
    image: "/placeholder.svg?height=300&width=400",
    category: "rustic",
    tags: ["Cabin", "Mountain", "Cozy"],
    price: 49,
    isFree: false,
  },
  {
    id: "t4",
    name: "Classic Elegance",
    description: "Timeless design with sophisticated elements.",
    image: "/placeholder.svg?height=300&width=400",
    category: "classic",
    tags: ["Elegant", "Luxury", "Traditional"],
    price: 79,
    isFree: false,
  },
  {
    id: "t5",
    name: "Minimal Studio",
    description: "Clean and simple design for small spaces.",
    image: "/placeholder.svg?height=300&width=400",
    category: "minimal",
    tags: ["Studio", "Small Space", "Clean"],
    price: null,
    isFree: true,
  },
  {
    id: "t6",
    name: "Mountain View",
    description: "Showcase scenic views with this panoramic template.",
    image: "/placeholder.svg?height=300&width=400",
    category: "modern",
    tags: ["Mountain", "Views", "Panoramic"],
    price: 59,
    isFree: false,
  },
]

export function TemplatesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <div className="relative">
            <img src={template.image || "/placeholder.svg"} alt={template.name} className="h-48 w-full object-cover" />
            {template.isFree ? (
              <Badge className="absolute right-2 top-2">Free</Badge>
            ) : (
              <Badge className="absolute right-2 top-2" variant="secondary">
                ${template.price}
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant="outline" className="capitalize">
                  {template.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex w-full gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href={`/templates/${template.category}/preview`}>Preview</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href={`/templates/${template.category}`}>Use Template</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

