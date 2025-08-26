import IconHome from '@/components/icons/IconHome';
import IconSearch from '@/components/icons/IconSearch';
import IconLogo from '@/components/icons/IconLogo';
import {Button} from '@/components/ui/Button/Button';
import {Input} from '@/components/ui/Input/Input';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import IconTrailing from '@/components/icons/IconTrailing';
import IconFriendActivity from '@/components/icons/IconFriendActivity';
import IconWhatNewFeed from '../icons/IconWhatNewFeed';

export default function Header() {
    return (
        <header className="flex items-center justify-between py-4 relative">
            <div className="flex-shrink-0">
                <Link href="/">
                    <IconLogo />
                </Link>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 mx-auto absolute left-1/2 -translate-x-1/2">
                <Button shape="circle" variant="scale">
                    <IconHome active={true} />
                </Button>
                <form action="" role="search" className="relative w-[474px]">
                    <Button size="medium" className="absolute left-0 top-0 z-1" title="검색하기">
                        <IconSearch size="small" />
                    </Button>
                    <Input type="search" placeholder="어떤 콘텐츠를 감상하고 싶으세요?" id="headerSearch" name="headerSearch" />
                    <div className="absolute right-0 top-1/2 translate-y-[-50%] z-1 w-12 flex items-center justify-center border-l border-(--text-subdued)">
                        <Button size="xsmall" title="둘러보기" className="w-full h-full">
                            <IconTrailing />
                        </Button>
                    </div>
                </form>
            </div>
            <div className="flex items-center">
                <Button size="small" shape="circle" variant="scale" className="bg-white text-sm text-black font-bold px-4 flex-shrink-0">
                    Premium 둘러보기
                </Button>
                <Button size="small" variant="scale" className="ml-4" title="새소식">
                    <IconWhatNewFeed />
                </Button>
                <Button size="small" variant="scale" className="ml-2" title="친구 피드">
                    <IconFriendActivity />
                </Button>
                <Button size="medium" shape="circle" variant="scale" className="ml-2 hover:brightness-100" title="내 프로필">
                    <span className="text-sm font-bold bg-amber-300 text-black rounded-full w-8 h-8 flex items-center justify-center">
                        널
                    </span>
                </Button>
            </div>
        </header>
    );
}
