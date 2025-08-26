import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import TabList from '@/components/ui/Tab/TabList';
import Card from '@/components/ui/Card/Card';

export default function Home() {
    return (
        <div className="bg-(--background-base) h-screen rounded-lg relative overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-[256px] bg-gradient-to-t from-[rgba(83,83,83,.6) 0] via-[var(--background-base) 100%] to-[var(--background-noise)] transition-background-color duration-1000 ease"></div>
            <TabList className="sticky top-0 z-10 w-full h-12 bg-transparent text-(--text-base) px-6"/>
            <div className="sr-only">
                <h1 className="text-m font-bold">내 라이브러리</h1>
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between px-6">
                    <h2 className="text-2xl font-bold">K-Pop 활동</h2>                
                    <Button variant="text" size="small">모두 표시</Button>
                </div>
                <div className="overflow-x-auto w-full">
                    <ul className="flex gap-4 mt-4 whitespace-nowrap pl-6 pr-6 min-w-max">
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                        <li>
                            <Card />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
