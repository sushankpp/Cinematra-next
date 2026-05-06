import Image from "./Image";
import { optionsDropdownProps } from "@/types/components/ui/optionsDropdown";
import NavItem from "../layout/nav/NavItem";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function OptionsDropdown({
  src,
  alt,
  name,
  isOpen,
  ...props
}: optionsDropdownProps) {
    const {logout } = useContext(AuthContext)!;
  return (
    <div
      className={`p-2 rounded-lg bg-charcoal-500 absolute right-0 w-[250px] top-[50px] z-10 transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <div className="flex flex-row items-center gap-2">
        <figure className="w-[50px] h-[50px]">
          <Image
            src={src}
            alt={alt}
            width={50}
            height={50}
            className="rounded-full"
          />
        </figure>
        <p>{name}</p>
      </div>
      <div>
        <NavItem href="" label="Log Out" onClick={logout} />
      </div>
    </div>
  );
}
