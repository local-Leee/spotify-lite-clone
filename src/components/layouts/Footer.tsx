'use client';
import { IconSNS } from '@/components/icons';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface FooterLink {
    text: string;
    href?: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

export default function Footer({ className }: { className?: string }) {
    const footerSections: FooterSection[] = [
        {
            title: '회사',
            links: [
                { text: '상세정보', href: '#' },
                { text: '채용 정보', href: '#' },
                { text: 'For the Record', href: '#' },
            ],
        },
        {
            title: '커뮤니티',
            links: [
                { text: '아티스트', href: '#' },
                { text: '개발자', href: '#' },
                { text: '광고', href: '#' },
                { text: '투자자', href: '#' },
                { text: '공급업체', href: '#' },
            ],
        },
        {
            title: '유용한 링크',
            links: [
                { text: '지원', href: '#' },
                { text: '무료 모바일 앱', href: '#' },
                { text: '국가별 인기 차트', href: '#' },
                { text: 'Import your music', href: '#' },
            ],
        },
        {
            title: 'Spotify 요금제',
            links: [
                { text: 'Premium 개인', href: '#' },
                { text: 'Premium 듀오', href: '#' },
            ],
        },
    ];

    const legalLinks = [
        { text: '법적 정보', href: '#' },
        { text: '안전 및 개인정보 보호 센터', href: '#' },
        { text: '개인정보 처리방침', href: '#' },
        { text: '쿠키 설정', href: '#' },
        { text: '광고 정보', href: '#' },
        { text: '접근성', href: '#' },
    ];

    return (
        <footer className={cn('py-20 px-6', className)}>
            <div className=" mx-auto">

                {/* 구분선 */}
                <hr className="border-zinc-800 mb-8" />
                {/* 메인 푸터 섹션 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mb-12 border-zinc-800">
                    {/* 푸터 링크 섹션들 */}
                    {footerSections.map((section, index) => (
                        <div key={index} className="space-y-4">
                            <h3 className="text-white font-bold text-base md:mt-8">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        {link.href ? (
                                            <Button
                                                variant="text"
                                                asChild
                                                bgColor="transparent"
                                                className={cn("text-zinc-400 hover:text-white hover:underline p-0 h-auto text-left justify-start min-w-fit min-h-fit", className)}
                                            >
                                                <a href={link.href}>{link.text}</a>
                                            </Button>
                                        ) : (
                                            <span className="text-zinc-400 text-sm">
                                                {link.text}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* SNS 아이콘 섹션 */}
                    <div className="space-x-4">
                        <div className="flex flex-wrap gap-2 md:mt-8">
                            <Button
                                size="medium"
                                shape="circle"
                                className="bg-zinc-800 hover:bg-zinc-700 text-white"
                                title="Instagram"
                            >
                                <IconSNS shape="instagram" className="text-white" />
                            </Button>
                            <Button
                                size="medium"
                                shape="circle"
                                className="bg-zinc-800 hover:bg-zinc-700 text-white"
                                title="Twitter"
                            >
                                <IconSNS shape="twitter" className="text-white" />
                            </Button>
                            <Button
                                size="medium"
                                shape="circle"
                                className="bg-zinc-800 hover:bg-zinc-700 text-white"
                                title="Facebook"
                            >
                                <IconSNS shape="facebook" className="text-white" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 구분선 */}
                <hr className="border-zinc-800 mb-8" />

                {/* 하단 정보 */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
                    {/* 법적 링크들 */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        {legalLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="text"
                                bgColor="transparent"
                                asChild
                                className="text-zinc-400 hover:text-white hover:underline p-0 h-auto"
                            >
                                <a href={link.href}>{link.text}</a>
                            </Button>
                        ))}
                    </div>

                    {/* 저작권 정보 */}
                    <div className="text-zinc-400 text-sm">
                        © 2024 Spotify AB
                    </div>
                </div>

                {/* 회사 정보 (긴 텍스트) */}
                <div className="mt-8 text-xs text-zinc-500 leading-relaxed">
                    <p>
                        스포티파이 에이비(Spotify AB), Regeringsgatan 19, 111 53 Stockholm, Sweden | 
                        대표: 다니엘 에크 | 사업자등록번호: 556703-7468 (스웨덴) | 
                        통신판매업 신고번호: 2024-공정-0007 (서울특별시) | 
                        호스팅서비스제공자: Google LLC
                    </p>
                </div>
            </div>
        </footer>
    );
}