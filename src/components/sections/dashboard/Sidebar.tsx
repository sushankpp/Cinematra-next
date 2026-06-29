"use client";
import {
  LayoutDashboard,
  Video,
  Users,
  Bell,
  Upload,
  Home,
} from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import Image from "@/components/ui/Image";

const sidebarItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/videos", label: "Videos", icon: Video },
  { href: "/dashboard/upload", label: "Upload", icon: Upload },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-[130px] bg-neutral-default border-r border-white/5 flex flex-col z-30">
      <figure className="h-14 flex items-center px-4 border-b border-white/5">
        <Image
          src={"/cinematra-logo.png"}
          alt="Cinematra Logo"
          width={100}
          height={100}
        />
      </figure>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {sidebarItems.map(({ href, label, icon: Icon }) => (
          <SidebarItem key={href} href={href} label={label} Icon={Icon} />
        ))}
      </nav>
    </aside>
  );
}
