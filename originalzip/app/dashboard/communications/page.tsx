"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Clock, Plus, Copy, Search, Filter } from "lucide-react"

// Mock messages data
const messages = [
  {
    id: "1",
    guest: "John Smith",
    property: "Luxury Beach House",
    date: "2023-09-15 14:30",
    preview: "Hi, I was wondering if early check-in would be possible...",
    status: "unread",
    booking: "Sep 20 - Sep 25",
  },
  {
    id: "2",
    guest: "Sarah Johnson",
    property: "Downtown Loft",
    date: "2023-09-14 10:15",
    preview: "Thank you for the information. Is parking available nearby?",
    status: "read",
    booking: "Sep 22 - Sep 24",
  },
  {
    id: "3",
    guest: "Michael Brown",
    property: "Mountain Cabin",
    date: "2023-09-13 16:45",
    preview: "We're looking forward to our stay! Could you recommend some local restaurants?",
    status: "read",
    booking: "Oct 5 - Oct 10",
  },
]

// Mock templates data
const templates = [
  {
    id: "1",
    name: "Welcome Message",
    preview: "Welcome to your stay at [Property Name]! Here's some important information...",
    lastUsed: "2023-09-15",
  },
  {
    id: "2",
    name: "Check-in Instructions",
    preview: "Your check-in is coming up soon! Here are the details for your arrival...",
    lastUsed: "2023-09-14",
  },
  {
    id: "3",
    name: "Check-out Reminder",
    preview: "Just a friendly reminder that check-out is at [Check-out Time] on [Check-out Date]...",
    lastUsed: "2023-09-10",
  },
]

export default function CommunicationsPage() {
  const { toast } = useToast()
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [messageText, setMessageText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState("")

  // Mock data for message templates
  const messageTemplates = [
    {
      id: "welcome",
      name: "Welcome Message",
      subject: "Welcome to [Property Name]!",
      body: "Hi [Guest Name],\n\nWe're excited to host you at [Property Name]! Your check-in is scheduled for [Check-in Date] at [Check-in Time].\n\nHere's what you need to know:\n- Address: [Property Address]\n- Access code: [Access Code]\n- WiFi: [WiFi Name] / Password: [WiFi Password]\n\nIf you have any questions before your arrival, please don't hesitate to reach out.\n\nSafe travels!\n[Host Name]",
      category: "check-in",
    },
    {
      id: "check-in",
      name: "Check-in Instructions",
      subject: "Your Check-in Instructions for [Property Name]",
      body: "Hi [Guest Name],\n\nYour stay at [Property Name] is tomorrow! Here are your check-in details:\n\n1. Address: [Property Address]\n2. Check-in time: [Check-in Time] or later\n3. Access code for the door: [Access Code]\n\nParking information: [Parking Details]\n\nPlease let me know when you've arrived safely. Enjoy your stay!\n\n[Host Name]",
      category: "check-in",
    },
    {
      id: "mid-stay",
      name: "Mid-stay Check-in",
      subject: "How is your stay going?",
      body: "Hi [Guest Name],\n\nI hope you're enjoying your stay at [Property Name]! I just wanted to check in and make sure everything is going well.\n\nDo you have any questions or is there anything you need help with?\n\nEnjoy the rest of your stay!\n\n[Host Name]",
      category: "during-stay",
    },
    {
      id: "check-out",
      name: "Check-out Reminder",
      subject: "Check-out Reminder for Tomorrow",
      body: "Hi [Guest Name],\n\nI hope you've enjoyed your stay at [Property Name]! Just a friendly reminder that check-out is tomorrow at [Check-out Time].\n\nHere are the check-out instructions:\n1. Please leave the keys [Key Location]\n2. [Any specific instructions]\n\nThank you for staying with us!\n\n[Host Name]",
      category: "check-out",
    },
    {
      id: "review",
      name: "Review Request",
      subject: "How was your stay?",
      body: "Hi [Guest Name],\n\nThank you for staying at [Property Name]! We hope you had a wonderful time.\n\nIf you have a moment, we'd greatly appreciate if you could leave a review of your experience. Your feedback helps us improve and helps future guests make informed decisions.\n\nThank you again for choosing our property!\n\n[Host Name]",
      category: "post-stay",
    },
  ]

  // Mock data for automated messages
  const automatedMessages = [
    {
      id: 1,
      name: "Booking Confirmation",
      trigger: "When booking is confirmed",
      template: "welcome",
      active: true,
      lastSent: "2 days ago",
    },
    {
      id: 2,
      name: "Check-in Instructions",
      trigger: "1 day before check-in",
      template: "check-in",
      active: true,
      lastSent: "Yesterday",
    },
    {
      id: 3,
      name: "Mid-stay Check-in",
      trigger: "2 days after check-in",
      template: "mid-stay",
      active: false,
      lastSent: "3 days ago",
    },
    {
      id: 4,
      name: "Check-out Reminder",
      trigger: "1 day before check-out",
      template: "check-out",
      active: true,
      lastSent: "4 days ago",
    },
    {
      id: 5,
      name: "Review Request",
      trigger: "1 day after check-out",
      template: "review",
      active: true,
      lastSent: "5 days ago",
    },
  ]

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      guest: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "john@example.com",
      },
      property: "Beach Villa",
      checkIn: "2023-12-15",
      checkOut: "2023-12-20",
      lastMessage: "Thanks for the information! Looking forward to our stay.",
      lastMessageTime: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      guest: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "sarah@example.com",
      },
      property: "Mountain Cabin",
      checkIn: "2023-12-22",
      checkOut: "2023-12-27",
      lastMessage: "Is there a grocery store nearby?",
      lastMessageTime: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      guest: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "michael@example.com",
      },
      property: "Beach Villa",
      checkIn: "2024-01-05",
      checkOut: "2024-01-10",
      lastMessage: "We'll be arriving around 4pm.",
      lastMessageTime: "3 days ago",
      unread: false,
    },
  ]

  // Mock data for current conversation
  const currentConversation = {
    id: 1,
    guest: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "john@example.com",
    },
    property: "Beach Villa",
    checkIn: "2023-12-15",
    checkOut: "2023-12-20",
    messages: [
      {
        id: 1,
        sender: "host",
        text: "Hi John, thank you for booking our Beach Villa! We're looking forward to hosting you from December 15-20.",
        time: "Dec 10, 2023 10:30 AM",
        read: true,
      },
      {
        id: 2,
        sender: "guest",
        text: "Thanks for accepting our booking! We're excited to stay at your place. Could you provide some information about check-in procedures and parking?",
        time: "Dec 10, 2023 11:45 AM",
        read: true,
      },
      {
        id: 3,
        sender: "host",
        text: "Of course! Check-in is anytime after 3 PM. You'll receive a door code via email on the morning of your arrival. For parking, there's a dedicated spot labeled #5 in front of the villa.",
        time: "Dec 10, 2023 12:15 PM",
        read: true,
      },
      {
        id: 4,
        sender: "guest",
        text: "Thanks for the information! Looking forward to our stay.",
        time: "Dec 10, 2023 2:30 PM",
        read: false,
      },
    ],
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    })

    setMessageText("")
  }

  const handleGenerateMessage = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
      setMessageText(
        "Hi John, I hope you're doing well! Just wanted to check in and make sure you have all the information you need for your upcoming stay at our Beach Villa. Please let me know if you have any questions or special requests before your arrival. We're looking forward to hosting you!",
      )

      toast({
        title: "Message Generated",
        description: "AI has generated a message based on the context.",
      })
    }, 1500)
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find((t) => t.id === templateId)
    if (template) {
      setMessageText(template.body)
    }
    setSelectedTemplate(templateId)
  }

  const handleToggleAutomation = (id: number) => {
    toast({
      title: "Automation Updated",
      description: "The automated message status has been updated.",
    })
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Communications</h1>
          <p className="text-muted-foreground">Manage guest messages and communication templates</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox">
            <MessageSquare className="h-4 w-4 mr-2" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="templates">
            <Copy className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="automated">
            <Clock className="h-4 w-4 mr-2" />
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">
              Messages ({messages.filter((m) => m.status === "unread").length} unread)
            </h2>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          {messages.map((message) => (
            <Card key={message.id} className={message.status === "unread" ? "border-primary" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center">
                  <div className="mr-2">
                    {message.status === "unread" && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{message.guest}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{message.property}</span>
                      <span className="mx-2">•</span>
                      <span>{message.booking}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{message.date}</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{message.preview}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button size="sm">Reply</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="sent">
          <p className="text-center py-8 text-muted-foreground">Sent messages will be displayed here</p>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Message Templates</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </div>
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{template.preview}</p>
                <div className="mt-2 text-sm text-muted-foreground">Last used: {template.lastUsed}</div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">Use Template</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="automated">
          <p className="text-center py-8 text-muted-foreground">Automated message settings will be displayed here</p>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

