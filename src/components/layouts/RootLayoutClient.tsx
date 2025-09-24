'use client';
import Header from '@/components/layouts/Header';
import MyLibrary from '@/components/layouts/MyLibrary';
import { cn } from '@/lib/utils';
import type { PartialOptions } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

const baseTheme = 'base-dark-theme';

const mainScrollbarOptions: PartialOptions = {
    scrollbars: {
        autoHide: 'never',
        theme: 'os-theme-dark',
        visibility: 'visible',
    },
    overflow: {
        x: 'hidden',
    },
};

interface RootLayoutClientProps {
    children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
    return (
        <html lang="ko">
            <body className={cn(baseTheme, 'overflow-hidden')}>
                <div id="main" className="grid-layout">
                    <Header id="global-nav" className="grid-global-nav" />
                    <MyLibrary id="left-sidebar" className="grid-left-sidebar" />
                    <OverlayScrollbarsComponent
                        options={mainScrollbarOptions}
                        className="grid-main-view h-full rounded-lg relative overflow-hidden overflow-y-auto scroll-smooth bg-[var(--background-base)]"
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
