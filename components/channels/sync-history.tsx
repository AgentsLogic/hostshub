"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { History as HistoryIcon, Filter, Calendar as CalendarIcon } from "lucide-react"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"

// Types (copied from parent, consider moving to a shared types file)
interface SyncHistoryItem {
  id: string
  timestamp: Date
  type: 'full' | 'incremental'
  status: 'success' | 'failed' | 'warning' // Added warning status
  duration: number // in seconds
  propertiesSynced: number
  bookingsSynced: number
  error?: string
  warnings?: string[]
}

interface SyncHistoryProps {
  initialHistory?: SyncHistoryItem[]; // Allow passing initial data
}

// Mock Data Generation (can be removed when API is integrated)
const generateMockHistory = (count = 25): SyncHistoryItem[] => {
  const history: SyncHistoryItem[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000 * Math.random() * 6); // Random time in the past few days
    const statusOptions: SyncHistoryItem['status'][] = ['success', 'failed', 'warning'];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const type = Math.random() > 0.7 ? 'full' : 'incremental';
    const duration = Math.floor(Math.random() * (type === 'full' ? 120 : 30)) + 5;
    const propertiesSynced = status === 'failed' ? 0 : Math.floor(Math.random() * 10);
    const bookingsSynced = status === 'failed' ? 0 : Math.floor(Math.random() * 20);
    
    history.push({
      id: `${timestamp.getTime()}-${i}`,
      timestamp,
      type,
      status,
      duration,
      propertiesSynced,
      bookingsSynced,
      error: status === 'failed' ? 'API Connection Timeout' : undefined,
      warnings: status === 'warning' ? ['Rate limit exceeded for 2 properties'] : undefined,
    });
  }
  return history.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export function SyncHistory({ initialHistory }: SyncHistoryProps) {
  // State Management
  const [syncHistory, setSyncHistory] = useState<SyncHistoryItem[]>(initialHistory || generateMockHistory());
  const [selectedSync, setSelectedSync] = useState<SyncHistoryItem | null>(null)
  
  // Filtering State
  const [statusFilter, setStatusFilter] = useState<'all' | SyncHistoryItem['status']>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | SyncHistoryItem['type']>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Memoized Filtering and Pagination
  const filteredSyncHistory = useMemo(() => {
    return syncHistory.filter(item => {
      const statusMatch = statusFilter === 'all' || item.status === statusFilter;
      const typeMatch = typeFilter === 'all' || item.type === typeFilter;
      const dateMatch = !dateRange?.from || (
        item.timestamp >= dateRange.from && 
        (!dateRange.to || item.timestamp <= dateRange.to)
      );
      return statusMatch && typeMatch && dateMatch;
    });
  }, [syncHistory, statusFilter, typeFilter, dateRange]);

  const paginatedSyncHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSyncHistory.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSyncHistory, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredSyncHistory.length / itemsPerPage);
  }, [filteredSyncHistory, itemsPerPage]);

  // Handlers
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as typeof statusFilter);
    setCurrentPage(1); // Reset page on filter change
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value as typeof typeFilter);
    setCurrentPage(1); // Reset page on filter change
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1); // Reset page on filter change
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset page
  }

  // Helper to format duration
  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Helper for status badge color
  const getStatusBadgeVariant = (status: SyncHistoryItem['status']): "default" | "destructive" | "secondary" | "outline" => {
    switch (status) {
      case 'success': return 'default'; // Greenish (default theme)
      case 'failed': return 'destructive'; // Reddish
      case 'warning': return 'secondary'; // Yellowish/Orangish (secondary theme)
      default: return 'outline';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" />
            Sync History
          </CardTitle>
          <CardDescription>
            Review past synchronization operations and their outcomes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filter Controls */}
          <div className="mb-6 p-4 border rounded-md bg-muted/50">
             <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Filter className="h-4 w-4"/> Filters</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="statusFilter" className="text-xs">Status</Label>
                  <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                    <SelectTrigger id="statusFilter" className="mt-1 h-9">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="typeFilter" className="text-xs">Sync Type</Label>
                  <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                    <SelectTrigger id="typeFilter" className="mt-1 h-9">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full">Full Sync</SelectItem>
                      <SelectItem value="incremental">Incremental</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                   <Label htmlFor="dateRangeFilter" className="text-xs">Date Range</Label>
                   {/* Date Range Picker */}
                   <div className="mt-1">
                     <DateRangePicker
                       initialDateFrom={dateRange?.from}
                       initialDateTo={dateRange?.to}
                       onUpdate={(values) => handleDateRangeChange(values.range)}
                       align="start"
                       triggerClassName="w-full justify-start text-left font-normal"
                     />
                   </div>
                </div>
             </div>
          </div>

          {/* Sync History Table */}
          <div className="overflow-x-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date/Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Properties</TableHead>
                  <TableHead className="text-right">Bookings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSyncHistory.length > 0 ? (
                  paginatedSyncHistory.map((sync) => (
                    <TableRow
                      key={sync.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => setSelectedSync(sync)}
                    >
                      <TableCell className="whitespace-nowrap">
                        {sync.timestamp.toLocaleString()}
                      </TableCell>
                      <TableCell className="capitalize">{sync.type}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(sync.status)} className="capitalize">
                          {sync.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDuration(sync.duration)}</TableCell>
                      <TableCell className="text-right">{sync.propertiesSynced}</TableCell>
                      <TableCell className="text-right">{sync.bookingsSynced}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No sync operations match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {filteredSyncHistory.length > itemsPerPage && (
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1}-
                {Math.min(currentPage * itemsPerPage, filteredSyncHistory.length)} of{' '}
                {filteredSyncHistory.length} sync operations
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <Label htmlFor="itemsPerPage" className="text-xs whitespace-nowrap">Rows per page:</Label>
                    <Select
                      value={String(itemsPerPage)}
                      onValueChange={handleItemsPerPageChange}
                    >
                      <SelectTrigger id="itemsPerPage" className="h-8 w-[70px]">
                        <SelectValue placeholder={itemsPerPage} />
                      </SelectTrigger>
                      <SelectContent side="top">
                        {[5, 10, 20, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                 </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sync Details Dialog */}
      <Dialog open={!!selectedSync} onOpenChange={() => setSelectedSync(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Sync Operation Details</DialogTitle>
          </DialogHeader>
          {selectedSync && (
            <div className="space-y-4 py-4 text-sm">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div><strong className="font-medium">Date/Time:</strong></div>
                <div>{selectedSync.timestamp.toLocaleString()}</div>

                <div><strong className="font-medium">Type:</strong></div>
                <div className="capitalize">{selectedSync.type}</div>

                <div><strong className="font-medium">Status:</strong></div>
                <div>
                  <Badge variant={getStatusBadgeVariant(selectedSync.status)} className="capitalize">
                    {selectedSync.status}
                  </Badge>
                </div>

                <div><strong className="font-medium">Duration:</strong></div>
                <div>{formatDuration(selectedSync.duration)}</div>

                <div><strong className="font-medium">Properties Synced:</strong></div>
                <div>{selectedSync.propertiesSynced}</div>

                <div><strong className="font-medium">Bookings Synced:</strong></div>
                <div>{selectedSync.bookingsSynced}</div>
              </div>

              {selectedSync.error && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-1 text-destructive">Error Details:</h4>
                  <p className="text-destructive bg-destructive/10 p-2 rounded-md">{selectedSync.error}</p>
                </div>
              )}

              {selectedSync.warnings && selectedSync.warnings.length > 0 && (
                 <div className="pt-4 border-t">
                  <h4 className="font-medium mb-1 text-yellow-600">Warnings:</h4>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700 bg-yellow-50 p-2 rounded-md">
                    {selectedSync.warnings.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
