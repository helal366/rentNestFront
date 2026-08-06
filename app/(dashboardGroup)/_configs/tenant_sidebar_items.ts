import { ISidebarItem } from "@/lib/types";
import { Building, ClipboardList, CreditCard, HandCoins, Tags } from "lucide-react";

export const TENANT_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    id:"create_rental_request_tenant",
    label: "Create Rental Request",
    href: "/create_rental_tenant",
    icon: Building, // ✅ group of people
  },
  {
    id:"all_rental_requests_tenant",
    label: "Rental Requests",
    href: "/rental_landlord_tenant",
    icon: ClipboardList, // ✅ list / requests
  },
  {
    id: "all_categories_tenant",
    label: "Categories",
    href: "/categories",
    icon: Tags, // ✅ categories/tags
  },
  {
    id: "payment_history_tenant",
    label: "Payment History",
    href: "/payments",
    icon: CreditCard, // ✅ money/payments
  },
  {
    id:"pay_now_tenant",
    label: "Pay Now",
    href: "/pay_rentals",
    icon: HandCoins, // ✅ money/payments
  },
];
