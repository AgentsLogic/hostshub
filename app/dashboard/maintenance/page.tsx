"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import {
  Loader2,
  Filter,
  Plus,
  Calendar,
  PenToolIcon as Tool,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Label } from "@/components/ui/label"

// Mock data for maintenance tasks
const mockTasks = [
  {
    id: "1",
    title: "Fix leaking faucet in master bathroom",
    description:
      "The faucet in the master bathroom is leaking. Need to replace the washer or possibly the entire faucet.",
    property: "Beach Villa",
    propertyId: "1",
    status: "pending",
    priority: "medium",
    createdAt: "2023-10-15",
    dueDate: "2023-10-25",
    assignedTo: "John Doe",
    assignedToId: "1",
    assignedToAvatar: "/placeholder.svg?height=40&width=40",
    category: "plumbing",
    estimatedCost: 75,
    actualCost: null,
    notes: "Guest reported the issue on checkout. Water is dripping slowly but consistently.",
    attachments: [],
    history: [
      { date: "2023-10-15", action: "Task created", user: "Admin" },
      { date: "2023-10-16", action: "Assigned to John Doe", user: "Admin" },
    ],
  },
  {
    id: "2",
    title: "Replace broken air conditioner",
    description:
      "The AC unit in the living room is not cooling properly. May need a refrigerant recharge or replacement.",
    property: "Beach Villa",
    propertyId: "1",
    status: "in-progress",
    priority: "high",
    createdAt: "2023-10-10",
    dueDate: "2023-10-20",
    assignedTo: "Mike Johnson",
    assignedToId: "2",
    assignedToAvatar: "/placeholder.svg?height=40&width=40",
    category: "hvac",
    estimatedCost: 350,
    actualCost: null,
    notes: "HVAC technician scheduled for tomorrow. Guest complained about the heat.",
    attachments: [],
    history: [
      { date: "2023-10-10", action: "Task created", user: "Admin" },
      { date: "2023-10-11", action: "Assigned to Mike Johnson", user: "Admin" },
      { date: "2023-10-18", action: "Status changed to In Progress", user: "Mike Johnson" },
    ],
  },
  {
    id: "3",
    title: "Repaint living room walls",
    description: "The living room walls have scuff marks and need a fresh coat of paint.",
    property: "Mountain Cabin",
    propertyId: "2",
    status: "completed",
    priority: "low",
    createdAt: "2023-09-20",
    dueDate: "2023-10-05",
    completedAt: "2023-10-03",
    assignedTo: "Sarah Williams",
    assignedToId: "3",
    assignedToAvatar: "/placeholder.svg?height=40&width=40",
    category: "cosmetic",
    estimatedCost: 200,
    actualCost: 180,
    notes: "Used the same color as before. Two coats applied.",
    attachments: [],
    history: [
      { date: "2023-09-20", action: "Task created", user: "Admin" },
      { date: "2023-09-21", action: "Assigned to Sarah Williams", user: "Admin" },
      { date: "2023-10-01", action: "Status changed to In Progress", user: "Sarah Williams" },
      { date: "2023-10-03", action: "Status changed to Completed", user: "Sarah Williams" },
      { date: "2023-10-03", action: "Actual cost updated: $180", user: "Sarah Williams" },
    ],
  },
  {
    id: "4",
    title: "Fix broken lock on front door",
    description: "The lock on the front door is sticking and difficult to open. May need replacement.",
    property: "City Apartment",
    propertyId: "3",
    status: "pending",
    priority: "high",
    createdAt: "2023-10-17",
    dueDate: "2023-10-19",
    assignedTo: "John Doe",
    assignedToId: "1",
    assignedToAvatar: "/placeholder.svg?height=40&width=40",
    category: "security",
    estimatedCost: 150,
    actualCost: null,
    notes: "Guest reported difficulty entering the property. Need to fix before next check-in.",
    attachments: [],
    history: [
      { date: "2023-10-17", action: "Task created", user: "Admin" },
      { date: "2023-10-17", action: "Assigned to John Doe", user: "Admin" },
    ],
  },
  {
    id: "5",
    title: "Clean gutters",
    description: "Gutters are clogged with leaves and debris. Need cleaning to prevent water damage.",
    property: "Lake House",
    propertyId: "4",
    status: "scheduled",
    priority: "medium",
    createdAt: "2023-10-12",
    dueDate: "2023-10-30",
    assignedTo: "Mike Johnson",
    assignedToId: "2",
    assignedToAvatar: "/placeholder.svg?height=40&width=40",
    category: "exterior",
    estimatedCost: 120,
    actualCost: null,
    notes: "Scheduled for next week. No guests until November.",
    attachments: [],
    history: [
      { date: "2023-10-12", action: "Task created", user: "Admin" },
      { date: "2023-10-13", action: "Assigned to Mike Johnson", user: "Admin" },
      { date: "2023-10-15", action: "Status changed to Scheduled", user: "Mike Johnson" },
    ],
  },
]

// Mock data for maintenance staff
const mockStaff = [
  {
    id: "1",
    name: "John Doe",
    role: "Handyman",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["plumbing", "electrical", "general"],
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Mike Johnson",
    role: "HVAC Technician",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["hvac", "electrical"],
    phone: "+1 (555) 987-6543",
    email: "mike.johnson@example.com",
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: "Painter",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["cosmetic", "general"],
    phone: "+1 (555) 456-7890",
    email: "sarah.williams@example.com",
  },
  {
    id: "4",
    name: "Lisa Brown",
    role: "Cleaner",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["cleaning"],
    phone: "+1 (555) 789-0123",
    email: "lisa.brown@example.com",
  },
  {
    id: "5",
    name: "Robert Garcia",
    role: "Landscaper",
    avatar: "/placeholder.svg?height=40&width=40",
    skills: ["exterior", "landscaping"],
    phone: "+1 (555) 234-5678",
    email: "robert.garcia@example.com",
  },
]

// Mock properties for filtering
const mockProperties = [
  { id: "1", name: "Beach Villa" },
  { id: "2", name: "Mountain Cabin" },
  { id: "3", name: "City Apartment" },
  { id: "4", name: "Lake House" },
]

// Mock maintenance tasks data
const tasks = [
  {
    id: "1",
    title: "Fix leaking faucet",
    property: "Luxury Beach House",
    priority: "high",
    status: "pending",
    dueDate: "2023-09-20",
    assignedTo: "Mike (Plumber)",
    description: "The kitchen faucet is leaking. Needs to be fixed before next guest arrives.",
  },
  {
    id: "2",
    title: "Replace AC filter",
    property: "Downtown Loft",
    priority: "medium",
    status: "scheduled",
    dueDate: "2023-09-25",
    assignedTo: "HVAC Services Inc.",
    description: "Regular maintenance - replace AC filter.",
  },
  {
    id: "3",
    title: "Repaint living room wall",
    property: "Mountain Cabin",
    priority: "low",
    status: "completed",
    dueDate: "2023-09-15",
    assignedTo: "John (Painter)",
    description: "Touch up paint on living room wall where furniture scratched it.",
  },
]

export default function MaintenancePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [tasksState, setTasks] = useState<any[]>([])
  const [filteredTasks, setFilteredTasks] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyFilter, setPropertyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    propertyId: "",
    priority: "medium",
    dueDate: new Date(),
    assignedToId: "",
    category: "general",
    estimatedCost: 0,
  })
  const [date, setDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    // Simulate API call to fetch tasks
    setTimeout(() => {
      setTasks(mockTasks)
      setFilteredTasks(mockTasks)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Apply filters and search
    let filtered = [...tasksState]

    // Apply tab filter
    if (activeTab === "pending") {
      filtered = filtered.filter((task) => task.status === "pending")
    } else if (activeTab === "in-progress") {
      filtered = filtered.filter((task) => task.status === "in-progress")
    } else if (activeTab === "scheduled") {
      filtered = filtered.filter((task) => task.status === "scheduled")
    } else if (activeTab === "completed") {
      filtered = filtered.filter((task) => task.status === "completed")
    } else if (activeTab === "high-priority") {
      filtered = filtered.filter((task) => task.priority === "high")
    }

    // Apply property filter
    if (propertyFilter !== "all") {
      filtered = filtered.filter((task) => task.propertyId === propertyFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((task) => task.category === categoryFilter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.property.toLowerCase().includes(query) ||
          task.assignedTo.toLowerCase().includes(query),
      )
    }

    setFilteredTasks(filtered)
  }, [tasksState, activeTab, propertyFilter, statusFilter, priorityFilter, categoryFilter, searchQuery])

  const handleViewTask = (task: any) => {
    setSelectedTask(task)
    setIsTaskDialogOpen(true)
  }

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.propertyId || !newTask.assignedToId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to create task
    setTimeout(() => {
      const property = mockProperties.find((p) => p.id === newTask.propertyId)
      const assignedTo = mockStaff.find((s) => s.id === newTask.assignedToId)

      const newTaskObj = {
        id: (tasksState.length + 1).toString(),
        title: newTask.title,
        description: newTask.description,
        property: property?.name || "",
        propertyId: newTask.propertyId,
        status: "pending",
        priority: newTask.priority,
        createdAt: format(new Date(), "yyyy-MM-dd"),
        dueDate: format(newTask.dueDate, "yyyy-MM-dd"),
        assignedTo: assignedTo?.name || "",
        assignedToId: newTask.assignedToId,
        assignedToAvatar: assignedTo?.avatar || "",
        category: newTask.category,
        estimatedCost: newTask.estimatedCost,
        actualCost: null,
        notes: "",
        attachments: [],
        history: [
          { date: format(new Date(), "yyyy-MM-dd"), action: "Task created", user: "Admin" },
          { date: format(new Date(), "yyyy-MM-dd"), action: `Assigned to ${assignedTo?.name}`, user: "Admin" },
        ],
      }

      setTasks((prev) => [...prev, newTaskObj])

      toast({
        title: "Success",
        description: "Maintenance task created successfully",
      })

      setIsLoading(false)
      setIsNewTaskDialogOpen(false)
      setNewTask({
        title: "",
        description: "",
        propertyId: "",
        priority: "medium",
        dueDate: new Date(),
        assignedToId: "",
        category: "general",
        estimatedCost: 0,
      })
    }, 1000)
  }

  const handleUpdateTaskStatus = (taskId: string, newStatus: string) => {
    setIsLoading(true)

    // Simulate API call to update task status
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            const updatedTask = {
              ...task,
              status: newStatus,
              history: [
                ...task.history,
                {
                  date: format(new Date(), "yyyy-MM-dd"),
                  action: `Status changed to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
                  user: "Admin",
                },
              ],
            }

            if (newStatus === "completed") {
              updatedTask.completedAt = format(new Date(), "yyyy-MM-dd")
            }

            return updatedTask
          }
          return task
        }),
      )

      toast({
        title: "Success",
        description: "Task status updated successfully",
      })

      setIsLoading(false)

      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = tasksState.find((t) => t.id === taskId)
        if (updatedTask) {
          setSelectedTask(updatedTask)
        }
      }
    }, 1000)
  }

  const handleUpdateTaskCost = (taskId: string, cost: number) => {
    setIsLoading(true)

    // Simulate API call to update task cost
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              actualCost: cost,
              history: [
                ...task.history,
                {
                  date: format(new Date(), "yyyy-MM-dd"),
                  action: `Actual cost updated: $${cost}`,
                  user: "Admin",
                },
              ],
            }
          }
          return task
        }),
      )

      toast({
        title: "Success",
        description: "Task cost updated successfully",
      })

      setIsLoading(false)

      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = tasksState.find((t) => t.id === taskId)
        if (updatedTask) {
          setSelectedTask(updatedTask)
        }
      }
    }, 1000)
  }

  const handleAddTaskNote = (taskId: string, note: string) => {
    if (!note.trim()) {
      toast({
        title: "Error",
        description: "Note cannot be empty",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call to add task note
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              notes: task.notes ? `${task.notes}\n${note}` : note,
              history: [
                ...task.history,
                {
                  date: format(new Date(), "yyyy-MM-dd"),
                  action: `Note added: "${note}"`,
                  user: "Admin",
                },
              ],
            }
          }
          return task
        }),
      )

      toast({
        title: "Success",
        description: "Note added successfully",
      })

      setIsLoading(false)

      if (selectedTask && selectedTask.id === taskId) {
        const updatedTask = tasksState.find((t) => t.id === taskId)
        if (updatedTask) {
          setSelectedTask(updatedTask)
        }
      }
    }, 1000)
  }

  const toggleExpandTask = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "scheduled":
        return <Badge className="bg-purple-500">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "plumbing":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            Plumbing
          </Badge>
        )
      case "electrical":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Electrical
          </Badge>
        )
      case "hvac":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            HVAC
          </Badge>
        )
      case "cosmetic":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-500">
            Cosmetic
          </Badge>
        )
      case "security":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            Security
          </Badge>
        )
      case "exterior":
        return (
          <Badge variant="outline" className="text-orange-500 border-orange-500">
            Exterior
          </Badge>
        )
      case "general":
        return <Badge variant="outline">General</Badge>
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "in-progress":
        return <Tool className="h-4 w-4 text-blue-500" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getTasksCountByStatus = () => {
    const counts = {
      pending: 0,
      "in-progress": 0,
      scheduled: 0,
      completed: 0,
    }

    tasksState.forEach((task) => {
      if (counts.hasOwnProperty(task.status)) {
        counts[task.status as keyof typeof counts]++
      }
    })

    return counts
  }

  const getTasksCountByPriority = () => {
    const counts = {
      high: 0,
      medium: 0,
      low: 0,
    }

    tasksState.forEach((task) => {
      if (counts.hasOwnProperty(task.priority)) {
        counts[task.priority as keyof typeof counts]++
      }
    })

    return counts
  }

  const getTotalEstimatedCost = () => {
    return tasksState.reduce((sum, task) => sum + task.estimatedCost, 0)
  }

  const getTotalActualCost = () => {
    return tasksState.reduce((sum, task) => sum + (task.actualCost || 0), 0)
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">Manage property maintenance and repairs</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setIsNewTaskDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="high-priority">High Priority</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Est. Cost</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <React.Fragment key={`task-${task.id}`}>
                        <TableRow
                          key={`row-${task.id}`}
                          className={task.priority === "high" && task.status !== "completed" ? "bg-red-50" : ""}
                        >
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => toggleExpandTask(task.id)}>
                              {expandedTask === task.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {task.description}
                            </div>
                          </TableCell>
                          <TableCell>{task.property}</TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                              {task.dueDate}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={task.assignedToAvatar} alt={task.assignedTo} />
                                <AvatarFallback>{task.assignedTo.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{task.assignedTo}</span>
                            </div>
                          </TableCell>
                          <TableCell>${task.estimatedCost}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleViewTask(task)}>View Details</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {task.status !== "in-progress" && task.status !== "completed" && (
                                    <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "in-progress")}>
                                      Mark as In Progress
                                    </DropdownMenuItem>
                                  )}
                                  {task.status !== "scheduled" && task.status !== "completed" && (
                                    <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "scheduled")}>
                                      Mark as Scheduled
                                    </DropdownMenuItem>
                                  )}
                                  {task.status !== "completed" && (
                                    <DropdownMenuItem onClick={() => handleUpdateTaskStatus(task.id, "completed")}>
                                      Mark as Completed
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>

                        {expandedTask === task.id && (
                          <TableRow key={`expanded-${task.id}`}>
                            <TableCell colSpan={9} className="bg-muted/50">
                              <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Task Details</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <span className="text-sm text-muted-foreground">Description:</span>
                                        <p className="text-sm">{task.description}</p>
                                      </div>
                                      <div>
                                        <span className="text-sm text-muted-foreground">Category:</span>
                                        <div className="mt-1">{getCategoryBadge(task.category)}</div>
                                      </div>
                                      <div>
                                        <span className="text-sm text-muted-foreground">Created:</span>
                                        <p className="text-sm">{task.createdAt}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Assignment</h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Avatar>
                                          <AvatarImage src={task.assignedToAvatar} alt={task.assignedTo} />
                                          <AvatarFallback>{task.assignedTo.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="text-sm font-medium">{task.assignedTo}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {mockStaff.find((s) => s.id === task.assignedToId)?.role || "Staff"}
                                          </p>
                                        </div>
                                      </div>
                                      <div>
                                        <span className="text-sm text-muted-foreground">Due Date:</span>
                                        <p className="text-sm">{task.dueDate}</p>
                                      </div>
                                      {task.completedAt && (
                                        <div>
                                          <span className="text-sm text-muted-foreground">Completed:</span>
                                          <p className="text-sm">{task.completedAt}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Costs</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <span className="text-sm text-muted-foreground">Estimated Cost:</span>
                                        <p className="text-sm">${task.estimatedCost}</p>
                                      </div>
                                      <div>
                                        <span className="text-sm text-muted-foreground">Actual Cost:</span>
                                        <p className="text-sm">
                                          {task.actualCost !== null ? `$${task.actualCost}` : "Not yet recorded"}
                                        </p>
                                      </div>
                                      {task.status === "completed" && task.actualCost === null && (
                                        <div className="mt-2">
                                          <div className="flex items-center gap-2">
                                            <Input
                                              type="number"
                                              placeholder="Enter actual cost"
                                              className="text-sm"
                                              onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                  handleUpdateTaskCost(
                                                    task.id,
                                                    Number.parseFloat(e.currentTarget.value),
                                                  )
                                                  e.currentTarget.value = ""
                                                }
                                              }}
                                            />
                                            <Button
                                              variant="outline"
                                              size="sm"
                                              onClick={(e) => {
                                                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                                if (input && input.value) {
                                                  handleUpdateTaskCost(task.id, Number.parseFloat(input.value))
                                                  input.value = ""
                                                }
                                              }}
                                            >
                                              Save
                                            </Button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Notes</h4>
                                    <div className="bg-muted p-3 rounded-md min-h-[100px] whitespace-pre-line text-sm">
                                      {task.notes || "No notes available."}
                                    </div>
                                    <div className="mt-2">
                                      <Input
                                        placeholder="Add a note..."
                                        className="text-sm"
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            handleAddTaskNote(task.id, e.currentTarget.value)
                                            e.currentTarget.value = ""
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">History</h4>
                                    <div className="bg-muted p-3 rounded-md min-h-[100px] overflow-y-auto max-h-[200px]">
                                      <div className="space-y-2">
                                        {task.history.map((item: any, index: number) => (
                                          <div key={index} className="text-sm">
                                            <span className="text-muted-foreground">{item.date}:</span>{" "}
                                            <span>{item.action}</span>{" "}
                                            <span className="text-xs text-muted-foreground">by {item.user}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getStatusIcon(selectedTask.status)}
                  <span>{selectedTask.title}</span>
                </DialogTitle>
                <DialogDescription>Task details and history</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Task Details</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Description:</span>
                      <p className="text-sm">{selectedTask.description}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Property:</span>
                      <p className="text-sm">{selectedTask.property}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <div className="mt-1">{getStatusBadge(selectedTask.status)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Priority:</span>
                      <div className="mt-1">{getPriorityBadge(selectedTask.priority)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <div className="mt-1">{getCategoryBadge(selectedTask.category)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Assignment</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={selectedTask.assignedToAvatar} alt={selectedTask.assignedTo} />
                        <AvatarFallback>{selectedTask.assignedTo.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{selectedTask.assignedTo}</p>
                        <p className="text-xs text-muted-foreground">
                          {mockStaff.find((s) => s.id === selectedTask.assignedToId)?.role || "Staff"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Created:</span>
                      <p className="text-sm">{selectedTask.createdAt}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <p className="text-sm">{selectedTask.dueDate}</p>
                    </div>
                    {selectedTask.completedAt && (
                      <div>
                        <span className="text-sm text-muted-foreground">Completed:</span>
                        <p className="text-sm">{selectedTask.completedAt}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Costs</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Estimated Cost:</span>
                      <p className="text-sm">${selectedTask.estimatedCost}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Actual Cost:</span>
                      <p className="text-sm">
                        {selectedTask.actualCost !== null ? `$${selectedTask.actualCost}` : "Not yet recorded"}
                      </p>
                    </div>
                    {selectedTask.status === "completed" && selectedTask.actualCost === null && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Enter actual cost"
                            className="text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUpdateTaskCost(selectedTask.id, Number.parseFloat(e.currentTarget.value))
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement
                              if (input && input.value) {
                                handleUpdateTaskCost(selectedTask.id, Number.parseFloat(input.value))
                                input.value = ""
                              }
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <div className="bg-muted p-3 rounded-md min-h-[100px] whitespace-pre-line text-sm">
                    {selectedTask.notes || "No notes available."}
                  </div>
                  <div className="mt-2">
                    <Textarea placeholder="Add a note..." className="text-sm" rows={3} id="task-note-input" />
                    <Button
                      className="mt-2"
                      onClick={() => {
                        const textarea = document.getElementById("task-note-input") as HTMLTextAreaElement
                        if (textarea && textarea.value) {
                          handleAddTaskNote(selectedTask.id, textarea.value)
                          textarea.value = ""
                        }
                      }}
                    >
                      Add Note
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">History</h4>
                  <div className="bg-muted p-3 rounded-md min-h-[200px] overflow-y-auto max-h-[300px]">
                    <div className="space-y-2">
                      {selectedTask.history.map((item: any, index: number) => (
                        <div key={index} className="text-sm">
                          <span className="text-muted-foreground">{item.date}:</span> <span>{item.action}</span>{" "}
                          <span className="text-xs text-muted-foreground">by {item.user}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  {selectedTask.status !== "completed" && (
                    <Button variant="outline" onClick={() => handleUpdateTaskStatus(selectedTask.id, "completed")}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Completed
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setIsTaskDialogOpen(false)}>Close</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Maintenance Task</DialogTitle>
            <DialogDescription>Enter the details for the new maintenance task.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title*
              </Label>
              <Input
                id="title"
                className="col-span-3"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="property" className="text-right">
                Property*
              </Label>
              <Select
                value={newTask.propertyId}
                onValueChange={(value) => setNewTask({ ...newTask, propertyId: value })}
              >
                <SelectTrigger id="property" className="col-span-3">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {mockProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                <SelectTrigger id="priority" className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={newTask.category} onValueChange={(value) => setNewTask({ ...newTask, category: value })}>
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="hvac">HVAC</SelectItem>
                  <SelectItem value="cosmetic">Cosmetic</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="exterior">Exterior</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="due-date" className="text-right">
                Due Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button id="due-date" variant="outline" className="col-span-3 justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {newTask.dueDate ? format(newTask.dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={newTask.dueDate}
                    onSelect={(date) => setNewTask({ ...newTask, dueDate: date || new Date() })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assigned-to" className="text-right">
                Assigned To*
              </Label>
              <Select
                value={newTask.assignedToId}
                onValueChange={(value) => setNewTask({ ...newTask, assignedToId: value })}
              >
                <SelectTrigger id="assigned-to" className="col-span-3">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {mockStaff.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id}>
                      {staff.name} ({staff.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="estimated-cost" className="text-right">
                Est. Cost ($)
              </Label>
              <Input
                id="estimated-cost"
                type="number"
                className="col-span-3"
                value={newTask.estimatedCost}
                onChange={(e) => setNewTask({ ...newTask, estimatedCost: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
