export interface optionsDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    name?: string;
    isOpen: boolean;
    items: DropdownItem[];
}

export interface DropdownItem {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
}