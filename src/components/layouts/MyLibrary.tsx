"use client";
import { IconLibrary, IconPlay, IconPlus } from '@/components/icons';
import { Button } from '@/components/ui';
import { useSpotifyLibrary } from '@/hooks/useSpotifyLibrary';
import { cn } from '@/lib/utils';
import { SpotifyAlbum, SpotifyArtist, SpotifyPlaylist } from '@/types/spotify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { PartialOptions } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { useEffect, useMemo, useState } from 'react';

// 스크롤바 옵션
const libraryScrollbarOptions: PartialOptions = {
    scrollbars: {
        autoHide: 'never',
        theme: 'os-theme-dark',
        visibility: 'visible',
    },
    overflow: {
        x: 'hidden',
    },
};

// 라이브러리 아이템 인터페이스
interface LibraryItem {
    id: string;
    title: string;
    artist: string;
    image: string;
    type: 'album' | 'playlist' | 'artist';
}

// 라이브러리 아이템 컴포넌트
function LibraryItemComponent({ item }: { item: LibraryItem }) {
    const router = useRouter();

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 전체 클릭 이벤트 방지
        console.log(`재생: ${item.title}`);
        // TODO: 실제 재생 로직 구현
    };

    const handleItemClick = () => {
        console.log(`페이지 이동: ${item.title} (${item.type})`);
        
        // 타입에 따라 다른 페이지로 이동
        switch (item.type) {
            case 'playlist':
                if (item.id === 'liked') {
                    // 좋아요 표시한 곡 페이지로 이동 (추후 구현)
                    console.log('좋아요 표시한 곡 페이지로 이동');
                } else {
                    // 플레이리스트 상세 페이지로 이동
                    router.push(`/playlist/${item.id}`);
                }
                break;
            case 'album':
                // 앨범 상세 페이지로 이동 (추후 구현)
                console.log('앨범 페이지로 이동:', item.id);
                break;
            case 'artist':
                // 아티스트 페이지로 이동 (추후 구현)
                console.log('아티스트 페이지로 이동:', item.id);
                break;
            default:
                console.log('알 수 없는 타입:', item.type);
        }
    };

    return (
        <div 
            className="group flex items-center p-2 rounded-md hover:bg-zinc-800 cursor-pointer transition-colors duration-200"
            onClick={handleItemClick}
        >
            {/* 앨범 커버 이미지 또는 아티스트 프로필 이미지 */}
            <div className={cn(
                "relative w-12 h-12 overflow-hidden flex-shrink-0",
                item.type === 'artist' ? 'rounded-full' : 'rounded-md'
            )}>
                <Image
                    src={item.image}
                    alt={item.title}
                    width={48}
                    height={48}
                    className={cn(
                        "object-cover",
                        item.type === 'artist' ? 'rounded-full' : ''
                    )}
                />
                {/* 호버 시 플레이 버튼 */}
                <div className={cn(
                    "absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    item.type === 'artist' ? 'rounded-full' : ''
                )}>
                    <Button
                        size="small"
                        shape="circle"
                        className="w-8 h-8 flex items-center justify-center bg-white text-black opacity-100 shadow-lg"
                        onClick={handlePlayClick}
                    >
                        <IconPlay size="small" />
                    </Button>
                </div>
            </div>

            {/* 텍스트 정보 */}
            <div className="ml-3 flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">
                    {item.title}
                </div>
                <div className="text-zinc-400 text-xs truncate">
                    {item.artist}
                </div>
            </div>
        </div>
    );
}

export default function MyLibrary({ id, className }: { id: string; className: string }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { libraryData, loading, error } = useSpotifyLibrary(isLoggedIn);

    // 사용자 로그인 상태 확인
    const checkLoginStatus = async () => {
        try {
            console.log('MyLibrary: 로그인 상태 확인 중...');
            const response = await fetch('/api/me', {
                credentials: 'include'
            });
            console.log('MyLibrary: /api/me 응답:', {
                status: response.status,
                ok: response.ok,
                url: response.url
            });
            
            if (response.ok) {
                const userData = await response.json();
                console.log('MyLibrary: 사용자 데이터:', userData);
            }
            
            setIsLoggedIn(response.ok);
        } catch (error) {
            console.error('MyLibrary: 로그인 상태 확인 오류:', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    // 로그아웃 이벤트 리스너 (즉시 상태 업데이트)
    useEffect(() => {
        const handleLogout = () => {
            console.log('MyLibrary: 로그아웃 이벤트 감지');
            setIsLoggedIn(false);
        };

        const handleFocus = () => {
            checkLoginStatus();
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                checkLoginStatus();
            }
        };

        // 커스텀 로그아웃 이벤트 리스너
        window.addEventListener('spotify-logout', handleLogout);
        // 페이지 포커스 이벤트 리스너
        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('spotify-logout', handleLogout);
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Spotify 플레이리스트를 LibraryItem 형태로 변환
    const convertPlaylistToLibraryItem = (playlist: SpotifyPlaylist): LibraryItem => {
        const image = playlist.images && playlist.images.length > 0 
            ? playlist.images[0].url 
            : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMTFkYjRhIiByeD0iNCIvPgo8cGF0aCBkPSJNMjAgMTZIMjhWMzJIMjBWMTZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';

        return {
            id: playlist.id,
            title: playlist.name,
            artist: `플레이리스트 · ${playlist.owner.display_name} · ${playlist.tracks.total}곡`,
            image,
            type: 'playlist'
        };
    };

    // Spotify 앨범을 LibraryItem 형태로 변환
    const convertAlbumToLibraryItem = (album: SpotifyAlbum): LibraryItem => {
        const image = album.images && album.images.length > 0 
            ? album.images[0].url 
            : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMzMzIiByeD0iNCIvPgo8cGF0aCBkPSJNMTYgMTZIMzJWMzJIMTZWMTZaIiBmaWxsPSIjNTU1Ii8+PC9zdmc+';

        const artistNames = album.artists.map(artist => artist.name).join(', ');

        return {
            id: album.id,
            title: album.name,
            artist: `앨범 · ${artistNames}`,
            image,
            type: 'album'
        };
    };

    // Spotify 아티스트를 LibraryItem 형태로 변환
    const convertArtistToLibraryItem = (artist: SpotifyArtist): LibraryItem => {
        const image = artist.images && artist.images.length > 0 
            ? artist.images[0].url 
            : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjAiIGZpbGw9IiM2NjYiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIxOCIgcj0iNiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNMTIgMzZjMC04IDUuMzctMTIgMTItMTJzMTIgNDQgMTIgMTIiIGZpbGw9IiNmZmYiLz48L3N2Zz4K';

        return {
            id: artist.id,
            title: artist.name,
            artist: '아티스트',
            image,
            type: 'artist'
        };
    };

    // Spotify 데이터가 있는지 확인
    const hasSpotifyData = useMemo(() => {
        const playlistsData = libraryData.playlists;
        const albumsData = libraryData.albums;
        const followedArtistsData = libraryData.followedArtists;
        
        const hasPlaylists = Array.isArray(playlistsData) 
            ? playlistsData.length > 0 
            : playlistsData?.items && playlistsData.items.length > 0;
            
        const hasAlbums = Array.isArray(albumsData) 
            ? albumsData.length > 0 
            : albumsData?.items && albumsData.items.length > 0;

        const hasFollowedArtists = followedArtistsData?.artists?.items && followedArtistsData.artists.items.length > 0;
            
        return hasPlaylists || hasAlbums || hasFollowedArtists;
    }, [libraryData]);

    // 로그인 상태에 따른 라이브러리 아이템 생성
    const libraryItems: LibraryItem[] = (() => {
        // 로그인되지 않은 경우 빈 배열 반환
        if (!isLoggedIn) {
            return [];
        }

        const items: LibraryItem[] = [];

        // 로그인된 경우에만 "좋아요 표시한 곡" 아이템 추가
        items.push({
            id: 'liked',
            title: 'Liked Songs',
            artist: '좋아요 표시한 곡',
            image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjMWVkNzYwIiByeD0iNCIvPgo8cGF0aCBkPSJNMjQgMzJMMTYgMjRIMzJMMjQgMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
            type: 'playlist'
        });

        // 플레이리스트 추가 (배열인지 객체인지 확인)
        const playlistsData = libraryData.playlists;
        if (Array.isArray(playlistsData)) {
            // 직접 배열로 온 경우
            const playlistItems = playlistsData.map(convertPlaylistToLibraryItem);
            items.push(...playlistItems);
        } else if (playlistsData?.items) {
            // 객체로 온 경우
            const playlistItems = playlistsData.items.map(convertPlaylistToLibraryItem);
            items.push(...playlistItems);
        }

        // 앨범 추가  
        const albumsData = libraryData.albums;
        if (Array.isArray(albumsData)) {
            // 직접 배열로 온 경우 (saved albums의 경우 item.album 구조)
            const albumItems = albumsData.map(item => convertAlbumToLibraryItem(item.album || item));
            items.push(...albumItems);
        } else if (albumsData?.items) {
            // 객체로 온 경우
            const albumItems = albumsData.items.map(item => convertAlbumToLibraryItem(item.album || item));
            items.push(...albumItems);
        }

        // 팔로우한 아티스트 추가
        const followedArtistsData = libraryData.followedArtists;
        if (followedArtistsData?.artists?.items) {
            const artistItems = followedArtistsData.artists.items.map(convertArtistToLibraryItem);
            items.push(...artistItems);
        }

        return items;
    })();

    // 개발 모드에서만 로그 출력
    if (process.env.NODE_ENV === 'development') {
        console.log('MyLibrary: 렌더링 상태', {
            isLoggedIn,
            loading,
            error,
            hasSpotifyData,
            libraryItemsCount: libraryItems.length,
            itemsByType: {
                playlist: libraryItems.filter(item => item.type === 'playlist').length,
                album: libraryItems.filter(item => item.type === 'album').length,
                artist: libraryItems.filter(item => item.type === 'artist').length
            }
        });
    }

    return (
        <nav
            id={id}
            className={cn(
                'w-[420px] bg-(--background-base) h-screen rounded-lg flex-shrink-0 flex flex-col',
                className,
            )}
        >
            <header className="flex items-center px-4 py-4 flex-shrink-0">
                <Button shape="base" bgColor="transparent">
                    <IconLibrary shape="open" size="small" />
                    <h1 className="text-m font-bold pl-2">내 라이브러리</h1>
                </Button>
                <div className="ml-auto">
                    <Button size="small" shape="circle" className="flex items-center gap-2 px-4">
                        <IconPlus size="small" close={true} />
                        만들기
                    </Button>
                </div>
            </header>

            {/* 라이브러리 아이템 목록 */}
            <OverlayScrollbarsComponent
                options={libraryScrollbarOptions}
                className="flex-1 px-2"
            >
        {/* 로그인되지 않은 경우 */}
        {!isLoggedIn && !loading && (
            <div className="p-6 flex flex-col items-center justify-center bg-zinc-900 rounded-lg mx-4 my-4">
                <div className="text-white text-lg font-semibold mb-2">
                    첫 번째 플레이리스트를 만드세요.
                </div>
                <div className="text-zinc-400 text-sm mb-6">
                    어렵지 않아요. 저희가 도와드릴게요.
                </div>
                <Button
                    variant="base"
                    size="medium"
                    bgColor="white"
                    className="px-6 py-3 text-sm font-semibold rounded-full hover:scale-105 transition-transform"
                    onClick={() => {
                        console.log('로그인으로 이동');
                        // 로그인 페이지로 이동
                        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                        const loginUrl = isLocal 
                            ? 'https://127.0.0.1:3000/api/auth/login'
                            : '/api/auth/login';
                        window.location.href = loginUrl;
                    }}
                >
                    플레이리스트 만들기
                </Button>
            </div>
        )}

                {/* 로딩 상태 */}
                {loading && isLoggedIn && (
                    <div className="flex items-center justify-center p-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                        <span className="ml-2 text-zinc-400 text-sm">라이브러리 로딩 중...</span>
                    </div>
                )}
                
                {/* 에러 상태 */}
                {error && (
                    <div className="p-4 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* 라이브러리 아이템들 (로그인된 경우에만) */}
                {!loading && isLoggedIn && libraryItems.length > 0 && (
                    libraryItems.map((item) => (
                        <LibraryItemComponent key={item.id} item={item} />
                    ))
                )}

       {/* 로그인되었지만 Spotify 데이터가 비어있는 경우 */}
       {!loading && isLoggedIn && !error && !hasSpotifyData && (
           <div className="p-6 flex flex-col items-center justify-center bg-zinc-900 rounded-lg mx-4 my-4">
               <div className="text-white text-lg font-semibold mb-2">
                   첫 번째 플레이리스트를 만드세요.
               </div>
               <div className="text-zinc-400 text-sm mb-6">
                   어렵지 않아요. 저희가 도와드릴게요.
               </div>
               <Button
                   variant="base"
                   size="medium"
                   bgColor="white"
                   className="px-6 py-3 text-sm font-semibold rounded-full hover:scale-105 transition-transform"
                   onClick={() => {
                       console.log('Spotify에서 플레이리스트 만들기');
                       // Spotify 웹사이트의 플레이리스트 생성 페이지로 이동
                       window.open('https://open.spotify.com/', '_blank');
                   }}
               >
                   Spotify에서 만들기
               </Button>
           </div>
       )}
            </OverlayScrollbarsComponent>
        </nav>
    );
}
