"use client";
import Image from "../ui/Image";
import Link from "../ui/Link";
import Container from "../ui/Container";
import NavItems from "./nav/NavItems";
import NavItemsMobile from "./nav/NavItemsMobile";
import { navItemsData } from "@/data/navItems.data";
import Search from "../ui/Search";
import UserButton from "../ui/UserButton";
import { useAuth } from "@/hooks/useAuth";
import UserProfile from "../ui/UserProfile";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-secondary-Body/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.05)] shadow-lg shadow-black/20"
          : "bg-gradient-to-b from-black/60 to-transparent border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <figure className="flex w-[150px] w-[70px] z-60 relative">
              <Image
                src="/cinematra-logo.png"
                alt="Cinematra Logo"
                width={150}
                height={70}
              />
            </figure>
          </Link>
          <NavItems
            items={navItemsData}
            className="hidden lg:flex justify-between"
          />
          <NavItemsMobile items={navItemsData} />
          <div className="flex gap-3">
            {isAuthenticated && (
              <Link
                href="/dashboard/upload"
                className="rounded-full px-4 py-2 flex items-center text-sm font-medium text-red-text bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-white/10 hover:bg-white/20 hover:border-white/30 hover:shadow-white/20 transition-all duration-300 supports-[backdrop-filter]:bg-white/10"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Create
              </Link>
            )}
            <Search />
            {isAuthenticated ? <UserProfile user={user!} /> : <UserButton />}
          </div>
        </div>
      </Container>
    </header>
  );
}
