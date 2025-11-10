'use client';
import { CSS_CLASSES } from '@/lib/style-constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function NowPlayingBar() {
    return (
        <aside id="now-playing-bar" className={cn(CSS_CLASSES.GRID_NOW_PLAYING_BAR, 'now-playing-bar')}>
            <div className='now-playing-bar__left'>
                <div className='now-playing-bar__thumb'>
                    <Image src="https://i.scdn.co/image/ab6761610000f178595920273bdb2f012c48e760" alt="now-playing-bar" width={56} height={56} />
                </div>
                <div>
                    <Link href="/" className='now-playing-bar__title'>

                        <h1>Now Playing</h1>
                    </Link>
                    <Link href="/" className='now-playing-bar__artist'>
                        태민
                    </Link>
                </div>
            </div>
            <div className='now-playing-bar__center'></div>
            <div className='now-playing-bar__right'></div>
        </aside>
    );
}
