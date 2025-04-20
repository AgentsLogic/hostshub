"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  FolderPlus,
  Search,
  MoreHorizontal,
  Download,
  Trash2,
  Share2,
  Eye,
  Edit,
  File,
  FileImage,
  FileIcon as FilePdf,
  FileSpreadsheet,
  FileArchive,
  Clock,
  Plus,
  Home,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"

export default function DocumentsPage() {
  const { toast } = useToast()
  const [selectedProperty, setSelectedProperty] = useState("all")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  // Mock data for properties
  const properties = [
    { id: "all", name: "All Properties" },
    { id: "beach-villa", name: "Beach Villa" },
    { id: "mountain-cabin", name: "Mountain Cabin" },
    { id: "city-apartment", name: "City Apartment" },
  ]

  // Mock data for folders
  const folders = [
    { id: "all", name: "All Documents", count: 15 },
    { id: "contracts", name: "Contracts", count: 5 },
    { id: "insurance", name: "Insurance", count: 3 },
    { id: "permits", name: "Permits & Licenses", count: 2 },
    { id: "manuals", name: "Manuals & Guides", count: 4 },
    { id: "receipts", name: "Receipts", count: 1 },
  ]

  // Mock data for documents
  const documents = [
    {
      id: "doc1",
      name: "Rental Agreement - Beach Villa.pdf",
      type: "pdf",
      size: "1.2 MB",
      lastModified: "2023-10-15",
      property: "beach-villa",
      folder: "contracts",
      shared: true,
    },
    {
      id: "doc2",
      name: "Property Insurance Policy.pdf",
      type: "pdf",
      size: "3.5 MB",
      lastModified: "2023-09-22",
      property: "beach-villa",
      folder: "insurance",
      shared: false,
    },
    {
      id: "doc3",
      name: "Short-term Rental Permit.pdf",
      type: "pdf",
      size: "0.8 MB",
      lastModified: "2023-08-10",
      property: "beach-villa",
      folder: "permits",
      shared: false,
    },
    {
      id: "doc4",
      name: "Appliance Manuals.zip",
      type: "zip",
      size: "15.7 MB",
      lastModified: "2023-07-05",
      property: "beach-villa",
      folder: "manuals",
      shared: false,
    },
    {
      id: "doc5",
      name: "Property Photos.zip",
      type: "zip",
      size: "45.2 MB",
      lastModified: "2023-06-20",
      property: "beach-villa",
      folder: "manuals",
      shared: true,
    },
    {
      id: "doc6",
      name: "Rental Agreement - Mountain Cabin.pdf",
      type: "pdf",
      size: "1.1 MB",
      lastModified: "2023-10-10",
      property: "mountain-cabin",
      folder: "contracts",
      shared: true,
    },
    {
      id: "doc7",
      name: "Property Insurance Policy.pdf",
      type: "pdf",
      size: "2.8 MB",
      lastModified: "2023-09-15",
      property: "mountain-cabin",
      folder: "insurance",
      shared: false,
    },
    {
      id: "doc8",
      name: "Maintenance Records.xlsx",
      type: "xlsx",
      size: "0.5 MB",
      lastModified: "2023-08-05",
      property: "mountain-cabin",
      folder: "manuals",
      shared: false,
    },
    {
      id: "doc9",
      name: "Rental Agreement - City Apartment.pdf",
      type: "pdf",
      size: "1.0 MB",
      lastModified: "2023-10-05",
      property: "city-apartment",
      folder: "contracts",
      shared: true,
    },
    {
      id: "doc10",
      name: "Property Insurance Policy.pdf",
      type: "pdf",
      size: "2.5 MB",
      lastModified: "2023-09-10",
      property: "city-apartment",
      folder: "insurance",
      shared: false,
    },
    {
      id: "doc11",
      name: "Building Permit.pdf",
      type: "pdf",
      size: "1.5 MB",
      lastModified: "2023-08-01",
      property: "city-apartment",
      folder: "permits",
      shared: false,
    },
    {
      id: "doc12",
      name: "Furniture Receipt.pdf",
      type: "pdf",
      size: "0.3 MB",
      lastModified: "2023-07-15",
      property: "city-apartment",
      folder: "receipts",
      shared: false,
    },
  ]

  // Filter documents based on selected property, folder, and search query
  const filteredDocuments = documents.filter((doc) => {
    const matchesProperty = selectedProperty === "all" || doc.property === selectedProperty
    const matchesFolder = selectedFolder === "all" || doc.folder === selectedFolder
    const matchesSearch = searchQuery === "" || doc.name.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesProperty && matchesFolder && matchesSearch
  })

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          toast({
            title: "Upload Complete",
            description: "Your document has been uploaded successfully.",
          })

          return 0
        }
        return prev + 10
      })
    }, 300)
  }

  const handleCreateFolder = () => {
    toast({
      title: "Folder Created",
      description: "New folder has been created successfully.",
    })
  }

  const handleDeleteDocument = (docId: string) => {
    toast({
      title: "Document Deleted",
      description: "The document has been deleted successfully.",
    })
  }

  const handleShareDocument = (docId: string) => {
    toast({
      title: "Document Shared",
      description: "The document sharing link has been copied to clipboard.",
    })
  }

  const handleDownloadDocument = (docId: string) => {
    toast({
      title: "Download Started",
      description: "Your document is being downloaded.",
    })
  }

  const handleSelectDocument = (docId: string) => {
    setSelectedDocuments((prev) => {
      if (prev.includes(docId)) {
        return prev.filter((id) => id !== docId)
      } else {
        return [...prev, docId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.id))
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-8 w-8 text-red-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />
      case "zip":
        return <FileArchive className="h-8 w-8 text-yellow-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-8 w-8 text-blue-500" />
      default:
        return <File className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Document Management" text="Store and manage important documents for your properties.">
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>Upload a document to your document management system.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <Input id="file" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property">Property</Label>
                  <Select>
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties
                        .filter((p) => p.id !== "all")
                        .map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder">Folder</Label>
                  <Select>
                    <SelectTrigger id="folder">
                      <SelectValue placeholder="Select folder" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders
                        .filter((f) => f.id !== "all")
                        .map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="share">Share with guests</Label>
                    <Switch id="share" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    When enabled, guests will be able to view this document in their portal.
                  </p>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>Create a new folder to organize your documents.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="folder-name">Folder Name</Label>
                  <Input id="folder-name" placeholder="Enter folder name" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleCreateFolder}>Create Folder</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Folders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant="ghost"
                    className={`w-full justify-start px-4 py-2 h-auto ${
                      selectedFolder === folder.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>{folder.name}</span>
                      </div>
                      <Badge variant="outline">{folder.count}</Badge>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Folder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>Create a new folder to organize your documents.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="folder-name">Folder Name</Label>
                      <Input id="folder-name" placeholder="Enter folder name" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleCreateFolder}>Create Folder</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {properties.map((property) => (
                  <Button
                    key={property.id}
                    variant="ghost"
                    className={`w-full justify-start px-4 py-2 h-auto ${
                      selectedProperty === property.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedProperty(property.id)}
                  >
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>{property.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span>75.5 MB / 1 GB</span>
                </div>
                <Progress value={7.55} className="h-2" />
              </div>
              <Button variant="outline" className="w-full">
                Upgrade Storage
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>
                    {folders.find((f) => f.id === selectedFolder)?.name || "All Documents"}
                    {selectedProperty !== "all" && ` - ${properties.find((p) => p.id === selectedProperty)?.name}`}
                  </CardTitle>
                  <CardDescription>
                    {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      className="pl-8 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedDocuments.length > 0 && (
                <div className="bg-muted p-2 rounded-lg mb-4 flex items-center justify-between">
                  <div className="text-sm">
                    {selectedDocuments.length} document{selectedDocuments.length !== 1 ? "s" : ""} selected
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedDocuments([])}>
                      Cancel
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}

              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">
                          <Checkbox
                            checked={
                              selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Property</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Size</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Modified</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Shared</th>
                        <th className="h-12 px-4 text-left align-middle font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-muted-foreground">No documents found</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredDocuments.map((doc) => (
                          <tr key={doc.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">
                              <Checkbox
                                checked={selectedDocuments.includes(doc.id)}
                                onCheckedChange={() => handleSelectDocument(doc.id)}
                              />
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                {getDocumentIcon(doc.type)}
                                <div>
                                  <div className="font-medium">{doc.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {folders.find((f) => f.id === doc.folder)?.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{properties.find((p) => p.id === doc.property)?.name}</td>
                            <td className="p-4 align-middle">{doc.size}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span>{doc.lastModified}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              {doc.shared ? (
                                <Badge className="bg-green-500">Shared</Badge>
                              ) : (
                                <Badge variant="outline">Private</Badge>
                              )}
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleDownloadDocument(doc.id)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleShareDocument(doc.id)}>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Rename
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteDocument(doc.id)}
                                    className="text-destructive"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Recent document activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Upload className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Rental Agreement - Beach Villa.pdf uploaded</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Share2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Property Photos.zip shared</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Edit className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Property Insurance Policy.pdf renamed</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Download className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Short-term Rental Permit.pdf downloaded</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shared Documents</CardTitle>
                <CardDescription>Documents shared with guests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents
                    .filter((doc) => doc.shared)
                    .slice(0, 4)
                    .map((doc) => (
                      <div key={doc.id} className="flex items-start gap-3">
                        {getDocumentIcon(doc.type)}
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {properties.find((p) => p.id === doc.property)?.name}
                          </p>
                        </div>
                      </div>
                    ))}

                  <Button variant="outline" className="w-full">
                    View All Shared Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

