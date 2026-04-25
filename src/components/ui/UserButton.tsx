"use client";

import { User } from "lucide-react";
import Button from "./Button";

export default function UserButton() {
  return (
    <Button
      variant="ghost"
      iconPosition="right"
      className="flex items-center gap-2 px-3 py-2"
      text="User Login"
      icon={<User size={20} />}
    />
  );
}
