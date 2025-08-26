import IconFriendActivity from '@/components/icons/IconFriendActivity';
import IconHome from '@/components/icons/IconHome';
import IconLibrary from '@/components/icons/IconLibrary';
import IconLogo from '@/components/icons/IconLogo';
import IconTrailing from '@/components/icons/IconTrailing';
import IconView from '@/components/icons/IconView';
import IconWhatNewFeed from '@/components/icons/IconWhatNewFeed';
import Link from 'next/link';

export default function Header() {
    return (
        <header>
            <Link href="/">
                <IconLogo />
            </Link>
            <IconHome shape="line" />
            <IconLibrary shape="open" />
            <IconTrailing />
            <IconFriendActivity />
            <IconWhatNewFeed />
            <IconView />
        </header>
    );
}
