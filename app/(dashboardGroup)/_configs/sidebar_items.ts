import { User } from 'lucide-react';
import { ADMIN_SIDEBAR_ITEMS } from './admin_sidebar_items'
import { ISidebarItem, Role } from '@/lib/types'


type SidebarItemsByRole=Record<Role, ISidebarItem[]>

export const role_sidebar_items = (): SidebarItemsByRole => {
  return {
    ADMIN: ADMIN_SIDEBAR_ITEMS,
    TENANT: [],
    LANDLORD: [],
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



