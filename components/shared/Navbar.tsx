"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { User, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { IUser } from "@/lib/types";
import { logout } from "@/services/logout";

export default function Navbar({ user }: { user: IUser | null }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Main Navlinks Config Array
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Contact", href: "/contact" },
  ];

  // 1. DETERMINE THE DASHBOARD ROUTE DYNAMICALLY BASED ON USER ROLE
  let dashboardHref = "/login"; // fallback security boundary
  if (user?.data?.role === "ADMIN") dashboardHref = "/admin_dashboard";
  if (user?.data?.role === "TENANT") dashboardHref = "/tenant_dashboard";
  if (user?.data?.role === "LANDLORD") dashboardHref = "/landlord_dashboard";

  // 2. DYNAMIC CONFIGURATION ARRAY FOR THE USER MENU
  const userMenuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: dashboardHref, isAction: false },
    { label: "Profile", icon: User, href: "/profile", isAction: false },
    { label: "Log out", icon: LogOut, href: "/login", isAction: true },
  ];

  return (
    <nav className="w-full border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LEFT SIDE: LOGO */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Rent<span className="text-primary">Nest</span>
          </Link>
        </div>

        {/* MIDDLE SIDE: DESKTOP NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium h-full">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" 
                ? pathname === "/" 
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors h-16 flex items-center mt-0.5 border-b-2",
                  isActive
                    ? "text-foreground font-semibold border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT SIDE: AUTHENTICATION CONTAINER & MOBILE DRAWER */}
        <div className="flex items-center gap-2 md:gap-4">
          {user?.data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border focus-visible:ring-0 cursor-pointer">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-medium leading-none text-foreground">{user.data.name}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">{user.data.email}</p>
                    <span className="mt-1 w-max rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {user.data.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {userMenuItems.map((item) => {
                  const Icon = item.icon;
                  
                  if (item.isAction) {
                    return (
                      <DropdownMenuItem 
                        key={item.label}
                        onClick={() => logout()}
                        className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  }

                  return (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link href={item.href} className="cursor-pointer flex items-center w-full">
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* ACCESSIBLE SHEET FOR MOBILE DISPLAYS */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="border focus-visible:ring-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-70">
                <SheetTitle className="text-left font-bold tracking-tight mb-4 pl-5 ">Navigation</SheetTitle>
                <div className="flex flex-col gap-4 mt-6">
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
                            : "text-muted-foreground border-border hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  
                  {user?.data ? (
                    <div className="flex flex-col gap-3 pt-4 border-t mt-2 pl-5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
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
                            className="bg-gray-100 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground gap-2 pb-1"
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <Button asChild variant="default" size="sm" className="w-full mt-4" onClick={() => setIsOpen(false)}>
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </nav>
  );
}
