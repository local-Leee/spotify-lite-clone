import { NextResponse } from "next/server";

function getCookie(req: Request, name: string) {
    const header = req.headers.get("cookie") || "";
    const m = header.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
}

export async function GET(req: Request) {
    const at = getCookie(req, "sp_at");
    if (!at) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const r = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${at}` },
        cache: "no-store",
    });

    if (r.status === 401) {
        return NextResponse.json({ error: "expired" }, { status: 401 });
    }

    const me = await r.json();
    return NextResponse.json(me);
}
