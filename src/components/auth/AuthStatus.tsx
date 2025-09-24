"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useUserDropdown } from "../../hooks/useUserDropdown";
import { UserProfile } from "../../types/spotify";
import { Button } from "../ui/Button/Button";
import { Dropdown } from "../ui/Dropdown";



export default function AuthStatus({ className }: { className: string }) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { triggerAuthError } = useAuthRedirect();
    
    const { dropdownItems } = useUserDropdown({
        onLogout: () => {
            setProfile(null);
            
            // 커스텀 로그아웃 이벤트 발생 (MyLibrary에서 감지)
            window.dispatchEvent(new CustomEvent('spotify-logout'));
            
            // 플레이리스트 페이지에서 로그아웃하면 메인 페이지로 이동
            if (pathname.startsWith('/playlist/')) {
                router.push('/');
            } else {
                // 다른 페이지에서는 현재 페이지 새로고침
                window.location.reload();
            }
        }
    });
    
    useEffect(() => {
        // 서버에서 사용자 정보 가져오기
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/me', {
                    credentials: 'include' // 쿠키 포함
                });
                
                if (response.ok) {
                    const userData = await response.json();
                    setProfile(userData);
                } else if (response.status === 401) {
                    // 인증되지 않은 상태
                    setProfile(null);
                    // 인증이 필요한 페이지에서 401 오류 시 메인으로 이동
                    if (pathname.startsWith('/playlist/')) {
                        triggerAuthError();
                    }
                } else {
                    throw new Error('프로필 데이터를 가져오는데 실패했습니다.');
                }
            } catch (err) {
                console.error('프로필 데이터 가져오기 오류:', err);
                setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
    
    const handleLogin = () => {
        // 로컬 개발 환경에서는 127.0.0.1 사용, 그 외에는 상대경로 사용
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const loginUrl = isLocal 
            ? 'https://127.0.0.1:3000/api/auth/login'
            : '/api/auth/login';
        window.location.href = loginUrl;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={className}>
                <Button shape="circle" bgColor="white" variant="scaleWhite" size="medium" onClick={handleLogin}>
                    로그인하기
                </Button>
            </div>
        );
    }

    const baseStyle = "px-4";

    return (
        <div className={className}>
            {!profile ? (
                <Button shape="circle" bgColor="white" variant="scaleWhite" size="medium" className={baseStyle} onClick={handleLogin}>
                    로그인하기
                </Button>
            ) : (
                <div className="flex items-center space-x-2">
                    <Dropdown
                        items={dropdownItems}
                        trigger={
                            profile.images && profile.images.length > 0 ? (
                                <Button
                                    size="medium"
                                    shape="circle"
                                    variant="scale"
                                    className="hover:brightness-100"
                                    title={`${profile.display_name || profile.id}님의 프로필`}
                                >
                                    <Image 
                                        src={profile.images[0].url} 
                                        alt="profile" 
                                        width={32} 
                                        height={32} 
                                        className="rounded-full"
                                    />
                                </Button>
                            ) : (
                                <Button
                                    shape="circle"
                                    bgColor="white"
                                    variant="scaleWhite"
                                    size="small"
                                    className={cn(baseStyle, "text-xs")}
                                    title={`${profile.display_name || profile.id}님의 메뉴`}
                                >
                                    계정
                                </Button>
                            )
                        }
                        position="right"
                    />
                </div>
            )}
        </div>
    );
}
