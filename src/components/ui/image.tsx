import { ImageProps } from "@/types/components/ui/image.types";

export default function Image({ src, alt="", ...props }: ImageProps) {
  return (
    <img src={src} alt={alt} {...props} />
  );
}
