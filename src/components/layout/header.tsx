import Image from "../ui/Image";
import Link from "../ui/Link";
import Container from "../ui/Container";
import NavItems from "./nav/NavItems";
import { navItemsData } from "@/data/navItems.data";

export default function Header() {
  return (
    <header>
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <figure className="flex w-[150px] w-[70px]">
              <Image
                src="/cinematra-logo.png"
                alt="Cinematra Logo"
                width={150}
                height={70}
              />
            </figure>
          </Link>
        <NavItems items={navItemsData} />
        </div>
      </Container>
    </header>
  );
}
