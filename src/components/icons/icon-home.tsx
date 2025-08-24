export default function IconHome({
    fillColor = 'base',
    size = 'base',
}: {
    fillColor?: 'base' | 'primary';
    size?: 'base' | 'large';
}) {
    const fillColors = {
        base: 'var(--decorative-base)',
        primary: 'var(--color-primary)',
    };
    const sizes = {
        base: '24',
        large: '48',
    };
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            height={sizes[size]}
            style={{ fill: fillColors[fillColor] } as React.CSSProperties}
        >
            <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732z"></path>
        </svg>
    );
}
