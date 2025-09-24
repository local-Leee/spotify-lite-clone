'use client';
import Header from '@/components/layouts/Header';
import MyLibrary from '@/components/layouts/MyLibrary';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { mainScrollbarOptions } from '@/lib/scrollbar-config';
import { CSS_CLASSES, CSS_VARIABLES, THEMES } from '@/lib/style-constants';
import { cn } from '@/lib/utils';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

interface RootLayoutClientProps {
    children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
    // 전역 인증 리다이렉트 설정
    useAuthRedirect();
    
    return (
        <html lang="ko">
            <body className={cn(THEMES.BASE_DARK, CSS_CLASSES.OVERFLOW_HIDDEN)}>
                <div id="main" className={CSS_CLASSES.GRID_LAYOUT}>
                    <Header id="global-nav" className={CSS_CLASSES.GRID_GLOBAL_NAV} />
                    <MyLibrary id="left-sidebar" className={CSS_CLASSES.GRID_LEFT_SIDEBAR} />
                    <OverlayScrollbarsComponent
                        options={mainScrollbarOptions}
                        className={cn(
                            CSS_CLASSES.GRID_MAIN_VIEW,
                            CSS_CLASSES.H_FULL,
                            CSS_CLASSES.ROUNDED_LG,
                            'relative overflow-hidden overflow-y-auto scroll-smooth mr-1',
                            `bg-[${CSS_VARIABLES.BACKGROUND_BASE}]`
                        )}
                    >
                        <main id="main-view" className="h-full">
                            {children}
                        </main>
                    </OverlayScrollbarsComponent>
                </div>
            </body>
        </html>
    );
}
