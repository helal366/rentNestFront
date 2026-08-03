import { ISidebarItem } from "@/lib/types";
import { Building, ClipboardList, CreditCard, Tags } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Create Property",
    href: "/landlord_dashboard",
    icon: Building, // ✅ group of people
  },
  {
    label: "Rental Requests",
    href: "/rental_requests",
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
