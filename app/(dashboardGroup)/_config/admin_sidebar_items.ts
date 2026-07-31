import { ISidebarItem } from "@/lib/types";
import { User, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[]= [
    {
        label : "My Profile", 
        href : "/my_profile",
        icon : User
    },
    {
        label : "All Users", // landlord, tenant, admin
        href : "/admin_dashboard",
        icon : User
    },
    {
        label : "All Users", 
        href : "/admin_dashboard",
        icon : User
    },
    {
        label : "All Rental Requests", 
        href : "/admin_dashboard",
        icon : User
    },


]