"use client";

import { cn } from "@/lib/utils";
import { TabPanelProps } from "./TabPanel.types";
import { useTabsCtx } from "./Tabs.context";

const TabPanel = ({
    id,
    when,
    children,
    className,
}: TabPanelProps) => {

    const { active } = useTabsCtx();
    if(active !== when) return null;

    return (
        <section data-tabpanel-id={id} role="tabpanel" aria-labelledby={id} className={cn("px-4 text-sm", className)}>
            {children}
        </section>
    )
}

TabPanel.displayName = 'TabPanel';
export default TabPanel;

