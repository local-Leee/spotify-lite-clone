import type { PartialOptions } from 'overlayscrollbars';

/**
 * 공통 스크롤바 설정
 */
export const commonScrollbarOptions: PartialOptions = {
    scrollbars: {
        autoHide: 'never',
        autoHideDelay: 0,
        autoHideSuspend: false,
        theme: 'os-theme-dark',
        visibility: 'visible',
    },
    overflow: {
        x: 'hidden',
    },
};

/**
 * 메인 콘텐츠 영역용 스크롤바 설정
 */
export const mainScrollbarOptions: PartialOptions = {
    ...commonScrollbarOptions,
    scrollbars: {
        ...commonScrollbarOptions.scrollbars,
        autoHide: 'leave',
        autoHideDelay: 500,
    },
};

/**
 * 라이브러리 사이드바용 스크롤바 설정
 */
export const libraryScrollbarOptions: PartialOptions = {
    ...commonScrollbarOptions,
    scrollbars: {
        ...commonScrollbarOptions.scrollbars,
        autoHide: 'leave',
        autoHideDelay: 300,
    },
};

/**
 * 플레이리스트 상세 페이지용 스크롤바 설정
 */
export const playlistScrollbarOptions: PartialOptions = {
    ...commonScrollbarOptions,
    // 플레이리스트 영역 특화 설정이 필요한 경우 여기에 추가
};
