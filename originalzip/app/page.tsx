import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Home, Star, Globe, BarChart3, Shield } from "lucide-react"
import { ScheduleDemo } from "./components/schedule-demo"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Home className="h-6 w-6 text-primary" />
            <span>HostsHub.ai</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
          </nav>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Showcase Your Properties Like Never Before
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Create stunning websites for your Airbnb properties with custom domains, beautiful templates, and
                  seamless booking integration.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                <img
                  src="/placeholder.svg?height=1080&width=1920"
                  alt="Dashboard preview"
                  width={1920}
                  height={1080}
                  className="object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Everything you need to showcase your properties
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools to create professional property websites that convert visitors into
                guests.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Custom Domains</h3>
              <p className="text-muted-foreground">
                Connect your own domain or use our free subdomain for your property website.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Beautiful Templates</h3>
              <p className="text-muted-foreground">
                Choose from a variety of professional templates designed to showcase your property.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Analytics</h3>
              <p className="text-muted-foreground">
                Track visitor engagement and understand how guests interact with your website.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Booking Protection</h3>
              <p className="text-muted-foreground">
                Ensure your bookings are protected with our integrated booking verification system.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Airbnb Integration</h3>
              <p className="text-muted-foreground">
                Sync your Airbnb listings automatically and keep everything up-to-date.
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Review Showcase</h3>
              <p className="text-muted-foreground">
                Display your best reviews prominently and build trust with potential guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start for free and upgrade as your business grows.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 pt-12">
            {/* Free Plan */}
            <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="text-muted-foreground">Perfect for getting started</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $0<span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>1 property website</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Basic templates</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>HostsHub.ai subdomain</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/signup">
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative flex flex-col p-6 bg-background rounded-lg border border-primary shadow-lg">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Popular
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For professional hosts</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $49<span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>5 property websites</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>All templates</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Custom domain</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Analytics dashboard</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/signup?plan=pro">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>

            {/* Business Plan */}
            <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Business</h3>
                <p className="text-muted-foreground">For property management companies</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $149<span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Unlimited property websites</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Custom templates</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>White-label option</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/signup?plan=business">
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground">For large property management companies</p>
              </div>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $299<span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Everything in Business, plus:</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 text-primary"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Dedicated success manager</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/signup?plan=enterprise">
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Don't just take our word for it</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our customers are saying about HostsHub.ai.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <p className="mt-4">
                "Since using HostsHub.ai, my bookings have increased by 27%. The custom website gives my property a
                professional look that stands out."
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Airbnb Superhost</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <p className="mt-4">
                "As a property manager with 15 listings, HostsHub.ai has streamlined my marketing efforts. The analytics
                help me understand what's working."
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">David Chen</p>
                  <p className="text-xs text-muted-foreground">Property Manager</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-background rounded-lg border shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
                <Star className="h-5 w-5 fill-current text-yellow-500" />
              </div>
              <p className="mt-4">
                "The website templates are beautiful and so easy to customize. My guests love the professional
                experience from booking to checkout."
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Jessica Rivera</p>
                  <p className="text-xs text-muted-foreground">Beach House Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to elevate your hosting business?
              </h2>
              <p className="max-w-[600px] md:text-xl/relaxed">
                Join thousands of hosts who have transformed their property marketing with HostsHub.ai.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule a Demo Section */}
      <div className="container mx-auto py-12 px-4">
        <ScheduleDemo />
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col gap-6 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <Home className="h-6 w-6 text-primary" />
                <span>HostsHub.ai</span>
              </Link>
              <p className="text-sm text-muted-foreground">Showcasing your properties with style since 2023.</p>
            </div>
            <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#features" className="text-muted-foreground hover:text-foreground">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#templates" className="text-muted-foreground hover:text-foreground">
                      Templates
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                      Documentation
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} HostsHub.ai. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
