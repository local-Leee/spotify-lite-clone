'use client';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
    message: string;
    className?: string;
    onRetry?: () => void;
}

const ErrorMessage = ({ message, className, onRetry }: ErrorMessageProps) => {
    return (
        <div className={cn("p-4 text-red-400 text-sm text-center", className)}>
            <p>{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                >
                    다시 시도
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
