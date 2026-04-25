import { NavItemsProps } from "@/types/components/layout/navItems.types";
import NavItem from "./NavItem";
import { cn } from "@/lib/util";

export default function NavItems({
  items,
  navItemClassName,
  liClassName,
  ulClassName,
  ...props
}: NavItemsProps) {
  return (
    <nav  {...props}>
      <ul className={cn("flex gap-4 justify-evenly", ulClassName)}>
        {items.map(({ href, label }, index) => (
          <li key={index} className={cn(liClassName)}>
            <NavItem href={href} label={label} className={navItemClassName} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
