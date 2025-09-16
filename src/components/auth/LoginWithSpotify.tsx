"use client";
import { Button } from "../ui/Button/Button";


export default function LoginWithSpotify({ className }: { className: string }) {
    return (
        <Button shape="circle" bgColor="white" variant="scaleWhite" size="medium" onClick={() => (window.location.href = "/api/auth/login")} className={className}>
            로그인하기
        </Button>
    );
}
