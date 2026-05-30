import { cn } from "@/lib/util";
import { InputProps } from "@/types/components/ui/input.types";

export default function Input({ type, className, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "border border-gray-300 focus:outline-none px-2",
        className
      )}
      {...props}
    />
  );
}
