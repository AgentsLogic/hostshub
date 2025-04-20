import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Mail, Phone, MoreHorizontal } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock team members data
const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Owner",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    role: "Property Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 456-7890",
    role: "Maintenance",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 789-0123",
    role: "Cleaner",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
  },
]

// Mock pending invitations
const pendingInvitations = [
  {
    id: "1",
    email: "robert.brown@example.com",
    role: "Property Manager",
    sentDate: "2023-09-15",
  },
]

export default function TeamPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Manage your team members and their permissions</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      <Tabs defaultValue="members">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invitations">Pending Invitations</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={member.status === "active" ? "default" : "outline"}>{member.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{member.phone}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="invitations" className="space-y-4">
          {pendingInvitations.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No pending invitations</p>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-4 font-medium border-b">
                <div>Email</div>
                <div>Role</div>
                <div>Sent Date</div>
                <div className="text-right">Actions</div>
              </div>
              {pendingInvitations.map((invitation) => (
                <div key={invitation.id} className="grid grid-cols-4 p-4 border-b last:border-0">
                  <div>{invitation.email}</div>
                  <div>{invitation.role}</div>
                  <div>{invitation.sentDate}</div>
                  <div className="text-right space-x-2">
                    <Button variant="outline" size="sm">
                      Resend
                    </Button>
                    <Button variant="ghost" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Manage the roles and permissions for your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Owner</h3>
                  <p className="text-sm text-muted-foreground mb-2">Full access to all features and settings</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">Manage Properties</Badge>
                    <Badge variant="outline">Manage Bookings</Badge>
                    <Badge variant="outline">Manage Team</Badge>
                    <Badge variant="outline">Manage Billing</Badge>
                    <Badge variant="outline">View Analytics</Badge>
                    <Badge variant="outline">All Settings</Badge>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Property Manager</h3>
                  <p className="text-sm text-muted-foreground mb-2">Can manage properties and bookings</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">Manage Properties</Badge>
                    <Badge variant="outline">Manage Bookings</Badge>
                    <Badge variant="outline">View Analytics</Badge>
                    <Badge variant="outline">Limited Settings</Badge>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Maintenance</h3>
                  <p className="text-sm text-muted-foreground mb-2">Can view and update maintenance tasks</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">View Properties</Badge>
                    <Badge variant="outline">Manage Maintenance</Badge>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Cleaner</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Can view cleaning schedule and mark tasks as complete
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Badge variant="outline">View Properties</Badge>
                    <Badge variant="outline">Manage Cleaning</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Customize Roles</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

