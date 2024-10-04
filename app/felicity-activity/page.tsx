"use client";

import { CalendarDateRangePicker } from "@/components/calendar-date-range-picker";
import { Plus, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { DataTableDemo } from "@/components/comp";
export default function FelicityActivity() {
  const metrics = [
    { title: "Jobs Booked", value: "23,205" },
    { title: "Payments Collected", value: "£1,250,000" },
    { title: "Invoices Pending", value: "150" },
    { title: "Tasks Created", value: "20" },
  ];
  const [timeRange, setTimeRange] = useState("24 hours");

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-pretty text-gray-900">
            Felicity Activity
          </h2>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {metrics.map((item) => (
            <Card key={item.title} className="bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Tabs defaultValue="messages" className="mb-6">
          <TabsList className="w-[400px] mb-4">
            <TabsTrigger value="messages" className="flex-1">
              Messages
            </TabsTrigger>
            <TabsTrigger value="calllogs" className="flex-1">
              Call Logs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="messages">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search..." className="pl-10 w-[300px]" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px] border-dashed">
                    <div className="flex h-5 items-center space-x-2 text-sm ">
                      <Label
                        htmlFor="message-type"
                        className="flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Status</span>
                      </Label>{" "}
                      <Separator orientation="vertical" />
                      <Badge>
                        <SelectValue placeholder="Status" />
                      </Badge>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Message Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CalendarDateRangePicker
                date={{
                  from: new Date(new Date().getFullYear(), 0, 1),
                  to: new Date(),
                }}
                onDateSelect={(date) => console.log(date)}
              />
            </div>
            {/* Add your message list component here */}
          </TabsContent>
          <TabsContent value="calllogs">
            <DataTableDemo />
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
              <Button
                key={index}
                variant={page === 1 ? "default" : "outline"}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
