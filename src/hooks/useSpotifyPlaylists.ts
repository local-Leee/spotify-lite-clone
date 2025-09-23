"use client";
import { SpotifyPlaylistsResponse } from '@/types/spotify';
import { useEffect, useState } from 'react';

export const useSpotifyPlaylists = (isLoggedIn: boolean) => {
    const [playlists, setPlaylists] = useState<SpotifyPlaylistsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('useSpotifyPlaylists: isLoggedIn 상태:', isLoggedIn);
        
        if (!isLoggedIn) {
            console.log('useSpotifyPlaylists: 로그인되지 않음, 플레이리스트 초기화');
            setPlaylists(null);
            setError(null);
            setLoading(false);
            return;
        }

        const fetchPlaylists = async () => {
            try {
                console.log('useSpotifyPlaylists: 플레이리스트 요청 시작');
                setLoading(true);
                setError(null);

                const response = await fetch('/api/playlists', {
                    credentials: 'include'
                });

                console.log('useSpotifyPlaylists: 플레이리스트 API 응답:', response.status, response.ok);

                if (response.ok) {
                    const data = await response.json();
                    console.log('useSpotifyPlaylists: 플레이리스트 데이터:', data);
                    setPlaylists(data);
                } else if (response.status === 401) {
                    console.log('useSpotifyPlaylists: 인증 만료');
                    setError('인증이 만료되었습니다.');
                    setPlaylists(null);
                } else {
                    throw new Error('플레이리스트를 가져오는데 실패했습니다.');
                }
            } catch (err) {
                console.error('플레이리스트 가져오기 오류:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                console.log('useSpotifyPlaylists: 로딩 완료');
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [isLoggedIn]);

    return { playlists, loading, error };
};
