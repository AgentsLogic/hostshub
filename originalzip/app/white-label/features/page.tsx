import type { Metadata } from "next"
import { CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "White Label Features",
  description: "Explore the features of our white label solution for property management",
}

export default function FeaturesPage() {
  const features = [
    {
      title: "Custom Branding",
      description: "Fully customize the look and feel of your platform with your own branding, colors, and logo.",
      items: [
        "Custom logo and favicon",
        "Brand color scheme",
        "Custom fonts and typography",
        "White label email templates",
        "Branded PDF documents",
      ],
    },
    {
      title: "Custom Domain",
      description: "Use your own domain name for a seamless branded experience for your clients.",
      items: [
        "Custom domain setup",
        "SSL certificate included",
        "Domain management",
        "Email domain integration",
        "Subdomain support",
      ],
    },
    {
      title: "Multiple Templates",
      description: "Choose from a variety of property templates to showcase your listings in the best light.",
      items: [
        "Modern template",
        "Luxury template",
        "Rustic template",
        "Minimalist template",
        "Custom template development",
      ],
    },
    {
      title: "Advanced Analytics",
      description: "Gain insights into your business with comprehensive analytics and reporting.",
      items: ["Booking analytics", "Revenue reporting", "Guest demographics", "Channel performance", "Custom reports"],
    },
    {
      title: "Multi-Channel Management",
      description: "Manage all your listings across multiple platforms from a single dashboard.",
      items: [
        "Airbnb integration",
        "Booking.com integration",
        "VRBO/HomeAway integration",
        "Expedia integration",
        "Custom channel connections",
      ],
    },
    {
      title: "Client Management",
      description: "Manage your clients and their properties with ease.",
      items: ["Client dashboard", "Property assignment", "Client communication", "Access control", "Client reporting"],
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">White Label Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our comprehensive white label solution provides everything you need to run your own branded property
          management platform.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Contact our team today to learn more about our white label solutions and how we can help you grow your
          business.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/white-label/demo"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Request a Demo
          </a>
          <a
            href="/white-label/pricing"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View Pricing
          </a>
        </div>
      </div>
    </div>
  )
}

