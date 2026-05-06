import Image from "./Image";
import { User } from "@/types/context/authContext.types";
import { useState } from "react";
import OptionsDropdown from "./OptionsDropdown";

export default function UserProfile({ user }: { user: User }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fullName = `${user.first_name} ${user.last_name}`;

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
        <Image
          src={user.picture ?? "/default-profile.jpg"}
          alt={`${fullName} profile picture`}
          width={40}
          height={40}
          className="rounded-full"
          referrerPolicy="no-referrer"
        />
      </figure>

      <OptionsDropdown
        src={user.picture ?? "/default-profile.jpg"}
        alt={fullName}
        name={fullName}
        isOpen={isDropdownOpen}
      />
    </div>
  );
}
