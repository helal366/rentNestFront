import { UserResponse } from "@/app/(dashboardGroup)/_types/my_profile_types";
import { LayoutDashboard, LogOut, User } from "lucide-react";

export  const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Contact", href: "/contact" },
];

export function getUserMenuItems(user : UserResponse|null){
  let dashboardHref = "/login"; 
  if (user?.data?.role === "ADMIN") dashboardHref = "/admin_dashboard";
  if (user?.data?.role === "TENANT") dashboardHref = "/tenant_dashboard";
  if (user?.data?.role === "LANDLORD") dashboardHref = "/landlord_dashboard";

  const userMenuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: dashboardHref,
    isAction: false,
  },
  { label: "Profile", icon: User, href: "/my_profile", isAction: false },
  { label: "Log out", icon: LogOut, href: "/login", isAction: true },
];
return userMenuItems
}