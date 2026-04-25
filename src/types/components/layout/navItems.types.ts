export interface NavItemProps{
    label: string;
    href: string;
    className?: string;
}

export interface NavItemsProps extends React.HTMLAttributes<HTMLElement>{   
    items: NavItemProps[];
    navItemClassName?: string;
    liClassName?: string;
    ulClassName?: string;
}