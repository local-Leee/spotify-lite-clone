'use client';
import CardSection from '@/components/composite/card/CardSection';

import { TabItem, TabList, TabPanel, TabsProvider } from '@/components/ui';
import CardSectionData from '@/data/cardSection.json';
import { useState } from 'react';

const cardData02 = {
    title: '앨범명을 적어주세요',
    desc: '여기에느 앨범 설명이',
};

export default function Main() {
    const [isScrollState, setIsScrollState] = useState(false);

    return (
        <div 
            data-encore-id="home"
            className=" relative"
        >
            <div className="absolute top-0 left-0 w-full h-[256px] bg-gradient-noise"></div>
            <TabsProvider defaultValue="all">
                <TabList scrollState={isScrollState}>
                    <TabItem id="all">모두</TabItem>
                    <TabItem id="music">음악</TabItem>
                    <TabItem id="podcast">팟캐스트</TabItem>
                </TabList>
                <TabPanel id="all" when="all" className="px-0 z-[--z-index]">                  
                    <CardSection data={CardSectionData} /> 
                </TabPanel>
                <TabPanel id="music" when="music" className="px-0 z-[var(--z-index)]">
                    <CardSection data={CardSectionData} /> 
                </TabPanel>
            </TabsProvider>
            <div className="sr-only">
                <h1 className="text-m font-bold">내 라이브러리</h1>
            </div>
        </div>
    );
}
