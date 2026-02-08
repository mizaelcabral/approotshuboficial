import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rect' }) => {
    const baseClass = "animate-pulse bg-gray-200 dark:bg-white/10";
    const variantClass =
        variant === 'circle' ? 'rounded-full' :
            variant === 'text' ? 'rounded h-3 w-full' : 'rounded-2xl';

    return <div className={`${baseClass} ${variantClass} ${className}`} />;
};

export const DashboardSkeleton = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <Skeleton variant="circle" className="size-12" />
                        <div className="space-y-2 flex-1">
                            <Skeleton variant="text" className="w-1/2" />
                            <Skeleton variant="text" className="w-3/4 h-5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm p-6 space-y-4">
            <Skeleton variant="text" className="w-1/4 h-6" />
            <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex gap-4">
                        <Skeleton className="size-10 rounded-lg" />
                        <div className="flex-1 space-y-2 pt-1">
                            <Skeleton variant="text" className="w-full" />
                            <Skeleton variant="text" className="w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
