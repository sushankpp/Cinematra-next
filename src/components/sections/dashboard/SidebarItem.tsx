"use client"
import { usePathname } from "next/navigation";

export function SidebarItem({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ElementType;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`
        flex flex-col items-center gap-1.5 px-2 py-3 rounded-lg text-xs font-body
        transition-colors duration-200 group
        ${
          isActive
            ? "bg-primary-active/10 text-primary-active"
            : "text-tertiary-Shade hover:text-primary-text hover:bg-white/5"
        }
      `}
    >
      <Icon
        size={20}
        className={`transition-colors ${
          isActive
            ? "text-primary-active"
            : "text-tertiary-Shade group-hover:text-primary-text"
        }`}
      />
      <span className="text-center leading-tight">{label}</span>
    </a>
  );
}
