export type CardSectionData = {
    title: string;
    titleImg?: string;
    titleDesc?: string;
    titleBtn?: string;
    items: {
        profile?: boolean;
        id: number;
        title: string;
        links: {
            href: string;
            label: string;
        }[];
    }[];
};

export type CardSectionProps = {
    data: CardSectionData;
    className?: string;
}