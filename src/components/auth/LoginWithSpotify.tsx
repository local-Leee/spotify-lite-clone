"use client";

export default function LoginWithSpotify() {
    return (
        <button
        className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-black font-semibold"
        onClick={() => (window.location.href = "/api/auth/login")}
        >
            스포티파이로 로그인
        </button>
    );
}
