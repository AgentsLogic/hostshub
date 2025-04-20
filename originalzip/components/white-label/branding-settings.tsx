"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function BrandingSettings() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="colors">Colors & Fonts</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Identity</CardTitle>
              <CardDescription>Define your brand's core identity elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input id="brand-name" defaultValue="Vacation Rentals Inc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" defaultValue="Exceptional stays, unforgettable experiences" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand-description">Brand Description</Label>
                <Textarea
                  id="brand-description"
                  rows={4}
                  defaultValue="We provide luxury vacation rentals in the most sought-after destinations. Our properties offer exceptional comfort and amenities for an unforgettable stay."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="white-label">White Label Mode</Label>
                  <Switch id="white-label" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Remove all references to our platform from your guest-facing pages
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Colors & Typography</CardTitle>
              <CardDescription>Customize the look and feel of your branded pages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Brand Colors</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex space-x-2">
                      <div className="h-10 w-10 rounded-md bg-primary" />
                      <Input id="primary-color" defaultValue="#0070f3" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <div className="h-10 w-10 rounded-md bg-secondary" />
                      <Input id="secondary-color" defaultValue="#f5f5f5" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex space-x-2">
                      <div className="h-10 w-10 rounded-md bg-green-500" />
                      <Input id="accent-color" defaultValue="#10b981" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex space-x-2">
                      <div className="h-10 w-10 rounded-md bg-foreground" />
                      <Input id="text-color" defaultValue="#333333" />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Typography</h3>
                <div className="space-y-2">
                  <Label htmlFor="heading-font">Heading Font</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger id="heading-font">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body-font">Body Font</Label>
                  <Select defaultValue="roboto">
                    <SelectTrigger id="body-font">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="montserrat">Montserrat</SelectItem>
                      <SelectItem value="poppins">Poppins</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Base Font Size</Label>
                  <div className="flex items-center space-x-2">
                    <Slider defaultValue={[16]} max={24} min={12} step={1} />
                    <span className="w-12 text-center">16px</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Theme Style</h3>
                <RadioGroup defaultValue="light">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="auto" id="theme-auto" />
                    <Label htmlFor="theme-auto">Auto (follows user's system preference)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Assets</CardTitle>
              <CardDescription>Upload and manage your brand's visual assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Logo</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Primary Logo</Label>
                    <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src="/placeholder.svg?height=64&width=200"
                          alt="Logo preview"
                          className="h-16 object-contain"
                        />
                        <Button variant="outline" size="sm">
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended size: 200x64px, PNG or SVG</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                      <div className="flex flex-col items-center space-y-2">
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="Favicon preview"
                          className="h-8 w-8 object-contain"
                        />
                        <Button variant="outline" size="sm">
                          Upload Favicon
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended size: 32x32px, PNG or ICO</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Default Images</h3>
                <div className="space-y-2">
                  <Label>Default Property Image</Label>
                  <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src="/placeholder.svg?height=200&width=300"
                        alt="Default property image"
                        className="h-32 object-cover"
                      />
                      <Button variant="outline" size="sm">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used when no property image is available. Recommended size: 1200x800px
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Social Media</h3>
                <div className="space-y-2">
                  <Label>Social Media Banner</Label>
                  <div className="flex h-48 items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Social media banner"
                        className="h-32 object-cover"
                      />
                      <Button variant="outline" size="sm">
                        Upload Banner
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used for social media sharing. Recommended size: 1200x630px
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

