// PKCE verifier / challenge 유틸
// 서버/클라이언트 둘 다 동작 가능한 Web Crypto 사용

function base64UrlEncode(buf: ArrayBuffer) {
    const bytes = new Uint8Array(buf);
    let str = "";
    for (let i = 0; i < bytes.byteLength; i++) str += String.fromCharCode(bytes[i]);
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

  // 43~128자 추천
export async function generateCodeVerifier(length = 64) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    // URL-safe 문자로 변환
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let verifier = "";
    for (let i = 0; i < bytes.length; i++) verifier += charset[bytes[i] % charset.length];
    return verifier;
}

export async function generateCodeChallenge(verifier: string) {
    const data = new TextEncoder().encode(verifier);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(hash);
}