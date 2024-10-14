"use client";

import { useSWRQuery } from "@/hooks/useSWRQuery";
import { Loader2 } from "lucide-react";
import { FaStar } from "react-icons/fa6";
import { KeyedMutator } from "swr";
import { RatingGraph } from "./rating-graph";


interface RateSummary {
    _count: number;
    _avg: {
        star: number | null;
    };
}

interface RateGroupBy {
    star: number;
    _count: {
      star: number;
    };
}

interface Resposne {
    data : { summary : RateSummary, group : RateGroupBy[] },
    error : any;
    isLoading : boolean;
}

interface AggregatedReviewProps {
    courseId: string;
}

export const AggregatedReview = ({
    courseId
} : AggregatedReviewProps ) => {
    
    const { data, error, isLoading }: Resposne = useSWRQuery(`/api/courses/${courseId}/review/aggregate`);

    if (error) {
        return null;
    }

    if ( isLoading ) {
        return (
            <div className="flex items-center justify-center w-full">
                <Loader2 className="h-12 w-12 text-zinc-800 animate-spin" />
            </div>
        )
    }

    
    return (
        <div className="space-y-6">
            <h1 className="text-xl md:text-3xl font-bold text-zinc-800">Course Review</h1>
            <div className="w-full grid grid-cols-6">
                <div className="flex h-full items-center justify-between col-span-2">
                    <div className="flex items-center gap-x-3">
                        <span className="text-5xl sm:text-8xl font-bold text-zinc-700">
                            { (data.summary._avg.star || 0).toFixed(1) }
                        </span>
                        <FaStar
                            className="text-zinc-700 h-5 w-5 sm:h-9 sm:w-9"
                        />
                    </div>
                </div>
                <div className="border-l-2 px-2 pl-4 col-span-4 space-y-2">
                    <RatingGraph
                        label={5}
                        reviews={data.group.find((value)=>value.star===5)?._count.star || 0}
                        total={data.summary._count}
                        className = "bg-emerald-500"
                    />
                    <RatingGraph
                        label={4}
                        reviews={data.group.find((value)=>value.star===4)?._count.star || 0}
                        total={data.summary._count}
                        className = "bg-emerald-400"
                    />
                    <RatingGraph
                        label={3}
                        reviews={data.group.find((value)=>value.star===3)?._count.star || 0}
                        total={data.summary._count}
                        className = "bg-emerald-300"
                    />
                    <RatingGraph
                        label={2}
                        reviews={data.group.find((value)=>value.star===2)?._count.star || 0}
                        total={data.summary._count}
                        className = "bg-orange-400"
                    />
                    <RatingGraph
                        label={1}
                        reviews={data.group.find((value)=>value.star===1)?._count.star || 0}
                        total={data.summary._count}
                        className = "bg-rose-500"
                    />
                </div>
            </div>
        </div>
        
    )
}
