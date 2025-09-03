import Header from '@/components/layouts/Header';
import MyLibrary from '@/components/layouts/MyLibrary';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';

const baseTheme = 'base-dark-theme';

export const metadata: Metadata = {
    title: 'Spotify – Web Player',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className={cn(baseTheme, 'overflow-hidden')}>
                <div id="main" className="grid-layout">
                    <Header id="global-nav" className="grid-global-nav"/>
                    <MyLibrary id="left-sidebar" className="grid-left-sidebar"/>
                    <main id="main-view" className="grid-main-view">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
