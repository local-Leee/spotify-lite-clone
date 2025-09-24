"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const handleAuthError = (event: CustomEvent) => {
            console.log('인증 오류 감지, 메인 페이지로 이동');
            router.push('/');
        };

        // 커스텀 인증 오류 이벤트 리스너
        window.addEventListener('auth-error', handleAuthError as EventListener);

        return () => {
            window.removeEventListener('auth-error', handleAuthError as EventListener);
        };
    }, [router]);

    // 인증 오류 이벤트 발생 함수
    const triggerAuthError = () => {
        window.dispatchEvent(new CustomEvent('auth-error'));
    };

    return { triggerAuthError };
};
