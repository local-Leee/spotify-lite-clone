'use client';
import Header from '@/components/layouts/Header';
import MyLibrary from '@/components/layouts/MyLibrary';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { mainScrollbarOptions } from '@/lib/scrollbar-config';
import { CSS_CLASSES, CSS_VARIABLES, THEMES } from '@/lib/style-constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { useEffect, useRef } from 'react';
import Footer from './Footer';

interface RootLayoutClientProps {
    children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
    // 전역 인증 리다이렉트 설정
    useAuthRedirect();
    
    const pathname = usePathname();
    const scrollContainerRef = useRef<any>(null);
    
    // 페이지 이동 시 스크롤을 맨 위로 리셋
    useEffect(() => {
        const resetScroll = () => {
            // OverlayScrollbars 사용
            if (scrollContainerRef.current) {
                const osInstance = scrollContainerRef.current.osInstance();
                if (osInstance) {
                    const viewport = osInstance.elements().viewport;
                    viewport.scrollTop = 0;
                    
                    // 스크롤 이벤트 강제 발생 (sticky 헤더 상태 리셋)
                    setTimeout(() => {
                        const customEvent = new CustomEvent('playlist-scroll', {
                            detail: { scrollTop: 0 }
                        });
                        window.dispatchEvent(customEvent);
                    }, 50);
                    return;
                }
            }
            
            // DOM 쿼리로 직접 찾기
            const viewport = document.querySelector('.os-viewport');
            if (viewport) {
                viewport.scrollTop = 0;
                return;
            }
            
            // window 스크롤 (fallback)
            window.scrollTo(0, 0);
        };
        
        // 약간의 지연을 두고 실행 (페이지 렌더링 완료 후)
        const timer = setTimeout(resetScroll, 50);
        
        return () => clearTimeout(timer);
    }, [pathname]);
    
    return ( 
        <div className={cn(THEMES.BASE_DARK, CSS_CLASSES.OVERFLOW_HIDDEN)}>
            <div id="main" className={CSS_CLASSES.GRID_LAYOUT}>
                <Header id="global-nav" className={CSS_CLASSES.GRID_GLOBAL_NAV} />
                <MyLibrary id="left-sidebar" className={CSS_CLASSES.GRID_LEFT_SIDEBAR} />
                <main id="main-view" className="h-full">
                    <div className={cn(
                        CSS_CLASSES.GRID_MAIN_VIEW,
                        CSS_CLASSES.H_FULL,
                        CSS_CLASSES.ROUNDED_LG,
                        'relative mr-1',
                        `bg-[${CSS_VARIABLES.BACKGROUND_BASE}]`
                    )}>
                        <OverlayScrollbarsComponent
                            ref={scrollContainerRef}
                            options={mainScrollbarOptions}
                            events={{
                                scroll: (instance, event) => {
                                    const { target } = event;
                                    const scrollTop = (target as HTMLElement).scrollTop;
                                    
                                    // 플레이리스트 페이지에서 스크롤 이벤트 발생
                                    const customEvent = new CustomEvent('playlist-scroll', {
                                        detail: { scrollTop }
                                    });
                                    window.dispatchEvent(customEvent);
                                }
                            }}
                            className="h-full overflow-hidden"
                        >
                                {children}
                                <Footer />
                        </OverlayScrollbarsComponent>
                    </div>
                </main>
            </div>
        </div>
    );
}
