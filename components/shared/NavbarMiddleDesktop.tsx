import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "./NavbarData";

const NavbarMiddleDesktop = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-6 text-sm font-medium h-full">
      {navLinks.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "transition-colors h-16 flex items-center mt-0.5 border-b-2",
              isActive
                ? "text-foreground font-semibold border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarMiddleDesktop;
