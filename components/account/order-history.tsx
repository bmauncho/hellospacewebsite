"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    date: new Date(2023, 4, 15),
    status: "Delivered",
    total: 249.99,
    items: 3,
  },
  {
    id: "ORD-002",
    date: new Date(2023, 3, 28),
    status: "Processing",
    total: 129.5,
    items: 2,
  },
  {
    id: "ORD-003",
    date: new Date(2023, 2, 10),
    status: "Delivered",
    total: 349.99,
    items: 1,
  },
]

export function OrderHistory() {
  const [filter, setFilter] = useState("all")

  // Filter orders based on selected filter
  const filteredOrders =
    filter === "all" ? mockOrders : mockOrders.filter((order) => order.status.toLowerCase() === filter.toLowerCase())

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#3c3a36]">Order History</h1>
          <p className="text-[#6b6963] mt-1">View and track your orders</p>
        </div>
        <div className="w-full sm:w-48">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{format(order.date, "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.items} item{order.items !== 1 ? "s" : ""}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/account/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-[#f8f5f2]">
          <h3 className="text-lg font-medium text-[#3c3a36]">No orders found</h3>
          <p className="text-[#6b6963] mt-1">You haven&apos;t placed any orders yet.</p>
          <Button asChild className="mt-4 bg-[#c17c60] hover:bg-[#a66a52]">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
