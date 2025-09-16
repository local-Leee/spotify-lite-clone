// app/api/auth/login/route.ts
import crypto from "crypto";
import { NextResponse } from "next/server";

const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!; // 예: https://dev-spotify.../api/callback
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;

const b64url = (buf: Buffer) =>
    buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/,"");

    export async function GET() {
    const state = crypto.randomBytes(12).toString("hex");
    const verifier = b64url(crypto.randomBytes(32));
    const challenge = b64url(crypto.createHash("sha256").update(verifier).digest());

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        code_challenge_method: "S256",
        code_challenge: challenge,
        state,
        scope: "user-read-email", // 필요 스코프 추가
    });

    const res = NextResponse.redirect(
        "https://accounts.spotify.com/authorize?" + params.toString()
    );
    // 콜백에서 읽을 쿠키
    res.cookies.set("sp_state", state, { httpOnly: true, sameSite: "lax", path: "/" });
    res.cookies.set("sp_cv", verifier, { httpOnly: true, sameSite: "lax", path: "/" });
    return res;
}
