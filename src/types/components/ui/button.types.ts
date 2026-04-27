export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "ghost" | "none";
    className?: string;
    text?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}
