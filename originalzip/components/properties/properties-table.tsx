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
import Link from "next/link"

interface Property {
  id: string
  name: string
  type: string
  location: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  price: number
  status: "active" | "inactive" | "maintenance"
}

const data: Property[] = [
  {
    id: "p1",
    name: "Seaside Villa",
    type: "Villa",
    location: "Miami, FL",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: 250,
    status: "active",
  },
  {
    id: "p2",
    name: "Mountain Cabin",
    type: "Cabin",
    location: "Aspen, CO",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    price: 180,
    status: "active",
  },
  {
    id: "p3",
    name: "Downtown Loft",
    type: "Apartment",
    location: "New York, NY",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    price: 150,
    status: "inactive",
  },
  {
    id: "p4",
    name: "Lakefront Cottage",
    type: "Cottage",
    location: "Lake Tahoe, CA",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    price: 220,
    status: "maintenance",
  },
]

const columns: ColumnDef<Property>[] = [
  {
    accessorKey: "name",
    header: "Property",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "bedrooms",
    header: "Beds",
  },
  {
    accessorKey: "bathrooms",
    header: "Baths",
  },
  {
    accessorKey: "maxGuests",
    header: "Guests",
  },
  {
    accessorKey: "price",
    header: "Price/Night",
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return formatted
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : status === "maintenance" ? "destructive" : "secondary"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const property = row.original
      return (
        <Button asChild variant="ghost" size="sm">
          <Link href={`/properties/${property.id}`}>View</Link>
        </Button>
      )
    },
  },
]

export function PropertiesTable() {
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
                  No properties found.
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

