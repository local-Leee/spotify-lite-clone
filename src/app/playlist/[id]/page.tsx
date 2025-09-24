"use client";
import PlaylistDetail from '@/components/layouts/PlaylistDetail';
import { use } from 'react';

interface PlaylistPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function PlaylistPage({ params }: PlaylistPageProps) {
    const { id } = use(params);
    
    return (
        <PlaylistDetail 
            playlistId={id}
            className="h-full"
        />
    );
}
