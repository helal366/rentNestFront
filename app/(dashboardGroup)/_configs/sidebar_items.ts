import { User } from 'lucide-react';
import { ADMIN_SIDEBAR_ITEMS } from './admin_sidebar_items'
import { ISidebarItem, Role } from '@/lib/types'
import { LANDLORD_SIDEBAR_ITEMS } from './landlord_sidebar_items';
import { TENANT_SIDEBAR_ITEMS } from './tenant_sidebar_items';


type SidebarItemsByRole=Record<Role, ISidebarItem[]>

export const role_sidebar_items = (): SidebarItemsByRole => {
  return {
    ADMIN: ADMIN_SIDEBAR_ITEMS,
    TENANT: TENANT_SIDEBAR_ITEMS,
    LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  };
};

export const common_sidebar_items = () =>{
    return [
      {
        label: "My Profile",
        href: "/my_profile",
        icon: User, // ✅ personal profile
      },
    ];
}



