// 상태저장소 : 어떤 탭이 선택되어있는지 상태 공유하기 위한 컨텍스트
'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

type TabsContextValue = {
    active: string;
    setActive: (id: string) => void;
    register: (id: string) => void;
    ids: string[];
};

// 탭 컴포넌트 내부에서 사용되는 컨텍스트
const TabsCtx = createContext<TabsContextValue | null>(null);

export function useTabsCtx() {
    const ctx = useContext(TabsCtx);
    if (!ctx) throw new Error('Tabs components must be inside <TabList/>');
    return ctx;
}

export function TabsProvider({
    defaultValue,
    children,
}: {
    defaultValue: string;
    children: React.ReactNode;
}) {
    const [active, setActive] = useState(defaultValue);
    const [ids, setIds] = useState<string[]>([]);
    const register = (id: string) => setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const value = useMemo(() => ({ active, setActive, register, ids }), [active, ids]);
    return <TabsCtx.Provider value={value}>{children}</TabsCtx.Provider>;
}

export default TabsProvider;
