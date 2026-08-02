"use client";

import { IUser } from "@/lib/types";
import Link from "next/link";
import {
  common_sidebar_items,
  role_sidebar_items,
} from "../_configs/sidebar_items";
import { LayoutDashboard } from "lucide-react";

const DashboardSidebar = ({ user }: { user: IUser }) => {
  const role = user?.data?.role;

  const roleItems = role_sidebar_items()[role] || [];
  const commonItems = common_sidebar_items();

  return (
    <aside className="w-64 border-r bg-teal-100 hidden md:block">
      <p className="px-4 pt-4  ">
        <span className="font-bold flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5" />
          <span>DASHBOARD</span>
        </span>
      </p>
      <div className="p-4 space-y-2">
        {/* Common Items */}
        {commonItems.map((item) => {
          // Destructure the icon and give it a Capitalized alias so JSX recognizes it
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div className="p-2 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                {/* RENDERING THE ICON HERE */}
                {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}

        <hr className="my-3" />
        {/* Role Based Items */}
        {roleItems.map((item) => {
          // Destructure the icon and give it a Capitalized alias so JSX recognizes it
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div className="p-2 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                {/* RENDERING THE ICON HERE */}
                {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
