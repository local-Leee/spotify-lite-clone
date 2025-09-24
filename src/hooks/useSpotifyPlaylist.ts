"use client";
import { SpotifyPlaylistDetail } from '@/types/spotify';
import { useEffect, useState } from 'react';

export const useSpotifyPlaylist = (playlistId: string | null) => {
    const [playlist, setPlaylist] = useState<SpotifyPlaylistDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!playlistId) {
            setPlaylist(null);
            setError(null);
            setLoading(false);
            return;
        }

        const fetchPlaylist = async () => {
            try {
                console.log('useSpotifyPlaylist: 플레이리스트 요청 시작:', playlistId);
                setLoading(true);
                setError(null);

                const response = await fetch(`/api/playlists/${playlistId}`, {
                    credentials: 'include'
                });

                console.log('useSpotifyPlaylist: API 응답 상태:', {
                    status: response.status,
                    ok: response.ok,
                    url: response.url
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        setError('인증이 만료되었습니다.');
                        return;
                    }
                    throw new Error(`플레이리스트를 가져올 수 없습니다: ${response.status}`);
                }

                const playlistData = await response.json();
                console.log('useSpotifyPlaylist: 플레이리스트 데이터:', {
                    id: playlistData.id,
                    name: playlistData.name,
                    trackCount: playlistData.tracks?.total || 0,
                    itemCount: playlistData.tracks?.items?.length || 0
                });

                setPlaylist(playlistData);

            } catch (err) {
                console.error('플레이리스트 가져오기 오류:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                console.log('useSpotifyPlaylist: 로딩 완료');
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [playlistId]);

    return { playlist, loading, error };
};
