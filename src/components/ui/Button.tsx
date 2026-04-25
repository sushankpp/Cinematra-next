import { cn } from "@/lib/util";
import { ButtonProps } from "@/types/components/ui/button.types";

const variantClasses = {
  primary: "bg-red-500 text-white hover:bg-red-600",
  secondary: "bg-charcoal-500 text-white hover:bg-charcoal-800",
  tertiary: "bg-transparent text-white border border-red-500 hover:bg-red-500",
  ghost: "bg-transparent text-black hover:bg-charcoal-100 border border-charcoal-500 border-2 rounded-full p-2",
};

export default function Button({
  variant = "primary",
  className,
  text,
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {iconPosition === "left" && icon}
      {text}
      {iconPosition === "right" && icon}
    </button>
  );
}
