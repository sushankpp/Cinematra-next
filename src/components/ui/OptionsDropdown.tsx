import Image from "./Image";
import { optionsDropdownProps } from "@/types/components/ui/optionsDropdown";
import NavItem from "../layout/nav/NavItem";

export default function OptionsDropdown({
  src, alt, name, isOpen, items, ...props
}: optionsDropdownProps) {
  return (
    <div
      className={`p-2 rounded-lg bg-tertiary-Shade absolute right-0 w-[250px] top-[50px] z-10 
                  transition-all duration-300 ease-in-out 
                  ${isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"}`}
      {...props}
    >
      {/* header — only show if name/src provided */}
      {(src || name) && (
        <div className="flex flex-row items-center gap-2 pb-2 border-b border-white/10">
          {src && (
            <figure className="w-[50px] h-[50px]">
              <Image src={src} alt={alt ?? ""} width={50} height={50} className="rounded-full" />
            </figure>
          )}
          {name && <p>{name}</p>}
        </div>
      )}

      {/* dynamic items */}
      <div className="flex flex-col mt-1">
        {items.map((item, i) => (
          <NavItem
            key={i}
            href={item.href ?? ""}
            label={item.label}
            onClick={item.onClick}
            className={item.className}
          />
        ))}
      </div>
    </div>
  );
}
