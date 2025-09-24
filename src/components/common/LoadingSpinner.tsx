'use client';
import { COMMON_STYLES } from '@/lib/style-constants';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
    text?: string;
}

const LoadingSpinner = ({ 
    size = 'medium', 
    className,
    text = '로딩 중...'
}: LoadingSpinnerProps) => {
    const sizes = {
        small: 'h-4 w-4',
        medium: 'h-6 w-6',
        large: 'h-8 w-8',
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className={cn(COMMON_STYLES.LOADING_SPINNER, sizes[size], className)} />
            {text && <span className="ml-2 text-zinc-400 text-sm">{text}</span>}
        </div>
    );
};

export default LoadingSpinner;
