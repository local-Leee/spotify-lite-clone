"use client";
import IconPlay from "@/components/icons/IconPlay";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../Button/Button";
import { CardProps } from "./Card.types";

// import Image from "next/image";

const Card = ({ album = false }: CardProps) => {

    const baseStyle = {
        card: "flex flex-col w-[196px] h-[249px] gap-3 p-3 mx-auto cursor-pointer hover:bg-(--background-highlight) rounded-lg transition-all duration-300 ease-out",
        cardThumb: "w-full h-[172px] rounded-lg overflow-hidden bg-gray-300 shrink-0 relative group",
        cardButtonWrap: "pointer-events-none absolute bottom-2 right-2 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100",
        cardButtonPlay: "bg-(--color-primary) pointer-events-auto shadow-[0_8px_8px_rgba(0,0,0,0.3)]",
        cardTextWrap: "text-(--text-subdued)",
        cardLinkList: "text-ellipsis line-clamp-2 overflow-hidden text-[inherit]",
        cardTitle: "font-bold text-white",
        cardText: "text-m hover:underline whitespace-normal text-(--text-subdued) [&:not(:last-child)]:after:content-[',']",
    }
    return (
        <div className={cn(baseStyle.card)}>
            <div className={cn(baseStyle.cardThumb)}>
                {/* <Image src="/images/card.png" alt="card" width={171.5} height={171.5} /> */}                
                <div className={cn(baseStyle.cardButtonWrap)}>
                    <Button 
                        aria-label="재생"
                        variant="scale" 
                        size="medium" 
                        shape="circle" 
                        className={cn(baseStyle.cardButtonPlay)}
                    >
                        <IconPlay />
                    </Button>
                </div>
            </div>  
            <div className={cn(baseStyle.cardTextWrap)}>
                <Link href="/" className={cn(baseStyle.cardText, baseStyle.cardTitle)}>헌트릭스</Link>
                <div className={cn(baseStyle.cardLinkList)}>                    
                    <Link href="/" className={cn(baseStyle.cardText)}>헌트릭스</Link>
                    <Link href="/" className={cn(baseStyle.cardText)}>헌트릭스</Link>
                    <Link href="/" className={cn(baseStyle.cardText)}>사자보이즈</Link>
                    <Link href="/" className={cn(baseStyle.cardText)}>헌트릭스</Link>
                    <Link href="/" className={cn(baseStyle.cardText)}>사자보이즈</Link>
                    <Link href="/" className={cn(baseStyle.cardText)}>헌트릭스</Link>
                    <Link href="/" className={cn(baseStyle.cardText)}>사자보이즈</Link>
                </div>
                <p className={cn(baseStyle.cardText)}>현재 가장 많이 재생된 트랙의 주간 업데이트입니다 - 대한민국</p>
            </div>
        </div>
    );
}



Card.displayName = 'Card';
export default Card;