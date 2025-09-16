export type ButtonProps = {
    variant?: 'base' | 'text' | 'scale' | 'scaleWhite';
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    disabled?: boolean;
    shape?: 'base' | 'circle';
    bgColor?: 'base' | 'white' | 'primary' | 'transparent';
    children: React.ReactNode;
    title?: string;
    className?: string;
    role?: string;
    asChild?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};
