import Link from 'next/link';
import IconHome from '@/components/icons/IconHome';
import IconLibrary from '@/components/icons/IconLibrary';
import IconLogo from '@/components/icons/IconLogo';
import IconTrailing from '@/components/icons/IconTrailing';

export default function Header() {
    return (
        <header>
            <Link href="/">
                <IconLogo />
            </Link>
            <IconHome shape="line" />
            <IconLibrary shape="open" />
            <IconTrailing />
        </header>
    );
}
