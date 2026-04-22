export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary";
    className?: string;
    text: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}
