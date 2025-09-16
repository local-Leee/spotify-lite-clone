// app/api/callback/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const jar = await cookies();
    const cookieState = jar.get("sp_state")?.value;
    const verifier = jar.get("sp_cv")?.value;

    if (!code) return NextResponse.json({ error: "missing_code" }, { status: 400 });
    if (!cookieState || cookieState !== state) {
        return NextResponse.json({ error: "state_mismatch" }, { status: 400 });
    }
    if (!verifier) return NextResponse.json({ error: "missing_verifier" }, { status: 400 });

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: verifier,
        }),
    });

    const data = await tokenRes.json();
    if (!tokenRes.ok) {
        console.error("TOKEN_ERR:", tokenRes.status, data);
        return NextResponse.json({ error: "token_failed", detail: data }, { status: tokenRes.status });
    }

    const res = NextResponse.redirect("/");
    const secure = true; // Vercel prod는 https
    res.cookies.set("sp_at", data.access_token, { httpOnly: true, sameSite: "lax", path: "/", secure, maxAge: data.expires_in ?? 3600 });
    if (data.refresh_token) {
        res.cookies.set("sp_rt", data.refresh_token, { httpOnly: true, sameSite: "lax", path: "/", secure, maxAge: 60 * 60 * 24 * 30 });
    }
    // 일회용 쿠키 정리
    res.cookies.set("sp_cv", "", { path: "/", maxAge: 0 });
    res.cookies.set("sp_state", "", { path: "/", maxAge: 0 });
    return res;
}
