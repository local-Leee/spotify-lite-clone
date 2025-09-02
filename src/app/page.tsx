import Recommendations from '@/components/card/Recommendations';
import { Button } from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import TabItem from '@/components/ui/Tab/TabItem';
import TabList from '@/components/ui/Tab/TabList';
import TabPanel from '@/components/ui/Tab/TabPanel';
import { TabsProvider } from '@/components/ui/Tab/Tabs.context';

const cardData = {
    title: "KPop Demon Hunters (Soundtrack from the Netflix Film)",
    links: [
        { href: "/", label: "샤이니" },
        { href: "/", label: "태민" },
        { href: "/", label: "헌트릭스" },
        { href: "/", label: "사자보이즈" },
        { href: "/", label: "아이브" },
        { href: "/", label: "KEY" },
        { href: "/", label: "김종현" },
        { href: "/", label: "최민호" },
    ],
}

export default function Home() {
    return (
        <div className="bg-(--background-base) h-screen rounded-lg relative overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-[256px] bg-gradient-to-t from-[rgba(83,83,83,.6) 0] via-[var(--background-base) 100%] to-[var(--background-noise)] transition-background-color duration-1000 ease -z-1"></div>
            <TabsProvider defaultValue="all">
                <TabList className="sticky top-0 z-10 w-full bg-transparent text-(--text-base) px-6 py-3">
                    <TabItem id="all">모두</TabItem>
                    <TabItem id="music">음악</TabItem>
                    <TabItem id="podcast">팟캐스트</TabItem>
                </TabList>
                <TabPanel id="all" when="all" className="p-4">
                    <div className="flex items-end justify-between px-6">
                        <h2 className="text-2xl font-bold">K-Pop 활동</h2>                
                        <Button variant="text" size="small" className="font-bold text-(--text-subdued)">모두 표시</Button>
                    </div>
                    <div className="w-full overflow-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory">
                        <ul className="grid auto-cols-[195.5px] mt-4 pl-6 pr-6 whitespace-nowrap">
                            <li>
                                <Card profile={true} title={cardData.title} links={cardData.links} />
                            </li>
                        </ul>
                    </div>
                </TabPanel>
                <TabPanel id="music" when="music" className="p-4">
                    <Recommendations />
                </TabPanel>
            </TabsProvider>
            <div className="sr-only">
                <h1 className="text-m font-bold">내 라이브러리</h1>
            </div>
        </div>
    );
}
