"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Star, Search, Filter, Flag } from "lucide-react"

// Mock data for reviews
const mockReviews = [
  {
    id: "1",
    propertyId: "1",
    propertyName: "Beach Villa",
    guestName: "John Smith",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "Amazing property with stunning views! The host was very responsive and accommodating. Would definitely stay here again.",
    date: "2023-08-15",
    status: "published",
    response:
      "Thank you for your kind words, John! We're so glad you enjoyed your stay and would love to welcome you back anytime.",
    platform: "airbnb",
  },
  {
    id: "2",
    propertyId: "1",
    propertyName: "Beach Villa",
    guestName: "Sarah Johnson",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment:
      "Beautiful property and great location. The kitchen was well-equipped and the beds were comfortable. The only issue was the Wi-Fi was a bit slow at times.",
    date: "2023-07-22",
    status: "published",
    response: "",
    platform: "direct",
  },
  {
    id: "3",
    propertyId: "2",
    propertyName: "Mountain Cabin",
    guestName: "Michael Brown",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    comment:
      "The cabin was cozy and the surroundings were beautiful. However, we had some issues with the heating system and it took a while for the host to respond.",
    date: "2023-06-10",
    status: "published",
    response:
      "Hi Michael, we apologize for the heating issues and the delayed response. We've since fixed the heating system and improved our response protocols. We hope you'll give us another chance in the future.",
    platform: "vrbo",
  },
  {
    id: "4",
    propertyId: "3",
    propertyName: "City Apartment",
    guestName: "Emily Davis",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "Perfect location in the heart of the city! The apartment was clean, modern, and had everything we needed. The host provided excellent recommendations for local restaurants and attractions.",
    date: "2023-09-05",
    status: "pending",
    response: "",
    platform: "airbnb",
  },
  {
    id: "5",
    propertyId: "1",
    propertyName: "Beach Villa",
    guestName: "David Wilson",
    guestAvatar: "/placeholder.svg?height=40&width=40",
    rating: 2,
    comment:
      "The property didn't match the photos. It was smaller than expected and not as clean as we hoped. The beach access was further than advertised.",
    date: "2023-08-30",
    status: "flagged",
    response: "",
    platform: "booking.com",
  },
]

// Mock properties for filtering
const mockProperties = [
  { id: "1", name: "Beach Villa" },
  { id: "2", name: "Mountain Cabin" },
  { id: "3", name: "City Apartment" },
  { id: "4", name: "Lake House" },
]

export default function ReviewsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<any[]>([])
  const [filteredReviews, setFilteredReviews] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyFilter, setPropertyFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [responseText, setResponseText] = useState<Record<string, string>>({})

  useEffect(() => {
    // Simulate API call to fetch reviews
    setTimeout(() => {
      setReviews(mockReviews)
      setFilteredReviews(mockReviews)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Apply filters and search
    let filtered = [...reviews]

    // Apply tab filter
    if (activeTab === "pending") {
      filtered = filtered.filter((review) => review.status === "pending")
    } else if (activeTab === "published") {
      filtered = filtered.filter((review) => review.status === "published")
    } else if (activeTab === "flagged") {
      filtered = filtered.filter((review) => review.status === "flagged")
    } else if (activeTab === "responded") {
      filtered = filtered.filter((review) => review.response)
    } else if (activeTab === "not-responded") {
      filtered = filtered.filter((review) => !review.response)
    }

    // Apply property filter
    if (propertyFilter !== "all") {
      filtered = filtered.filter((review) => review.propertyId === propertyFilter)
    }

    // Apply rating filter
    if (ratingFilter !== "all") {
      filtered = filtered.filter((review) => review.rating === Number.parseInt(ratingFilter))
    }

    // Apply platform filter
    if (platformFilter !== "all") {
      filtered = filtered.filter((review) => review.platform === platformFilter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (review) =>
          review.guestName.toLowerCase().includes(query) ||
          review.comment.toLowerCase().includes(query) ||
          review.propertyName.toLowerCase().includes(query),
      )
    }

    setFilteredReviews(filtered)
  }, [reviews, activeTab, propertyFilter, ratingFilter, platformFilter, searchQuery])

  const handleResponseChange = (reviewId: string, text: string) => {
    setResponseText((prev) => ({ ...prev, [reviewId]: text }))
  }

  const handleSubmitResponse = (reviewId: string) => {
    if (!responseText[reviewId]?.trim()) {
      toast({
        title: "Error",
        description: "Response cannot be empty",
        variant: "destructive",
      })
      return
    }

    // Simulate API call to submit response
    setIsLoading(true)
    setTimeout(() => {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, response: responseText[reviewId], status: "published" } : review,
        ),
      )

      toast({
        title: "Success",
        description: "Your response has been published",
      })

      setResponseText((prev) => {
        const newState = { ...prev }
        delete newState[reviewId]
        return newState
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleFlagReview = (reviewId: string) => {
    // Simulate API call to flag review
    setIsLoading(true)
    setTimeout(() => {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? { ...review, status: review.status === "flagged" ? "published" : "flagged" }
            : review,
        ),
      )

      toast({
        title: "Success",
        description: "Review status updated",
      })

      setIsLoading(false)
    }, 1000)
  }

  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      counts[review.rating as keyof typeof counts]++
    })
    return counts
  }

  const getResponseRate = () => {
    if (reviews.length === 0) return "0%"
    const responded = reviews.filter((review) => review.response).length
    return `${Math.round((responded / reviews.length) * 100)}%`
  }

  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      ))
  }

  const renderPlatformBadge = (platform: string) => {
    switch (platform) {
      case "airbnb":
        return <Badge className="bg-red-500">Airbnb</Badge>
      case "vrbo":
        return <Badge className="bg-blue-500">VRBO</Badge>
      case "booking.com":
        return <Badge className="bg-blue-700">Booking.com</Badge>
      case "direct":
        return <Badge className="bg-green-500">Direct</Badge>
      default:
        return <Badge>{platform}</Badge>
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reviews Management"
        text="Manage and respond to guest reviews across all your properties."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{getAverageRating()}</CardTitle>
            <CardDescription>Average Rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {renderRatingStars(Math.round(Number.parseFloat(getAverageRating())))}
              <span className="ml-2 text-sm text-muted-foreground">({reviews.length} reviews)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{getResponseRate()}</CardTitle>
            <CardDescription>Response Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {reviews.filter((review) => review.response).length} of {reviews.length} reviews responded to
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">Rating Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(getRatingCounts())
                .reverse()
                .map(([rating, count]) => (
                  <div key={rating} className="flex items-center text-sm">
                    <div className="w-8">{rating} ★</div>
                    <div className="w-full bg-muted rounded-full h-2 mx-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-right">{count}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {mockProperties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>

          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="airbnb">Airbnb</SelectItem>
              <SelectItem value="vrbo">VRBO</SelectItem>
              <SelectItem value="booking.com">Booking.com</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
          <TabsTrigger value="responded">Responded</TabsTrigger>
          <TabsTrigger value="not-responded">Not Responded</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <Card key={review.id} className={review.status === "flagged" ? "border-red-300" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.guestAvatar} alt={review.guestName} />
                        <AvatarFallback>{review.guestName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{review.guestName}</CardTitle>
                        <div className="flex items-center mt-1 space-x-2">
                          <div className="flex">{renderRatingStars(review.rating)}</div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                          {renderPlatformBadge(review.platform)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleFlagReview(review.id)}
                        className={review.status === "flagged" ? "text-red-500" : ""}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline">{review.propertyName}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm">{review.comment}</p>

                  {review.response && (
                    <div className="mt-4 pl-4 border-l-2 border-muted">
                      <p className="text-sm font-medium">Your response:</p>
                      <p className="text-sm text-muted-foreground mt-1">{review.response}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-2">
                  {!review.response && (
                    <>
                      <Textarea
                        placeholder="Write your response..."
                        value={responseText[review.id] || ""}
                        onChange={(e) => handleResponseChange(review.id, e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => handleResponseChange(review.id, "")}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleSubmitResponse(review.id)}
                          disabled={!responseText[review.id]?.trim()}
                        >
                          Publish Response
                        </Button>
                      </div>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

