"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CalendarCheck, Save, Calendar, Home, Loader2 } from "lucide-react"
import { getBookingWorkflowSettings, createOrUpdateBookingWorkflowSettings } from "@/lib/data-access/settings"
import type { BookingWorkflowSettings } from "@/lib/database-schema"

export default function BookingWorkflowPage() {
  const { toast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Sample state for booking workflow settings
  const [settings, setSettings] = useState<BookingWorkflowSettings | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true)
        // In a real app, you'd get the user ID from auth context
        const userId = "current-user-id"
        const data = await getBookingWorkflowSettings(userId)

        if (data) {
          setSettings(data)
        } else {
          // Set default settings if none exist
          setSettings({
            id: "",
            user_id: userId,
            general: {
              instantBooking: true,
              requireApproval: false,
              minAdvanceBookingDays: 1,
              maxAdvanceBookingDays: 365,
              minNights: 2,
              maxNights: 30,
              allowSameDayBooking: false,
              allowPartialPayment: true,
              depositPercentage: 25,
            },
            communications: {
              sendBookingConfirmation: true,
              sendPaymentConfirmation: true,
              sendCheckInInstructions: true,
              sendPreArrivalReminder: true,
              preArrivalReminderDays: 3,
              sendPostStayThankYou: true,
              sendReviewRequest: true,
              reviewRequestDays: 2,
            },
            cancellation: {
              policy: "moderate",
              fullRefundDays: 7,
              partialRefundDays: 3,
              partialRefundPercentage: 50,
            },
            checkInOut: {
              checkInTime: "15:00",
              checkOutTime: "11:00",
              allowEarlyCheckIn: true,
              earlyCheckInFee: 25,
              allowLateCheckOut: true,
              lateCheckOutFee: 25,
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch booking workflow settings"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleGeneralSettingsChange = (field: string, value: any) => {
    setSettings((prevSettings) => {
      if (!prevSettings) return null
      return {
        ...prevSettings,
        general: {
          ...prevSettings.general,
          [field]: value,
        },
      }
    })
  }

  const handleCommunicationsSettingsChange = (field: string, value: any) => {
    setSettings((prevSettings) => {
      if (!prevSettings) return null
      return {
        ...prevSettings,
        communications: {
          ...prevSettings.communications,
          [field]: value,
        },
      }
    })
  }

  const handleCancellationSettingsChange = (field: string, value: any) => {
    setSettings((prevSettings) => {
      if (!prevSettings) return null
      return {
        ...prevSettings,
        cancellation: {
          ...prevSettings.cancellation,
          [field]: value,
        },
      }
    })
  }

  const handleCheckInOutSettingsChange = (field: string, value: any) => {
    setSettings((prevSettings) => {
      if (!prevSettings) return null
      return {
        ...prevSettings,
        checkInOut: {
          ...prevSettings.checkInOut,
          [field]: value,
        },
      }
    })
  }

  const saveSettings = async () => {
    try {
      if (!settings) return

      // In a real app, you'd get the user ID from auth context
      const userId = "current-user-id"

      // Remove id, user_id, created_at, and updated_at before updating
      const { id, user_id, created_at, updated_at, ...settingsToUpdate } = settings

      await createOrUpdateBookingWorkflowSettings(userId, settingsToUpdate)

      toast({
        title: "Settings Saved",
        description: "Your booking workflow settings have been updated.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Booking Workflow"
          text="Configure how guests book your properties and what happens before, during, and after their stay"
        >
          <Button disabled>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </DashboardHeader>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Booking Workflow"
          text="Configure how guests book your properties and what happens before, during, and after their stay"
        >
          <Button onClick={saveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </DashboardHeader>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error loading booking workflow settings</h2>
            <p className="text-muted-foreground">{error.message}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </DashboardShell>
    )
  }

  if (!settings) {
    return null
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Booking Workflow"
        text="Configure how guests book your properties and what happens before, during, and after their stay"
      >
        <Button onClick={saveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="general">
            <Home className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="communications">
            <MessageCircle className="mr-2 h-4 w-4" />
            Communications
          </TabsTrigger>
          <TabsTrigger value="cancellation">
            <Calendar className="mr-2 h-4 w-4" />
            Cancellation
          </TabsTrigger>
          <TabsTrigger value="checkinout">
            <CalendarCheck className="mr-2 h-4 w-4" />
            Check-in/out
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Booking Settings</CardTitle>
              <CardDescription>Configure the basic settings for your booking process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="instant-booking" className="text-base">
                    Instant Booking
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow guests to book instantly without your approval</p>
                </div>
                <Switch
                  id="instant-booking"
                  checked={settings.general.instantBooking}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("instantBooking", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-approval" className="text-base">
                    Require Approval
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Review and approve booking requests before confirmation
                  </p>
                </div>
                <Switch
                  id="require-approval"
                  checked={settings.general.requireApproval}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("requireApproval", checked)}
                  disabled={settings.general.instantBooking}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-advance-days">Minimum Advance Booking Days</Label>
                  <Input
                    id="min-advance-days"
                    type="number"
                    value={settings.general.minAdvanceBookingDays}
                    onChange={(e) =>
                      handleGeneralSettingsChange("minAdvanceBookingDays", Number.parseInt(e.target.value))
                    }
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-advance-days">Maximum Advance Booking Days</Label>
                  <Input
                    id="max-advance-days"
                    type="number"
                    value={settings.general.maxAdvanceBookingDays}
                    onChange={(e) =>
                      handleGeneralSettingsChange("maxAdvanceBookingDays", Number.parseInt(e.target.value))
                    }
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-nights">Minimum Nights Stay</Label>
                  <Input
                    id="min-nights"
                    type="number"
                    value={settings.general.minNights}
                    onChange={(e) => handleGeneralSettingsChange("minNights", Number.parseInt(e.target.value))}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-nights">Maximum Nights Stay</Label>
                  <Input
                    id="max-nights"
                    type="number"
                    value={settings.general.maxNights}
                    onChange={(e) => handleGeneralSettingsChange("maxNights", Number.parseInt(e.target.value))}
                    min="1"
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="same-day-booking" className="text-base">
                    Allow Same-Day Booking
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow guests to book for check-in on the same day</p>
                </div>
                <Switch
                  id="same-day-booking"
                  checked={settings.general.allowSameDayBooking}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("allowSameDayBooking", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="partial-payment" className="text-base">
                    Allow Partial Payment
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow guests to pay a deposit now and the remainder later
                  </p>
                </div>
                <Switch
                  id="partial-payment"
                  checked={settings.general.allowPartialPayment}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("allowPartialPayment", checked)}
                />
              </div>

              {settings.general.allowPartialPayment && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="deposit-percentage">Deposit Percentage</Label>
                  <div className="flex items-center">
                    <Input
                      id="deposit-percentage"
                      type="number"
                      value={settings.general.depositPercentage}
                      onChange={(e) =>
                        handleGeneralSettingsChange("depositPercentage", Number.parseInt(e.target.value))
                      }
                      min="1"
                      max="99"
                      className="w-20 mr-2"
                    />
                    <span>%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Form</CardTitle>
              <CardDescription>Configure what information to collect from guests during booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="collect-phone" defaultChecked />
                  <Label htmlFor="collect-phone">Phone Number</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collect-address" defaultChecked />
                  <Label htmlFor="collect-address">Address</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collect-purpose" defaultChecked />
                  <Label htmlFor="collect-purpose">Purpose of Stay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collect-requests" defaultChecked />
                  <Label htmlFor="collect-requests">Special Requests</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collect-id" />
                  <Label htmlFor="collect-id">ID Verification</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="collect-guests" defaultChecked />
                  <Label htmlFor="collect-guests">Guest Information</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
              <CardDescription>Configure the payment methods accepted for bookings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="credit-card" defaultChecked />
                  <Label htmlFor="credit-card">Credit/Debit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="paypal" defaultChecked />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="bank-transfer" />
                  <Label htmlFor="bank-transfer">Bank Transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="apple-pay" />
                  <Label htmlFor="apple-pay">Apple Pay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="google-pay" />
                  <Label htmlFor="google-pay">Google Pay</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Communications</CardTitle>
              <CardDescription>Configure when and what emails are sent to guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="booking-confirmation" className="text-base">
                    Booking Confirmation
                  </Label>
                  <p className="text-sm text-muted-foreground">Send an email when a booking is confirmed</p>
                </div>
                <Switch
                  id="booking-confirmation"
                  checked={settings.communications.sendBookingConfirmation}
                  onCheckedChange={(checked) => handleCommunicationsSettingsChange("sendBookingConfirmation", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="payment-confirmation" className="text-base">
                    Payment Confirmation
                  </Label>
                  <p className="text-sm text-muted-foreground">Send an email when a payment is processed</p>
                </div>
                <Switch
                  id="payment-confirmation"
                  checked={settings.communications.sendPaymentConfirmation}
                  onCheckedChange={(checked) => handleCommunicationsSettingsChange("sendPaymentConfirmation", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="checkin-instructions" className="text-base">
                    Check-in Instructions
                  </Label>
                  <p className="text-sm text-muted-foreground">Send an email with check-in instructions</p>
                </div>
                <Switch
                  id="checkin-instructions"
                  checked={settings.communications.sendCheckInInstructions}
                  onCheckedChange={(checked) => handleCommunicationsSettingsChange("sendCheckInInstructions", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pre-arrival-reminder" className="text-base">
                    Pre-Arrival Reminder
                  </Label>
                  <p className="text-sm text-muted-foreground">Send a reminder email before guest's arrival</p>
                </div>
                <Switch
                  id="pre-arrival-reminder"
                  checked={settings.communications.sendPreArrivalReminder}
                  onCheckedChange={(checked) => handleCommunicationsSettingsChange("sendPreArrivalReminder", checked)}
                />
              </div>

              {settings.communications.sendPreArrivalReminder && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="pre-arrival-days">Days Before Check-in</Label>
                  <Input
                    id="pre-arrival-days"
                    type="number"
                    value={settings.communications.preArrivalReminderDays}
                    onChange={(e) =>
                      handleCommunicationsSettingsChange("preArrivalReminderDays", Number.parseInt(e.target.value))
                    }
                    min="1"
                    max="14"
                    className="w-20"
                  />
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="post-stay-thank-you" className="text-base">
                    Post-Stay Thank You
                  </Label>
                  <p className="text-sm text-muted-foreground">Send a thank you email after guest's stay</p>
                </div>
                <Switch
                  id="post-stay-thank-you"
                  checked={settings.communications.sendPostStayThankYou}
                  onCheckedChange={(checked) => handleCommunicationsSettingsChange("sendPostStayThankYou", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="review-request" className="text-base">
                    Review Request
                  </Label>
                  <p className="text-sm text-muted-foreground">Send an email asking guests to leave a review</p>
                </div>
                <Switch
                  id="review-request"
                  checked={settings.communications.sendReviewRequest}
                  onCheckedChange={(checked) => handleCommunicationsSettingsChange("sendReviewRequest", checked)}
                />
              </div>

              {settings.communications.sendReviewRequest && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="review-request-days">Days After Check-out</Label>
                  <Input
                    id="review-request-days"
                    type="number"
                    value={settings.communications.reviewRequestDays}
                    onChange={(e) =>
                      handleCommunicationsSettingsChange("reviewRequestDays", Number.parseInt(e.target.value))
                    }
                    min="1"
                    max="14"
                    className="w-20"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize the content of emails sent to guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-selector">Select Template to Edit</Label>
                <Select defaultValue="booking-confirmation">
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking-confirmation">Booking Confirmation</SelectItem>
                    <SelectItem value="payment-confirmation">Payment Confirmation</SelectItem>
                    <SelectItem value="checkin-instructions">Check-in Instructions</SelectItem>
                    <SelectItem value="pre-arrival-reminder">Pre-Arrival Reminder</SelectItem>
                    <SelectItem value="post-stay-thank-you">Post-Stay Thank You</SelectItem>
                    <SelectItem value="review-request">Review Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-subject">Email Subject</Label>
                <Input id="email-subject" defaultValue="Your Booking Confirmation for {property_name}" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-content">Email Content</Label>
                <Textarea
                  id="email-content"
                  defaultValue={`Dear {guest_name},

Thank you for booking {property_name}. Your reservation has been confirmed.

Check-in: {check_in_date}
Check-out: {check_out_date}
Guests: {guest_count}
Total: {total_price}

We're looking forward to hosting you!

Best regards,
{host_name}`}
                  rows={10}
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Available Variables:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{"{guest_name}"}</Badge>
                  <Badge variant="outline">{"{property_name}"}</Badge>
                  <Badge variant="outline">{"{check_in_date}"}</Badge>
                  <Badge variant="outline">{"{check_out_date}"}</Badge>
                  <Badge variant="outline">{"{guest_count}"}</Badge>
                  <Badge variant="outline">{"{total_price}"}</Badge>
                  <Badge variant="outline">{"{host_name}"}</Badge>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>

              {showPreview && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Email Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p>
                        <strong>Subject:</strong> Your Booking Confirmation for Beach Villa
                      </p>
                      <hr />
                      <p>Dear John Smith,</p>
                      <p>Thank you for booking Beach Villa. Your reservation has been confirmed.</p>
                      <p>
                        Check-in: Nov 15, 2023
                        <br />
                        Check-out: Nov 20, 2023
                        <br />
                        Guests: 2<br />
                        Total: $1,250
                      </p>
                      <p>We're looking forward to hosting you!</p>
                      <p>
                        Best regards,
                        <br />
                        Jane Host
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
            <CardFooter>
              <Button>Save Template</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="cancellation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancellation Policy</CardTitle>
              <CardDescription>Configure your cancellation policy and refund rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cancellation-policy">Cancellation Policy Type</Label>
                <Select
                  value={settings.cancellation.policy}
                  onValueChange={(value) => handleCancellationSettingsChange("policy", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="strict">Strict</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Current Policy Description:</p>
                {settings.cancellation.policy === "flexible" && (
                  <p className="text-sm text-muted-foreground">
                    Full refund if cancelled at least 24 hours before check-in. 50% refund if cancelled at least 12
                    hours before check-in.
                  </p>
                )}
                {settings.cancellation.policy === "moderate" && (
                  <p className="text-sm text-muted-foreground">
                    Full refund if cancelled at least 7 days before check-in. 50% refund if cancelled at least 3 days
                    before check-in.
                  </p>
                )}
                {settings.cancellation.policy === "strict" && (
                  <p className="text-sm text-muted-foreground">
                    Full refund if cancelled at least 14 days before check-in. 50% refund if cancelled at least 7 days
                    before check-in.
                  </p>
                )}
                {settings.cancellation.policy === "custom" && (
                  <p className="text-sm text-muted-foreground">
                    Full refund if cancelled at least {settings.cancellation.fullRefundDays} days before check-in.
                    {settings.cancellation.partialRefundDays > 0
                      ? ` ${settings.cancellation.partialRefundPercentage}% refund if cancelled at least ${settings.cancellation.partialRefundDays} days before check-in.`
                      : " No partial refunds."}
                  </p>
                )}
              </div>

              {settings.cancellation.policy === "custom" && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Custom Cancellation Settings</h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-refund-days">Full Refund (days before check-in)</Label>
                        <Input
                          id="full-refund-days"
                          type="number"
                          value={settings.cancellation.fullRefundDays}
                          onChange={(e) =>
                            handleCancellationSettingsChange("fullRefundDays", Number.parseInt(e.target.value))
                          }
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partial-refund-days">Partial Refund (days before check-in)</Label>
                        <Input
                          id="partial-refund-days"
                          type="number"
                          value={settings.cancellation.partialRefundDays}
                          onChange={(e) =>
                            handleCancellationSettingsChange("partialRefundDays", Number.parseInt(e.target.value))
                          }
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="partial-refund-percentage">Partial Refund Percentage</Label>
                      <div className="flex items-center">
                        <Input
                          id="partial-refund-percentage"
                          type="number"
                          value={settings.cancellation.partialRefundPercentage}
                          onChange={(e) =>
                            handleCancellationSettingsChange("partialRefundPercentage", Number.parseInt(e.target.value))
                          }
                          min="0"
                          max="100"
                          className="w-20 mr-2"
                        />
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checkinout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Check-in/Check-out Times</CardTitle>
              <CardDescription>Configure your property's check-in and check-out times</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="check-in-time">Check-in Time</Label>
                  <Input
                    id="check-in-time"
                    type="time"
                    value={settings.checkInOut.checkInTime}
                    onChange={(e) => handleCheckInOutSettingsChange("checkInTime", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="check-out-time">Check-out Time</Label>
                  <Input
                    id="check-out-time"
                    type="time"
                    value={settings.checkInOut.checkOutTime}
                    onChange={(e) => handleCheckInOutSettingsChange("checkOutTime", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="early-check-in" className="text-base">
                    Allow Early Check-in
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow guests to check in before the standard time</p>
                </div>
                <Switch
                  id="early-check-in"
                  checked={settings.checkInOut.allowEarlyCheckIn}
                  onCheckedChange={(checked) => handleCheckInOutSettingsChange("allowEarlyCheckIn", checked)}
                />
              </div>

              {settings.checkInOut.allowEarlyCheckIn && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="early-check-in-fee">Early Check-in Fee</Label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <Input
                      id="early-check-in-fee"
                      type="number"
                      value={settings.checkInOut.earlyCheckInFee}
                      onChange={(e) =>
                        handleCheckInOutSettingsChange("earlyCheckInFee", Number.parseInt(e.target.value))
                      }
                      min="0"
                      className="w-20"
                    />
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="late-check-out" className="text-base">
                    Allow Late Check-out
                  </Label>
                  <p className="text-sm text-muted-foreground">Allow guests to check out after the standard time</p>
                </div>
                <Switch
                  id="late-check-out"
                  checked={settings.checkInOut.allowLateCheckOut}
                  onCheckedChange={(checked) => handleCheckInOutSettingsChange("allowLateCheckOut", checked)}
                />
              </div>

              {settings.checkInOut.allowLateCheckOut && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="late-check-out-fee">Late Check-out Fee</Label>
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <Input
                      id="late-check-out-fee"
                      type="number"
                      value={settings.checkInOut.lateCheckOutFee}
                      onChange={(e) =>
                        handleCheckInOutSettingsChange("lateCheckOutFee", Number.parseInt(e.target.value))
                      }
                      min="0"
                      className="w-20"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Check-in Instructions</CardTitle>
              <CardDescription>Customize the check-in instructions sent to guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="checkin-method">Check-in Method</Label>
                <Select defaultValue="self">
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self Check-in</SelectItem>
                    <SelectItem value="host">Host Check-in</SelectItem>
                    <SelectItem value="keybox">Key Box</SelectItem>
                    <SelectItem value="smartlock">Smart Lock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkin-instructions">Check-in Instructions</Label>
                <Textarea
                  id="checkin-instructions"
                  defaultValue={`Welcome to your stay at Beach Villa!

Check-in Time: ${settings.checkInOut.checkInTime}
Check-out Time: ${settings.checkInOut.checkOutTime}

Self Check-in Instructions:
1. When you arrive, go to the front door.
2. Enter the code 1234 on the smart lock.
3. The door will unlock automatically.
4. You'll find the keys and welcome package on the kitchen counter.

If you have any issues, please call us at (555) 123-4567.

Enjoy your stay!`}
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

