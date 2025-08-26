'use client';

import { useState, useCallback } from 'react';

export const useIconActivation = (initialState = false) => {
    // '활성화' 상태를 관리합니다.
    const [isActive, setIsActive] = useState(initialState);

    // 상태를 활성화(true)시키는 함수입니다.
    // useCallback으로 감싸서 불필요한 재성성을 방지합니다.
    const activate = useCallback(() => {
        setIsActive(true);
    }, []);
    
    // 상태를 비활성화(false)시키는 함수입니다.
    const deactivate = useCallback(() => {
        setIsActive(false);
    }, []);

    // 상태를 토글하는 함수입니다.
    const toggle = useCallback(() => {
        setIsActive(prev => !prev);
    }, []);

    // 상태와 상태를 변경하는 함수들을 객체로 묶어 반환합니다.
    return { isActive, activate, deactivate, toggle };
};