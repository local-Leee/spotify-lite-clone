import { cn } from "@/lib/utils";

export default function IconHome({
    size = 'base',
    active = false,
}: {
    size?: 'base' | 'large';
    active?: boolean;
}) {
    const fillColors = {
        base: 'var(--text-subdued)',
        active: 'var(--essential-base)',
    };
    const sizes = {
        base: '24',
        large: '48',
    }[size];
    const shapes = {
        base: 'M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732z',
        active: 'M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z',
    };
    const hover = 'hover:fill-var(--decorative-base)';
    return (
        <svg
            data-encore-id="icon-active"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={sizes}
            height={sizes}
            style={{ fill: fillColors[active ? 'active' : 'base'] } as React.CSSProperties}
        >
            {active ? <path d={shapes.active}></path> : <path d={shapes.base}></path>}
        </svg>
    );
}
