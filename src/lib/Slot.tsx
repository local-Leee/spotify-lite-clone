/**
 * asChild를 사용하기 위한 Slot component
 */
'use client';
import { cn } from "@/lib/utils";
import React, { cloneElement, forwardRef, isValidElement } from "react";

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
    return (node: T) => {
        refs.forEach((r) => {
        if (typeof r === "function") r(node);
        else if (r && typeof (r as any) === "object") (r as any).current = node;
        });
    };
}

type SlotProps = React.HTMLAttributes<HTMLElement> & {
    children: React.ReactElement;
};

export const Slot = forwardRef<HTMLElement, SlotProps>(({ children, className, ...rest }, ref) => {
    if (!isValidElement(children)) return null;
    return cloneElement(children, {
        ...rest,
        ref: mergeRefs((children as any).ref, ref),
        className: cn((children.props as any).className, className),
    } as any);
});
Slot.displayName = "Slot";
