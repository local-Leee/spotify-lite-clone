// app/api/auth/login/route.ts
import { generateCodeChallenge, generateCodeVerifier } from "@/lib/pkce";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const proto = req.headers.get("x-forwarded-proto") ?? "http";
    const host = req.headers.get("host")!;
    const redirectUri = `${proto}://${host}/api/callback`; // ← 현재 도메인 기준

    const scope = [
        "user-read-email",
        "user-read-private",
        // 필요시 추가
    ].join(" ");

    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    const state = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,                 // ← 동적 값
        scope,
        code_challenge_method: "S256",
        code_challenge: challenge,
        state,
    });

    const res = NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
    const secure = (proto === "https");
    res.cookies.set("sp_cv", verifier, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 600 });
    res.cookies.set("sp_state", state,   { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 600 });
    
    return res;
}
