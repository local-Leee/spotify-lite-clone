// app/api/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

function getCookie(req: Request, name: string) {
    const m = (req.headers.get("cookie") || "").match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const cookieState = getCookie(req, "sp_state");
    const verifier = getCookie(req, "sp_cv");

    // ✅ 디버그 모드: ?debug=1 붙이면 내부 상태 바로 반환
    if (url.searchParams.get("debug") === "1") {
        return NextResponse.json({
        code,
        state,
        cookieState,
        hasVerifier: Boolean(verifier),
        redirectUri: `${req.headers.get("x-forwarded-proto") ?? "https"}://${req.headers.get("host")}/api/callback`,
        });
    }

    if (!code) return NextResponse.json({ error: "missing_code" }, { status: 400 });
    if (!cookieState || cookieState !== state) return NextResponse.json({ error: "state_mismatch" }, { status: 400 });
    if (!verifier) return NextResponse.json({ error: "missing_verifier" }, { status: 400 });

    const proto = req.headers.get("x-forwarded-proto") ?? "https";
    const host = req.headers.get("host")!;
    const redirectUri = `${proto}://${host}/api/callback`;

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        code_verifier: verifier,
        }),
    });

    const data = await tokenRes.json();
    if (!tokenRes.ok) {
        console.error("TOKEN_ERR:", tokenRes.status, data);
        return NextResponse.json({ error: "token_failed", detail: data }, { status: tokenRes.status });
    }

    const res = NextResponse.redirect("/");
    const secure = proto === "https";
    res.cookies.set("sp_at", data.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: data.expires_in ?? 3600 });
    if (data.refresh_token) {
        res.cookies.set("sp_rt", data.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    }
    res.cookies.set("sp_cv", "", { path: "/", maxAge: 0 });
    res.cookies.set("sp_state", "", { path: "/", maxAge: 0 });
    return res;
}
