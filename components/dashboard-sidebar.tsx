"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "@/types";
import {
  ChevronDown,
  Menu,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/shared/icons";

interface DashboardSidebarProps {
  links: SidebarNavItem[];
}

export function DashboardSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const { isTablet } = useMediaQuery();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(!isTablet);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  useEffect(() => {
    setIsSidebarExpanded(!isTablet);
  }, [isTablet]);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="sticky top-0 h-full">
        <ScrollArea className="h-full overflow-y-auto border-r">
          <aside
            className={cn(
              isSidebarExpanded ? "w-[220px] xl:w-[260px]" : "w-[68px]",
              "hidden h-screen md:block"
            )}
          >
            <div className="flex h-full max-h-screen flex-1 flex-col gap-2">
              <div className="flex h-14 items-center p-4 lg:h-[60px]">
                {isSidebarExpanded && (
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={132}
                      height={32}
                    />
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto size-9 lg:size-8"
                  onClick={toggleSidebar}
                >
                  {isSidebarExpanded ? (
                    <PanelLeftClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  ) : (
                    <PanelRightClose
                      size={18}
                      className="stroke-muted-foreground"
                    />
                  )}
                  <span className="sr-only">Toggle Sidebar</span>
                </Button>
              </div>

              <nav className="flex flex-1 flex-col gap-8 px-4 pt-4">
                {links.map((section) => (
                  <section
                    key={section.title}
                    className="flex flex-col gap-0.5"
                  >
                    {section.items.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      return (
                        <Fragment key={`link-fragment-${item.title}`}>
                          {isSidebarExpanded ? (
                            <div className="relative">
                              <Link
                                href={
                                  item.disabled || item.hasDropdown
                                    ? "#"
                                    : item.href
                                }
                                className={cn(
                                  "hover:bg-zinc flex items-center gap-3 rounded-md p-2 text-sm font-medium",
                                  path === item.href
                                    ? "bg-black text-white"
                                    : "text-muted-foreground hover:text-accent-foreground",
                                  (item.disabled || item.hasDropdown) &&
                                    "cursor-pointer opacity-80 hover:bg-transparent hover:text-muted-foreground"
                                )}
                                onClick={() =>
                                  item.hasDropdown && toggleDropdown(item.title)
                                }
                              >
                                <Icon className="size-5" />
                                {item.title}
                                {item.badge && (
                                  <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                    {item.badge}
                                  </Badge>
                                )}
                                {item.hasDropdown && (
                                  <ChevronDown
                                    className={cn(
                                      "ml-auto size-4 transition-transform duration-200",
                                      openDropdowns[item.title] && "rotate-180"
                                    )}
                                  />
                                )}
                              </Link>
                              {item.hasDropdown &&
                                openDropdowns[item.title] && (
                                  <div className="ml-4 mt-2 space-y-1">
                                    {/* Add dropdown items here */}
                                    <Link
                                      href="#"
                                      className="hover:bg-zinc block rounded-md p-2 text-sm text-muted-foreground hover:text-accent-foreground"
                                    >
                                      Dropdown Item 1
                                    </Link>
                                    <Link
                                      href="#"
                                      className="hover:bg-zinc block rounded-md p-2 text-sm text-muted-foreground hover:text-accent-foreground"
                                    >
                                      Dropdown Item 2
                                    </Link>
                                  </div>
                                )}
                            </div>
                          ) : (
                            <Tooltip key={`tooltip-${item.title}`}>
                              <TooltipTrigger asChild>
                                <div className="relative">
                                  <Link
                                    href={
                                      item.disabled || item.hasDropdown
                                        ? "#"
                                        : item.href
                                    }
                                    className={cn(
                                      "hover:bg-zinc flex items-center gap-3 rounded-md p-2 text-sm font-medium",
                                      path === item.href
                                        ? "bg-black text-white"
                                        : "text-zinc-900 hover:text-accent-foreground",
                                      (item.disabled || item.hasDropdown) &&
                                        "cursor-pointer opacity-80 hover:bg-transparent hover:text-muted-foreground"
                                    )}
                                    onClick={() =>
                                      item.hasDropdown &&
                                      toggleDropdown(item.title)
                                    }
                                  >
                                    <span className="flex size-full items-center justify-center">
                                      <Icon className="size-5" />
                                    </span>
                                  </Link>
                                  {item.hasDropdown &&
                                    openDropdowns[item.title] && (
                                      <div className="ring-opacity/5 absolute left-full ml-2 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black">
                                        <div className="py-1">
                                          {/* Add dropdown items here */}
                                          <Link
                                            href="#"
                                            className="hover:bg-zinc block px-4 py-2 text-sm text-gray-700"
                                          >
                                            Dropdown Item 1
                                          </Link>
                                          <Link
                                            href="#"
                                            className="hover:bg-zinc block px-4 py-2 text-sm text-gray-700"
                                          >
                                            Dropdown Item 2
                                          </Link>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                {item.title}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </Fragment>
                      );
                    })}
                  </section>
                ))}
              </nav>
            </div>
          </aside>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}

export function MobileSheetSidebar({ links }: DashboardSidebarProps) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { isSm, isMobile } = useMediaQuery();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  if (isSm || isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="size-9 shrink-0 md:hidden"
          >
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <ScrollArea className="h-full overflow-y-auto">
            <div className="flex h-screen flex-col">
              <nav className="flex flex-1 flex-col gap-y-8 p-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={132}
                    height={32}
                    className="rounded-full"
                  />
                </Link>

                {links.map((section) => (
                  <section
                    key={section.title}
                    className="flex flex-col gap-0.5"
                  >
                    {section.items.map((item) => {
                      const Icon = Icons[item.icon || "arrowRight"];
                      return (
                        <Fragment key={`link-fragment-${item.title}`}>
                          <div className="relative">
                            <Link
                              onClick={() => {
                                if (item.hasDropdown) {
                                  toggleDropdown(item.title);
                                } else if (!item.disabled) {
                                  setOpen(false);
                                }
                              }}
                              href={
                                item.disabled || item.hasDropdown
                                  ? "#"
                                  : item.href
                              }
                              className={cn(
                                "hover:bg-zinc flex items-center gap-3 rounded-md p-2 text-sm font-medium",
                                path === item.href
                                  ? "bg-black text-white"
                                  : "text-zinc-900 hover:text-accent-foreground",
                                (item.disabled || item.hasDropdown) &&
                                  "cursor-pointer opacity-80 hover:bg-transparent hover:text-muted-foreground"
                              )}
                            >
                              <Icon className="size-5" />
                              {item.title}
                              {item.badge && (
                                <Badge className="ml-auto flex size-5 shrink-0 items-center justify-center rounded-full">
                                  {item.badge}
                                </Badge>
                              )}
                              {item.hasDropdown && (
                                <ChevronDown
                                  className={cn(
                                    "ml-auto size-4 transition-transform duration-200",
                                    openDropdowns[item.title] && "rotate-180"
                                  )}
                                />
                              )}
                            </Link>
                            {item.hasDropdown && openDropdowns[item.title] && (
                              <div className="ml-4 mt-2 space-y-1">
                                {/* Add dropdown items here */}
                                <Link
                                  href="#"
                                  className="hover:bg-zinc block rounded-md p-2 text-sm text-muted-foreground hover:text-accent-foreground"
                                >
                                  Dropdown Item 1
                                </Link>
                                <Link
                                  href="#"
                                  className="hover:bg-zinc block rounded-md p-2 text-sm text-muted-foreground hover:text-accent-foreground"
                                >
                                  Dropdown Item 2
                                </Link>
                              </div>
                            )}
                          </div>
                        </Fragment>
                      );
                    })}
                  </section>
                ))}
              </nav>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="flex size-9 animate-pulse rounded-lg bg-muted md:hidden" />
  );
}