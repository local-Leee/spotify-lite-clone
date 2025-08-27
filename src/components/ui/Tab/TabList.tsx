import { cn } from '@/lib/utils';
import { TabListProps } from "./TabList.types";

const TabList = ({
    children,
    className,
}: TabListProps) => {
    return (
        <div role="tablist" className={cn("flex items-center gap-2 px-4 py-6", className)}>
            {children}
        </div>
    );
}

TabList.displayName = 'TabList';
export default TabList;