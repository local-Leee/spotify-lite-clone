'use client';
import { cn } from '@/lib/utils';
import { TabListProps } from './TabList.types';

const TabList = ({ children, scrollState, className }: TabListProps) => {

    const baseStyle =
        "sticky top-0 z-10 w-full flex items-center bg-transparent gap-2 px-6 py-4 after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-[var(--background-base)] after:opacity-0 after:z-[-1] after:pointer-events-none";
    const stickyStyle =
        'after:opacity-100 after:transition-[opacity] after:duration-[25s, 4s] after:ease-out';

    return (
        <div
            role="tablist"
            data-id="tablist"
            className={cn(baseStyle, scrollState && stickyStyle, className)}
        >
            {children}
        </div>
    );
};

TabList.displayName = 'TabList';
export default TabList;
