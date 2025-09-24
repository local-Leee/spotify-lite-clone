/**
 * 공통 유틸리티 함수들
 */

/**
 * 시간을 분:초 형식으로 변환
 */
export function formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 총 시간을 시간:분 또는 분 형식으로 변환
 */
export function formatTotalDuration(totalMs: number): string {
    const totalMinutes = Math.floor(totalMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
        return `약 ${hours}시간 ${minutes}분`;
    }
    return `약 ${minutes}분`;
}

/**
 * 숫자를 천 단위로 포맷팅 (예: 1,234)
 */
export function formatNumber(num: number): string {
    return num.toLocaleString('ko-KR');
}

/**
 * 플레이리스트/앨범/아티스트 타입에 따른 기본 이미지 반환
 */
export function getDefaultImage(type: 'playlist' | 'album' | 'artist'): string {
    const images = {
        playlist: '/placeholder-playlist.svg',
        album: '/placeholder-album.svg',
        artist: '/placeholder-artist.svg',
    };
    
    return images[type] || images.playlist;
}

/**
 * 이미지 URL 검증 및 기본값 반환
 */
export function getImageUrl(
    images: Array<{ url: string }> | undefined,
    type: 'playlist' | 'album' | 'artist' = 'playlist'
): string {
    if (images && images.length > 0) {
        return images[0].url;
    }
    return getDefaultImage(type);
}

/**
 * 아티스트 이름들을 콤마로 연결
 */
export function formatArtists(artists: Array<{ name: string }>): string {
    return artists.map(artist => artist.name).join(', ');
}

/**
 * 로컬 환경 감지
 */
export function isLocalEnvironment(): boolean {
    if (typeof window === 'undefined') return false;
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

/**
 * 로그인 URL 생성
 */
export function getLoginUrl(): string {
    if (typeof window === 'undefined') return '/api/auth/login';
    
    const isLocal = isLocalEnvironment();
    return isLocal 
        ? 'https://127.0.0.1:3000/api/auth/login'
        : '/api/auth/login';
}

/**
 * 커스텀 이벤트 발생
 */
export function dispatchCustomEvent(eventName: string, detail?: any): void {
    if (typeof window === 'undefined') return;
    
    const event = detail 
        ? new CustomEvent(eventName, { detail })
        : new CustomEvent(eventName);
    
    window.dispatchEvent(event);
}

/**
 * 디바운스 함수
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

/**
 * 스로틀 함수
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
