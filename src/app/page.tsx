'use client';
import CardSection from '@/components/card/CardSection';

import { Button, Card, TabItem, TabList, TabPanel, TabsProvider } from '@/components/ui';
import CardSectionData from '@/data/cardSection.json';
import type { PartialOptions } from 'overlayscrollbars';
import type { OverlayScrollbarsComponentRef } from 'overlayscrollbars-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { useRef, useState } from 'react';

const cardData02 = {
    title: '앨범명을 적어주세요',
    desc: '여기에느 앨범 설명이',
};


const mainScrollbarOptions: PartialOptions = {
    scrollbars: {
        autoHide: 'never',
        theme: 'os-theme-light',
    },
    overflow: {
        x: 'hidden',
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
            data-encore-id="home"
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
                                        title={cardData02.title}
                                        desc={cardData02.desc}
                                    />
                                </li>
                                <li>
                                    <Card
                                        profile={true}
                                        title={cardData02.title}
                                        desc={cardData02.desc}
                                    />
                                </li>
                                <li>
                                    <Card
                                        profile={true}
                                        title={cardData02.title}
                                        desc={cardData02.desc}
                                    />
                                </li>
                                <li>
                                    <Card
                                        profile={true}
                                        title={cardData02.title}
                                        desc={cardData02.desc}
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
                </TabPanel>
                <TabPanel id="music" when="music" className="px-0 z-[var(--z-index)]">
                    <CardSection data={CardSectionData} /> 
                </TabPanel>
            </TabsProvider>
            <div className="sr-only">
                <h1 className="text-m font-bold">내 라이브러리</h1>
            </div>
        </OverlayScrollbarsComponent>
    );
}
