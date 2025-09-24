import { cn } from '@/lib/utils';

interface IconMoreProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export default function IconMore({ size = 'medium', className }: IconMoreProps) {
    const fillColors = 'var(--text-subdued)';
    const iconSize = size === 'small' ? '16' : size === 'large' ? '32' : '24';
    return (
        <svg 
            data-encore-id="icon" 
            role="img" aria-hidden="true" 
            className={cn(fillColors, className)}
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24" 
            style={{ "--encore-icon-height": "var(--encore-graphic-size-decorative-larger)", "--encore-icon-width": "var(--encore-graphic-size-decorative-larger)" } as React.CSSProperties}
        >
            <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
        </svg>
    );
}
