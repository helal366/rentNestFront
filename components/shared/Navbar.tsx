"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User} from "lucide-react";
import { logout } from "@/services/logout";
import NavbarMiddleDesktop from "./NavbarMiddleDesktop";
import NavbarLeft from "./NavbarLeft";
import { getUserMenuItems} from "./NavbarData";
import { UserResponse } from "@/app/(dashboardGroup)/_types/my_profile_types";
import NavbarMobileDisplay from "./NavbarMobileDisplay";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar({ user }: { user: UserResponse | null }) {
  const userMenuItems= getUserMenuItems(user);

  return (
    <nav className="w-full border-b bg-olive-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LEFT SIDE: LOGO */}
        <NavbarLeft />

        {/* MIDDLE SIDE: DESKTOP NAVIGATION LINKS */}
        <NavbarMiddleDesktop />

        {/* RIGHT SIDE: AUTHENTICATION CONTAINER & MOBILE DRAWER */}
        <div className="flex items-center gap-2 md:gap-4">
          {user?.data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border focus-visible:ring-0 cursor-pointer"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 ">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {user.data.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.data.email}
                    </p>
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
                      <Link
                        href={item.href}
                        className="cursor-pointer flex items-center w-full"
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* ACCESSIBLE SHEET FOR MOBILE DISPLAYS */}
          {user && <NavbarMobileDisplay user={user} />}
        </div>
      </div>
    </nav>
  );
}
