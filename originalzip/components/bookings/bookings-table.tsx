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

interface Booking {
  id: string
  propertyName: string
  guestName: string
  checkIn: string
  checkOut: string
  status: "confirmed" | "pending" | "cancelled"
  total: number
}

const data: Booking[] = [
  {
    id: "B001",
    propertyName: "Seaside Villa",
    guestName: "John Smith",
    checkIn: "2023-06-01",
    checkOut: "2023-06-07",
    status: "confirmed",
    total: 1200,
  },
  {
    id: "B002",
    propertyName: "Mountain Cabin",
    guestName: "Jane Doe",
    checkIn: "2023-06-10",
    checkOut: "2023-06-15",
    status: "pending",
    total: 850,
  },
  {
    id: "B003",
    propertyName: "Downtown Loft",
    guestName: "Robert Johnson",
    checkIn: "2023-06-05",
    checkOut: "2023-06-08",
    status: "cancelled",
    total: 450,
  },
]

const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "propertyName",
    header: "Property",
  },
  {
    accessorKey: "guestName",
    header: "Guest",
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "confirmed"
              ? "bg-green-100 text-green-800"
              : status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("total"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return formatted
    },
  },
]

export function BookingsTable() {
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
                  No bookings found.
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

