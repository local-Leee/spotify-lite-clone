'use client';
import Card from '@/components/ui/Card/Card';
import type { PartialOptions } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { useEffect, useState } from 'react';
import { Button } from '../ui/Button/Button';

type Track = {
    id: string;
    name: string;
    artists: { id: string; name: string }[];
    album: { images: { url: string }[] };
};


const cardSectionScrollbarOptions: PartialOptions = {
    scrollbars: {
        autoHide: 'never',
        theme: 'os-theme-light',
        visibility: 'hidden',
    },
    overflow: {
        y: 'hidden',
    },

};

export default function CardSection() {
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        fetch('/api/spotify/recommendations?seed_genres=k-pop&limit=8')
            .then((r) => r.json())
            .then((d) => setTracks(d.tracks ?? []))
            .catch(console.error);
    }, []);

    if (!tracks.length) return null;

    return (
        <OverlayScrollbarsComponent options={cardSectionScrollbarOptions} className="p-6">
            <div className="flex items-end justify-between px-6">
                <h2 className="text-2xl font-bold">들어볼 만한 음악</h2>
                <Button variant="text" size="small" className="font-bold text-(--text-subdued)">
                    모두 표시
                </Button>
            </div>
            <div className="w-full">
                <ul className="inline-flex gap-4 mt-4 pl-6 pr-6 whitespace-nowrap">
                    {tracks.map((t) => (
                        <li key={t.id}>
                            <Card
                                title={t.name}
                                links={t.artists.map((a) => ({
                                    href: `/artist/${a.id}`,
                                    label: a.name,
                                }))}
                                thumbUrl={t.album.images?.[0]?.url}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </OverlayScrollbarsComponent>
    );
}
