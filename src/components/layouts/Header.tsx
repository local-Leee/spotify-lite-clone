import Link from 'next/link';
import IconHome from '@/components/icons/icon-home';
import IconLogo from '@/components/icons/icon-logo';

export default function Header() {
    return (
        <header>
            <Link href="/">
                <IconLogo />
            </Link>
            <IconHome />
        </header>
    );
}
