import { NextResponse } from "next/server";

function getCookie(req: Request, name: string) {
    const header = req.headers.get("cookie") || "";
    const m = header.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
}

export async function GET(req: Request) {
    try {
        console.log('Albums API: 요청 시작');
        
        // 쿠키 헤더 전체 확인
        const cookieHeader = req.headers.get("cookie");
        console.log('Albums API: 쿠키 헤더:', cookieHeader);
        
        const at = getCookie(req, "sp_at");
        console.log('Albums API: 액세스 토큰 확인:', at ? `존재함 (길이: ${at.length})` : '없음');
        
        if (!at) {
            console.log('Albums API: 액세스 토큰 없음');
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }

        console.log('Albums API: Spotify API 요청 중...');
        const response = await fetch("https://api.spotify.com/v1/me/albums", {
            headers: { 
                Authorization: `Bearer ${at}`,
                'Content-Type': 'application/json'
            },
            cache: "no-store",
        });

        console.log('Albums API: Spotify API 응답:', {
            status: response.status,
            ok: response.ok,
            statusText: response.statusText
        });

        if (response.status === 401) {
            console.log('Albums API: 토큰 만료');
            return NextResponse.json({ error: "expired" }, { status: 401 });
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Albums API: Spotify API 에러:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`Spotify API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Albums API: 성공적으로 데이터 받음:', {
            total: data?.total || 0,
            count: data?.items?.length || 0
        });
        return NextResponse.json(data);
    } catch (error) {
        console.error('Albums API error:', error);
        return NextResponse.json({ 
            error: "internal_error", 
            message: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
