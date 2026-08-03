import { ISidebarItem } from "@/lib/types";
import { Building, ClipboardList, CreditCard, Tags } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Create Rental Request",
    href: "/landlord_dashboard",
    icon: Building, // ✅ group of people
  },
  {
    label: "Rental Requests",
    href: "/rental_landlord_tenant",
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
