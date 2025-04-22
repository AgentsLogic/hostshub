import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { WhiteLabelNav } from "@/app/dashboard/components/white-label-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function WhiteLabelTemplatesPage() {
  return (
    <DashboardShell>
      {/* Removed heading and text props as DashboardHeader derives title from path */}
      <DashboardHeader />
      <div className="grid gap-8">
        <WhiteLabelNav />

        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#4682B4" }}>Email Templates</CardTitle>
            <CardDescription style={{ color: "#4A5568" }}>
              Customize the emails that are sent to your clients and their guests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="welcome">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="welcome">Welcome</TabsTrigger>
                <TabsTrigger value="booking">Booking</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>
              <TabsContent value="welcome" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Welcome Email</h3>
                  <p className="text-sm text-muted-foreground">
                    This email is sent when a new client signs up for your platform.
                  </p>
                  <Textarea
                    className="min-h-[300px]"
                    defaultValue={`Dear {{client_name}},\n\nWelcome to {{company_name}}! We're excited to have you on board.\n\nYour account has been created and you can now log in at {{login_url}} with the following credentials:\n\nUsername: {{email}}\nPassword: {{password}}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nThe {{company_name}} Team`}
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Available Variables</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{`{{ client_name }}`} - The client's name</p>
                    <p>{`{{ company_name }}`} - Your company name</p>
                    <p>{`{{ login_url }}`} - The URL where clients can log in</p>
                    <p>{`{{ email }}`} - The client's email address</p>
                    <p>{`{{ password }}`} - The client's temporary password</p>
                  </div>
                </div>
                <Button>Save Template</Button>
              </TabsContent>
              <TabsContent value="booking" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Booking Confirmation</h3>
                  <p className="text-sm text-muted-foreground">This email is sent when a booking is confirmed.</p>
                  <Textarea
                    className="min-h-[300px]"
                    defaultValue={`Dear {{guest_name}},\n\nThank you for booking with {{company_name}}!\n\nYour booking for {{property_name}} has been confirmed for the following dates:\n\nCheck-in: {{check_in_date}}\nCheck-out: {{check_out_date}}\n\nTotal: {{total_amount}}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nThe {{company_name}} Team`}
                  />
                </div>
                <Button>Save Template</Button>
              </TabsContent>
              <TabsContent value="review" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Review Request</h3>
                  <p className="text-sm text-muted-foreground">
                    This email is sent after a guest checks out to request a review.
                  </p>
                  <Textarea
                    className="min-h-[300px]"
                    defaultValue={`Dear {{guest_name}},\n\nThank you for staying at {{property_name}}!\n\nWe hope you enjoyed your stay. We would appreciate it if you could take a moment to leave a review of your experience.\n\nYou can leave a review by clicking the following link: {{review_link}}\n\nThank you for your feedback!\n\nBest regards,\nThe {{company_name}} Team`}
                  />
                </div>
                <Button>Save Template</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
