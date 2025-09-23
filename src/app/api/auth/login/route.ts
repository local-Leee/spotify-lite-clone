import { generateCodeChallenge, generateCodeVerifier } from "@/lib/pkce";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;

export async function GET(req: NextRequest) {
    try {
        const codeVerifier = await generateCodeVerifier(128);
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        const state = await generateCodeVerifier(16);
        const scope = 'user-read-private user-read-email';

        // 요청 URL에 따라 동적으로 redirect URI 생성
        const url = new URL(req.url);
        const origin = url.origin;
        // 로컬 환경에서 localhost로 접근했을 때 127.0.0.1로 변경
        const redirectOrigin = origin.includes('localhost') 
            ? origin.replace('localhost', '127.0.0.1')
            : origin;
        const redirectUri = `${redirectOrigin}/api/callback`;

        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: redirectUri,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            state
        });

        const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
        
        const response = NextResponse.redirect(authUrl);
        
        // 쿠키에 state와 code_verifier 저장
        response.cookies.set('sp_state', state, { 
            httpOnly: true, 
            sameSite: 'lax', 
            path: '/', 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 600 // 10분
        });
        response.cookies.set('sp_cv', codeVerifier, { 
            httpOnly: true, 
            sameSite: 'lax', 
            path: '/', 
            secure: process.env.NODE_ENV === 'production',
            maxAge: 600 // 10분
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
