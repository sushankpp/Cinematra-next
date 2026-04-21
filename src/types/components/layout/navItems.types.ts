export interface NavItemProps{
    label: string;
    href: string;
}

export interface NavItemsProps extends React.HTMLAttributes<HTMLElement>{   
    items: NavItemProps[];
}