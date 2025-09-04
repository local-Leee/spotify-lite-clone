/**
 * OverlayScrollbars 이벤트 관리 훅
 * https://codesandbox.io/p/sandbox/overlayscrollbars-react-example-ddz458?file=%2Fsrc%2FuseEventObserver.ts%3A1%2C1-55%2C1
 * 이벤트들(initialized, destroyed, updated, scroll)을 카운트하고
 * 최근 500ms 안에 발생했으면 active=true로 표시해주는 이벤트 관찰 훅.
 * 이 훅을 쓰면 스크롤 중인지, 막 초기화했는지 같은 상태를 확인 가능
 */

import type { EventListenerArgs } from 'overlayscrollbars';
import { useRef, useState } from 'react';
/**
 * useRef : 값 변경(상태x) -> 리렌더링 안함 -> 변경사항은 적용 | DOM 조작, 이전 값 기억 가능
 * useState : 변경(상태,값) -> 매번 리렌더링 -> 변경사항 적용 | DOM 조작 불가능, 이전 값 기억 불가능
 */

// EventListenerArgs 타입에서 키 이름만 뽑아(initialized, destroyed, updated, scroll) 유니온 타입을 만든다.
export type OverlayScrollbarsEvents = keyof EventListenerArgs;

export interface EventObserverEvent {
    active: boolean; // 이벤트 활성화 여부
    count: number; // 이벤트 발생 횟수
}

export const useEventObserver = () => {
    // 하나의 useState로 여러 이벤트 상태를 배열로 관리 (scroll + updated가 같이 발생했다면 둘 다 active=true로 표시)
    const [activeEvents, setActiveEvents] = useState<OverlayScrollbarsEvents[]>([]);
    //
    const eventCountRef = useRef<
        /**
         * Record<K, V> : K 키에 대한 V 값을 가지는 객체 타입.
         * ㄴ 여기에선 OverlayScrollbarsEvents의 모든 키에 대해 number 값을 가져야하는 객체를 정의. 타입 변환이 아니라 '객체 구조 정의'
         * Partial<T>: Record의 모든 키에 대해 선택적으로 값을 가지는 객체 타입을 만든다.
         * ㄴ (값이 있는 것만 적용. Record만 있으면 값이 없으면 에러남)
         */
        Partial<Record<OverlayScrollbarsEvents, number>>
    >({});
    const timeoutIds = useRef<
        Partial<Record<OverlayScrollbarsEvents, ReturnType<typeof setTimeout>>>
    >({});

    const activateEvent = (event: OverlayScrollbarsEvents) => {
        const currAmount = eventCountRef.current[event];
        eventCountRef.current[event] = typeof currAmount === 'number' ? currAmount + 1 : 1;

        setActiveEvents((currActiveEvents) => Array.from(new Set([...currActiveEvents, event])));

        clearTimeout(timeoutIds.current[event]);
        timeoutIds.current[event] = setTimeout(() => {
            setActiveEvents((currActiveEvents) => {
                const currActiveEventsSet = new Set(currActiveEvents);
                currActiveEventsSet.delete(event);
                return Array.from(currActiveEventsSet);
            });
        }, 500);
    };

    const getEventObj = (event: OverlayScrollbarsEvents): EventObserverEvent => ({
        active: activeEvents.includes(event),
        count: eventCountRef.current[event] || 0,
    });

    const events: Record<OverlayScrollbarsEvents, EventObserverEvent> = {
        initialized: getEventObj('initialized'),
        destroyed: getEventObj('destroyed'),
        updated: getEventObj('updated'),
        scroll: getEventObj('scroll'),
    };

    return [events, activateEvent] as const;
};
