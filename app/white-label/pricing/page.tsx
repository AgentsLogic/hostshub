import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/white-label" className="text-xl font-bold">
            White Label Solutions
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/white-label/features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/white-label/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/white-label/demo" className="text-sm font-medium hover:text-primary">
              Request Demo
            </Link>
            <Link href="/white-label/success-stories" className="text-sm font-medium hover:text-primary">
              Success Stories
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/white-label/demo">
              <Button variant="outline">Contact Sales</Button>
            </Link>
            <Link href="/signup?plan=white-label">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">White Label Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Flexible pricing options for property management companies of all sizes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-muted-foreground mb-4">For small property management companies</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Up to 10 properties</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Custom domain</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Basic branding options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Email templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Standard support</span>
                </li>
              </ul>
              <Link href="/signup?plan=white-label-basic">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="border rounded-lg overflow-hidden bg-card relative">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
              Most Popular
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-muted-foreground mb-4">For growing property management businesses</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$149</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Up to 50 properties</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Multiple custom domains</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Advanced branding options</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Custom email templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>API access</span>
                </li>
              </ul>
              <Link href="/signup?plan=white-label-professional">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground mb-4">For large property management companies</p>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Unlimited properties</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Multiple custom domains</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Complete white labeling</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Custom development</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Full API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>24/7 premium support</span>
                </li>
              </ul>
              <Link href="/white-label/demo">
                <Button className="w-full">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer tailored white label solutions for property management companies with specific requirements.
            Contact our sales team to discuss your needs.
          </p>
          <Link href="/white-label/demo">
            <Button size="lg">Schedule a Consultation</Button>
          </Link>
        </div>
      </main>

      <footer className="bg-muted mt-24 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">White Label Solutions</h3>
              <p className="text-sm text-muted-foreground">
                Empower your property management business with our white label platform.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/white-label/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/white-label/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/white-label/reseller" className="text-muted-foreground hover:text-foreground">
                    Reseller Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/white-label/docs" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/white-label/success-stories" className="text-muted-foreground hover:text-foreground">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="/white-label/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/legal" className="text-muted-foreground hover:text-foreground">
                    Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HostsHub.ai. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

