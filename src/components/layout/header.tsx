import Image from "../ui/Image";
import Link from "../ui/Link";
import Container from "../ui/Container";
import NavItems from "./nav/NavItems";
import NavItemsMobile from "./nav/NavItemsMobile";
import { navItemsData } from "@/data/navItems.data";
import Search from "../ui/Search";
import UserButton from "../ui/UserButton";

export default function Header() {
  return (
    <header>
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
            <Search />
            <UserButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
