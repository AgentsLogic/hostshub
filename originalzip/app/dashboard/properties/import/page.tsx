"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { HotelIcon as Airbnb, Globe, Home, Upload, Database, CheckCircle2, AlertCircle } from "lucide-react"

export default function PropertyImportPage() {
  const { toast } = useToast()
  const [isImporting, setIsImporting] = useState(false)
  const [importSource, setImportSource] = useState("airbnb")
  const [importProgress, setImportProgress] = useState(0)
  const [importStatus, setImportStatus] = useState<"idle" | "importing" | "success" | "error">("idle")

  // Mock data for import results
  const [importResults, setImportResults] = useState<{
    total: number
    imported: number
    skipped: number
    properties: Array<{
      name: string
      status: "imported" | "skipped" | "error"
      message?: string
    }>
  } | null>(null)

  const handleImport = () => {
    setIsImporting(true)
    setImportStatus("importing")
    setImportProgress(0)

    // Simulate import process
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsImporting(false)
          setImportStatus("success")

          // Mock import results
          setImportResults({
            total: 5,
            imported: 3,
            skipped: 2,
            properties: [
              { name: "Beach Villa", status: "imported" },
              { name: "Mountain Cabin", status: "imported" },
              { name: "City Apartment", status: "imported" },
              { name: "Lake House", status: "skipped", message: "Property already exists" },
              { name: "Country Cottage", status: "error", message: "Missing required information" },
            ],
          })

          toast({
            title: "Import Complete",
            description: "3 properties have been imported successfully.",
          })
        }
        return newProgress
      })
    }, 500)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: "File Uploaded",
        description: `${e.target.files[0].name} has been uploaded and is ready for import.`,
      })
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Import Properties"
        text="Import your properties from external platforms or spreadsheets"
      />

      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="platforms">
            <Globe className="mr-2 h-4 w-4" />
            From Platforms
          </TabsTrigger>
          <TabsTrigger value="file">
            <Upload className="mr-2 h-4 w-4" />
            From File
          </TabsTrigger>
          <TabsTrigger value="manual">
            <Home className="mr-2 h-4 w-4" />
            Manual Entry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import from Booking Platforms</CardTitle>
              <CardDescription>Connect to your accounts on booking platforms to import your properties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className={`border-2 cursor-pointer ${importSource === "airbnb" ? "border-[#FF5A5F]" : "border-muted"}`}
                  onClick={() => setImportSource("airbnb")}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#FF5A5F] text-white flex items-center justify-center mb-2">
                      <Airbnb className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Airbnb</h3>
                    <p className="text-sm text-muted-foreground">Import from your Airbnb account</p>
                  </CardContent>
                </Card>

                <Card
                  className={`border-2 cursor-pointer ${importSource === "vrbo" ? "border-[#3D67FF]" : "border-muted"}`}
                  onClick={() => setImportSource("vrbo")}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#3D67FF] text-white flex items-center justify-center mb-2">
                      <Home className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">VRBO</h3>
                    <p className="text-sm text-muted-foreground">Import from your VRBO account</p>
                  </CardContent>
                </Card>

                <Card
                  className={`border-2 cursor-pointer ${importSource === "booking" ? "border-[#003580]" : "border-muted"}`}
                  onClick={() => setImportSource("booking")}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#003580] text-white flex items-center justify-center mb-2">
                      <Database className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Booking.com</h3>
                    <p className="text-sm text-muted-foreground">Import from your Booking.com account</p>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Connect to {importSource.charAt(0).toUpperCase() + importSource.slice(1)}
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" placeholder="Enter your API key" />
                  <p className="text-sm text-muted-foreground">
                    You can find your API key in your {importSource.charAt(0).toUpperCase() + importSource.slice(1)}{" "}
                    account settings.
                  </p>
                </div>

                {importSource === "airbnb" && (
                  <div className="space-y-2">
                    <Label htmlFor="user-id">Airbnb User ID</Label>
                    <Input id="user-id" placeholder="Enter your Airbnb user ID" />
                  </div>
                )}

                {importStatus === "importing" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Importing properties...</span>
                      <span>{importProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${importProgress}%` }}></div>
                    </div>
                  </div>
                )}

                {importStatus === "success" && importResults && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <p className="font-medium text-green-800">Import Successful</p>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        {importResults.imported} of {importResults.total} properties were imported successfully.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Import Results</h4>
                      <div className="space-y-2">
                        {importResults.properties.map((property, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center gap-2">
                              {property.status === "imported" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : property.status === "error" ? (
                                <AlertCircle className="h-4 w-4 text-red-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              )}
                              <span>{property.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {property.message || (property.status === "imported" ? "Imported successfully" : "")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleImport} disabled={isImporting}>
                {isImporting ? "Importing..." : "Import Properties"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="file" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import from File</CardTitle>
              <CardDescription>Upload a CSV or Excel file with your property data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <h3 className="font-medium">Upload File</h3>
                <p className="text-sm text-muted-foreground mb-4">Drag and drop your file here, or click to browse</p>
                <Input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                  Browse Files
                </Button>
                <p className="text-xs text-muted-foreground mt-4">Supported formats: CSV, XLSX</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Template</h3>
                <p className="text-sm text-muted-foreground">
                  Download our template file to ensure your data is formatted correctly.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  Download Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Property Entry</CardTitle>
              <CardDescription>Add a new property manually</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-4">
                For manual property entry, please use the "Create New Property" button on the Properties page.
              </p>
              <div className="flex justify-center">
                <Button onClick={() => (window.location.href = "/dashboard/properties/new")}>
                  Create New Property
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

