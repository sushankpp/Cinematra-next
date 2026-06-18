import Image from "./Image";
import { optionsDropdownProps } from "@/types/components/ui/optionsDropdown";
import NavItem from "../layout/nav/NavItem";

export default function OptionsDropdown({
  src,
  alt,
  name,
  isOpen,
  items,
  ...props
}: optionsDropdownProps) {
  return (
    <div
      className={`absolute right-0 top-[46px] z-50 w-[220px] overflow-hidden rounded-md
        border border-white/10 bg-neutral-Shade/95 shadow-xl shadow-black/40 backdrop-blur-md
        transition-all duration-200 ease-out
        ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
        }`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {(src || name) && (
        <div className="flex items-center gap-3 border-b border-white/10 px-3 py-3">
          {src && (
            <figure className="h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
              <Image
                src={src}
                alt={alt ?? ""}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </figure>
          )}

          {name && (
            <p className="truncate text-sm font-medium text-primary-text">
              {name}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col p-1.5">
        {items.map((item, i) =>
          item.href ? (
            <NavItem
              key={i}
              href={item.href}
              label={item.label}
              onClick={item.onClick}
              className={`rounded px-3 py-2 text-sm font-medium text-primary-text/85
          transition-colors duration-150 hover:bg-white/10 hover:text-white
          ${item.className ?? ""}`}
            />
          ) : (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick?.();
              }}
              className={`rounded px-3 py-2 text-sm font-medium text-primary-text/85 text-left
          transition-colors duration-150 hover:bg-white/10 hover:text-white
          ${item.className ?? ""}`}
            >
              {item.label}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
