import { IconLibrary, IconPlus } from '@/components/icons';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function MyLibrary({ id, className }: { id: string; className: string }) {
    return (
        <nav
            id={id}
            className={cn(
                'w-[420px] bg-(--background-base) h-screen rounded-lg flex-shrink-0',
                className,
            )}
        >
            <header className="flex items-center px-4 py-4">
                <Button shape="base" bgColor="transparent">
                    <IconLibrary shape="open" size="small" />
                    <h1 className="text-m font-bold pl-2">내 라이브러리</h1>
                </Button>
                <div className="ml-auto">
                    <Button size="small" shape="circle" className="flex items-center gap-2 px-4">
                        <IconPlus size="small" close={true} />
                        만들기
                    </Button>
                </div>
            </header>
        </nav>
    );
}
