"use client";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { TabItemProps } from "./TabItem.types";
import { useTabsCtx } from "./Tabs.context";

const TabItem = ({  
    id: idProp,
    children,
    className,
}: TabItemProps) => {

    const { active, setActive, register} = useTabsCtx();

    useEffect(() => {
        register(idProp);
    },[idProp, register])

    const baseStyle = "flex items-center gap-2 px-4 text-sm bg-[var(--background-tinted-base,rgba(0,0,0,0.08))]";
    const selectedTabStyle = "bg-white text-black";
    
    return (
        <Button 
            size="small" 
            shape="circle" 
            role="tab" 
            aria-selected={active === idProp ? true : false}
            aria-controls={idProp}
            data-tab-id={idProp}
            className={cn(baseStyle, active === idProp && selectedTabStyle, className)} 
            onClick={() => setActive(idProp)}
        >
            {children}
        </Button>  
    )
}

    
TabItem.displayName = 'TabItem';
export default TabItem;