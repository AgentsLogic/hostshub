"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Mail,
  Plus,
  Calendar,
  Users,
  BarChart,
  Send,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  PauseCircle,
  PlayCircle,
  Instagram,
  Facebook,
  Twitter,
  Image,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  ArrowUpDown, // Added missing import
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
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define generateStaticParams to ensure the page gets pre-rendered properly
export function generateStaticParams() {
  return []
}

export default function MarketingCampaignsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("email")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for email campaigns
  const emailCampaigns = [
    {
      id: "ec1",
      name: "Welcome Series",
      subject: "Welcome to [Property Name]!",
      status: "active",
      audience: "New Guests",
      recipients: 45,
      openRate: 68,
      clickRate: 32,
      lastSent: "2023-10-15",
      schedule: "Automated",
      type: "email",
      platform: "", // Added default platform
    },
    {
      id: "ec2",
      name: "Post-Stay Follow-up",
      subject: "How was your stay with us?",
      status: "active",
      audience: "Past Guests",
      recipients: 120,
      openRate: 52,
      clickRate: 24,
      lastSent: "2023-10-10",
      schedule: "Automated",
      type: "email",
      platform: "", // Added default platform
    },
    {
      id: "ec3",
      name: "Holiday Special Offer",
      subject: "Special Holiday Rates Just For You!",
      status: "draft",
      audience: "All Guests",
      recipients: 250,
      openRate: 0,
      clickRate: 0,
      lastSent: "Never",
      schedule: "One-time",
      type: "email",
      platform: "", // Added default platform
    },
    {
      id: "ec4",
      name: "Local Events Newsletter",
      subject: "Upcoming Events Near [Property Name]",
      status: "paused",
      audience: "Current & Future Guests",
      recipients: 85,
      openRate: 45,
      clickRate: 18,
      lastSent: "2023-09-22",
      schedule: "Monthly",
      type: "email",
      platform: "", // Added default platform
    },
    {
      id: "ec5",
      name: "Booking Anniversary",
      subject: "It's been a year since your stay with us!",
      status: "active",
      audience: "Past Guests (1 year)",
      recipients: 65,
      openRate: 60,
      clickRate: 28,
      lastSent: "2023-10-05",
      schedule: "Automated",
      type: "email",
      platform: "", // Added default platform
    },
  ]

  // Mock data for social media campaigns
  const socialCampaigns = [
    {
      id: "sc1",
      name: "Summer Promotion",
      status: "active",
      platform: "instagram",
      audience: "Followers",
      reach: 1250,
      engagement: 320,
      clicks: 85,
      lastPosted: "2023-10-12",
      schedule: "Weekly",
      type: "social",
      openRate: 0, // Added default openRate
      clickRate: 0, // Added default clickRate
    },
    {
      id: "sc2",
      name: "Property Showcase",
      status: "active",
      platform: "facebook",
      audience: "Targeted Ads",
      reach: 3500,
      engagement: 450,
      clicks: 120,
      lastPosted: "2023-10-08",
      schedule: "Bi-weekly",
      type: "social",
      openRate: 0, // Added default openRate
      clickRate: 0, // Added default clickRate
    },
    {
      id: "sc3",
      name: "Guest Testimonials",
      status: "draft",
      platform: "twitter",
      audience: "Followers",
      reach: 0,
      engagement: 0,
      clicks: 0,
      lastPosted: "Never",
      schedule: "Monthly",
      type: "social",
      openRate: 0, // Added default openRate
      clickRate: 0, // Added default clickRate
    },
    {
      id: "sc4",
      name: "Local Area Highlights",
      status: "paused",
      platform: "instagram",
      audience: "Followers",
      reach: 980,
      engagement: 210,
      clicks: 45,
      lastPosted: "2023-09-20",
      schedule: "Weekly",
      type: "social",
      openRate: 0, // Added default openRate
      clickRate: 0, // Added default clickRate
    },
    {
      id: "sc5",
      name: "Special Offers",
      status: "active",
      platform: "facebook",
      audience: "Targeted Ads",
      reach: 2800,
      engagement: 380,
      clicks: 95,
      lastPosted: "2023-10-01",
      schedule: "Monthly",
      type: "social",
      openRate: 0, // Added default openRate
      clickRate: 0, // Added default clickRate
    },
  ]

  // Filter campaigns based on active tab, search query, and status filter
  const getFilteredCampaigns = () => {
    const campaigns = activeTab === "email" ? emailCampaigns : socialCampaigns

    return campaigns.filter((campaign) => {
      const nameMatch = campaign.name || "" // Fallback for undefined name
      const statusMatch = campaign.status || "" // Fallback for undefined status
      const matchesSearch = searchQuery === "" || nameMatch.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || statusMatch === statusFilter

      return matchesSearch && matchesStatus
    })
  }

  const filteredCampaigns = getFilteredCampaigns()

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Created",
      description: "Your campaign has been created successfully.",
    })
  }

  const handleDuplicateCampaign = (campaignId) => {
    toast({
      title: "Campaign Duplicated",
      description: "Your campaign has been duplicated successfully.",
    })
  }

  const handleDeleteCampaign = (campaignId) => {
    toast({
      title: "Campaign Deleted",
      description: "Your campaign has been deleted successfully.",
    })
  }

  const handleToggleCampaignStatus = (campaignId, currentStatus) => {
    const status = currentStatus || "draft" // Fallback for undefined status
    const newStatus = status === "active" ? "paused" : "active"
    const action = newStatus === "active" ? "activated" : "paused"

    toast({
      title: `Campaign ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      description: `Your campaign has been ${action} successfully.`,
    })
  }

  // Helper function to safely capitalize strings
  const safeCapitalize = (str) => {
    if (typeof str === 'string' && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return ''; // Return empty string if input is not a valid string
  };

  const getStatusBadge = (status) => {
    const safeStatus = status || "draft" // Fallback
    switch (safeStatus) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "paused":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Paused
          </Badge>
        )
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      default:
        return <Badge variant="outline">{safeCapitalize(safeStatus)}</Badge>
    }
  }

  const getStatusIcon = (status) => {
    const safeStatus = status || "draft" // Fallback
    switch (safeStatus) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <PauseCircle className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <Edit className="h-4 w-4 text-muted-foreground" />
      default:
        return null
    }
  }

  const getPlatformIcon = (platform) => {
    const safePlatform = platform || "" // Fallback
    switch (safePlatform) {
      case "instagram":
        return <Instagram className="h-4 w-4 text-pink-500" />
      case "facebook":
        return <Facebook className="h-4 w-4 text-blue-500" />
      case "twitter":
        return <Twitter className="h-4 w-4 text-sky-500" />
      default:
        return null
    }
  }

  const getAudienceCount = (audience) => {
    switch (audience) {
      case "All Guests":
        return 250
      case "Past Guests":
        return 120
      case "New Guests":
        return 45
      case "Current & Future Guests":
        return 85
      case "Past Guests (1 year)":
        return 65
      case "Followers":
        return 1500
      case "Targeted Ads":
        return 5000
      default:
        return 0
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Marketing Campaigns"
        text="Create and manage email and social media campaigns for your properties."
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>Create a new marketing campaign to promote your properties.</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="email" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Campaign
                </TabsTrigger>
                <TabsTrigger value="social">
                  <Instagram className="mr-2 h-4 w-4" />
                  Social Media
                </TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name-email">Campaign Name</Label>
                  <Input id="campaign-name-email" placeholder="e.g., Summer Promotion" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Email Subject</Label>
                  <Input id="email-subject" placeholder="e.g., Special Summer Rates Just For You!" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience-email">Audience</Label>
                  <Select>
                    <SelectTrigger id="audience-email">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-guests">All Guests</SelectItem>
                      <SelectItem value="past-guests">Past Guests</SelectItem>
                      <SelectItem value="new-guests">New Guests</SelectItem>
                      <SelectItem value="current-future">Current & Future Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-email">Schedule</Label>
                  <Select>
                    <SelectTrigger id="schedule-email">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="automated">Automated</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-content">Email Content</Label>
                  <Textarea id="email-content" placeholder="Enter your email content here..." rows={6} />
                </div>
              </TabsContent>
              <TabsContent value="social" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name-social">Campaign Name</Label>
                  <Input id="campaign-name-social" placeholder="e.g., Property Showcase" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience-social">Audience</Label>
                  <Select>
                    <SelectTrigger id="audience-social">
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="followers">Followers</SelectItem>
                      <SelectItem value="targeted-ads">Targeted Ads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-social">Schedule</Label>
                  <Select>
                    <SelectTrigger id="schedule-social">
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-content">Post Content</Label>
                  <Textarea id="post-content" placeholder="Enter your post content here..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Media</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Image className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop an image here, or click to browse
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Upload Image
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email Campaigns
          </TabsTrigger>
          <TabsTrigger value="social">
            <Instagram className="mr-2 h-4 w-4" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="audience">
            <Users className="mr-2 h-4 w-4" />
            Audience
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredCampaigns.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-40">
                  <Mail className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No campaigns found</p>
                </CardContent>
              </Card>
            ) : (
              filteredCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{campaign.name || "Untitled Campaign"}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(campaign.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateCampaign(campaign.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {campaign.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                              >
                                <PauseCircle className="mr-2 h-4 w-4" />
                                Pause
                              </DropdownMenuItem>
                            ) : campaign.status === "paused" ? (
                              <DropdownMenuItem
                                onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                              >
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                              >
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardDescription>Subject: {campaign.subject || "No Subject"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Audience</div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.audience || "N/A"}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{campaign.recipients || 0} recipients</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Schedule</div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.schedule || "N/A"}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last sent:{" "}
                          {campaign.lastSent === "Never" ? "Never" : new Date(campaign.lastSent || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Performance</div>
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-sm font-medium">{campaign.openRate || 0}%</div>
                            <div className="text-xs text-muted-foreground">Open rate</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{campaign.clickRate || 0}%</div>
                            <div className="text-xs text-muted-foreground">Click rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    {campaign.status === "draft" ? (
                      <Button size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Send
                      </Button>
                    ) : campaign.status === "active" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                      >
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pause
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Activate
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
                  className="pl-8 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredCampaigns.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-40">
                  <Instagram className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No campaigns found</p>
                </CardContent>
              </Card>
            ) : (
              filteredCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(campaign.platform)}
                        <CardTitle className="text-lg">{campaign.name || "Untitled Campaign"}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(campaign.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateCampaign(campaign.id)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {campaign.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                              >
                                <PauseCircle className="mr-2 h-4 w-4" />
                                Pause
                              </DropdownMenuItem>
                            ) : campaign.status === "paused" ? (
                              <DropdownMenuItem
                                onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                              >
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                              >
                                <PlayCircle className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardDescription>
                      Platform: {safeCapitalize(campaign.platform)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Audience</div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.audience || "N/A"}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Schedule</div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.schedule || "N/A"}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last posted:{" "}
                          {campaign.lastPosted === "Never"
                            ? "Never"
                            : new Date(campaign.lastPosted || Date.now()).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Performance</div>
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="text-sm font-medium">{campaign.reach || 0}</div>
                            <div className="text-xs text-muted-foreground">Reach</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{campaign.engagement || 0}</div>
                            <div className="text-xs text-muted-foreground">Engagement</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium">{campaign.clicks || 0}</div>
                            <div className="text-xs text-muted-foreground">Clicks</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    {campaign.status === "draft" ? (
                      <Button size="sm">
                        <Send className="mr-2 h-4 w-4" />
                        Post
                      </Button>
                    ) : campaign.status === "active" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}
                      >
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pause
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleToggleCampaignStatus(campaign.id, campaign.status)}>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Activate
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Analytics content remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Email Performance</CardTitle>
                <CardDescription>Overall email campaign performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Open Rate</span>
                      <span>58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                    <div className="text-xs text-muted-foreground">Industry average: 45%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Click Rate</span>
                      <span>24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                    <div className="text-xs text-muted-foreground">Industry average: 18%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversion Rate</span>
                      <span>5.2%</span>
                    </div>
                    <Progress value={5.2} className="h-2" />
                    <div className="text-xs text-muted-foreground">Industry average: 3.8%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Social Media Performance</CardTitle>
                <CardDescription>Overall social media performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engagement Rate</span>
                      <span>4.8%</span>
                    </div>
                    <Progress value={48} className="h-2" />
                    <div className="text-xs text-muted-foreground">Industry average: 3.5%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Click-through Rate</span>
                      <span>2.1%</span>
                    </div>
                    <Progress value={21} className="h-2" />
                    <div className="text-xs text-muted-foreground">Industry average: 1.5%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversion Rate</span>
                      <span>1.8%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <div className="text-xs text-muted-foreground">Industry average: 1.2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Campaign Overview</CardTitle>
                <CardDescription>Summary of all campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">10</div>
                      <div className="text-sm text-muted-foreground">Total Campaigns</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-sm text-muted-foreground">Active Campaigns</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Campaign Types</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm">Email: 5</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-500" />
                        <span className="text-sm">Instagram: 2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Facebook: 2</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-sky-500" />
                        <span className="text-sm">Twitter: 1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Performance metrics for all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">Campaign</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Audience</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Open/Reach</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Click/Engagement</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Conversion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...emailCampaigns, ...socialCampaigns].map((campaign) => (
                        <tr key={campaign.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{campaign.name || "N/A"}</td>
                          <td className="p-4 align-middle">
                            {campaign.type === "email" ? (
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>Email</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                {getPlatformIcon(campaign.platform)}
                                <span>{safeCapitalize(campaign.platform)}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(campaign.status)}
                              <span>{safeCapitalize(campaign.status)}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{campaign.audience || "N/A"}</td>
                          <td className="p-4 align-middle text-right">
                            {campaign.type === "email" ? `${campaign.openRate || 0}%` : campaign.reach || 0}
                          </td>
                          <td className="p-4 align-middle text-right">
                            {campaign.type === "email" ? `${campaign.clickRate || 0}%` : campaign.engagement || 0}
                          </td>
                          <td className="p-4 align-middle text-right">{campaign.type === "email" ? "3.5%" : "1.2%"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          {/* Audience content remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Audience Overview</CardTitle>
                <CardDescription>Summary of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">250</div>
                      <div className="text-sm text-muted-foreground">Total Contacts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">85%</div>
                      <div className="text-sm text-muted-foreground">Active Subscribers</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Audience Growth</div>
                    <div className="flex items-center gap-1 text-green-500">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>+12% in the last 30 days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Audience Segments</CardTitle>
                <CardDescription>Breakdown of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Past Guests</span>
                      <span>120 (48%)</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current & Future Guests</span>
                      <span>85 (34%)</span>
                    </div>
                    <Progress value={34} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Newsletter Subscribers</span>
                      <span>45 (18%)</span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Social Media Followers</CardTitle>
                <CardDescription>Your social media audience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Instagram className="h-4 w-4 text-pink-500" />
                        <span>Instagram</span>
                      </div>
                      <span>850</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Facebook className="h-4 w-4 text-blue-500" />
                        <span>Facebook</span>
                      </div>
                      <span>1,250</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Twitter className="h-4 w-4 text-sky-500" />
                        <span>Twitter</span>
                      </div>
                      <span>450</span>
                    </div>
                    <Progress value={36} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Audience Management</CardTitle>
              <CardDescription>Manage your audience and contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search contacts..." className="pl-8 w-[250px]" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by segment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Segments</SelectItem>
                        <SelectItem value="past-guests">Past Guests</SelectItem>
                        <SelectItem value="current-future">Current & Future</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Contact
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Segment</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Last Interaction</th>
                          <th className="h-12 px-4 text-right align-middle font-medium"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Mock Contact Data */}
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Smith" />
                                <AvatarFallback>JS</AvatarFallback>
                              </Avatar>
                              <span>John Smith</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">john.smith@example.com</td>
                          <td className="p-4 align-middle">Past Guests</td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-green-500">Active</Badge>
                          </td>
                          <td className="p-4 align-middle">2023-10-15</td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        {/* Add more mock rows as needed */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
