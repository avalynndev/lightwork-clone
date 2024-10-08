"use client";

import { useState } from "react";
import { Search, ChevronDown, Plus, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/calendar-date-range-picker";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const initialData = [
  {
    id: 1,
    name: "Kelemen Krisztina",
    message:
      "What is the effective date of the appraised value on our current proper...",
    status: "Needs Reply",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 2,
    name: "Savannah",
    message: "What zip code is the commercial real estate...",
    status: "AI Managed",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 3,
    name: "Wendy",
    message: "Is the commercial real estate property located in ...",
    status: "AI Managed",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 4,
    name: "Sipos Veronika",
    message: "type of appraised value are you underwriting to...?",
    status: "Needs Reply",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 5,
    name: "Wendy",
    message: "Is the commercial real estate property located in ...",
    status: "AI Managed",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 6,
    name: "Wendy",
    message: "is the estimated construction period (in months)...?",
    status: "AI Managed",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 7,
    name: "Lily Spencer",
    message:
      "What is the effective date of the appraised value on our current proper...",
    status: "AI Managed",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 8,
    name: "John Doe",
    message: "If no appraisal, what is the estimated value used in...?",
    status: "Needs Reply",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 9,
    name: "John Doe",
    message: "Is the property located in a designated flood zone?",
    status: "Needs Reply",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 10,
    name: "John Doe",
    message: "Is this a new construction property?",
    status: "Needs Reply",
    lastUpdated: "2024-08-24T11:30:00",
  },
  {
    id: 11,
    name: "John Doe",
    message: "Is this a new construction property?",
    status: "Message Sent",
    lastUpdated: "2024-08-24T11:30:00",
  },
];

const allColumns = ["Name", "Recent Message", "Status", "Last Updated"];

export default function Component() {
  const [search, setSearch] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([
    "Needs Reply",
    "AI Managed",
    "Message Sent",
  ]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date(2024, 9, 9),
  });
  const [visibleColumns, setVisibleColumns] = useState(allColumns);

  const filterData = () => {
    return initialData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.message.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
      const itemDate = new Date(item.lastUpdated);
      const matchesDate =
        (!dateRange?.from || itemDate >= dateRange.from) &&
        (!dateRange?.to || itemDate <= dateRange.to);
      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const filteredData = filterData();

  const toggleStatus = (status: string) => {
    setSelectedStatuses((current) =>
      current.includes(status)
        ? current.filter((s) => s !== status)
        : [...current, status]
    );
  };

  const toggleColumn = (column: string) => {
    setVisibleColumns((current) =>
      current.includes(column)
        ? current.filter((c) => c !== column)
        : [...current, column]
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px] pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex h-10 items-center rounded-lg border border-dashed shadow-sm">
                <div className="flex h-8 items-center space-x-1 p-4 text-sm">
                  <Label
                    htmlFor="message-type"
                    className="flex items-center space-x-1"
                  >
                    <Plus className="size-4" />
                    <span>Status</span>
                  </Label>
                  <Separator orientation="vertical" className="bg-black" />
                  {selectedStatuses.map((status) => (
                    <Badge className="px-2" key={status}>
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={selectedStatuses.includes("Needs Reply")}
                onCheckedChange={() => toggleStatus("Needs Reply")}
              >
                Needs Reply
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedStatuses.includes("AI Managed")}
                onCheckedChange={() => toggleStatus("AI Managed")}
              >
                AI Managed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedStatuses.includes("Message Sent")}
                onCheckedChange={() => toggleStatus("Message Sent")}
              >
                Message Sent
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CalendarDateRangePicker
            date={
              dateRange || {
                from: new Date(new Date().getFullYear(), 0, 1),
                to: new Date(),
              }
            }
            onDateSelect={setDateRange}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 size-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {allColumns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                checked={visibleColumns.includes(column)}
                onCheckedChange={() => toggleColumn(column)}
              >
                {column}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 p-1 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.includes("Name") && <TableHead>Name</TableHead>}
              {visibleColumns.includes("Recent Message") && (
                <TableHead>Recent Message</TableHead>
              )}
              {visibleColumns.includes("Status") && (
                <TableHead>Status</TableHead>
              )}
              {visibleColumns.includes("Last Updated") && (
                <TableHead>Last Updated</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                {visibleColumns.includes("Name") && (
                  <TableCell>{item.name}</TableCell>
                )}
                {visibleColumns.includes("Recent Message") && (
                  <TableCell>{item.message}</TableCell>
                )}
                {visibleColumns.includes("Status") && (
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${
                        item.status === "Needs Reply"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.status === "AI Managed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                )}
                {visibleColumns.includes("Last Updated") && (
                  <TableCell>
                    {format(new Date(item.lastUpdated), "h:mmaaa")}
                    <br />
                    {format(new Date(item.lastUpdated), "dd MMM yyyy")}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}