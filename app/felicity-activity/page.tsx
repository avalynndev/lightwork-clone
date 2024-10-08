"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/table";
import { MessagesSquare, Mail, Phone, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function FelicityActivity() {
  const metrics = [
    { title: "Jobs Booked", value: "23,205" },
    { title: "Payments Collected", value: "£1,250,000" },
    { title: "Invoices Pending", value: "150" },
    { title: "Tasks Created", value: "20" },
  ];
  const [timeRange, setTimeRange] = useState("24 hours");

  return (
    <main className="overflow-y-auto overflow-x-hidden">
      <div className="mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-pretty text-3xl text-gray-900">
            Felicity Activity
          </h2>
          <div className="flex space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Work Order
            </Button>
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24 hours">24 hours</SelectItem>
                <SelectItem value="7 days">7 days</SelectItem>
                <SelectItem value="30 days">30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <nav className="flex space-x-6 mb-6 border-b border-gray-200">
          {["All", "Enquiries", "Bookings", "Requests", "Invoices"].map(
            (item, index) => (
              <button
                key={item}
                className={`pb-2 text-sm font-medium ${
                  index === 0
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {item}
              </button>
            )
          )}
        </nav>

        <div className="rounded-xl border bg-card text-card-foreground shadow p-2 mb-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item, index) => (
              <div key={item.title} className="flex items-center">
                <div className="flex-1 p-8">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    {item.title}
                  </div>
                  <div className="text-2xl font-bold">{item.value}</div>
                </div>
                {index < metrics.length - 1 && (
                  <Separator
                    orientation="vertical"
                    className="h-full mx-3 hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4 w-[400px]">
            <TabsTrigger value="all" className="flex-1 space-x-2">
              All <MessagesSquare className="h-4 w-4 ml-2" />
            </TabsTrigger>
            <TabsTrigger disabled value="whatsapp" className="flex-1 space-x-2">
              WhatsApp
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
                alt="whatsapp"
                className="h-4 w-4 ml-1"
              />
            </TabsTrigger>
            <TabsTrigger disabled value="email" className="flex-1 space-x-2">
              Email
              <Mail className="h-4 w-4 ml-2" />
            </TabsTrigger>
            <TabsTrigger disabled value="calls" className="flex-1 space-x-2">
              Calls
              <Phone className="h-4 w-4 ml-2" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <TableComponent />
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex items-center justify-between">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">7</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
