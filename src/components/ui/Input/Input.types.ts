export type InputProps = {
    size?: 'small' | 'medium' | 'large';
    variant?: 'base' | 'text' | 'scale';
    disabled?: boolean;
    shape?: 'base' | 'circle';
    className?: string;
    children?: React.ReactNode;
    placeholder?: string;
    id?: string;
    name?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week';
};
