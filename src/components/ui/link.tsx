import { LinkProps } from "@/types/components/ui/link.types";
import NextLink from "next/link";

export default function Link({ href, children, ...props }: LinkProps) {
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}
