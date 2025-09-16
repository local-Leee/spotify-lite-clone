import { cn } from '@/lib/utils';

export default function IconClose({
    fillColor = 'base',
    size = 'base',
    plus = false,
}: {
    fillColor?: 'base' | 'primary';
    size?: 'base' | 'small';
    plus?: boolean;
}) {
    const fillColors = {
        base: 'var(--text-subdued)',
        primary: 'var(--color-primary)',
    };
    const sizes = {
        base: '24',
        small: '16',
    }[size];
    const baseStyle = 'transition-transform duration-100';
    const plusStyle = 'rotate-45';
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            width={sizes}
            height={sizes}
            viewBox="0 0 24 24"
            className={cn(baseStyle, plus ? plusStyle : '')}
            style={{ fill: fillColors[fillColor] } as React.CSSProperties}
        >
            <path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414"></path>
        </svg>
    );
}
