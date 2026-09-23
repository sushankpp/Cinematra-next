import Image from "./Image";
import { User } from "@/types/context/authContext.types";
import { useState } from "react";
import OptionsDropdown from "./OptionsDropdown";
import { useAuth } from "@/hooks/useAuth";
import { Initials } from "@/services/initials";
import { isAdminUser } from "@/lib/admin";

export default function UserProfile({ user }: { user: User }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fullName = `${user.first_name} ${user.last_name}`;
  const { logout } = useAuth();
  const isAdmin = isAdminUser(user);

  const handleDropDownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div
      className="relative"
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDropdownOpen(false);
        }
      }}
    >
      <figure
        className="w-[40px] h-[40px] cursor-pointer"
        onClick={handleDropDownToggle}
      >
     {user.picture ? (

       <Image
       src={user.picture ?? "/default-profile.jpg"}
       alt={`${fullName} profile picture`}
       width={40}
       height={40}
       className="rounded-full"
       referrerPolicy="no-referrer"
       />
      ) : (
        <div className="w-[40px] h-[40px] rounded-full bg-neutral-default/40 backdrop-blur-md border border-white/5 flex items-center justify-center text-white font-bold text-sm bg-gradient-to-tr from-red-text to-tertiary-Shade">
          {Initials(user.first_name, user.last_name)}
        </div>
      )
    }
      </figure>

      <OptionsDropdown
        src={user.picture ?? ""}
        alt={fullName}
        name={fullName}
        firstName={user.first_name}
        lastName={user.last_name}
        isOpen={isDropdownOpen}
        items={[
          { label: "Profile", href: `/profile/${user.id}` },
          { label: "Watch History", href: `/history` },
          { label: "Dashboard", href: `/dashboard` },
          ...(isAdmin
            ? [{ label: "Admin", href: "/admin" }]
            : []),
          { label: "Logout", onClick: logout, className: "text-red-text" },
        ]}
      />
    </div>
  );
}
