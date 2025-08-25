export default function IconLibrary({
    fillColor = 'base',
    shape = 'base',
    size = 'base',
}: {
    fillColor?: 'base' | 'primary';
    shape?: 'base' | 'open' | 'close';
    size?: 'base' | 'small';
}) {
    const fillColors = {
        base: 'var(--decorative-base)',
        primary: 'var(--color-primary)',
    };
    const sizes = {
        base: '24',
        small: '16',
    };
    const shapes = {
        base: {
            path1: 'M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866M16 4.732V20h4V7.041zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1m6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1',
        },
        open: {
            path1: 'M14.457 15.207a1 1 0 0 1-1.414-1.414L14.836 12l-1.793-1.793a1 1 0 0 1 1.414-1.414l2.5 2.5a1 1 0 0 1 0 1.414z',
            path2: 'M20 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zM4 20V4h4v16zm16 0H10V4h10z',
        },
        close: {
            path1: 'M10.97 5.47a.75.75 0 1 1 1.06 1.06L10.56 8l1.47 1.47a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06z',
            path2: 'M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5H5v13H1.5zm13 13h-8v-13h8z',
        },
    };
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            height={sizes[size]}
            viewBox="0 0 24 24"
            style={{ fill: fillColors[fillColor] } as React.CSSProperties}
        >
            <path d={shapes[shape].path1}></path>
            {shape === 'open' && <path d={shapes.open.path2}></path>}
            {shape === 'close' && <path d={shapes.close.path2}></path>}
        </svg>
    );
}
