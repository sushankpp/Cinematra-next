"use client";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { cn } from "@/lib/util";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isThereSearchTerm = searchTerm.trim() !== "";

  const handleSearchOpen = () => {
    if (isThereSearchTerm) {
      console.log("Searching for:", searchTerm);
      return;
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "w-[200px] opacity-100" : "w-0 opacity-0",
        )}
      >
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn(
            "focus:outline-none focus:ring-0  h-[40px] border-charcoal-500",
          )}
        />
      </div>
      <Button
        variant="tertiary"
        icon={<SearchIcon size={20} className="text-brand-50 hover:text-white" />}
        onClick={() => {
          handleSearchOpen();
        }}
        className="rounded-tr-[25%] rounded-br-[25%] h-[40px]"
      />
    </div>
  );
}
