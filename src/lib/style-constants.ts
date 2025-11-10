/**
 * 공통 테마 및 스타일 상수
 */

// 테마 상수
export const THEMES = {
    BASE_DARK: 'base-dark-theme',
} as const;

// CSS 클래스 상수
export const CSS_CLASSES = {
    // 레이아웃
    GRID_LAYOUT: 'grid-layout',
    GRID_GLOBAL_NAV: 'grid-global-nav',
    GRID_LEFT_SIDEBAR: 'grid-left-sidebar',
    GRID_MAIN_VIEW: 'grid-main-view',
    GRID_NOW_PLAYING_BAR: 'grid-now-playing-bar',
    
    // 공통 스타일
    OVERFLOW_HIDDEN: 'overflow-hidden',
    ROUNDED_LG: 'rounded-lg',
    H_FULL: 'h-full',
    H_SCREEN: 'h-screen',
    
    // 호버 효과
    HOVER_BG_HIGHLIGHT: 'hover:bg-zinc-800',
    HOVER_SCALE: 'hover:scale-104',
    HOVER_BRIGHTNESS: 'hover:brightness-130',
    
    // 트랜지션
    TRANSITION_COLORS: 'transition-colors duration-200',
    TRANSITION_TRANSFORM: 'transition-transform duration-100',
    TRANSITION_ALL: 'transition-all duration-300 ease-out',
} as const;

// 색상 변수
export const CSS_VARIABLES = {
    // 배경색
    BACKGROUND_BASE: 'var(--background-base)',
    BACKGROUND_HIGHLIGHT: 'var(--background-highlight)',
    BACKGROUND_ELEVATED_BASE: 'var(--background-elevated-base)',
    
    // 텍스트 색상
    TEXT_BASE: 'var(--text-base)',
    TEXT_SUBDUED: 'var(--text-subdued)',
    TEXT_BRIGHT_ACCENT: 'var(--text-bright-accent)',
    
    // 기본 색상
    COLOR_PRIMARY: 'var(--color-primary)',
    DECORATIVE_BASE: 'var(--decorative-base)',
} as const;

// 공통 스타일 조합
export const COMMON_STYLES = {
    // 카드 기본 스타일
    CARD_BASE: `flex flex-col gap-3 p-3 cursor-pointer ${CSS_CLASSES.HOVER_BG_HIGHLIGHT} ${CSS_CLASSES.ROUNDED_LG} ${CSS_CLASSES.TRANSITION_ALL} group`,
    
    // 버튼 기본 스타일
    BUTTON_BASE: `flex shrink-0 items-center justify-center text-white disabled:cursor-not-allowed disabled:bg-gray-300 focus-visible:brightness-130 ${CSS_CLASSES.TRANSITION_TRANSFORM} cursor-pointer`,
    
    // 이미지 컨테이너
    IMAGE_CONTAINER: `relative overflow-hidden flex-shrink-0 ${CSS_CLASSES.ROUNDED_LG}`,
    
    // 텍스트 말줄임
    TEXT_ELLIPSIS: 'text-ellipsis line-clamp-2 overflow-hidden',
    TEXT_TRUNCATE: 'truncate',
    
    // 로딩 스피너
    LOADING_SPINNER: 'animate-spin rounded-full border-b-2 border-green-500',
} as const;

// 크기 상수
export const SIZES = {
    // 아이콘 크기
    ICON: {
        SMALL: 'w-4 h-4',
        MEDIUM: 'w-6 h-6',
        LARGE: 'w-8 h-8',
    },
    
    // 버튼 크기
    BUTTON: {
        XSMALL: 'min-w-6 min-h-6',
        SMALL: 'min-w-8 min-h-8',
        MEDIUM: 'min-w-12 min-h-12',
        LARGE: 'min-w-16 min-h-16',
    },
    
    // 이미지 크기
    IMAGE: {
        THUMBNAIL: 'w-12 h-12',
        SMALL: 'w-16 h-16',
        MEDIUM: 'w-24 h-24',
        LARGE: 'w-32 h-32',
        COVER: 'w-48 h-48',
    },
} as const;
