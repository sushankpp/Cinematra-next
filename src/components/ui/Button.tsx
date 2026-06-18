import { cn } from "@/lib/util";
import { ButtonProps } from "@/types/components/ui/button.types";

const variantClasses = {
  primary: "bg-red-500 text-white hover:bg-red-600 rounded-lg",
  secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm rounded-lg",
  tertiary: "bg-transparent text-red-400 border border-red-500/50 hover:border-red-500 hover:text-red-300 rounded-lg",
  ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/8 rounded-full rounded-lg",
  none: "bg-transparent text-white/50 hover:text-white rounded-lg",
};

export default function Button({
  variant = "primary",
  className,
  text,
  icon,
  iconPosition = "left",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {iconPosition === "left" && icon}
      {text}
      {iconPosition === "right" && icon}
      {children}
    </button>
  );
}
