export default function IconLike({
    isAdded = false,
    size = 'base',
}: {
    isAdded?: boolean;
    size?: 'base' | 'large';
}) {
    const sizes = {
        base: '16',
        large: '24',
    }[size];

    return (
        <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
            width={sizes}
            height={sizes}
            style={
                {
                    '--encore-icon-fill': isAdded
                        ? 'var(--text-bright-accent, #107434)'
                        : undefined,
                    '--encore-icon-height': 'var(--encore-graphic-size-decorative-smaller)',
                    '--encore-icon-width': 'var(--encore-graphic-size-decorative-smaller)',
                } as React.CSSProperties
            }
        >
            {isAdded ? (
                // 추가됨: 체크 표시
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z"></path>
            ) : (
                // 추가 전: 플러스 표시
                <>
                    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
                    <path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75"></path>
                </>
            )}
        </svg>
    );
}