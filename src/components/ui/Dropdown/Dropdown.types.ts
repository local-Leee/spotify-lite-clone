export interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  separator?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger: React.ReactNode;
  className?: string;
  position?: 'left' | 'right';
}
