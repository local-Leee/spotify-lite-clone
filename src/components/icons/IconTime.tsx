import { cn } from '@/lib/utils';

interface IconTimeProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export default function IconTime({ size = 'small', className }: IconTimeProps) {
    const fillColors = 'var(--text-subdued)';
    const iconSize = size === 'small' ? '16' : size === 'large' ? '24' : '20';
    return (
        <svg 
            data-encore-id="icon" 
            role="img" 
            aria-hidden="true" 
            className={cn(fillColors, className)}
            width={iconSize}
            height={iconSize}
            viewBox="0 0 16 16" 
            style={{fill: fillColors, "--encore-icon-height": "var(--encore-graphic-size-decorative-smaller)", "--encore-icon-width": "var(--encore-graphic-size-decorative-smaller)" } as React.CSSProperties}
        >
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25"></path>
        </svg>
    );
}
