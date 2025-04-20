"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton, PropertyCardSkeleton, DashboardSkeleton } from "@/components/ui/skeleton"
import { ErrorMessage, InlineErrorMessage } from "@/components/ui/error-message"
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/ui/animations"
import { ThemeSwitch } from "@/components/theme-switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function UIShowcasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [formError, setFormError] = useState("")
  
  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }
  
  const handleErrorDemo = () => {
    setShowError(true)
    setTimeout(() => {
      setShowError(false)
    }, 3000)
  }
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = form.email.value
    
    if (!email) {
      setFormError("Email is required")
      return
    }
    
    if (!email.includes("@")) {
      setFormError("Please enter a valid email address")
      return
    }
    
    setFormError("")
    alert("Form submitted successfully!")
  }
  
  return (
    <div className="container py-6 space-y-8">
      <FadeIn>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">UI Showcase</h1>
          <ThemeSwitch />
        </div>
        <p className="text-muted-foreground mt-2">
          This page demonstrates the UI improvements made to the application.
        </p>
      </FadeIn>
      
      <Tabs defaultValue="responsive">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="responsive">Responsive</TabsTrigger>
          <TabsTrigger value="theming">Theming</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="loading">Loading States</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="responsive" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Layout</CardTitle>
              <CardDescription>
                The dashboard layout adapts to different screen sizes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Card {i + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        This card will reflow based on the screen size.
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Mobile First</h3>
                  <p className="text-sm text-muted-foreground">
                    All components are designed with a mobile-first approach.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Adaptive UI</h3>
                  <p className="text-sm text-muted-foreground">
                    The sidebar collapses to a hamburger menu on mobile devices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="theming" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Theming Consistency</CardTitle>
              <CardDescription>
                The application supports both light and dark modes with consistent styling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-background border p-4">
                  <h3 className="font-medium mb-2">Background</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-10 rounded bg-background border flex items-center justify-center text-xs">background</div>
                    <div className="h-10 rounded bg-foreground text-background flex items-center justify-center text-xs">foreground</div>
                  </div>
                </div>
                
                <div className="rounded-lg bg-card border p-4">
                  <h3 className="font-medium mb-2">Card</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-10 rounded bg-card border flex items-center justify-center text-xs">card</div>
                    <div className="h-10 rounded bg-card-foreground text-background flex items-center justify-center text-xs">card-foreground</div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Primary</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-10 rounded bg-primary text-primary-foreground flex items-center justify-center text-xs">primary</div>
                    <div className="h-10 rounded bg-secondary text-secondary-foreground flex items-center justify-center text-xs">secondary</div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Accent</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 rounded bg-[hsl(var(--accent-red))] text-[hsl(var(--accent-red-foreground))] flex items-center justify-center text-xs">accent-red</div>
                    <div className="h-10 rounded bg-[hsl(var(--accent-blue))] text-[hsl(var(--accent-blue-foreground))] flex items-center justify-center text-xs">accent-blue</div>
                    <div className="h-10 rounded bg-[hsl(var(--accent-green))] text-[hsl(var(--accent-green-foreground))] flex items-center justify-center text-xs">accent-green</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark mode using the theme switch in the top right corner.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="accessibility" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Improvements</CardTitle>
              <CardDescription>
                Enhanced accessibility with ARIA labels, keyboard navigation, and focus states.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Keyboard Navigation</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  All interactive elements are keyboard accessible. Try tabbing through the elements below:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button>Button 1</Button>
                  <Button variant="outline">Button 2</Button>
                  <Button variant="secondary">Button 3</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Form Controls</h3>
                <form className="space-y-4" onSubmit={handleFormSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      aria-describedby={formError ? "email-error" : undefined}
                      aria-invalid={!!formError}
                    />
                    {formError && (
                      <InlineErrorMessage message={formError} id="email-error" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="notifications" />
                    <Label htmlFor="notifications">Enable notifications</Label>
                  </div>
                  
                  <Button type="submit">Submit Form</Button>
                </form>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">ARIA Attributes</h3>
                <p className="text-sm text-muted-foreground">
                  All components have appropriate ARIA attributes for screen readers.
                </p>
                <div className="rounded-lg border p-4 mt-2" role="region" aria-label="Example region">
                  <p className="text-sm">This region has an aria-label for screen readers.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loading" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading States & Error Handling</CardTitle>
              <CardDescription>
                Improved loading states, skeletons, and error handling UI.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Loading States</h3>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleLoadingDemo} disabled={isLoading}>
                    {isLoading ? "Loading..." : "Show Loading State"}
                  </Button>
                </div>
                
                {isLoading && (
                  <div className="mt-4 space-y-4">
                    <h4 className="text-sm font-medium">Loading Skeletons:</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <PropertyCardSkeleton />
                        <PropertyCardSkeleton />
                        <PropertyCardSkeleton />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Error Handling</h3>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleErrorDemo} variant="destructive">
                    Show Error State
                  </Button>
                </div>
                
                {showError && (
                  <div className="mt-4 space-y-4">
                    <ErrorMessage 
                      title="Operation Failed" 
                      description="There was an error processing your request. Please try again later."
                      retry={() => setShowError(false)}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Status Indicators</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg border border-[hsl(var(--accent-green))] bg-[hsl(var(--accent-green))]/10 p-3">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--accent-green))]" />
                    <span>Operation completed successfully</span>
                  </div>
                  
                  <div className="flex items-center gap-2 rounded-lg border border-destructive bg-destructive/10 p-3">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <span>Operation failed</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="animations" className="mt-6">
          <StaggerContainer className="space-y-6">
            <StaggerItem>
              <Card>
                <CardHeader>
                  <CardTitle>UI Polish & Animations</CardTitle>
                  <CardDescription>
                    Subtle animations and transitions for a more polished user experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <StaggerItem>
                    <div className="space-y-2">
                      <h3 className="font-medium">Fade In Animation</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <FadeIn direction="up" className="rounded-lg border p-4">
                          <p className="text-center">Fade Up</p>
                        </FadeIn>
                        <FadeIn direction="down" className="rounded-lg border p-4">
                          <p className="text-center">Fade Down</p>
                        </FadeIn>
                        <FadeIn direction="left" className="rounded-lg border p-4">
                          <p className="text-center">Fade Left</p>
                        </FadeIn>
                      </div>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <div className="space-y-2">
                      <h3 className="font-medium">Scale Animation</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <ScaleIn className="rounded-lg border p-4 flex items-center justify-center h-24">
                          <p>Scale In</p>
                        </ScaleIn>
                        <ScaleIn delay={0.2} className="rounded-lg border p-4 flex items-center justify-center h-24">
                          <p>Delayed Scale</p>
                        </ScaleIn>
                      </div>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <div className="space-y-2">
                      <h3 className="font-medium">Staggered Animation</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Elements appear one after another with a staggered delay.
                      </p>
                      <div className="grid gap-4 sm:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <StaggerItem key={i}>
                            <div className="rounded-lg border p-4 h-20 flex items-center justify-center">
                              <p>Item {i + 1}</p>
                            </div>
                          </StaggerItem>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
