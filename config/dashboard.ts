import { SidebarNavItem } from "@/types";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "Main Navigation",
    items: [
      {
        href: "/dashboard",
        icon: "grid2x2",
        title: "Dashboard",
      },
      {
        href: "/felicity-activity",
        icon: "phone",
        title: "Felicity Activity",
      },
      {
        href: "/task",
        icon: "briefcase",
        title: "Task",
      },
      {
        href: "/calendar",
        icon: "calendar",
        title: "Calendar",
      },
      {
        href: "/crm",
        icon: "usercog",
        title: "CRM",
        hasDropdown: true,
      },
      {
        href: "/invoices",
        icon: "file_text",
        title: "Invoices",
      },
      {
        href: "/knowledge",
        icon: "book",
        title: "Knowledge",
        hasDropdown: true,
      },
      {
        href: "/team",
        icon: "users",
        title: "Team",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        href: "/settings",
        icon: "settings",
        title: "Setting",
      },
      {
        href: "/info",
        icon: "info",
        title: "Info",
      },
      {
        href: "/logout",
        icon: "logout",
        title: "Logout",
      },
    ],
  },
];
