"use client";
import IconPlay from "@/components/icons/IconPlay";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../Button/Button";

// import Image from "next/image";

const Card = () => {
    return (
        <div className="flex flex-col w-[196px] h-[249px] gap-3 p-3 mx-auto cursor-pointer hover:bg-(--background-highlight) rounded-lg transition-all duration-300 ease-out">
            <div className="w-full h-[172px] rounded-lg overflow-hidden bg-gray-300 shrink-0 relative group">
                {/* <Image src="/images/card.png" alt="card" width={171.5} height={171.5} /> */}                
                <div className="pointer-events-none absolute bottom-2 right-2 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <Button 
                        aria-label="재생"
                        variant="scale" 
                        size="medium" 
                        shape="circle" 
                        className={cn("bg-(--color-primary)", "pointer-events-auto shadow-[0_8px_8px_rgba(0,0,0,0.3)]")}
                    >
                        <IconPlay />
                    </Button>
                </div>
            </div>
            <div className="text-ellipsis line-clamp-2 overflow-hidden text-(--text-subdued)">
                <Link href="/" className="text-m hover:underline after:content-[','] text-(--text-subdued)">헌트릭스</Link>
                <Link href="/" className="text-m hover:underline after:content-[',']">헌트릭스</Link>
                <Link href="/" className="text-m hover:underline after:content-[',']">사자보이즈</Link>
                <Link href="/" className="text-m hover:underline after:content-[',']">사자보이즈</Link>
                <Link href="/" className="text-m hover:underline ">사자보이즈</Link>
            </div>
        </div>
    );
}



Card.displayName = 'Card';
export default Card;