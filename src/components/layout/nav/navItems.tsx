import { NavItemsProps } from "@/types/components/layout/navItems.types";
import NavItem from "./navItem";

export default function NavItems({ items, ...props }: NavItemsProps) {
  return (
    <nav>
      <ul className="flex gap-4">
        {items.map(({ href, label }, index) => (
          <li key={index}>
            <NavItem href={href} label={label} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
