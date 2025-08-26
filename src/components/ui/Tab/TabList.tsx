"use client";

import { TabListProps } from "./TabList.types";
import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils';

const TabList = ({
    children,
}: TabListProps) => {
    const [activeTab, setActiveTab] = useState('모두');
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    }
    
    const baseStyle = "flex items-center gap-2 px-4 text-sm";
    const activeTabStyle = "bg-white text-black";
    return (
        <div role="tablist" className="flex items-center gap-2 px-4 py-4">
            <Button 
                size="small" 
                shape="circle" 
                role="tab" 
                aria-selected={true} 
                className={cn(baseStyle, activeTab=== '모두' ? activeTabStyle : '')}
                onClick={() => handleTabClick('모두')}
            >
                모두
            </Button>
            <Button 
                size="small" 
                shape="circle" 
                role="tab" 
                aria-selected={false} 
                className={cn(baseStyle, activeTab=== '음악' ? activeTabStyle : '')} 
                onClick={() => handleTabClick('음악')}
            >
                음악
            </Button>
            <Button 
                size="small" 
                shape="circle" 
                role="tab" 
                aria-selected={false} 
                className={cn(baseStyle, activeTab=== '팟캐스트' ? activeTabStyle : '')} 
                onClick={() => handleTabClick('팟캐스트')}
            >
                팟캐스트
            </Button>
        </div>
    );
}



TabList.displayName = 'TabList';
export default TabList;