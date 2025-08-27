export interface ButtonProps extends React.ComponentProps<'button'>{
    variant?: 'base' | 'text' | 'scale';
    size?: 'xsmall' | 'small' | 'medium' | 'large';
    disabled?: boolean;
    shape?: 'base' | 'circle';
    bgColor?: 'base' | 'white' | 'primary';
}
