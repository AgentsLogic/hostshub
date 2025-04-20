import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function WhiteLabelResellerPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col items-center text-center space-y-4 mb-10">
        <h1 className="text-4xl font-bold" style={{ color: "#4682B4" }}>
          Become a HostsHub.ai Reseller
        </h1>
        <p className="text-xl max-w-2xl" style={{ color: "#4A5568" }}>
          Grow your property management business by offering branded booking websites to your clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#4682B4" }}>Expand Your Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: "#4A5568" }}>
              Offer professional booking websites to your clients without the hassle of building them yourself.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#4682B4" }}>Build Your Brand</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: "#4A5568" }}>
              White-label our platform with your branding, colors, and domain for a seamless client experience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#4682B4" }}>Increase Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ color: "#4A5568" }}>
              Create a new revenue stream by charging clients for their branded booking websites.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#4682B4" }}>
          Reseller Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#4682B4" }}>Starter</CardTitle>
              <CardDescription style={{ color: "#4A5568" }}>For small property managers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                $99<span className="text-lg font-normal">/mo</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Up to 5 clients</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Basic white-labeling</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Custom domain</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle style={{ color: "#4682B4" }}>Professional</CardTitle>
              <CardDescription style={{ color: "#4A5568" }}>For growing property managers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                $199<span className="text-lg font-normal">/mo</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Up to 15 clients</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Advanced white-labeling</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Multiple custom domains</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Custom email templates</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle style={{ color: "#4682B4" }}>Enterprise</CardTitle>
              <CardDescription style={{ color: "#4A5568" }}>For large property managers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">
                $399<span className="text-lg font-normal">/mo</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Unlimited clients</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Complete white-labeling</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Unlimited custom domains</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>24/7 support</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>API access</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span style={{ color: "#4A5568" }}>Custom development</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "#4682B4" }}>
          Ready to grow your business?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: "#4A5568" }}>
          Schedule a demo to see how our white-label solution can help you expand your property management business.
        </p>
        <Link href="/white-label/demo">
          <Button size="lg">Schedule a Demo</Button>
        </Link>
      </div>
    </div>
  )
}

