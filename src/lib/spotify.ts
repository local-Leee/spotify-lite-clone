// lib/spotify.ts
let _token: { access_token: string; expires_at: number } | null = null;

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

async function fetchClientToken() {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization:
                'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' }),
        cache: 'no-store',
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`token_failed: ${res.status} ${err}`);
    }
    const json = await res.json();
    // 만료 30초 전으로 버퍼
    const expires_at = Date.now() + (json.expires_in - 30) * 1000;
    return { access_token: json.access_token, expires_at };
}

export async function getAccessToken() {
    if (_token && _token.expires_at > Date.now()) return _token.access_token;

    if (!CLIENT_ID || !CLIENT_SECRET) throw new Error('missing_env SPOTIFY_CLIENT_ID/SECRET');
    _token = await fetchClientToken();
    return _token.access_token;
}

export async function spotifyGet<T = any>(path: string, init?: RequestInit) {
    const token = await getAccessToken();
    const res = await fetch(`https://api.spotify.com/v1${path}`, {
        ...init,
        headers: {
            ...(init?.headers || {}),
            Authorization: `Bearer ${token}`,
        },
        // 데이터는 자주 변하니 기본은 no-store 권장 (필요 시 revalidate 조절)
        cache: 'no-store',
    });
    if (!res.ok) {
        const err = await res.text();
        throw new Error(`spotify_get_failed: ${res.status} ${err}`);
    }
    return (await res.json()) as T;
}
