import { NextResponse } from 'next/server';

/**
 * 요청에서 쿠키 값을 추출하는 유틸리티 함수
 */
export function getCookie(req: Request, name: string): string | null {
    const match = req.headers.get("cookie")?.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

/**
 * 액세스 토큰 검증 및 추출
 */
export function getAccessToken(req: Request): { token: string | null; response: NextResponse | null } {
    const token = getCookie(req, "sp_at");
    
    if (!token) {
        return {
            token: null,
            response: NextResponse.json({ error: "unauthorized" }, { status: 401 })
        };
    }
    
    return { token, response: null };
}

/**
 * Spotify API 호출 공통 함수
 */
export async function callSpotifyAPI(
    endpoint: string,
    accessToken: string,
    options: RequestInit = {}
): Promise<{ data: any; error: NextResponse | null }> {
    try {
        const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
            cache: "no-store",
            ...options,
        });

        if (response.status === 401) {
            return {
                data: null,
                error: NextResponse.json({ error: "expired" }, { status: 401 })
            };
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Spotify API error for ${endpoint}:`, {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`Spotify API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        console.error(`API call failed for ${endpoint}:`, error);
        return {
            data: null,
            error: NextResponse.json(
                { error: "internal_error", message: error instanceof Error ? error.message : "Unknown error" },
                { status: 500 }
            )
        };
    }
}

/**
 * 토큰 새로고침 함수
 */
export async function refreshAccessToken(refreshToken: string): Promise<{ 
    accessToken: string | null; 
    newRefreshToken?: string; 
    error: NextResponse | null 
}> {
    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                client_id: process.env.SPOTIFY_CLIENT_ID!,
            }),
        });

        if (!response.ok) {
            return {
                accessToken: null,
                error: NextResponse.json({ error: "refresh_failed" }, { status: 401 })
            };
        }

        const data = await response.json();
        return {
            accessToken: data.access_token,
            newRefreshToken: data.refresh_token,
            error: null
        };
    } catch (error) {
        console.error('Token refresh failed:', error);
        return {
            accessToken: null,
            error: NextResponse.json({ error: "refresh_error" }, { status: 500 })
        };
    }
}
