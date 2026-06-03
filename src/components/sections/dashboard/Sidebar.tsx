"use client";
import { LayoutDashboard, Video, Users, Bell } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/videos", label: "Videos", icon: Video },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-[130px] bg-neutral-default border-r border-white/5 flex flex-col z-30">
      <div className="h-14 flex items-center px-4 border-b border-white/5">
        <span className="font-headline text-primary-active text-xl font-bold tracking-tight">
          seenema
        </span>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {sidebarItems.map(({ href, label, icon: Icon }) => (
          <SidebarItem key={href} href={href} label={label} Icon={Icon} />
        ))}
      </nav>
    </aside>
  );
}