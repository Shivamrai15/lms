import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';


interface CardSkeletonProps {
    className? : string;
    isBestSeller? :boolean;
}

export const CardSkeleton = ({
    className,
    isBestSeller
} : CardSkeletonProps ) => {
    return (
        <div className={cn(
            "w-72 md:w-80 space-y-6 p-3 pb-6 bg-white shadow-md border rounded-md group",
            className
        )}>
            <Skeleton className='w-full aspect-video bg-zinc-200 rounded-md'/>
            <div className="w-full space-y-3 px-3">
                <div className='space-y-1.5'>
                    <Skeleton className='w-full h-5 bg-zinc-200'/>
                    <Skeleton className='w-36 h-5 bg-zinc-200'/>
                </div>
                <Skeleton className='w-24 h-5 bg-zinc-200'/>
                { isBestSeller && (<Skeleton className='w-24 h-8 bg-zinc-200 border-b-2 border-zinc-400 rounded-full'/>) }
            </div>
        </div>
    )
}
