"use client";

import type { ButtonProps } from "./Button.types";
import { cn } from "@/lib/utils";

const Button = ({
        variant = 'base',
        size = 'medium',
        disabled = false,
        shape = 'base',
        className,
        children,
        ...props
    }: ButtonProps) => {

        const buttonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (disabled) {
                e.preventDefault();
                return;
            }
            props.onClick?.(e);
        }
        const baseStyle = "flex shrink-0 items-center justify-center bg-background-highlight text-white disabled:cursor-not-allowed disabled:bg-gray-300 transition-transform duration-100 cursor-pointer";
        const shapes = {
            base: "",
            circle: "bg-(--background-highlight) rounded-full overflow-hidden",
        }[shape];
        const sizes = {
            xsmall: "min-w-6 min-h-6",
            small: "min-w-8 min-h-8",
            medium: "min-w-12 min-h-12",
            large: "min-w-16 min-h-16",
        }[size];
        const variants = {
            base: "hover:brightness-130",
            text: "hover:underline",
            scale: "hover:scale-104 hover:brightness-130",
        }[variant];
    return (
        <button
            onClick={buttonClick}
            disabled={disabled}
            className={cn(
                baseStyle,
                sizes,
                shapes,
                variants,
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

Button.displayName = 'Button';
export { Button };



