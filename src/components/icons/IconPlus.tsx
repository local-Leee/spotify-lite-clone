export default function IconClose({
    fillColor = 'base',
    size = 'base',
}: {
    fillColor?: 'base' | 'primary';
    size?: 'base' | 'large';
    shape?: 'base' | 'line';
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
            class="e-91000-icon e-91000-baseline"
            viewBox="0 0 24 24"
        >
            <path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414"></path>
        </svg>
    );
}
