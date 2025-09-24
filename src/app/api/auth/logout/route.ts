import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({ success: true });
        
        // 모든 Spotify 관련 쿠키 삭제
        response.cookies.set("sp_at", "", { path: "/", maxAge: 0 });
        response.cookies.set("sp_rt", "", { path: "/", maxAge: 0 });
        response.cookies.set("sp_cv", "", { path: "/", maxAge: 0 });
        response.cookies.set("sp_state", "", { path: "/", maxAge: 0 });
        
        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: "internal_error" }, { status: 500 });
    }
}
