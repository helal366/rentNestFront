import Link from "next/link";
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
import { User, LogOut, LayoutDashboard, UserSquare, Menu } from "lucide-react";
import { IUser } from "@/lib/types";


export default function Navbar({ user }: {user:IUser}) {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Contact", href: "/contact" },
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
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE: AUTHENTICATION ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            /* AUTHENTICATED STATE DROPDOWN */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border focus-visible:ring-0">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                {/* Meta details */}
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-sm font-medium leading-none text-foreground">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                    <span className="mt-1 w-max rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Standard Links */}
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer flex items-center w-full">
                    <UserSquare className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                {/* Active Action Triggering Logout */}
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* UNAUTHENTICATED STATE */
            <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
          )}

          {/* MOBILE RESPONSIVE HAMBURGER DRAWER */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="border focus-visible:ring-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetTitle className="text-left font-bold tracking-tight mb-4">Navigation</SheetTitle>
                <div className="flex flex-col gap-4 mt-6">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-md font-medium text-muted-foreground hover:text-foreground transition-colors border-b pb-2">
                      {link.label}
                    </Link>
                  ))}
                  {!user && (
                    <Button asChild variant="default" size="sm" className="w-full mt-4">
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
