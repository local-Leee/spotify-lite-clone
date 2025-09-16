import type { InputHTMLAttributes, MouseEvent, ReactNode } from 'react';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    uiSize?: 'small' | 'medium' | 'large';
    variant?: 'base' | 'text' | 'scale';
    disabled?: boolean;
    shape?: 'base' | 'circle';
    className?: string;
    children?: ReactNode;
    clearable?: boolean; // show custom clear button when there is value
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
};
