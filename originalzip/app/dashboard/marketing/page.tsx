"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import {
  Loader2,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  Copy,
  Check,
  Image,
  Plus,
  Share2,
  Eye,
  FileText,
  BarChart3,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for marketing campaigns
const mockCampaigns = [
  {
    id: "1",
    name: "Summer Special Promotion",
    description: "20% off for bookings in June and July",
    status: "active",
    platform: "email",
    audience: "past_guests",
    startDate: "2023-05-15",
    endDate: "2023-07-31",
    budget: 200,
    performance: {
      sent: 500,
      opened: 320,
      clicked: 150,
      converted: 25,
      revenue: 5000,
    },
  },
  {
    id: "2",
    name: "Fall Getaway",
    description: "Enjoy the beautiful fall colors with a special weekend package",
    status: "scheduled",
    platform: "social",
    audience: "all",
    startDate: "2023-09-01",
    endDate: "2023-10-15",
    budget: 300,
    performance: {
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
    },
  },
  {
    id: "3",
    name: "Holiday Season Promotion",
    description: "Special rates for Christmas and New Year's Eve",
    status: "draft",
    platform: "email",
    audience: "all",
    startDate: "2023-11-15",
    endDate: "2023-12-31",
    budget: 400,
    performance: {
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
    },
  },
  {
    id: "4",
    name: "Instagram Photo Contest",
    description: "Share your best vacation photo for a chance to win a free night",
    status: "active",
    platform: "social",
    audience: "past_guests",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    budget: 150,
    performance: {
      sent: 1000,
      opened: 800,
      clicked: 400,
      converted: 15,
      revenue: 3000,
    },
  },
  {
    id: "5",
    name: "Last Minute Deals",
    description: "30% off for bookings made within 7 days of check-in",
    status: "completed",
    platform: "website",
    audience: "all",
    startDate: "2023-04-01",
    endDate: "2023-05-31",
    budget: 100,
    performance: {
      sent: 2000,
      opened: 1500,
      clicked: 800,
      converted: 50,
      revenue: 7500,
    },
  },
]

// Mock data for email templates
const mockEmailTemplates = [
  {
    id: "1",
    name: "Welcome Email",
    subject: "Welcome to Our Property!",
    previewText: "Thank you for booking with us. Here's everything you need to know.",
    content:
      "Dear {guest_name},\n\nThank you for choosing to stay at {property_name}! We're excited to host you from {check_in_date} to {check_out_date}.\n\nHere's some important information about your stay:\n\n- Check-in time: 3:00 PM\n- Check-out time: 11:00 AM\n- Address: {property_address}\n- Wi-Fi password: {wifi_password}\n\nIf you have any questions before your arrival, please don't hesitate to contact us.\n\nWe look forward to welcoming you!\n\nBest regards,\n{host_name}",
  },
  {
    id: "2",
    name: "Pre-arrival Information",
    subject: "Your Stay at {property_name} is Coming Up!",
    previewText: "Important information for your upcoming stay.",
    content:
      "Dear {guest_name},\n\nYour stay at {property_name} is just a few days away! Here's some information to help you prepare for your arrival on {check_in_date}.\n\n## Check-in Instructions\n\n- Check-in time: 3:00 PM\n- Address: {property_address}\n- Access code: {access_code}\n\n## Directions\n\n{directions}\n\n## Local Recommendations\n\n{local_recommendations}\n\nIf you have any questions, please don't hesitate to contact us.\n\nWe look forward to welcoming you!\n\nBest regards,\n{host_name}",
  },
  {
    id: "3",
    name: "Post-stay Thank You",
    subject: "Thank You for Staying with Us!",
    previewText: "We hope you enjoyed your stay. Please leave a review!",
    content:
      "Dear {guest_name},\n\nThank you for staying at {property_name}. We hope you had a wonderful time!\n\nWe would greatly appreciate it if you could take a moment to leave a review of your experience. Your feedback helps us improve and also helps future guests make informed decisions.\n\n[Leave a Review]({review_link})\n\nWe hope to welcome you back in the future!\n\nBest regards,\n{host_name}",
  },
  {
    id: "4",
    name: "Special Offer",
    subject: "Exclusive Offer Just for You!",
    previewText: "Enjoy a special discount on your next stay with us.",
    content:
      "Dear {guest_name},\n\nAs a valued past guest, we're pleased to offer you an exclusive discount on your next stay at any of our properties.\n\nUse code **{discount_code}** when booking to receive {discount_amount}% off your next reservation.\n\nThis offer is valid until {expiration_date}.\n\n[Book Now]({booking_link})\n\nWe hope to welcome you back soon!\n\nBest regards,\n{host_name}",
  },
  {
    id: "5",
    name: "Booking Confirmation",
    subject: "Your Booking at {property_name} is Confirmed!",
    previewText: "Details of your upcoming reservation.",
    content:
      "Dear {guest_name},\n\nYour booking at {property_name} has been confirmed!\n\n## Booking Details\n\n- Check-in: {check_in_date}\n- Check-out: {check_out_date}\n- Number of guests: {guest_count}\n- Total amount: {total_amount}\n\nYou can view your booking details and make changes if needed by clicking the link below:\n\n[View Booking]({booking_link})\n\nIf you have any questions, please don't hesitate to contact us.\n\nWe look forward to welcoming you!\n\nBest regards,\n{host_name}",
  },
]

// Mock data for social media posts
const mockSocialPosts = [
  {
    id: "1",
    title: "Summer Sunset View",
    content:
      "Enjoy breathtaking sunset views from our beachfront villa. Book now for the perfect summer getaway! #SummerVacation #BeachVilla",
    image: "/placeholder.svg?height=300&width=500",
    platform: "instagram",
    status: "published",
    publishDate: "2023-06-15",
    performance: {
      likes: 120,
      comments: 15,
      shares: 8,
      clicks: 45,
    },
  },
  {
    id: "2",
    title: "Cozy Winter Retreat",
    content:
      "Escape the cold with a cozy stay at our mountain cabin. Enjoy the fireplace, hot tub, and stunning snow-covered views. #WinterGetaway #MountainCabin",
    image: "/placeholder.svg?height=300&width=500",
    platform: "facebook",
    status: "scheduled",
    publishDate: "2023-11-20",
    performance: {
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0,
    },
  },
  {
    id: "3",
    title: "City Lights",
    content:
      "Experience the vibrant city life from our downtown apartment. Walking distance to restaurants, shops, and attractions. #CityLife #UrbanStay",
    image: "/placeholder.svg?height=300&width=500",
    platform: "instagram",
    status: "draft",
    publishDate: "",
    performance: {
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0,
    },
  },
  {
    id: "4",
    title: "Last Minute Deal",
    content:
      "Spontaneous getaway? We've got you covered! 20% off for bookings made within 48 hours of check-in. Limited availability. #LastMinuteDeal #Discount",
    image: "/placeholder.svg?height=300&width=500",
    platform: "twitter",
    status: "published",
    publishDate: "2023-07-10",
    performance: {
      likes: 85,
      comments: 7,
      shares: 32,
      clicks: 60,
    },
  },
  {
    id: "5",
    title: "Lakeside Tranquility",
    content:
      "Wake up to the peaceful sounds of nature at our lakeside property. Perfect for a relaxing retreat. #LakeHouse #PeacefulRetreat",
    image: "/placeholder.svg?height=300&width=500",
    platform: "facebook",
    status: "published",
    publishDate: "2023-05-25",
    performance: {
      likes: 210,
      comments: 28,
      shares: 15,
      clicks: 75,
    },
  },
]

// Mock properties for filtering
const mockProperties = [
  { id: "1", name: "Beach Villa" },
  { id: "2", name: "Mountain Cabin" },
  { id: "3", name: "City Apartment" },
  { id: "4", name: "Lake House" },
]

export default function MarketingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("campaigns")
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [emailTemplates, setEmailTemplates] = useState<any[]>([])
  const [socialPosts, setSocialPosts] = useState<any[]>([])
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null)
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<any>(null)
  const [selectedSocialPost, setSelectedSocialPost] = useState<any>(null)
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false)
  const [isNewEmailTemplateDialogOpen, setIsNewEmailTemplateDialogOpen] = useState(false)
  const [isNewSocialPostDialogOpen, setIsNewSocialPostDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    platform: "email",
    audience: "all",
    startDate: "",
    endDate: "",
    budget: 0,
  })
  const [newEmailTemplate, setNewEmailTemplate] = useState({
    name: "",
    subject: "",
    previewText: "",
    content: "",
  })
  const [newSocialPost, setNewSocialPost] = useState({
    title: "",
    content: "",
    image: "/placeholder.svg?height=300&width=500",
    platform: "instagram",
    publishDate: "",
  })

  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      setCampaigns(mockCampaigns)
      setEmailTemplates(mockEmailTemplates)
      setSocialPosts(mockSocialPosts)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.platform || !newCampaign.startDate || !newCampaign.endDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to create campaign
    setTimeout(() => {
      const newCampaignObj = {
        id: (campaigns.length + 1).toString(),
        ...newCampaign,
        status: "draft",
        performance: {
          sent: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
          revenue: 0,
        },
      }

      setCampaigns((prev) => [...prev, newCampaignObj])

      toast({
        title: "Success",
        description: "Campaign created successfully",
      })

      setIsLoading(false)
      setIsNewCampaignDialogOpen(false)
      setNewCampaign({
        name: "",
        description: "",
        platform: "email",
        audience: "all",
        startDate: "",
        endDate: "",
        budget: 0,
      })
    }, 1000)
  }

  const handleCreateEmailTemplate = () => {
    if (!newEmailTemplate.name || !newEmailTemplate.subject || !newEmailTemplate.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to create email template
    setTimeout(() => {
      const newEmailTemplateObj = {
        id: (emailTemplates.length + 1).toString(),
        ...newEmailTemplate,
      }

      setEmailTemplates((prev) => [...prev, newEmailTemplateObj])

      toast({
        title: "Success",
        description: "Email template created successfully",
      })

      setIsLoading(false)
      setIsNewEmailTemplateDialogOpen(false)
      setNewEmailTemplate({
        name: "",
        subject: "",
        previewText: "",
        content: "",
      })
    }, 1000)
  }

  const handleCreateSocialPost = () => {
    if (!newSocialPost.title || !newSocialPost.content || !newSocialPost.platform) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to create social post
    setTimeout(() => {
      const newSocialPostObj = {
        id: (socialPosts.length + 1).toString(),
        ...newSocialPost,
        status: "draft",
        performance: {
          likes: 0,
          comments: 0,
          shares: 0,
          clicks: 0,
        },
      }

      setSocialPosts((prev) => [...prev, newSocialPostObj])

      toast({
        title: "Success",
        description: "Social post created successfully",
      })

      setIsLoading(false)
      setIsNewSocialPostDialogOpen(false)
      setNewSocialPost({
        title: "",
        content: "",
        image: "/placeholder.svg?height=300&width=500",
        platform: "instagram",
        publishDate: "",
      })
    }, 1000)
  }

  const handleUpdateCampaignStatus = (campaignId: string, newStatus: string) => {
    setIsLoading(true)

    // Simulate API call to update campaign status
    setTimeout(() => {
      setCampaigns((prev) =>
        prev.map((campaign) => (campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign)),
      )

      toast({
        title: "Success",
        description: `Campaign ${newStatus === "active" ? "activated" : newStatus}`,
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleUpdateSocialPostStatus = (postId: string, newStatus: string) => {
    setIsLoading(true)

    // Simulate API call to update social post status
    setTimeout(() => {
      setSocialPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                status: newStatus,
                publishDate: newStatus === "published" ? new Date().toISOString().split("T")[0] : post.publishDate,
              }
            : post,
        ),
      )

      toast({
        title: "Success",
        description: `Social post ${newStatus === "published" ? "published" : newStatus}`,
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleCopyTemplate = (templateId: string) => {
    const template = emailTemplates.find((t) => t.id === templateId)
    if (template) {
      navigator.clipboard.writeText(template.content)
      setCopiedTemplate(templateId)

      toast({
        title: "Success",
        description: "Template content copied to clipboard",
      })

      setTimeout(() => {
        setCopiedTemplate(null)
      }, 2000)
    }
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setIsLoading(true)

    // Simulate API call to delete campaign
    setTimeout(() => {
      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== campaignId))

      toast({
        title: "Success",
        description: "Campaign deleted successfully",
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleDeleteEmailTemplate = (templateId: string) => {
    setIsLoading(true)

    // Simulate API call to delete email template
    setTimeout(() => {
      setEmailTemplates((prev) => prev.filter((template) => template.id !== templateId))

      toast({
        title: "Success",
        description: "Email template deleted successfully",
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleDeleteSocialPost = (postId: string) => {
    setIsLoading(true)

    // Simulate API call to delete social post
    setTimeout(() => {
      setSocialPosts((prev) => prev.filter((post) => post.id !== postId))

      toast({
        title: "Success",
        description: "Social post deleted successfully",
      })

      setIsLoading(false)
    }, 1000)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "social":
        return <Instagram className="h-4 w-4" />
      case "website":
        return <Globe className="h-4 w-4" />
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        )
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Scheduled
          </span>
        )
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Draft
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Completed
          </span>
        )
      case "published":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Published
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case "all":
        return "All Guests"
      case "past_guests":
        return "Past Guests"
      case "current_guests":
        return "Current Guests"
      case "future_guests":
        return "Future Guests"
      default:
        return audience
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Marketing Tools"
        text="Create and manage marketing campaigns, email templates, and social media posts."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="email-templates">Email Templates</TabsTrigger>
          <TabsTrigger value="social-media">Social Media</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Marketing Campaigns</h2>
            <Button onClick={() => setIsNewCampaignDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No campaigns found</h3>
              <p className="text-muted-foreground">Create your first marketing campaign to promote your properties</p>
              <Button className="mt-4" onClick={() => setIsNewCampaignDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(campaign.platform)}
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      </div>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform:</span>
                        <span className="font-medium capitalize">{campaign.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Audience:</span>
                        <span className="font-medium">{getAudienceLabel(campaign.audience)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">
                          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">${campaign.budget}</span>
                      </div>
                    </div>

                    {campaign.status !== "draft" && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Performance</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="text-muted-foreground">Sent</div>
                            <div className="font-medium">{campaign.performance.sent}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Opened</div>
                            <div className="font-medium">
                              {campaign.performance.opened}
                              {campaign.performance.sent > 0 && (
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({Math.round((campaign.performance.opened / campaign.performance.sent) * 100)}%)
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Clicked</div>
                            <div className="font-medium">
                              {campaign.performance.clicked}
                              {campaign.performance.opened > 0 && (
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({Math.round((campaign.performance.clicked / campaign.performance.opened) * 100)}%)
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Converted</div>
                            <div className="font-medium">
                              {campaign.performance.converted}
                              {campaign.performance.clicked > 0 && (
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({Math.round((campaign.performance.converted / campaign.performance.clicked) * 100)}%)
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-muted-foreground">Revenue</div>
                            <div className="font-medium">${campaign.performance.revenue}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/analytics")}>
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Analytics</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setSelectedCampaign(campaign)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedCampaign(campaign)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {campaign.status === "draft" && (
                          <DropdownMenuItem onClick={() => handleUpdateCampaignStatus(campaign.id, "active")}>
                            Activate Campaign
                          </DropdownMenuItem>
                        )}
                        {campaign.status === "active" && (
                          <DropdownMenuItem onClick={() => handleUpdateCampaignStatus(campaign.id, "completed")}>
                            Complete Campaign
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCampaign(campaign.id)}>
                          Delete Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="email-templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Email Templates</h2>
            <Button onClick={() => setIsNewEmailTemplateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : emailTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No email templates found</h3>
              <p className="text-muted-foreground">Create your first email template to use in your campaigns</p>
              <Button className="mt-4" onClick={() => setIsNewEmailTemplateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Template
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emailTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="truncate">{template.subject}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-muted-foreground mb-4 truncate">{template.previewText}</div>
                    <div className="bg-muted p-3 rounded-md h-24 overflow-hidden text-sm">
                      {template.content.substring(0, 150)}...
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => handleCopyTemplate(template.id)}>
                              {copiedTemplate === template.id ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy Template</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setSelectedEmailTemplate(template)
                                setIsPreviewDialogOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preview Template</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedEmailTemplate(template)
                            setIsPreviewDialogOpen(true)
                          }}
                        >
                          Preview Template
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Template</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate Template</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteEmailTemplate(template.id)}
                        >
                          Delete Template
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="social-media" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Social Media Posts</h2>
            <Button onClick={() => setIsNewSocialPostDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : socialPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Instagram className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No social media posts found</h3>
              <p className="text-muted-foreground">Create your first social media post to promote your properties</p>
              <Button className="mt-4" onClick={() => setIsNewSocialPostDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <div className="bg-black/70 text-white p-1 rounded-md">{getPlatformIcon(post.platform)}</div>
                      <div className="bg-black/70 text-white p-1 rounded-md">{getStatusBadge(post.status)}</div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{post.content}</p>

                    {post.status === "published" && (
                      <div className="mt-2 pt-2 border-t">
                        <h4 className="text-sm font-medium mb-2">Performance</h4>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <div>
                            <div className="text-muted-foreground">Likes</div>
                            <div className="font-medium">{post.performance.likes}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Comments</div>
                            <div className="font-medium">{post.performance.comments}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Shares</div>
                            <div className="font-medium">{post.performance.shares}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Clicks</div>
                            <div className="font-medium">{post.performance.clicks}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {post.publishDate && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {post.status === "published" ? "Published on" : "Scheduled for"}: {formatDate(post.publishDate)}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setSelectedSocialPost(post)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preview Post</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Share Post</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedSocialPost(post)}>Preview Post</DropdownMenuItem>
                        <DropdownMenuItem>Edit Post</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {post.status === "draft" && (
                          <DropdownMenuItem onClick={() => handleUpdateSocialPostStatus(post.id, "published")}>
                            Publish Now
                          </DropdownMenuItem>
                        )}
                        {post.status === "draft" && (
                          <DropdownMenuItem onClick={() => handleUpdateSocialPostStatus(post.id, "scheduled")}>
                            Schedule Post
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteSocialPost(post.id)}>
                          Delete Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isNewCampaignDialogOpen} onOpenChange={setIsNewCampaignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>Create a new marketing campaign to promote your properties.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-name" className="text-right">
                Name*
              </Label>
              <Input
                id="campaign-name"
                className="col-span-3"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="campaign-description"
                className="col-span-3"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-platform" className="text-right">
                Platform*
              </Label>
              <Select
                value={newCampaign.platform}
                onValueChange={(value) => setNewCampaign({ ...newCampaign, platform: value })}
              >
                <SelectTrigger id="campaign-platform" className="col-span-3">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-audience" className="text-right">
                Audience
              </Label>
              <Select
                value={newCampaign.audience}
                onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}
              >
                <SelectTrigger id="campaign-audience" className="col-span-3">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Guests</SelectItem>
                  <SelectItem value="past_guests">Past Guests</SelectItem>
                  <SelectItem value="current_guests">Current Guests</SelectItem>
                  <SelectItem value="future_guests">Future Guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-start-date" className="text-right">
                Start Date*
              </Label>
              <Input
                id="campaign-start-date"
                type="date"
                className="col-span-3"
                value={newCampaign.startDate}
                onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-end-date" className="text-right">
                End Date*
              </Label>
              <Input
                id="campaign-end-date"
                type="date"
                className="col-span-3"
                value={newCampaign.endDate}
                onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-budget" className="text-right">
                Budget ($)
              </Label>
              <Input
                id="campaign-budget"
                type="number"
                className="col-span-3"
                value={newCampaign.budget}
                onChange={(e) => setNewCampaign({ ...newCampaign, budget: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCampaignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCampaign}>Create Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewEmailTemplateDialogOpen} onOpenChange={setIsNewEmailTemplateDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Email Template</DialogTitle>
            <DialogDescription>Create a new email template to use in your campaigns.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-name" className="text-right">
                Name*
              </Label>
              <Input
                id="template-name"
                className="col-span-3"
                value={newEmailTemplate.name}
                onChange={(e) => setNewEmailTemplate({ ...newEmailTemplate, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-subject" className="text-right">
                Subject*
              </Label>
              <Input
                id="template-subject"
                className="col-span-3"
                value={newEmailTemplate.subject}
                onChange={(e) => setNewEmailTemplate({ ...newEmailTemplate, subject: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="template-preview" className="text-right">
                Preview Text
              </Label>
              <Input
                id="template-preview"
                className="col-span-3"
                value={newEmailTemplate.previewText}
                onChange={(e) => setNewEmailTemplate({ ...newEmailTemplate, previewText: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="template-content" className="text-right pt-2">
                Content*
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="template-content"
                  rows={10}
                  value={newEmailTemplate.content}
                  onChange={(e) => setNewEmailTemplate({ ...newEmailTemplate, content: e.target.value })}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Use placeholders like {"{guest_name}"}, {"{property_name}"}, etc. for dynamic content.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewEmailTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEmailTemplate}>Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isNewSocialPostDialogOpen} onOpenChange={setIsNewSocialPostDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Social Post</DialogTitle>
            <DialogDescription>Create a new social media post to promote your properties.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-title" className="text-right">
                Title*
              </Label>
              <Input
                id="post-title"
                className="col-span-3"
                value={newSocialPost.title}
                onChange={(e) => setNewSocialPost({ ...newSocialPost, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="post-content" className="text-right pt-2">
                Content*
              </Label>
              <Textarea
                id="post-content"
                className="col-span-3"
                rows={4}
                value={newSocialPost.content}
                onChange={(e) => setNewSocialPost({ ...newSocialPost, content: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-platform" className="text-right">
                Platform*
              </Label>
              <Select
                value={newSocialPost.platform}
                onValueChange={(value) => setNewSocialPost({ ...newSocialPost, platform: value })}
              >
                <SelectTrigger id="post-platform" className="col-span-3">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-image" className="text-right">
                Image
              </Label>
              <div className="col-span-3">
                <div className="border rounded-md p-2 mb-2">
                  <img
                    src={newSocialPost.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  <Image className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="post-publish-date" className="text-right">
                Publish Date
              </Label>
              <Input
                id="post-publish-date"
                type="date"
                className="col-span-3"
                value={newSocialPost.publishDate}
                onChange={(e) => setNewSocialPost({ ...newSocialPost, publishDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewSocialPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSocialPost}>Create Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedEmailTemplate && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEmailTemplate.name}</DialogTitle>
                <DialogDescription>Email template preview</DialogDescription>
              </DialogHeader>
              <div className="border rounded-md p-4 mt-4">
                <div className="mb-4 pb-4 border-b">
                  <div className="font-medium">Subject:</div>
                  <div>{selectedEmailTemplate.subject}</div>
                </div>
                <div className="mb-4 pb-4 border-b">
                  <div className="font-medium">Preview Text:</div>
                  <div>{selectedEmailTemplate.previewText}</div>
                </div>
                <div>
                  <div className="font-medium mb-2">Content:</div>
                  <div className="whitespace-pre-line">{selectedEmailTemplate.content}</div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}

          {selectedSocialPost && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSocialPost.title}</DialogTitle>
                <DialogDescription>Social media post preview</DialogDescription>
              </DialogHeader>
              <div className="border rounded-md overflow-hidden">
                <img
                  src={selectedSocialPost.image || "/placeholder.svg"}
                  alt={selectedSocialPost.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getPlatformIcon(selectedSocialPost.platform)}
                    <span className="font-medium capitalize">{selectedSocialPost.platform}</span>
                    {selectedSocialPost.publishDate && (
                      <span className="text-sm text-muted-foreground">
                        • {formatDate(selectedSocialPost.publishDate)}
                      </span>
                    )}
                  </div>
                  <p className="whitespace-pre-line">{selectedSocialPost.content}</p>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsPreviewDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}

