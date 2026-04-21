import { ContainerProps, ContainerSize } from "@/types/components/ui/container.types";
import { cn } from "@/lib/util";

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export default function Container({
  children,
  className,
  size = "lg",
  ...props
}: ContainerProps) {
  return (
    <div className={cn("container", sizeMap[size], className)} {...props}>
      {children}
    </div>
  );
}
