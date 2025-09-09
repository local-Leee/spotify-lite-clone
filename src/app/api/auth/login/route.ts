/**
 * authorize로 리다이렉트트
 */
import { generateCodeChallenge, generateCodeVerifier } from "@/lib/pkce";
import { NextResponse } from "next/server";

export async function GET() {
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;
    const scope = [
        "user-read-email",
        "user-read-private",
        // 필요 시: "streaming","user-read-playback-state","user-modify-playback-state","playlist-modify-private"
    ].join(" ");

    // PKCE 준비
    const verifier = await generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    const state = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
        scope,
        code_challenge_method: "S256",
        code_challenge: challenge,
        state,
    });

    const res = NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);

    // httpOnly 쿠키에 보관 (클라 JS에서 접근 불가)
    const secure = process.env.NODE_ENV === "production";
    res.cookies.set("sp_cv", verifier, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 600 });
    res.cookies.set("sp_state", state,   { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 600 });

    return res;
}
