import { NavItemsProps } from "@/types/components/layout/navItems.types";
import NavItem from "./NavItem";
import { cn } from "@/lib/util";

export default function NavItemsMobile({
  items,
  navItemClassName,
  liClassName,
  ...props
}: NavItemsProps) {
  return (
    <nav className="sm:block lg:hidden">
      <ul className={cn("flex flex-col gap-4")} {...props}>
          {items.map(({ href, label }, index) => (
            <li key={index} className={cn(liClassName)}>
              <NavItem href={href} label={label} className={navItemClassName} />
            </li>
          ))}
      </ul>
    </nav>
  );
}
