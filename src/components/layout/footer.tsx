import Container from "../ui/container";
import Image from "../ui/image";
import Link from "../ui/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white mt-8 py-4">
      <Container>
        <Link href="/" className="text-2xl font-bold mb-4">
        <figure className="flex w-[150px] h-[120px] mb-4">
          <Image
            src="/cinematra-nobg-dark.png"
            alt="Cinematra Logo"
            width={150}
          />
        </figure>
        </Link>
      </Container>
    </footer>
  );
}
