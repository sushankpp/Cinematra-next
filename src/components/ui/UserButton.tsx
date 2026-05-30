"use client";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import Button from "./Button";

export default function UserButton() {
  const router = useRouter();

  const handleAuth = () =>{
    router.push("/login");
  }
  return (
    <Button
      variant="ghost"
      iconPosition="right"
      className="flex items-center gap-2 px-3 py-2 text-white hover:text-red-text transition-colors duration-300 ease-in-out"
      text="User Login"
      icon={<User size={20} />}
      onClick={handleAuth}
    />
  );
}
