import { Bell, Moon } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 bg-neutral-default border-b border-white/5 flex items-center justify-between px-6 fixed top-0 left-[130px] right-0 z-20">
      <span className="font-body text-primary-text/60 text-sm">
        Video Management
      </span>
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-tertiary-Shade hover:text-primary-text transition-colors">
          <Moon size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-tertiary-Shade hover:text-primary-text transition-colors">
          <Bell size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary-active/20 border border-primary-active/30 flex items-center justify-center">
          <span className="text-primary-active text-xs font-bold font-body">
            A
          </span>
        </div>
      </div>
    </header>
  );
}
