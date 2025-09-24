"use client";
import { DropdownItem } from '@/components/ui/Dropdown';

export const useUserDropdown = (options?: {
    onLogout?: () => void;
}) => {
    const handleProfileClick = () => {
        console.log('프로필 페이지로 이동');
        // TODO: 프로필 페이지 라우팅 구현
    };

    const handleSettingsClick = () => {
        console.log('설정 페이지로 이동');
        // TODO: 설정 페이지 라우팅 구현
    };

    const handleLogout = async () => {
        try {
            // 서버에서 쿠키 삭제를 위한 로그아웃 요청
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            
            // 사용자 정의 로그아웃 후 처리가 있으면 실행
            if (options?.onLogout) {
                options.onLogout();
            } else {
                // 기본값: 홈페이지로 리다이렉트
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const homeUrl = isLocal 
                    ? 'https://127.0.0.1:3000/'
                    : '/';
                window.location.href = homeUrl;
            }
        } catch (error) {
            console.error('로그아웃 오류:', error);
            // 오류가 발생해도 사용자 정의 처리 실행
            if (options?.onLogout) {
                options.onLogout();
            }
        }
    };

    const dropdownItems: DropdownItem[] = [
        {
            id: 'profile',
            label: '프로필',
            onClick: handleProfileClick
        },
        {
            id: 'settings',
            label: '설정',
            onClick: handleSettingsClick
        },
        {
            id: 'logout',
            label: '로그아웃',
            onClick: handleLogout,
            separator: true
        }
    ];

    return {
        dropdownItems,
        handleProfileClick,
        handleSettingsClick,
        handleLogout
    };
};
