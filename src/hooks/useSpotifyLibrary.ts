"use client";
import { SpotifyAlbumsResponse, SpotifyFollowedArtistsResponse, SpotifyPlaylistsResponse } from '@/types/spotify';
import { useEffect, useState } from 'react';

interface LibraryData {
    playlists: SpotifyPlaylistsResponse | null;
    albums: SpotifyAlbumsResponse | null;
    followedArtists: SpotifyFollowedArtistsResponse | null;
}

export const useSpotifyLibrary = (isLoggedIn: boolean) => {
    const [libraryData, setLibraryData] = useState<LibraryData>({
        playlists: null,
        albums: null,
        followedArtists: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('useSpotifyLibrary: isLoggedIn 상태:', isLoggedIn);
        
        if (!isLoggedIn) {
            console.log('useSpotifyLibrary: 로그인되지 않음, 라이브러리 초기화');
            setLibraryData({ playlists: null, albums: null, followedArtists: null });
            setError(null);
            setLoading(false);
            return;
        }

        const fetchLibraryData = async () => {
            try {
                console.log('useSpotifyLibrary: 라이브러리 데이터 요청 시작');
                setLoading(true);
                setError(null);

                // 플레이리스트, 앨범, 팔로우한 아티스트를 병렬로 요청
                const [playlistsResponse, albumsResponse, followedArtistsResponse] = await Promise.all([
                    fetch('/api/playlists', { credentials: 'include' }),
                    fetch('/api/albums', { credentials: 'include' }),
                    fetch('/api/following', { credentials: 'include' })
                ]);

                console.log('useSpotifyLibrary: API 응답 상태', {
                    playlists: { 
                        status: playlistsResponse.status, 
                        ok: playlistsResponse.ok,
                        url: playlistsResponse.url 
                    },
                    albums: { 
                        status: albumsResponse.status, 
                        ok: albumsResponse.ok,
                        url: albumsResponse.url 
                    },
                    followedArtists: { 
                        status: followedArtistsResponse.status, 
                        ok: followedArtistsResponse.ok,
                        url: followedArtistsResponse.url 
                    }
                });

                let playlistsData = null;
                let albumsData = null;
                let followedArtistsData = null;

                // 플레이리스트 처리
                if (playlistsResponse.ok) {
                    playlistsData = await playlistsResponse.json();
                    console.log('useSpotifyLibrary: 플레이리스트 데이터:', {
                        total: playlistsData?.total || 0,
                        itemCount: playlistsData?.items?.length || 0,
                        firstItem: playlistsData?.items?.[0] || null,
                        rawData: playlistsData
                    });
                } else                 if (playlistsResponse.status === 401) {
                    console.log('useSpotifyLibrary: 플레이리스트 인증 만료');
                    setError('인증이 만료되었습니다.');
                    // 인증 오류 이벤트 발생
                    window.dispatchEvent(new CustomEvent('auth-error'));
                    return;
                } else {
                    console.log('useSpotifyLibrary: 플레이리스트 요청 실패:', playlistsResponse.status);
                }

                // 앨범 처리
                if (albumsResponse.ok) {
                    albumsData = await albumsResponse.json();
                    console.log('useSpotifyLibrary: 앨범 데이터:', {
                        total: albumsData?.total || 0,
                        itemCount: albumsData?.items?.length || 0,
                        firstItem: albumsData?.items?.[0] || null,
                        rawData: albumsData
                    });
                } else                 if (albumsResponse.status === 401) {
                    console.log('useSpotifyLibrary: 앨범 인증 만료');
                    setError('인증이 만료되었습니다.');
                    // 인증 오류 이벤트 발생
                    window.dispatchEvent(new CustomEvent('auth-error'));
                    return;
                } else {
                    console.log('useSpotifyLibrary: 앨범 요청 실패:', albumsResponse.status);
                }

                // 팔로우한 아티스트 처리
                if (followedArtistsResponse.ok) {
                    followedArtistsData = await followedArtistsResponse.json();
                    console.log('useSpotifyLibrary: 팔로우한 아티스트 데이터:', {
                        total: followedArtistsData?.artists?.total || 0,
                        itemCount: followedArtistsData?.artists?.items?.length || 0,
                        firstItem: followedArtistsData?.artists?.items?.[0] || null,
                        rawData: followedArtistsData
                    });
                } else                 if (followedArtistsResponse.status === 401) {
                    console.log('useSpotifyLibrary: 팔로우한 아티스트 인증 만료');
                    setError('인증이 만료되었습니다.');
                    // 인증 오류 이벤트 발생
                    window.dispatchEvent(new CustomEvent('auth-error'));
                    return;
                } else {
                    console.log('useSpotifyLibrary: 팔로우한 아티스트 요청 실패:', followedArtistsResponse.status);
                }

                const finalData = {
                    playlists: playlistsData,
                    albums: albumsData,
                    followedArtists: followedArtistsData
                };
                
                console.log('useSpotifyLibrary: 최종 라이브러리 데이터 설정:', finalData);
                setLibraryData(finalData);

            } catch (err) {
                console.error('라이브러리 데이터 가져오기 오류:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                console.log('useSpotifyLibrary: 로딩 완료');
                setLoading(false);
            }
        };

        fetchLibraryData();
    }, [isLoggedIn]);

    return { libraryData, loading, error };
};
