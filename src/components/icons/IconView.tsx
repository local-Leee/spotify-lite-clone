export default function IconClose({
    fillColor = 'base',
    shape = 'grid',
}: {
    fillColor?: 'base' | 'primary';
    size?: 'base';
    shape?: 'grid' | 'compactGrid' | 'list' | 'compactList';
}) {
    const fillColors = {
        base: 'var(--decorative-base)',
        primary: 'var(--color-primary)',
    };
    const sizes = '16';
    const shapes = {
        grid: 'M1 1h6v6H1zm1.5 1.5v3h3v-3zM1 9h6v6H1zm1.5 1.5v3h3v-3zM9 1h6v6H9zm1.5 1.5v3h3v-3zM9 9h6v6H9zm1.5 1.5v3h3v-3z',
        compactGrid:
            'M1 1h3v3H1zm0 5.5h3v3H1zM4 12H1v3h3zM6.5 1h3v3h-3zm3 5.5h-3v3h3zm-3 5.5h3v3h-3zM15 1h-3v3h3zm-3 5.5h3v3h-3zm3 5.5h-3v3h3z',
        list: 'M15 14.5H5V13h10zm0-5.75H5v-1.5h10zM15 3H5V1.5h10zM3 3H1V1.5h2zm0 11.5H1V13h2zm0-5.75H1v-1.5h2z',
        compactList: 'M15.5 13.5H.5V12h15zm0-4.75H.5v-1.5h15zm0-4.75H.5V2.5h15z',
    };
    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            width={sizes}
            height={sizes}
            viewBox="0 0 16 16"
            style={{ fill: fillColors[fillColor] } as React.CSSProperties}
        >
            <path d={shapes[shape]}></path>
        </svg>
    );
}
