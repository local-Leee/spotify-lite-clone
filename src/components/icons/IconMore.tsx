import { cn } from '@/lib/utils';


export default function IconMore() {
    const fillColors = 'var(--text-subdued)';
    const size = '32';
    return (
        <svg 
            data-encore-id="icon" 
            role="img" aria-hidden="true" 
            className={cn(fillColors)}
            width={size}
            height={size}
            viewBox="0 0 24 24" 
            style={{ "--encore-icon-height": "var(--encore-graphic-size-decorative-larger)", "--encore-icon-width": "var(--encore-graphic-size-decorative-larger)" } as React.CSSProperties}
        >
            <path d="M4.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m15 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"></path>
        </svg>
    );
}
