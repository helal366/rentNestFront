import { ISidebarItem } from "@/lib/types";
import { User } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[]= [
    {
        label : "My Profile", 
        href : "/my_profile",
        icon : User
    },
    {
        label : "Users", // landlord, tenant, admin
        href : "/users",
        icon : User
    },
    
    {
        label : "Rental Requests", 
        href : "/rental_requests",
        icon : User
    },
    {
        label : "Categories", 
        href : "/categories",
        icon : User
    },
    {
        label : "Payments", 
        href : "/payments",
        icon : User
    },


]