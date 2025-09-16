'use client';
import { IconPlay } from '@/components/icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../Button/Button';
import { CardProps } from './Card.types';

const Card = ({
    title,
    links,
    desc,
    profile = false,
    showEtc = false,
    thumbUrl,
    className,
}: CardProps) => {
    const baseStyle = {
        card: 'flex flex-col w-[196px] max-h-[291px] gap-3 p-3 mx-auto cursor-pointer hover:bg-(--background-highlight) rounded-lg transition-all duration-300 ease-out group active:bg-black',
        cardThumbWrap: 'relative',
        cardThumb: 'w-full h-[172px] rounded-lg overflow-hidden bg-gray-300 shrink-0 relative',
        cardThumbProfile: 'rounded-full overflow-hidden',
        cardButtonWrap:
            'pointer-events-none absolute bottom-2 right-2 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100',
        cardButtonPlay:
            'bg-(--color-primary) pointer-events-auto shadow-[0_8px_8px_rgba(0,0,0,0.3)]',
        cardTextWrap: 'text-(--text-subdued)',
        cardTextEllipsis: 'text-ellipsis line-clamp-2 overflow-hidden',
        cardTitle: 'font-bold text-white',
        cardHover: 'hover:underline ',
        cardLinkList: 'text-[inherit]',
        cardText: 'text-m whitespace-normal text-(--text-subdued)',
        cardLinkText:
            "[&:not(:last-child)]:after:content-[','] [&:not(:last-child)]:after:mr-[3px]",
    };
    return (
        <div className={cn(baseStyle.card)}>
            <div className={cn(baseStyle.cardThumbWrap)}>
                <div className={cn(baseStyle.cardThumb, profile && baseStyle.cardThumbProfile)}>
                    {thumbUrl && <Image src={thumbUrl} alt="card" width={171.5} height={171.5} />}
                </div>
                <div className={cn(baseStyle.cardButtonWrap)}>
                    <Button
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
                {title && (
                    <Link
                        href="/"
                        className={cn(
                            baseStyle.cardText,
                            baseStyle.cardTitle,
                            baseStyle.cardHover,
                            baseStyle.cardTextEllipsis,
                        )}
                    >
                        {title}
                    </Link>
                )}
                {links && links.length > 0 && (
                    <div className={cn(baseStyle.cardLinkList, baseStyle.cardTextEllipsis)}>
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className={cn(
                                    baseStyle.cardText,
                                    baseStyle.cardHover,
                                    baseStyle.cardLinkText,
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {showEtc && <span className={cn(baseStyle.cardText)}>등</span>}
                    </div>
                )}
                {desc && (
                    <p className={cn(baseStyle.cardText, baseStyle.cardTextEllipsis)}>{desc}</p>
                )}
            </div>
        </div>
    );
};

Card.displayName = 'Card';
export default Card;
