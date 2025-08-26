"use client";

import { CardProps } from "./Card.types";
import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils';
import Link from "next/link";
// import Image from "next/image";

const Card = ({
    children,
}: CardProps) => {
    return (
        <div>
            <div className="w-[171.5px] h-[171.5px] rounded-lg overflow-hidden bg-gray-300">
                {/* <Image src="/images/card.png" alt="card" width={171.5} height={171.5} /> */}
            </div>
            <div>
                <Link href="/" className="text-sm font-bold hover:underline">안녕</Link>
            </div>
        </div>
    );
}



Card.displayName = 'Card';
export default Card;