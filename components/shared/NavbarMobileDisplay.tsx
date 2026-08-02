import { Link, Menu } from 'lucide-react';
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { getUserMenuItems, navLinks } from './NavbarData';
import { cn } from '@/lib/utils';
import { UserResponse } from '@/app/(dashboardGroup)/_types/my_profile_types';
import MobileDashboardMenu from '@/app/(commonGroup)/_components/properties/MobileDashboardMenu';
import { logout } from '@/services/logout';
type Props = {
  user: UserResponse;
};
const NavbarMobileDisplay = ({user}:Props) => {
      const pathname = usePathname();
      const [isOpen, setIsOpen] = useState(false);
      const userMenuItems = getUserMenuItems(user)
  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="border focus-visible:ring-0"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-70">
          <SheetTitle className="text-left font-bold tracking-tight mb-4 pl-5 ">
            Navigation
          </SheetTitle>
          <div className="flex flex-col gap-4 mt-6 ml-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-md font-medium transition-colors border-b pb-2 pl-5 bg-gray-100",
                    isActive
                      ? "text-primary font-semibold border-primary"
                      : "text-muted-foreground border-border hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {user?.data ? (
              <div className="flex flex-col gap-3 pt-4 border-t mt-2">
                {/* ✅ **Dashboard Menu Section** */}
                <MobileDashboardMenu
                  user={user}
                  onClick={() => setIsOpen(false)}
                />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Account
                  </p>
                  {userMenuItems.map((item) => {
                    const Icon = item.icon;
                    return item.isAction ? (
                      <button
                        key={item.label}
                        onClick={() => {
                          setIsOpen(false);
                          logout();
                        }}
                        className="flex items-center text-sm font-medium text-destructive gap-2 pb-1 text-left w-full bg-gray-100"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="bg-gray-100 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground gap-2 pb-1 mb-2"
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Button
                asChild
                variant="default"
                size="sm"
                className="w-full mt-4"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default NavbarMobileDisplay