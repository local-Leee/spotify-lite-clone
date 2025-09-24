import { NextResponse } from "next/server";

function getCookie(req: Request, name: string) {
    const header = req.headers.get("cookie") || "";
    const m = header.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
}

export async function GET(req: Request) {
    try {
        const at = getCookie(req, "sp_at");
        if (!at) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }

        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: { 
                Authorization: `Bearer ${at}`,
                'Content-Type': 'application/json'
            },
            cache: "no-store",
        });

        if (response.status === 401) {
            return NextResponse.json({ error: "expired" }, { status: 401 });
        }

        if (!response.ok) {
            throw new Error(`Spotify API error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Playlists API error:', error);
        return NextResponse.json({ 
            error: "internal_error", 
            message: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
