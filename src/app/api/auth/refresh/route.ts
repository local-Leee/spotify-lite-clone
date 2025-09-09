/**
 * refresh_token으로 access_token 갱신 (선택)
 */
import { NextResponse } from "next/server";

function getCookie(req: Request, name: string) {
    const header = req.headers.get("cookie") || "";
    const m = header.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
}

export async function POST(req: Request) {
    const refresh = getCookie(req, "sp_rt");
    if (!refresh) return NextResponse.json({ error: "missing_refresh" }, { status: 400 });

    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh,
        client_id: process.env.SPOTIFY_CLIENT_ID!,
    });

    const r = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });
    const j = await r.json();
    if (!r.ok) return NextResponse.json({ error: j }, { status: 500 });

    const res = NextResponse.json({ ok: true });
    const secure = process.env.NODE_ENV === "production";
    if (j.access_token) {
        res.cookies.set("sp_at", j.access_token, {
        httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: j.expires_in ?? 3600,
        });
    }
    // refresh_token이 안 올 수도 있으니 기존 유지
    return res;
}
