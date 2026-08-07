import { ISidebarItem } from "@/lib/types";
import { ClipboardList, CreditCard, Star, Tags, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    id: "all_users_admin",
    label: "Users",
    href: "/users",
    icon: Users, // ✅ group of people
  },
  {
    id: "all_rental_requests_admin",
    label: "Rental Requests",
    href: "/rental_requests_admin",
    icon: ClipboardList, // ✅ list / requests
  },
  {
    id: "all_categories_admin",
    label: "Categories",
    href: "/categories",
    icon: Tags, // ✅ categories/tags
  },
  {
    id: "payment_history_admin",
    label: "Payment History",
    href: "/payments",
    icon: CreditCard, // ✅ money/payments
  },
  {
    id: "reviews_admin",
    label: "Reviews",
    href: "/reviews",
    icon: Star, // ✅ reviews
  },
];