import { cn } from "@/lib/utils";

export default function IconPlus({
    fillColor = 'base',
    size = 'base',
    close = false,
}: {
    fillColor?: 'base' | 'primary';
    size?: 'base' | 'small';
    close?: boolean;
}) {
    const fillColors = {
        base: 'var(--text-subdued)',
        primary: 'var(--color-primary)',
    };
    const sizes = {
        base: '24',
        small: '16',
    };
    const baseStyle = "transition-transform duration-100";
    const closeStyle = "rotate-45";
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            width={sizes[size]}
            height={sizes[size]}
            viewBox="0 0 sizes[size] sizes[size]"
            className={cn(baseStyle, close ? closeStyle : "")}
            style={{ fill: fillColors[fillColor] } as React.CSSProperties}
        >
            <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path>
        </svg>
    );
}
