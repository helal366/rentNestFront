import { ISidebarItem } from "@/lib/types";
import { User } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "My Profile",
    href: "/my_profile",
    icon: User, // ✅ personal profile
  },
  {
    label: "Create Property",
    href: "/landlord_dashboard",
    icon: User, // ✅ group of people
  },
  {
    label: "Rental Requests",
    href: "/rental_requests",
    icon: User, // ✅ list / requests
  },
  {
    label: "Categories",
    href: "/categories",
    icon: User, // ✅ categories/tags
  },
  {
    label: "Payments",
    href: "/payments",
    icon: User, // ✅ money/payments
  },
];
