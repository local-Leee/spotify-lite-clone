import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");

        console.log('Callback received:', { code: !!code, state: !!state });

        const jar = await cookies();
        const cookieState = jar.get("sp_state")?.value;
        const verifier    = jar.get("sp_cv")?.value;

        console.log('Cookies:', { 
            cookieState: !!cookieState, 
            verifier: !!verifier,
            stateMatch: cookieState === state 
        });

        if (!code) return NextResponse.json({ error: "missing_code" }, { status: 400 });
        if (!cookieState || cookieState !== state) return NextResponse.json({ error: "state_mismatch" }, { status: 400 });
        if (!verifier) return NextResponse.json({ error: "missing_verifier" }, { status: 400 });

        // 동적으로 redirect URI 생성 (login과 동일한 로직)
        const origin = url.origin;
        const redirectOrigin = origin.includes('localhost') 
            ? origin.replace('localhost', '127.0.0.1')
            : origin;
        const redirectUri = `${redirectOrigin}/api/callback`;

        console.log('Environment variables:', {
            redirectUri,
            CLIENT_ID: !!CLIENT_ID
        });

        const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
                client_id: CLIENT_ID,
                code_verifier: verifier,
            }),
        });

        const data = await tokenRes.json();
        console.log('Token response:', { ok: tokenRes.ok, status: tokenRes.status, data });
        
        if (!tokenRes.ok) return NextResponse.json({ error: "token_failed", detail: data }, { status: tokenRes.status });

        const baseUrl = new URL(req.url).origin;
        // 로컬 환경에서 localhost로 접근했을 때 127.0.0.1로 리다이렉트
        const finalOrigin = baseUrl.includes('localhost') 
            ? baseUrl.replace('localhost', '127.0.0.1')
            : baseUrl;
        const res = NextResponse.redirect(new URL("/", finalOrigin));
        res.cookies.set("sp_at", data.access_token, { httpOnly: true, sameSite: "lax", path: "/", secure: true, maxAge: data.expires_in ?? 3600 });
        if (data.refresh_token) {
            res.cookies.set("sp_rt", data.refresh_token, { httpOnly: true, sameSite: "lax", path: "/", secure: true, maxAge: 60 * 60 * 24 * 30 });
        }
        res.cookies.set("sp_cv", "", { path: "/", maxAge: 0 });
        res.cookies.set("sp_state", "", { path: "/", maxAge: 0 });
        return res;
    } catch (error) {
        console.error('Callback error:', error);
        return NextResponse.json({ 
            error: "internal_error", 
            message: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
