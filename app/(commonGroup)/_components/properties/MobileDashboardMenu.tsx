"use client";

import Link from "next/link";
import { role_sidebar_items, common_sidebar_items } from "@/app/(dashboardGroup)/_configs/sidebar_items";
import { UserResponse } from "@/app/(dashboardGroup)/_types/my_profile_types";

const MobileDashboardMenu = ({
  user,
  onClick,
}: {
  user: UserResponse;
  onClick: () => void;
}) => {
  const role = user?.data?.role;
  const roleItems = role_sidebar_items()[role] || [];
  const commonItems = common_sidebar_items();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Dashboard
      </p>

      {[...roleItems, ...commonItems].map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-gray-100 px-2 py-2 rounded"
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default MobileDashboardMenu;