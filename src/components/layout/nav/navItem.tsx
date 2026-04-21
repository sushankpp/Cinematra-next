"use client";
import { useState } from "react";
import Link from "../../ui/link";
import { NavItemProps } from "@/types/components/layout/navItems.types";
import { cn } from "@/lib/util";

export default function NavItem({ href, label }: NavItemProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "relative pb-1",
        "before:absolute before:bottom-0 before:left-0 before:right-0 before:h-[3px] before:bg-red-100",
        "befor:transition-transform before:duration-300 before:origin-left before:ease-in-out",
        isActive
          ? "text-gold-600 font-bold before:w-full"
          : "text-gray-700 hover:text-charcoal-900 before:w-0",
      )}
    >
      {label}
    </Link>
  );
}
