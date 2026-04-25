"use client";
import { useState } from "react";
import { NavItemsProps } from "@/types/components/layout/navItems.types";
import NavItem from "./NavItem";
import { cn } from "@/lib/util";
import { Menu, X } from "lucide-react";

export default function NavItemsMobile({
  items,
  navItemClassName,
  liClassName,
  ...props
}: NavItemsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="block lg:hidden">
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 cursor-pointer"
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      <ul
        className={cn(
          "fixed top-0 left-0 h-screen w-full z-40",
          "flex flex-col items-center justify-center gap-4",
          "bg-cream-100",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        {...props}
      >
        {items.map(({ href, label }, index) => (
          <li
            key={index}
            className={cn(
              liClassName,
              "border-b border-red-100 w-full text-center py-3"
            )}
          >
            <NavItem
              href={href}
              label={label}
              className={cn(navItemClassName, "text-bold")}
              onClick={() => setIsOpen(false)}
              {...props}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}