import { navItemsData } from "@/data/navItems.data";
import Container from "../ui/Container";
import Image from "../ui/Image";
import Link from "../ui/Link";
import NavItems from "./nav/NavItems";
import Newsletter from "../newsletter/Newsletter";
import NavItem from "./nav/NavItem";

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white mt-8 py-4">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <Link href="/" className="text-2xl font-bold mb-4">
              <figure className="flex w-[150px] h-[100px] mb-4">
                <Image
                  src="/cinematra-nobg-dark.png"
                  alt="Cinematra Logo"
                  width={150}
                />
              </figure>
            </Link>
            <p className="text-charcoal-100">
              Cineमात्र is a platform for movie enthusiasts to share their
              cinematic experiences, reviews, and recommendations. Join our
              community and discover new cinema.
            </p>
          </div>
          <NavItems
            items={navItemsData}
            className="flex-row"
            navItemClassName="text-cream-50 hover:text-charcoal-50"
            liClassName="py-3"
          />
          <div className="">
            <Newsletter />
            <p className="text-charcoal-100 mt-6">
              &copy; {new Date().getFullYear()} Cinematra. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
