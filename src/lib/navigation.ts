import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  FileText,
  Handshake,
  Home,
  Inbox,
  Library,
  ListTodo,
  Megaphone,
  Package,
  PhoneCall,
  Receipt,
  Settings,
  ShoppingBag,
  Ticket,
  Users,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  meta?: number;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      { href: "/", label: "Home", icon: Home },
      { href: "/inbox", label: "Inbox", icon: Inbox, meta: 12 },
      { href: "/calls", label: "Calls", icon: PhoneCall },
      { href: "/campaigns", label: "Campaigns", icon: Megaphone },
      {
        href: "/automation",
        label: "Bot & Automation",
        icon: Bot,
        badge: "AI",
      },
    ],
  },
  {
    label: "CRM",
    items: [
      { href: "/customers", label: "Customers", icon: Users },
      { href: "/deals", label: "Deals", icon: Handshake },
      { href: "/tickets", label: "Tickets", icon: Ticket, meta: 4 },
      { href: "/tasks", label: "Tasks", icon: ListTodo, meta: 6 },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/commerce", label: "Commerce", icon: ShoppingBag },
      { href: "/products", label: "Products", icon: Package },
      { href: "/expenses", label: "Expenses", icon: Receipt },
      { href: "/reports", label: "Reports", icon: BarChart3 },
    ],
  },
  {
    label: "Library",
    items: [
      { href: "/resources", label: "Resources", icon: Library },
      { href: "/documents", label: "Documents", icon: FileText },
    ],
  },
];

export const SETTINGS_NAV: NavItem = {
  href: "/settings",
  label: "Settings",
  icon: Settings,
};

export const ALL_NAV: NavItem[] = [
  ...NAV_GROUPS.flatMap((group) => group.items),
  SETTINGS_NAV,
];

export const PAGE_NAMES: Record<string, string> = Object.fromEntries(
  ALL_NAV.map((item) => [item.href, item.label])
);
