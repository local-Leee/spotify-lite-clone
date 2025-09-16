'use client';

import { IconClose } from '@/components/icons';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useEffect, useId, useMemo, useState, type MouseEvent } from 'react';
import type { InputProps } from './Input.types';

const Input = ({
    variant = 'base',
    uiSize = 'medium',
    disabled = false,
    shape = 'base',
    className,
    children,
    type = 'text',
    placeholder,
    id,
    name,
    clearable,
    onClear,
    ...props
}: InputProps) => {
    const baseStyle =
        'bg-(--background-elevated-base) text-overflow-ellipsis h-12 pl-12 pr-24 w-full rounded-full overflow-hidden text-(--text-base) disabled:cursor-not-allowed disabled:bg-gray-300 transition-all ease-in duration-100 ';
    const sizes = {
        small: 'min-h-8',
        medium: 'min-h-12',
        large: 'min-h-16',
    }[uiSize];
    const variants =
        'hover:focus:brightness-130 focus:brightness-130 cursor-unset';
    const inputId = useId();
    const resolvedId = id ?? inputId;

    const clearStyles = useMemo(
        () =>
            // hide native clear button in search inputs
            ' [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
        []
    );

    const isSearchType = type === 'search';
    const [hasValue, setHasValue] = useState<boolean>(
        typeof props.value === 'string' && (props.value as string).length > 0
    );

    // 동기화: 컨트롤드 value가 있을 때 버튼 표시 여부를 props.value로 결정
    useEffect(() => {
        if (typeof props.value === 'string') {
            setHasValue((props.value as string).length > 0);
        }
    }, [props.value]);

    return (
        <div className="relative w-full">
            <input
                id={resolvedId}
                type={type}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                className={cn(baseStyle, sizes, variants, className, isSearchType && clearStyles)}
                onInput={(e) => {
                    setHasValue((e.currentTarget.value ?? '').length > 0);
                    props.onInput?.(e);
                }}
                autoComplete="off"
                {...props}
            >
                {children}
            </input>

            {isSearchType && clearable && hasValue && (
                <Button
                    bgColor="transparent"
                    aria-label="clear input"
                    size="xsmall"
                    className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center justify-center h-auto px-3"
                    onClick={(e) => {
                        const target = document.getElementById(resolvedId) as HTMLInputElement | null;
                        if (target) {
                            const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
                            nativeSetter?.call(target, '');
                            const ev = new Event('input', { bubbles: true });
                            target.dispatchEvent(ev);
                            target.focus();
                        }
                        setHasValue(false);
                        onClear?.(e as MouseEvent<HTMLButtonElement>);
                    }}
                >
                    <span className="w-6 h-6 display-block">
                        <IconClose />
                    </span>
                </Button>
            )}
        </div>
    );
};

Input.displayName = 'Input';
export default Input;

