export type ButtonProps = {
    variant?: 'base' | 'text' | 'scale';
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    disabled?: boolean;
    shape?: 'base' | 'circle';
    bgColor?: 'base' | 'white' | 'primary';
    children: React.ReactNode;
    className?: string;
    title?: string;
    role?: string;
    asChild?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};
