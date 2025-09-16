'use client';

import { IconFriendActivity, IconHome, IconLogo, IconSearch, IconTrailing, IconWhatNewFeed } from '@/components/icons';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoginWithSpotify from '../auth/LoginWithSpotify';


export default function Header({ id, className }: { id: string; className: string }) {
    const [isCompact, setIsCompact] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const searchSectionRef = useRef<HTMLDivElement>(null);
    const rightSectionRef = useRef<HTMLDivElement>(null);

    /**
     * 검색바와 오른쪽 컨텐츠 간의 충돌을 감지하여 레이아웃 모드를 결정
     * - 일반 모드: 검색바가 브라우저 화면 중앙에 위치
     * - 컴팩트 모드: 검색바가 왼쪽 정렬로 전환
     */
    const checkCollision = useCallback(() => {
        if (!rightSectionRef.current || !searchSectionRef.current) {
            return;
        }

        const rightRect = rightSectionRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const searchBarWidth = 538; // 홈버튼 + 검색폼 전체 너비
        
        // 검색바가 화면 중앙에 있을 때의 위치 계산
        const searchBarLeft = (viewportWidth - searchBarWidth) / 2;
        const searchBarRight = searchBarLeft + searchBarWidth;
        
        // 검색바와 오른쪽 컨텐츠 사이의 거리 계산
        const gap = rightRect.left - searchBarRight;
        
        // 여백이 30px 이하가 되면 컴팩트 모드로 전환
        setIsCompact(gap <= 30);
    }, []);

    useEffect(() => {
        checkCollision();

        const handleResize = () => {
            setTimeout(checkCollision, 10);
        };

        const observer = new MutationObserver(() => {
            setTimeout(checkCollision, 10);
        });

        window.addEventListener('resize', handleResize);
        
        if (rightSectionRef.current) {
            observer.observe(rightSectionRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, [checkCollision]);

    return (
        <header 
            id={id} 
            ref={headerRef}
            className={cn(
                'flex items-center relative overflow-visible pr-5',
                className
            )}
        >
            {/* 로고 */}
            <div className="flex-shrink-0 w-[72px] h-[72px] flex items-center justify-center">
                <Link href="/">
                    <IconLogo />
                </Link>
            </div>
            
            {/* 검색바 - 동적 레이아웃 */}
            <div 
                className={cn(
                    "flex items-center gap-4 transition-opacity duration-200  max-w-[546px] w-full",
                    isCompact 
                        ? "flex-1 opacity-100" 
                        : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-100"
                )}
            >
                <div 
                    ref={searchSectionRef}
                    className="flex items-center gap-4 w-full"
                >
                    <Button shape="circle" variant="scale" className="flex-shrink-0">
                        <IconHome active={true} />
                    </Button>
                    <form 
                        action="" 
                        role="search" 
                        className={cn(
                            "relative transition-[width,max-width] duration-300 ease-in-out w-full",
                            isCompact && "mr-4"
                        )}
                    >
                        <div className="absolute left-0 top-0 z-1 w-12 h-12 flex items-center justify-center" title="검색하기">
                            <IconSearch size="small" />
                        </div>
                        <Input
                            type="search"
                            placeholder="어떤 콘텐츠를 감상하고 싶으세요?"
                            id="headerSearch"
                            name="headerSearch"
                            clearable={true}
                        />
                        <div className="absolute right-0 top-1/2 translate-y-[-50%] z-1 w-12 flex items-center justify-center border-l border-(--text-subdued)">
                            <Button size="xsmall" title="둘러보기" className="w-full h-full" bgColor="transparent" asChild>
                                <Link href="/search">
                                    <IconTrailing />
                                </Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* 일반 모드에서 오른쪽 여백 */}
            {!isCompact && <div className="flex-1"></div>}
            
            {/* 오른쪽 컨텐츠 */}
            <div 
                ref={rightSectionRef}
                className="flex items-center gap-4 flex-shrink-0 ml-auto"
            >
                <Button
                    size="small"
                    shape="circle"
                    bgColor="white"
                    variant="scale"
                    className="text-sm font-bold px-4 flex-shrink-0"
                >
                    Premium 둘러보기
                </Button>
                <div className="flex items-center">
                    <Button size="small" bgColor="transparent" variant="scale" className="ml-4" title="새소식">
                        <IconWhatNewFeed />
                    </Button>
                    <Button size="small" bgColor="transparent" variant="scale" className="ml-2" title="친구 피드">
                        <IconFriendActivity />
                    </Button>
                </div>

                <LoginWithSpotify className="font-bold px-4" />
            </div>
        </header>
    );
}
