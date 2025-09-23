'use client';
import CardSection from '@/components/composite/card/CardSection';

import { TabItem, TabList, TabPanel, TabsProvider } from '@/components/ui';
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

export default function Main() {
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
                  <CardSection data={CardSectionData} /> 
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
