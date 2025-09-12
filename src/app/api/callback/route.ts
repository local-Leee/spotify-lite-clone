// app/api/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

function getCookie(req: Request, name: string) {
    const header = req.headers.get("cookie") || "";
    const m = header.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (!code) return NextResponse.json({ error: "missing_code" }, { status: 400 });

    const cookieState = getCookie(req, "sp_state");
    if (!cookieState || cookieState !== state) {
        return NextResponse.json({ error: "state_mismatch" }, { status: 400 });
    }
    const verifier = getCookie(req, "sp_cv");
    if (!verifier) return NextResponse.json({ error: "missing_verifier" }, { status: 400 });

    // authorize 때 보낸 redirect_uri와 **완전히 동일**해야 함
    const proto = req.headers.get("x-forwarded-proto") ?? "http";
    const host = req.headers.get("host")!;
    const redirectUri = `${proto}://${host}/api/callback`;

    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,                  // ← 동일 값
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        code_verifier: verifier,
    });

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });
    const data = await tokenRes.json();
    if (!tokenRes.ok) {
        console.error("TOKEN_ERR:", tokenRes.status, data);
        return NextResponse.json({ error: data }, { status: 500 });
    }

    const res = NextResponse.redirect("/");
    const secure = (proto === "https");
    res.cookies.set("sp_at", data.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: data.expires_in ?? 3600 });
    if (data.refresh_token) {
        res.cookies.set("sp_rt", data.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
    }
    res.cookies.set("sp_cv", "", { path: "/", maxAge: 0 });
    res.cookies.set("sp_state", "", { path: "/", maxAge: 0 });
    return res;
    }
