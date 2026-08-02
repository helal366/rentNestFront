"use client";

import { IUser } from "@/lib/types";
import Link from "next/link";
import { common_sidebar_items, role_sidebar_items } from "../_configs/sidebar_items";

const DashboardSidebar = ({ user }: { user: IUser }) => {
  const role = user?.data?.role;

  const roleItems = role_sidebar_items()[role] || [];
  const commonItems = common_sidebar_items();

  return (
    <aside className="w-64 border-r hidden md:block">
      <div className="p-4 space-y-2">
        {/* Role Based Items */}
        {roleItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
              {item.label}
            </div>
          </Link>
        ))}

        <hr className="my-3" />

        {/* Common Items */}
        {commonItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
