"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Zap, Crown, BadgeCheck, Shield, Sparkles } from "lucide-react"

export default function PricingPage() {
  const plans = {
    monthly: [
      {
        name: "Basic",
        price: "$129",
        properties: "1 property",
        features: [
          "1 property website",
          "Advanced booking system",
          "Premium templates",
          "Email support"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "Standard",
        price: "$299",
        properties: "Up to 5 properties",
        features: [
          "Up to 5 property websites",
          "Advanced booking system",
          "Premium templates",
          "Priority support",
          "Advanced analytics"
        ],
        cta: "Start Free Trial",
        popular: true
      },
      {
        name: "Premium",
        price: "$499",
        properties: "Up to 10 properties",
        features: [
          "Up to 10 property websites",
          "Advanced booking system",
          "Premium templates",
          "Priority support",
          "Advanced analytics",
          "Team management (up to 5 users)"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "Enterprise",
        price: "$699",
        properties: "10+ properties",
        features: [
          "Unlimited property websites",
          "Advanced booking system",
          "Custom templates",
          "24/7 priority support",
          "Advanced analytics",
          "Unlimited team members",
          "White-label solution",
          "Dedicated account manager"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ],
    annual: [
      {
        name: "Basic",
        price: "$1,161",
        properties: "1 property",
        features: [
          "1 property website",
          "Advanced booking system",
          "Premium templates",
          "Email support"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "Standard",
        price: "$2,691",
        properties: "Up to 5 properties",
        features: [
          "Up to 5 property websites",
          "Advanced booking system",
          "Premium templates",
          "Priority support",
          "Advanced analytics"
        ],
        cta: "Start Free Trial",
        popular: true
      },
      {
        name: "Premium",
        price: "$4,491",
        properties: "Up to 10 properties",
        features: [
          "Up to 10 property websites",
          "Advanced booking system",
          "Premium templates",
          "Priority support",
          "Advanced analytics",
          "Team management (up to 5 users)"
        ],
        cta: "Start Free Trial",
        popular: false
      },
      {
        name: "Enterprise",
        price: "$6,291",
        properties: "10+ properties",
        features: [
          "Unlimited property websites",
          "Advanced booking system",
          "Custom templates",
          "24/7 priority support",
          "Advanced analytics",
          "Unlimited team members",
          "White-label solution",
          "Dedicated account manager"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ],
    lifetime: [
      {
        name: "Basic",
        price: "$3,225",
        properties: "1 property",
        features: [
          "1 property website",
          "Advanced booking system",
          "Premium templates",
          "Email support",
          "Lifetime access"
        ],
        cta: "Buy Now",
        popular: false
      },
      {
        name: "Standard",
        price: "$7,475",
        properties: "Up to 5 properties",
        features: [
          "Up to 5 property websites",
          "Advanced booking system",
          "Premium templates",
          "Priority support",
          "Advanced analytics",
          "Lifetime access"
        ],
        cta: "Buy Now",
        popular: false
      },
      {
        name: "Premium",
        price: "$12,475",
        properties: "Up to 10 properties",
        features: [
          "Up to 10 property websites",
          "Advanced booking system",
          "Premium templates",
          "Priority support",
          "Advanced analytics",
          "Team management (up to 5 users)",
          "Lifetime access"
        ],
        cta: "Buy Now",
        popular: false
      },
      {
        name: "Enterprise",
        price: "$17,475",
        properties: "10+ properties",
        features: [
          "Unlimited property websites",
          "Advanced booking system",
          "Custom templates",
          "24/7 priority support",
          "Advanced analytics",
          "Unlimited team members",
          "White-label solution",
          "Dedicated account manager",
          "Lifetime access"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ]
  }

  const features = [
    {
      name: "Property Websites",
      basic: "1",
      standard: "Up to 5",
      premium: "Up to 10",
      enterprise: "Unlimited"
    },
    {
      name: "Booking System",
      basic: true,
      standard: true,
      premium: true,
      enterprise: true
    },
    {
      name: "Templates",
      basic: "Premium",
      standard: "Premium",
      premium: "Premium",
      enterprise: "Custom"
    },
    {
      name: "Support",
      basic: "Email",
      standard: "Priority",
      premium: "Priority",
      enterprise: "24/7 Priority"
    },
    {
      name: "Analytics",
      basic: "Basic",
      standard: "Advanced",
      premium: "Advanced",
      enterprise: "Advanced"
    },
    {
      name: "Team Members",
      basic: "1",
      standard: "Up to 5",
      premium: "Up to 5",
      enterprise: "Unlimited"
    },
    {
      name: "White-labeling",
      basic: false,
      standard: false,
      premium: false,
      enterprise: true
    },
    {
      name: "API Access",
      basic: false,
      standard: true,
      premium: true,
      enterprise: true
    },
    {
      name: "Dedicated Account Manager",
      basic: false,
      standard: false,
      premium: false,
      enterprise: true
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-100 via-white to-blue-100 border-b overflow-hidden text-center">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-accent-red rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-4 relative z-10">
          <h1 className="text-primary text-4xl md:text-5xl font-extrabold tracking-tight">
            Subscription Plans
          </h1>
          <p className="text-muted-foreground">
            Choose the plan that fits your hosting business needs.
          </p>
        </div>
      </section>

      {/* Pricing Tabs and Plans */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        <Tabs defaultValue="monthly" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
              <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="monthly">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {plans.monthly.map((plan) => (
                <Card key={plan.name} className={`relative overflow-hidden ${plan.popular ? "border-primary shadow-lg" : ""}`}>
<div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-100 opacity-100"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-center">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.popular && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <CardDescription>{plan.properties}</CardDescription>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-sm text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 relative z-10">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="annual">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {plans.annual.map((plan) => (
                <Card key={plan.name} className={`relative overflow-hidden ${plan.popular ? "border-primary shadow-lg" : ""}`}>
<div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-100 opacity-100"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex justify-between items-center">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.popular && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <CardDescription>{plan.properties}</CardDescription>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-sm text-muted-foreground">/year</span>
                    </div>
                    <p className="text-sm text-muted-foreground">(${parseInt(plan.price.replace(/\D/g,''))/10}/month equivalent)</p>
                    <div className="flex items-center mt-1 text-green-500">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Save 25% vs monthly</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 relative z-10">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lifetime">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {plans.lifetime.map((plan) => (
<Card key={plan.name} className={`relative overflow-hidden ${plan.popular ? "border-primary shadow-lg" : ""}`}>
  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-blue-100 opacity-100"></div>
<CardHeader className="relative z-10">
                    <div className="flex justify-between items-center">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.popular && (
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <CardDescription>{plan.properties}</CardDescription>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-sm text-muted-foreground">one-time</span>
                    </div>
                    <div className="flex items-center mt-1 text-green-500">
                      <Check className="h-4 w-4 mr-1" />
                      <span className="text-sm">Save 75%+ vs monthly</span>
                    </div>
                  </CardHeader>
<CardContent className="space-y-3 relative z-10">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
<CardFooter className="relative z-10">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">Plan Comparison</h2>
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Features</th>
                  <th className="p-4 text-center">Basic</th>
                  <th className="p-4 text-center">Standard</th>
                  <th className="p-4 text-center">Premium</th>
                  <th className="p-4 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-muted/50" : ""}>
                    <td className="p-4 font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.basic === 'boolean' ? (
                        feature.basic ? <Check className="h-5 w-5 text-primary mx-auto" /> : "❌"
                      ) : feature.basic}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.standard === 'boolean' ? (
                        feature.standard ? <Check className="h-5 w-5 text-primary mx-auto" /> : "❌"
                      ) : feature.standard}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? <Check className="h-5 w-5 text-primary mx-auto" /> : "❌"
                      ) : feature.premium}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.enterprise === 'boolean' ? (
                        feature.enterprise ? <Check className="h-5 w-5 text-primary mx-auto" /> : "❌"
                      ) : feature.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Basic</CardTitle>
              <Zap className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Perfect for hosts with a single property looking to get started with professional tools.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Standard</CardTitle>
              <BadgeCheck className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ideal for growing businesses managing up to 5 properties with advanced features.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Enterprise</CardTitle>
              <Crown className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                For large property managers and agencies needing unlimited properties and white-labeling.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
