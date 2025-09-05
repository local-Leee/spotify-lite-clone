import { cn } from '@/lib/utils';


export default function IconArrow({
    left = false,
}: {
    fillColor?: 'base' | 'primary';
    left?: boolean;
}) {
    const fillColors = 'var(--text-subdued)';
    const size = '16';
    const leftStyle = 'rotate-180';
    return (
        <svg 
            data-encore-id="icon" 
            role="img" 
            aria-hidden="true" 
            viewBox="0 0 16 16" 
            width={size}
            height={size}
            className={cn(left ? leftStyle : '')}
            style={{ fill: fillColors} as React.CSSProperties}
        >
            <path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0"></path>
        </svg>
    );
}
