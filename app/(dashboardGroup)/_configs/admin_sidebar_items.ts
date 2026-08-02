import { ISidebarItem } from "@/lib/types";
import { ClipboardList, CreditCard, Tags, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  
  {
    label: "Users",
    href: "/users",
    icon: Users, // ✅ group of people
  },
  {
    label: "Rental Requests",
    href: "/rental_requests_admin",
    icon: ClipboardList, // ✅ list / requests
  },
  {
    label: "Categories",
    href: "/categories",
    icon: Tags, // ✅ categories/tags
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCard, // ✅ money/payments
  },
];