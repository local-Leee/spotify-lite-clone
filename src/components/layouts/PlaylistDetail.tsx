"use client";
import { IconMore, IconPlay, IconShuffle, IconTime } from '@/components/icons';
import { Button } from '@/components/ui';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSpotifyPlaylist } from '@/hooks/useSpotifyPlaylist';
import { cn } from '@/lib/utils';
import { SpotifyPlaylistTrack } from '@/types/spotify';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// 시간을 분:초 형식으로 변환하는 함수
const formatDuration = (durationMs: number): string => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// 날짜를 "3일 전" 형식으로 변환하는 함수
const formatAddedDate = (addedAt: string): string => {
    const addedDate = new Date(addedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - addedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1일 전';
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
    return `${Math.floor(diffDays / 365)}년 전`;
};

// 트랙 아이템 컴포넌트
function TrackItem({ 
    track, 
    index, 
    isPlaying = false 
}: { 
    track: SpotifyPlaylistTrack; 
    index: number;
    isPlaying?: boolean;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(`재생: ${track.track.name}`);
        // TODO: 실제 재생 로직 구현
    };

    const handleTrackClick = () => {
        console.log(`트랙 선택: ${track.track.name}`);
        // TODO: 트랙 선택 로직 구현
    };

    return (
        <div 
            className={cn(
                "grid grid-cols-[16px_1fr_1fr_1fr_60px] gap-4 px-4 py-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors duration-200 items-center",
                isPlaying && "bg-zinc-800"
            )}
            onClick={handleTrackClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 트랙 번호 / 재생 버튼 */}
            <div className="flex items-center justify-center w-4 h-4">
                {isHovered ? (
                    <Button
                        size="small"
                        shape="circle"
                        className="w-4 h-4 flex items-center justify-center p-0"
                        onClick={handlePlayClick}
                    >
                        <IconPlay size="small" />
                    </Button>
                ) : (
                    <span className={cn(
                        "text-sm",
                        isPlaying ? "text-green-500" : "text-zinc-400"
                    )}>
                        {index + 1}
                    </span>
                )}
            </div>

            {/* 트랙 정보 */}
            <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 flex-shrink-0">
                    <Image
                        src={track.track.album.images[0]?.url || '/placeholder-album.svg'}
                        alt={track.track.album.name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className={cn(
                        "text-sm font-medium truncate",
                        isPlaying ? "text-green-500" : "text-white"
                    )}>
                        {track.track.name}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                        {track.track.artists.map(artist => artist.name).join(', ')}
                    </div>
                </div>
            </div>

            {/* 앨범명 */}
            <div className="text-sm text-zinc-400 truncate">
                {track.track.album.name}
            </div>

            {/* 추가된 날짜 */}
            <div className="text-sm text-zinc-400 truncate">
                {formatAddedDate(track.added_at)}
            </div>

            {/* 재생 시간 */}
            <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-zinc-400">
                    {formatDuration(track.track.duration_ms)}
                </span>
            </div>
        </div>
    );
}

interface PlaylistDetailProps {
    playlistId: string;
    className?: string;
}

export default function PlaylistDetail({ playlistId, className }: PlaylistDetailProps) {
    const { playlist, loading, error } = useSpotifyPlaylist(playlistId);
    const { user } = useCurrentUser();
    const { triggerAuthError } = useAuthRedirect();
    const [isScrolled, setIsScrolled] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lastScrollTop = useRef(0);
    const pathname = usePathname();
    
    
    // 컴포넌트가 언마운트될 때 스크롤 상태 리셋
    useEffect(() => {
        return () => {
            // 페이지를 떠날 때 스크롤 상태 리셋
            setIsScrolled(false);
            lastScrollTop.current = 0;
        };
    }, [pathname]);

    // 인증 오류 처리
    useEffect(() => {
        if (error && error.includes('인증')) {
            triggerAuthError();
        }
    }, [error, triggerAuthError]);

    // 상위 레이아웃의 스크롤 이벤트 처리 (커스텀 이벤트 사용)
    useEffect(() => {
        const handlePlaylistScroll = (event: CustomEvent) => {
            const scrollTop = event.detail.scrollTop;
            
            
            // 플레이리스트 헤더 영역의 높이를 더 정확하게 계산
            const showThreshold = 300; // 헤더를 보여주는 임계값
            const hideThreshold = 250; // 헤더를 숨기는 임계값 (하이스테리시스)
            
            // 스크롤 방향 감지
            const isScrollingDown = scrollTop > lastScrollTop.current;
            lastScrollTop.current = scrollTop;
            
            // 하이스테리시스 로직으로 헤더 표시/숨김 결정
            let shouldShowHeader = isScrolled;
            
            if (!isScrolled && scrollTop > showThreshold) {
                // 헤더가 숨겨진 상태에서 임계값을 넘으면 표시
                shouldShowHeader = true;
            } else if (isScrolled && scrollTop < hideThreshold) {
                // 헤더가 표시된 상태에서 임계값 아래로 내려가면 숨김
                shouldShowHeader = false;
            }
            
            // 상태 업데이트
            setIsScrolled(shouldShowHeader);
        };

        // 커스텀 스크롤 이벤트 리스너 추가
        window.addEventListener('playlist-scroll', handlePlaylistScroll as EventListener);

        return () => {
            window.removeEventListener('playlist-scroll', handlePlaylistScroll as EventListener);
        };
    }, [playlist]);

    // 전체 곡의 총 시간 계산 (분 단위)
    const totalDurationMinutes = playlist?.tracks.items.reduce((total, item) => {
        return total + item.track.duration_ms;
    }, 0) || 0;
    
    const totalMinutes = Math.floor(totalDurationMinutes / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    
    const formatTotalDuration = () => {
        if (totalHours > 0) {
            return `약 ${totalHours}시간 ${remainingMinutes}분`;
        }
        return `약 ${totalMinutes}분`;
    };


    if (loading) {
        return (
            <div className={cn("h-full flex items-center justify-center bg-[var(--background-base)] rounded-lg", className)}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <span className="ml-3 text-zinc-400">플레이리스트 로딩 중...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={cn("h-full flex items-center justify-center bg-[var(--background-base)] rounded-lg", className)}>
                <div className="text-center">
                    <div className="text-red-400 text-lg font-semibold mb-2">오류 발생</div>
                    <div className="text-zinc-400">{error}</div>
                </div>
            </div>
        );
    }

    if (!playlist) {
        return (
            <div className={cn("h-full flex items-center justify-center bg-[var(--background-base)] rounded-lg", className)}>
                <div className="text-zinc-400">플레이리스트를 찾을 수 없습니다.</div>
            </div>
        );
    }

    const playlistImage = playlist.images && playlist.images.length > 0 
        ? playlist.images[0].url 
        : '/placeholder-playlist.svg';

    return (
        <div 
            ref={scrollRef}
            className={cn(
                "bg-[var(--background-base)] relative",
                className
            )}
        >
            {/* 헤더 배경 그라데이션 */}
            <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-zinc-700 to-transparent"></div>
            
            {/* 상단 헤더 (트랙 리스트 영역에서만 sticky로 표시) */}
            <div className={cn(
                "sticky top-0 z-20 transition-all duration-300",
                isScrolled ? "bg-zinc-900/95 backdrop-blur-sm" : "bg-transparent"
            )}>
                {isScrolled && (
                    <div className="flex items-center gap-4 p-4">
                        <Button
                            size="medium"
                            shape="circle"
                            className="w-8 h-8 bg-green-500 hover:bg-green-400 text-black flex items-center justify-center"
                        >
                            <IconPlay size="medium" />
                        </Button>
                        <div>
                            <h1 className="text-white text-xl font-bold truncate">
                                {playlist.name} 
                            </h1>
                        </div>
                    </div>
                )}
            </div>

            <div className="relative z-[1] px-6 pb-6">
                {/* 플레이리스트 헤더 */}
                <div className="flex items-end gap-6 pt-10 pb-6">
                    {/* 플레이리스트 커버 이미지 */}
                    <div className="relative w-60 h-60 flex-shrink-0 shadow-2xl">
                        <Image
                            src={playlistImage}
                            alt={playlist.name}
                            width={240}
                            height={240}
                            className="rounded-lg object-cover"
                        />
                    </div>

                    {/* 플레이리스트 정보 */}
                    <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium mb-2">
                            공개 플레이리스트
                        </div>
                        <h1 className="text-white text-6xl font-black mb-6 leading-none">
                            {playlist.name}
                        </h1>
                        {playlist.description && (
                            <div className="text-zinc-300 text-sm mb-4">
                                {playlist.description}
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-white">
                            {/* 사용자 프로필 이미지 */}
                            {user?.images && user.images.length > 0 && (
                                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={user.images[0].url}
                                        alt={user.display_name}
                                        width={24}
                                        height={24}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <span className="font-semibold">{playlist.owner.display_name}</span>
                            <span className="text-zinc-400">•</span>
                            <span className="text-zinc-400">{playlist.tracks.total}곡</span>
                            <span className="text-zinc-400">•</span>
                            <span className="text-zinc-400">{formatTotalDuration()}</span>
                        </div>
                    </div>
                </div>

                {/* 컨트롤 버튼들 */}
                <div className="flex items-center gap-6 mb-6">
                    <Button
                        size="medium"
                        shape="circle"
                        className="w-14 h-14 bg-green-500 hover:bg-green-400 text-black flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        <IconPlay />
                    </Button>
                    <Button
                        size="medium"
                        shape="circle"
                        className="w-8 h-8 text-zinc-400 hover:text-white transition-colors"
                    >
                        <IconShuffle size="medium" />
                    </Button>
                    <Button
                        size="medium"
                        shape="circle"
                        className="w-8 h-8 text-zinc-400 hover:text-white transition-colors"
                    >
                        <IconMore size="medium" />
                    </Button>
                </div>

                {/* 트랙 리스트 헤더 */}
                <div className={cn(
                    "sticky z-[5] bg-[var(--background-base)] grid grid-cols-[16px_1fr_1fr_1fr_60px] gap-4 px-4 py-2 border-b border-zinc-800 mb-2",
                    isScrolled ? "top-[88px]" : "top-0"
                )}>
                    <div className="text-zinc-400 text-sm">#</div>
                    <div className="text-zinc-400 text-sm">제목</div>
                    <div className="text-zinc-400 text-sm">앨범</div>
                    <div className="text-zinc-400 text-sm">추가한 날짜</div>
                    <div className="flex justify-end">
                        <IconTime size="small" />
                    </div>
                </div>

                {/* 트랙 리스트 */}
                <div className="space-y-1">
                    {playlist.tracks.items.map((track, index) => (
                        <TrackItem
                            key={`${track.track.id}-${index}`}
                            track={track}
                            index={index}
                            isPlaying={false} // TODO: 실제 재생 상태 연결
                        />
                    ))}
                </div>

                {/* 플레이리스트 정보 푸터 */}
                <div className="mt-12 pt-8 border-t border-zinc-800">
                    <div className="text-zinc-400 text-sm">
                        {new Date(playlist.tracks.items[0]?.added_at || '').toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}에 추가됨
                    </div>
                    <div className="text-zinc-400 text-sm mt-1">
                        총 {playlist.tracks.total}곡, 약 {Math.floor(
                            playlist.tracks.items.reduce((total, item) => total + item.track.duration_ms, 0) / (1000 * 60)
                        )}분
                    </div>
                </div>
            </div>
        </div>
    );
}
