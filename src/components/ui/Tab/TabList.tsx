"use client";

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { TabListProps } from "./TabList.types";

const TabList = ({
    children,
    className,
}: TabListProps) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const homeElement = document.querySelector('[data-id="home"]');
        const handleScroll = () => {
            if (homeElement) {
                const scrollTop = homeElement.scrollTop;
                if(scrollTop > 0) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }      
        };
        if (homeElement) {
            homeElement.addEventListener('scroll', handleScroll);
            return () => homeElement.removeEventListener('scroll', handleScroll);
        } 
    }, []);

    const baseStyle = "sticky top-0 z-10 w-full flex items-center bg-transparent gap-2 px-6 py-4 after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-[var(--background-base)] after:opacity-0 after:z-[-1] after:pointer-events-none";
    const stickyStyle = "after:opacity-100 after:transition-[opacity] after:duration-[25s, 4s] after:ease-out";

    return (
        <div 
            role="tablist" 
            data-id="tablist" 
            className={cn(baseStyle, isScrolled && stickyStyle, className)}
        >
            {children}
        </div>
    );
}

TabList.displayName = 'TabList';
export default TabList;