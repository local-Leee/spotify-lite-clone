'use client';

import { Slot } from '@/lib/Slot';
import { cn } from '@/lib/utils';
import { type AriaRole } from 'react';
import type { ButtonProps } from './Button.types';

const Button = ({
    variant = 'base',
    size = 'medium',
    disabled = false,
    shape = 'base',
    className,
    children,
    bgColor = 'base',
    title,
    role = undefined,
    asChild = false,
    ...props
}: ButtonProps) => {
    const buttonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        props.onClick?.(e);
    };
    const baseStyle =
        'flex shrink-0 items-center justify-center text-white disabled:cursor-not-allowed disabled:bg-gray-300 focus-visible:brightness-130 transition-transform duration-100 cursor-pointer';
    const shapes = {
        base: '',
        circle: 'rounded-full overflow-hidden',
    }[shape];
    const sizes = {
        xsmall: 'min-w-6 min-h-6',
        small: 'min-w-8 min-h-8',
        medium: 'min-w-12 min-h-12',
        large: 'min-w-16 min-h-16',
    }[size];
    const variants = {
        base: 'hover:brightness-130',
        text: 'hover:underline',
        scale: 'hover:scale-104 hover:brightness-130',
        scaleWhite: 'hover:scale-104 hover:brightness-90',
    }[variant];

    const bgColors = {
        base: 'bg-(--background-highlight)',
        transparent: 'bg-transparent',
        white: 'bg-(--decorative-base) text-black',
        primary: 'bg-(--color-primary)',
    }[bgColor];
    const Comp: any = asChild ? Slot : "button";
    return (
        <Comp
            onClick={buttonClick}
            {...(!asChild ? {disabled}: {})}
            role={role ? (role as AriaRole) : undefined}
            className={cn(baseStyle, bgColors, sizes, shapes, variants, className)}
            title={title}
            {...props}
        >
            {children}
        </Comp>
    );
};

Button.displayName = 'Button';
export default Button;
export { Button };

