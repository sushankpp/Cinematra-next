"use client";
import { useState } from "react";
import Link from "../../ui/Link";
import { NavItemProps } from "@/types/components/layout/navItems.types";
import { cn } from "@/lib/util";

export default function NavItem({ href, label, className ,onClick, ...props }: NavItemProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick?.();
  };
  
  return (
    <Link
      href={href ?? "#"}
      onClick={handleClick ?? onclick}
      className={cn(
        "relative pb-1",
        "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[3px] before:bg-red-100",
        "befor:transition-transform before:duration-300 before:origin-left before:ease-in-out",
        isActive
          ? "text-cream-100 font-bold before:w-full"
          : "text-brand-50 hover:text-cream-100 before:w-0", className
      )}
      {...props}
    >
      {label}
    </Link>
  );
}
