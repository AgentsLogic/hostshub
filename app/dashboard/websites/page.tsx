import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { 
  Palette, 
  Layout, 
  Image as ImageIcon, 
  Type, 
  Settings, 
  Eye, 
  Wand2,
  Minimize2,
  Castle,
  Home
} from "lucide-react"
import React from "react" // Import React

export default function WebsitesPage() {
  const features = [
    {
      title: "Custom Design",
      description: "Create stunning, unique websites that reflect your brand",
      icon: <Palette className="h-6 w-6" />, // Removed text-primary
    },
    {
      title: "Easy Layout Builder",
      description: "Drag and drop interface for quick customization",
      icon: <Layout className="h-6 w-6" />, // Removed text-primary
    },
    {
      title: "Media Management",
      description: "Showcase your properties with beautiful galleries",
      icon: <ImageIcon className="h-6 w-6" />, // Removed text-primary
    },
    {
      title: "Content Editor",
      description: "Rich text editor for engaging property descriptions",
      icon: <Type className="h-6 w-6" />, // Removed text-primary
    },
    {
      title: "Advanced Settings",
      description: "Fine-tune your website's functionality and appearance",
      icon: <Settings className="h-6 w-6" />, // Removed text-primary
    },
  ]

  const templates = [
    {
      name: "Modern Minimal",
      description: "Clean and contemporary design",
      color: "bg-gradient-to-br from-blue-50 to-blue-100",
      icon: <Minimize2 className="h-8 w-8 text-blue-500" />,
      pattern: "bg-[radial-gradient(circle_at_1px_1px,rgb(59_130_246_/_0.15)_1px,transparent_0)]",
      patternSize: "bg-[size:20px_20px]",
    },
    {
      name: "Luxury Estate",
      description: "Elegant and sophisticated layout",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      icon: <Castle className="h-8 w-8 text-purple-500" />,
      pattern: "bg-[radial-gradient(circle_at_1px_1px,rgb(147_51_234_/_0.15)_1px,transparent_0)]",
      patternSize: "bg-[size:20px_20px]",
    },
    {
      name: "Cozy Retreat",
      description: "Warm and inviting design",
      color: "bg-gradient-to-br from-amber-50 to-amber-100",
      icon: <Home className="h-8 w-8 text-amber-500" />,
      pattern: "bg-[radial-gradient(circle_at_1px_1px,rgb(245_158_11_/_0.15)_1px,transparent_0)]",
      patternSize: "bg-[size:20px_20px]",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beautiful Websites</h1>
          <p className="text-muted-foreground">
            Create stunning, custom websites for your properties
          </p>
        </div>
        <Link href="/dashboard/websites/new">
          <Button size="lg">Create New Website</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => ( // Added index 'i'
          <Card key={feature.title} className="p-6 transition-colors duration-300 hover:bg-muted/50">
            {/* Alternate icon colors: red (even index) and blue (odd index) */}
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
              i % 2 === 0 ? 'bg-accent-red/10 text-accent-red' : 'bg-primary/10 text-primary'
            }`}>
              {feature.icon}
            </div>
            <h3 className="mb-2 text-lg font-medium">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Website Templates</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.name} className="group overflow-hidden">
              <div className={`relative aspect-video ${template.color} ${template.pattern} ${template.patternSize}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  {template.icon}
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                  <Button size="sm" variant="secondary" className="transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm" className="transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
                    <Wand2 className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
