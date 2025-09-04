'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { PartialOptions } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { Button } from '../ui/Button/Button';
import Card from '../ui/Card/Card';
import { CardSectionProps } from './CardSection.type';

const cardSectionScrollbarOptions: PartialOptions = {
    scrollbars: {
        visibility: 'hidden',
    },
    overflow: {
        y: 'hidden',
    },

};

const CardSection = ({
    data,
    className,
}: CardSectionProps) => {

    return (
        <section className={cn("w-full", className? className : "")}>
            <div className="flex items-end justify-between px-6">
                <div className="flex items-end gap-2">
                    {data.titleImg && (
                        <div className="w-[48px] h-[48px] bg-[var(--background-base)] rounded-full overflow-hidden">
                            <Image src={data.titleImg} alt={data.title} width={100} height={100} />
                        </div>
                    )}
                    <h2 className={cn("text-2xl font-bold", data.titleImg && "pb-1")}>
                        {data.titleDesc && (
                            <span className="text-(--text-subdued) text-sm block">{data.titleDesc}</span>
                        )}
                        {data.title}
                    </h2>
                </div>
                <Button variant="text" size="small" className="font-bold text-(--text-subdued)">
                    {data.titleBtn || "모두 표시"}
                </Button>
            </div>               
            <OverlayScrollbarsComponent options={cardSectionScrollbarOptions} className="w-full">
                <ul className="grid grid-flow-col auto-cols-[195.5px] gap-4 mt-4 pl-6 pr-6">
                    {data.items.map((item) => (
                        <li key={item.id}>
                            <Card
                                data={item}
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
            </OverlayScrollbarsComponent>
        </section>
    );
}


CardSection.displayName = 'CardSection';
export default CardSection;
