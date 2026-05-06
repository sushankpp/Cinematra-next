export interface NavItemProps{
    label: string;
    href: string;
    className?: string;
    onClick? :() => void;
}

export interface NavItemsProps extends React.HTMLAttributes<HTMLElement>{   
    items: NavItemProps[];
    navItemClassName?: string;
    liClassName?: string;
    ulClassName?: string;
}