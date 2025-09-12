'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import IconArrow from '../icons/IconArrow';
import { Button } from '../ui/Button/Button';
import Card from '../ui/Card/Card';
import { CardSectionProps } from './CardSection.type';

const CardSection = ({
    data,
    className,
}: CardSectionProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollability = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            const threshold = 1; // 1px 정도의 오차 허용
            setCanScrollLeft(scrollLeft > threshold);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - threshold);
        }
    };

    useEffect(() => {
        checkScrollability();
        const container = scrollContainerRef.current;
        if (container) {
            // 초기 스크롤 위치를 0으로 설정 (패딩 고려)
            container.scrollLeft = 0;
            container.addEventListener('scroll', checkScrollability);
            window.addEventListener('resize', checkScrollability);
            return () => {
                container.removeEventListener('scroll', checkScrollability);
                window.removeEventListener('resize', checkScrollability);
            };
        }
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = 195.5 + 16; // 카드 너비 + gap
            const visibleCards = Math.floor(container.clientWidth / cardWidth);
            const scrollAmount = Math.max(1, visibleCards) * cardWidth;
            
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = 195.5 + 16; // 카드 너비 + gap
            const visibleCards = Math.floor(container.clientWidth / cardWidth);
            const scrollAmount = Math.max(1, visibleCards) * cardWidth;
            
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const baseStyle = {
        section: "w-full py-6",
        header: "flex items-end justify-between px-6 mb-4",
        headerContentWrap: "flex items-end gap-2",
        titleImg: "w-[48px] h-[48px] bg-[var(--background-base)] rounded-full overflow-hidden",
        titleDesc: "text-(--text-subdued) text-sm block",
        title: "text-2xl font-bold",
        cardList: "grid grid-flow-col",
        carouselsWrap: "relative group/slider",
        cardListWrap: "w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide scroll-behavior-smooth px-6 scroll-px-6",
        sliderButtons: "absolute top-[50%] transform-[translateY(-50%)] z-[var(--z-index)] opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300",
        sliderButtonLeft: "left-4",
        sliderButtonRight: "right-4",
        sliderGradient: "absolute top-0 bottom-0 w-40 bg-gradient-to-r from-[var(--background-base)]/80 to-transparent z-[var(--z-index)] pointer-events-none",
        sliderGradientLeft: "left-0",
        sliderGradientRight: "right-0 bg-gradient-to-l",
    }

    return (
        <section className={cn(baseStyle.section, className? className : "")}>
            <header className={cn(baseStyle.header)}>
                <div className={cn(baseStyle.headerContentWrap)}>
                    {data.titleImg && (
                        <div className={cn(baseStyle.titleImg)}>
                            <Image src={data.titleImg} alt={data.title} width={100} height={100} />
                        </div>
                    )}
                    <div>
                        {data.titleDesc && (
                            <span className={cn(baseStyle.titleDesc)}>{data.titleDesc}</span>
                        )}
                        <h2 className={cn(baseStyle.title, data.titleImg && "pb-1")}>
                            {data.title}
                        </h2>
                    </div>
                </div>
                <Button variant="text" size="small" className="font-bold text-(--text-subdued)">
                    {data.titleBtn || "모두 표시"}
                </Button>
            </header>               
            <div className={cn(baseStyle.carouselsWrap)}>
                <div ref={scrollContainerRef} className={cn(baseStyle.cardListWrap)}>
                    <ul className={cn(baseStyle.cardList)}>
                        {data.items.map((item) => (
                            <li key={item.id} className="snap-start last:pr-3">
                                <Card
                                    profile={item.profile? item.profile : false}
                                    title={item.title}
                                    links={item.links.map((link) => ({
                                        href: `/artist/${link.href}`,
                                        label: link.label,
                                    }))}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                {canScrollLeft && (
                    <div className={cn(baseStyle.sliderGradient, baseStyle.sliderGradientLeft)} />
                )}
                {canScrollRight && (
                    <div className={cn(baseStyle.sliderGradient, baseStyle.sliderGradientRight)} />
                )}
                {canScrollLeft && (
                    <Button 
                        shape="circle" 
                        className={cn(baseStyle.sliderButtons, baseStyle.sliderButtonLeft)} 
                        size="small"
                        onClick={scrollLeft}
                    >
                        <IconArrow left={true} />
                    </Button>
                )}                
                {canScrollRight && (
                    <Button 
                        shape="circle" 
                        className={cn(baseStyle.sliderButtons, baseStyle.sliderButtonRight)} 
                        size="small"
                        onClick={scrollRight}
                    >
                        <IconArrow />
                    </Button>
                )}
            </div>
        </section>
    );
}


CardSection.displayName = 'CardSection';
export default CardSection;
