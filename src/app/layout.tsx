import RootLayoutClient from '@/components/layouts/RootLayoutClient';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Spotify – Web Player',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <RootLayoutClient>{children}</RootLayoutClient>;
}
