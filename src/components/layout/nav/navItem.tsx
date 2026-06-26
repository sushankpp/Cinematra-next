"use client";
import { usePathname } from "next/navigation";
import Link from "../../ui/Link";
import { NavItemProps } from "@/types/components/layout/navItems.types";
import { cn } from "@/lib/util";

export default function NavItem({ href, label, className , onClick, ...props }: NavItemProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const handleClick = () => {
    onClick?.();
  };
  
  return (
    <Link
      href={href ?? "#"}
      onClick={handleClick}
      className={cn(
        "relative pb-1 font-body text-[18px]",
        "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[2px] before:bg-primary-active",
        "before:transition-transform before:duration-300 before:origin-left before:ease-in-out",
        isActive
          ? "font-bold before:w-full text-primary-text hover:text-primary-text/30"
          : "text-red-text hover:text-primary-text hover:border-b hover:border-primary-text before:w-0", className
      )}
      {...props}
    >
      {label}
    </Link>
  );
}
