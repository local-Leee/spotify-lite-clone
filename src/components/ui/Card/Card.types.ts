export type CardProps = {
    children?: React.ReactNode;
    title?: string;
    links?: {
        href: string;
        label: string;
    }[];
    desc?: string;
    profile?: boolean;
    showEtc?: boolean;
    className?: string;
    thumbUrl?: string;
}