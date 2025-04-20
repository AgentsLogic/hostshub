"use client"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Channel {
  id: string
  name: string
  type: "airbnb" | "booking" | "vrbo" | "expedia" | "other"
  properties: number
  status: "connected" | "disconnected" | "pending"
  lastSync: string
}

const data: Channel[] = [
  {
    id: "ch_1",
    name: "Airbnb",
    type: "airbnb",
    properties: 12,
    status: "connected",
    lastSync: "2023-06-01T10:30:00Z",
  },
  {
    id: "ch_2",
    name: "Booking.com",
    type: "booking",
    properties: 8,
    status: "connected",
    lastSync: "2023-06-01T09:45:00Z",
  },
  {
    id: "ch_3",
    name: "VRBO",
    type: "vrbo",
    properties: 5,
    status: "disconnected",
    lastSync: "2023-05-28T14:20:00Z",
  },
  {
    id: "ch_4",
    name: "Expedia",
    type: "expedia",
    properties: 0,
    status: "pending",
    lastSync: "-",
  },
]

const columns: ColumnDef<Channel>[] = [
  {
    accessorKey: "name",
    header: "Channel",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "properties",
    header: "Properties",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "connected" ? "default" : status === "pending" ? "outline" : "secondary"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastSync",
    header: "Last Sync",
    cell: ({ row }) => {
      const lastSync = row.getValue("lastSync") as string
      if (lastSync === "-") return "-"
      return new Date(lastSync).toLocaleString()
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const channel = row.original
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            View
          </Button>
          {channel.status === "connected" ? (
            <Button variant="outline" size="sm">
              Sync
            </Button>
          ) : channel.status === "disconnected" ? (
            <Button size="sm">Reconnect</Button>
          ) : (
            <Button size="sm">Complete Setup</Button>
          )}
        </div>
      )
    },
  },
]

export function ChannelsTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No channels found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}

