import { ISidebarItem } from "@/lib/types";
import { Building, ClipboardList, CreditCard, Tags } from "lucide-react";

export const LANDLORD_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    id:"create_property_landlord",
    label: "Create Property",
    href: "/landlord_dashboard",
    icon: Building, // ✅ group of people
  },
  {
    id: "my_properties_landlord",
    label: "My Properties",
    href: "/rental_landlord_tenant",
    icon: ClipboardList, // ✅ list / requests
  },
  {
    id: "rental_requests_landlord",
    label: "Rental Requests",
    href: "/rental_landlord_tenant",
    icon: ClipboardList, // ✅ list / requests
  },
  {
    id: "all_categories_landlord",
    label: "Categories",
    href: "/categories",
    icon: Tags, // ✅ categories/tags
  },
  {
    id:"payment_history_landlord",
    label: "Payment History",
    href: "/payments",
    icon: CreditCard, // ✅ money/payments
  },
];
