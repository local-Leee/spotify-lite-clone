'use client';
import Recommendations from '@/components/card/CardSection';
import { Button } from '@/components/ui/Button/Button';
import Card from '@/components/ui/Card/Card';
import TabItem from '@/components/ui/Tab/TabItem';
import TabList from '@/components/ui/Tab/TabList';
import TabPanel from '@/components/ui/Tab/TabPanel';
import { TabsProvider } from '@/components/ui/Tab/Tabs.context';
import type { PartialOptions } from 'overlayscrollbars';
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { useRef, useState } from 'react';

const cardData01 = {
    title: 'KPop Demon Hunters (Soundtrack from the Netflix Film)',
    links: [
        { href: '/', label: '루미' },
        { href: '/', label: '진우' },
        { href: '/', label: '헌트릭스' },
        { href: '/', label: '사자보이즈' },
        { href: '/', label: '아이브' },
        { href: '/', label: 'KEY' },
        { href: '/', label: '태민' },
        { href: '/', label: '믹스' },
    ],
};
const cardData02 = {
    title: '앨범명을 적어주세요',
    desc: '여기에느 앨범 설명이',
};

const mainScrollbarOptions: PartialOptions = {
    scrollbars: {
        autoHide: 'never',
        theme: 'os-theme-light',
    },

};

export default function Home() {
    const [isScrollState, setIsScrollState] = useState(false);
    const osRef = useRef<OverlayScrollbarsComponentRef>(null);
    
    // 스크롤바 scrollTop 가져오기
    const scrollContent = () => {
        const { current } = osRef;
        const osInstance = current?.osInstance();
        if( !osInstance ) return;
        const { scrollOffsetElement } = osInstance.elements();
        const { scrollTop } = scrollOffsetElement;

        if( scrollTop > 0 ) {
            setIsScrollState(true);
        } else {
            setIsScrollState(false);
        }
    }

    return (
        <OverlayScrollbarsComponent
            options={mainScrollbarOptions}
            data-id="home"
            ref={osRef}
            events={{
                scroll: scrollContent,
            }}
            className="h-full rounded-lg relative overflow-hidden overflow-y-auto scroll-smooth bg-[var(--background-base)] overflow-y"
        >
            <div className="absolute top-0 left-0 w-full h-[256px] bg-gradient-noise"></div>
            <TabsProvider defaultValue="all">
                <TabList scrollState={isScrollState}>
                    <TabItem id="all">모두</TabItem>
                    <TabItem id="music">음악</TabItem>
                    <TabItem id="podcast">팟캐스트</TabItem>
                </TabList>
                <TabPanel id="all" when="all" className="p-4 z-[--z-index]">
                    <section>
                        <div className="flex items-end justify-between px-6">
                            <h2 className="text-2xl font-bold">아티스트</h2>
                            <Button
                                variant="text"
                                size="small"
                                className="font-bold text-(--text-subdued)"
                            >
                                모두 표시
                            </Button>
                        </div>
                        <div className="w-full overflow-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory">
                            <ul className="grid grid-flow-col auto-cols-[195.5px] gap-4 mt-4 pl-6 pr-6">
                                <li>
                                    <Card
                                        profile={true}
                                        title={cardData01.title}
                                        links={cardData01.links}
                                    />
                                </li>
                                <li>
                                    <Card
                                        profile={true}
                                        title={cardData01.title}
                                        links={cardData01.links}
                                    />
                                </li>
                                <li>
                                    <Card
                                        profile={true}
                                        title={cardData01.title}
                                        links={cardData01.links}
                                    />
                                </li>
                                <li>
                                    <Card
                                        profile={true}
                                        title={cardData01.title}
                                        links={cardData01.links}
                                    />
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="mt-10">
                        <div className="flex items-end justify-between px-6">
                            <h2 className="text-2xl font-bold">새로나온 앨범</h2>
                            <Button
                                variant="text"
                                size="small"
                                className="font-bold text-(--text-subdued)"
                            >
                                모두 표시
                            </Button>
                        </div>
                        <div className="w-full overflow-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory">
                            <ul className="grid grid-flow-col auto-cols-[195.5px] gap-4 mt-4 pl-6 pr-6">
                                <li>
                                    <Card title={cardData02.title} desc={cardData02.desc} />
                                </li>
                                <li>
                                    <Card title={cardData02.title} desc={cardData02.desc} />
                                </li>
                                <li>
                                    <Card title={cardData02.title} desc={cardData02.desc} />
                                </li>
                                <li>
                                    <Card title={cardData02.title} desc={cardData02.desc} />
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="mt-10">
                        <div className="flex items-end justify-between px-6">
                            <h2 className="text-2xl font-bold">믹스</h2>
                            <Button
                                variant="text"
                                size="small"
                                className="font-bold text-(--text-subdued)"
                            >
                                모두 표시
                            </Button>
                        </div>
                        <div className="w-full overflow-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory">
                            <ul className="grid grid-flow-col auto-cols-[195.5px] gap-4 mt-4 pl-6 pr-6">
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="mt-10">
                        <div className="flex items-end justify-between px-6">
                            <h2 className="text-2xl font-bold">새로나온 앨범</h2>
                            <Button
                                variant="text"
                                size="small"
                                className="font-bold text-(--text-subdued)"
                            >
                                모두 표시
                            </Button>
                        </div>
                        <div className="w-full overflow-hidden overflow-x-auto scroll-smooth snap-x snap-mandatory">
                            <ul className="grid grid-flow-col auto-cols-[195.5px] gap-4 mt-4 pl-6 pr-6">
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                                <li>
                                    <Card title={cardData01.title} links={cardData01.links} />
                                </li>
                            </ul>
                        </div>
                    </section>
                </TabPanel>
                <TabPanel id="music" when="music" className="p-4 z-[--z-index]">
                    <Recommendations />
                </TabPanel>
            </TabsProvider>
            <div className="sr-only">
                <h1 className="text-m font-bold">내 라이브러리</h1>
            </div>
        </OverlayScrollbarsComponent>
    );
}
