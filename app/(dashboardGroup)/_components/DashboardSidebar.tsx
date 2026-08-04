"use client";

import Link from "next/link";
import { common_sidebar_items, role_sidebar_items } from "../_configs/sidebar_items";
import { LayoutDashboard } from "lucide-react";
import { UserResponse } from "../_types/my_profile_types";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

const DashboardSidebar = ({ user }: { user: UserResponse }) => {
  const role = user?.data?.role;
  const roleItems = role ? role_sidebar_items()[role] : [];
  const commonItems = common_sidebar_items();

  return (
    <Sidebar
      className="border-r group-data-[sidebar=sidebar]:bg-teal-200"
      variant="sidebar"
    >
       <SidebarHeader className="flex h-16 items-center px-6 border-b border-teal-300/50">
        <div className="font-bold flex items-center gap-2 text-slate-800">
          <LayoutDashboard className="w-5 h-5 text-slate-700" />
          <span>DASHBOARD</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 space-y-2">
        {/* Common Items */}
        {commonItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href}>
              <div className="p-2 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}

        <hr className="my-3" />

        {/* Role Based Items */}
        {roleItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} href={item.href}>
              <div className="p-2 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
