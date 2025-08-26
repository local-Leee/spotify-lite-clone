"use client";

import type { InputProps } from "./Input.types";
import { cn } from "@/lib/utils";

const Input = ({
        variant = 'base',
        size = 'medium',
        disabled = false,
        shape = 'base',
        className,
        children,
        ...props
    }: InputProps) => {

        const baseStyle = "bg-(--background-elevated-base) text-overflow-ellipsis h-12 pl-12 pr-24 w-full rounded-full overflow-hidden text-(--text-base) disabled:cursor-not-allowed disabled:bg-gray-300 transition-all ease-in duration-100 ";
        const sizes = {
            small: "min-h-8",
            medium: "min-h-12",
            large: "min-h-16",
        }[size];
        const variants = "hover:bg-(--background-elevated-highlight) hover:inset-shadow-(0 0 0 1px) hover:inset-shadow-white";
        const focusStyle = "focus:bg-(--background-elevated-highlight) focus:shadow(inset 0,0,0,2px #fff) cursor-unset ";
    return (
        <input
            type="text"
            disabled={disabled}
            className={cn(
                baseStyle,
                sizes,
                variants,
                className
            )}
            {...props}
        >
            {children}
        </input>
    )
}

Input.displayName = 'Input';
export { Input };



