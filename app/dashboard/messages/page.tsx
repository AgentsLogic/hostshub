"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Search, Send, MoreHorizontal, Phone, Video, Info, Calendar, Home } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for conversations
const conversations = [
  {
    id: "1",
    guest: {
      id: "g1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "john@example.com",
    },
    property: {
      id: "p1",
      name: "Beach Villa",
    },
    lastMessage: {
      content: "Hi, I'm interested in booking your property for next week. Is it available?",
      timestamp: "2023-12-10T14:30:00Z",
      isRead: true,
      sender: "guest",
    },
    booking: {
      id: "b1",
      checkIn: "2023-12-15",
      checkOut: "2023-12-20",
      status: "confirmed",
    },
  },
  {
    id: "2",
    guest: {
      id: "g2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "sarah@example.com",
    },
    property: {
      id: "p2",
      name: "Mountain Cabin",
    },
    lastMessage: {
      content: "Thank you for accepting my booking request! I'm looking forward to my stay.",
      timestamp: "2023-12-09T10:15:00Z",
      isRead: false,
      sender: "guest",
    },
    booking: {
      id: "b2",
      checkIn: "2023-12-22",
      checkOut: "2023-12-27",
      status: "confirmed",
    },
  },
  {
    id: "3",
    guest: {
      id: "g3",
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "michael@example.com",
    },
    property: {
      id: "p1",
      name: "Beach Villa",
    },
    lastMessage: {
      content: "Is there a grocery store nearby? We'll be arriving late and would like to pick up some essentials.",
      timestamp: "2023-12-08T18:45:00Z",
      isRead: true,
      sender: "guest",
    },
    booking: {
      id: "b3",
      checkIn: "2024-01-05",
      checkOut: "2024-01-10",
      status: "confirmed",
    },
  },
  {
    id: "4",
    guest: {
      id: "g4",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      email: "emily@example.com",
    },
    property: {
      id: "p3",
      name: "City Apartment",
    },
    lastMessage: {
      content: "I'm considering booking your property. Do you offer early check-in?",
      timestamp: "2023-12-07T09:20:00Z",
      isRead: true,
      sender: "guest",
    },
    booking: null,
  },
]

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: "m1",
    content: "Hi, I'm interested in booking your property for next week. Is it available?",
    timestamp: "2023-12-10T14:30:00Z",
    sender: "guest",
  },
  {
    id: "m2",
    content: "Hello! Yes, the property is available next week. When exactly were you looking to stay?",
    timestamp: "2023-12-10T14:45:00Z",
    sender: "host",
  },
  {
    id: "m3",
    content: "Great! I'm looking to check in on the 15th and check out on the 20th. There will be 4 of us.",
    timestamp: "2023-12-10T15:00:00Z",
    sender: "guest",
  },
  {
    id: "m4",
    content:
      "Perfect! Those dates are available. You can go ahead and book through the website, or I can send you a booking request if you prefer.",
    timestamp: "2023-12-10T15:15:00Z",
    sender: "host",
  },
  {
    id: "m5",
    content: "I'll book through the website. One more question - is there parking available?",
    timestamp: "2023-12-10T15:30:00Z",
    sender: "guest",
  },
  {
    id: "m6",
    content:
      "Yes, there's free parking on the premises for up to 2 vehicles. Let me know if you have any other questions!",
    timestamp: "2023-12-10T15:45:00Z",
    sender: "host",
  },
  {
    id: "m7",
    content: "That's perfect. I've just completed the booking. Looking forward to our stay!",
    timestamp: "2023-12-10T16:00:00Z",
    sender: "guest",
  },
  {
    id: "m8",
    content: "Excellent! I've received your booking. Looking forward to hosting you and your group. Safe travels!",
    timestamp: "2023-12-10T16:15:00Z",
    sender: "host",
  },
]

export default function MessagesPage() {
  const { toast } = useToast()
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: `m${messages.length + 1}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: "host",
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Scroll to bottom of messages
    setTimeout(() => {
      const messagesContainer = document.getElementById("messages-container")
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    }, 100)
  }

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()

    if (isToday) {
      return format(date, "h:mm a")
    } else {
      return format(date, "MMM d, h:mm a")
    }
  }

  const filteredConversations = conversations
    .filter((conversation) => {
      if (filter === "all") return true
      if (filter === "unread") return !conversation.lastMessage.isRead
      if (filter === "with-booking") return !!conversation.booking
      if (filter === "no-booking") return !conversation.booking
      return true
    })
    .filter((conversation) => {
      if (!searchQuery) return true
      return (
        conversation.guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  return (
    <DashboardShell>
      <DashboardHeader heading="Messages" text="Communicate with your guests and manage inquiries.">
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter messages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="with-booking">With Booking</SelectItem>
              <SelectItem value="no-booking">No Booking</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Conversations List */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-accent/50 ${selectedConversation.id === conversation.id ? "bg-accent" : ""}`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={conversation.guest.avatar} alt={conversation.guest.name} />
                      <AvatarFallback>{conversation.guest.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{conversation.guest.name}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatMessageDate(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage.sender === "host" && "You: "}
                        {conversation.lastMessage.content}
                      </p>
                      <div className="flex items-center mt-1 gap-2">
                        <Badge variant="outline" className="text-xs py-0 px-1">
                          {conversation.property.name}
                        </Badge>
                        {conversation.booking && (
                          <Badge
                            variant="outline"
                            className="text-xs py-0 px-1 bg-green-500/10 text-green-500 border-green-500/20"
                          >
                            Booked
                          </Badge>
                        )}
                        {!conversation.lastMessage.isRead && conversation.lastMessage.sender === "guest" && (
                          <Badge className="text-xs py-0 px-1">New</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredConversations.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">No conversations found</div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Conversation Detail */}
        <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversation.guest.avatar} alt={selectedConversation.guest.name} />
                    <AvatarFallback>{selectedConversation.guest.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.guest.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedConversation.property.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Booking
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Home className="mr-2 h-4 w-4" />
                        View Property
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Archive Conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Booking Info (if exists) */}
              {selectedConversation.booking && (
                <div className="p-3 bg-muted/50 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {format(new Date(selectedConversation.booking.checkIn), "MMM d, yyyy")} -{" "}
                        {format(new Date(selectedConversation.booking.checkOut), "MMM d, yyyy")}
                      </span>
                    </div>
                    <Badge className="bg-green-500">{selectedConversation.booking.status}</Badge>
                  </div>
                </div>
              )}

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" id="messages-container">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "host" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "host" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "host" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {formatMessageDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}

