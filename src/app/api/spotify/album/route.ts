import { spotifyGet } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);

        // Spotify API 파라미터 정리
        const params = new URLSearchParams();

        // seed_* 파라미터 (최소 1개, 총합 최대 5개)
        const seed_genres = url.searchParams.get('seed_genres');
        const seed_artists = url.searchParams.get('seed_artists');
        const seed_tracks = url.searchParams.get('seed_tracks');
        if (seed_genres) params.set('seed_genres', seed_genres);
        if (seed_artists) params.set('seed_artists', seed_artists);
        if (seed_tracks) params.set('seed_tracks', seed_tracks);

        // 옵션 파라미터
        const limit = url.searchParams.get('limit') || '20';
        const market = url.searchParams.get('market') || 'KR';
        params.set('limit', limit);
        params.set('market', market);

        const data = await spotifyGet(`/recommendations?${params.toString()}`);
        console.log(data.genres);
        return NextResponse.json(data);
    } catch (e: any) {
        // 🔥 서버 콘솔에 원인 찍기
        console.error('RECS_ROUTE_ERR:', e?.message || e);
        // 🔥 클라에도 원문 전달(디버그용)
        return NextResponse.json({ error: e?.message || 'unknown' }, { status: 500 });
    }
}
