export default function IconTrailing({
    size = 'base',
    shape = 'base',
}: {
    size?: 'base' | 'large';
    shape?: 'base' | 'fill';
}) {
    const fillColors = 'var(--text-subdued)';
    const sizes = {
        base: '24',
        large: '48',
    }[size];
    const shapes = {
        base: {
            path1: 'M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2',
            path2: 'M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4z',
        },
        fill: {
            path1: 'M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333s-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5s1.567 2.333 3.5 2.333z',
        },
    };
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            width={sizes}
            height={sizes}
            style={{ fill: fillColors } as React.CSSProperties}
        >
            <path d={shapes[shape].path1}></path>
            {shape === 'base' && <path d={shapes.base.path2}></path>}
        </svg>
    );
}
