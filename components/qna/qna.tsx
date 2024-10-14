"use client";


import { Fragment, useEffect, useRef, useState } from "react";
import { QNAForm } from "./qna-form";
import { useQuery } from "@/hooks/use-query";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { QNAResponse } from "@/types";
import { QNACard } from "./qna-card";

interface QNAProps {
    chapterId: string;
}

export const QNA = ({
    chapterId,
}: QNAProps) => {
    
    const [ instantData, setInstantData ] = useState<QNAResponse[]>([])
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useQuery({ url : `/api/user/qna`, paramKey : "id" , paramValue : chapterId, queryKey:chapterId })

    const { ref, inView } = useInView();
    const viewRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, inView]);

    const addData = ( value: QNAResponse ) => {
        setInstantData((prev)=>[value, ...prev]);
        if (viewRef.current) {
            viewRef.current.scrollTo({
                top : 0
            });
        }
    }

    if ( status === "pending" ) {
        return (
            <div className="mt-16 md:mt-20 w-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-zinc-700 animate-spin" />
            </div>
        )
    }

    if ( status === "error" ) {
        return (
            <div className="mt-16 md:mt-20 w-full flex items-center justify-center text-base font-medium text-zinc-400 select-none">
                Something went wrong
            </div>
        )
    }


    return (
        <div ref={viewRef} className="h-full w-full overflow-y-auto relative">
            <div className="flex flex-col py-10 px-6 gap-y-6">
                {
                    instantData.map((qna)=>(
                        <QNACard key={qna.id} data={qna} />
                    ))
                }
                {
                    data?.pages.map((group, i)=>(
                        <Fragment key={i} >
                            { group.items.map((qna : QNAResponse) => (
                                <QNACard key={qna.id} data={qna} />
                            )) }
                        </Fragment>
                    ))
                }
                {
                    isFetchingNextPage && (
                        <div>
                            <Loader2 className="h-6 w-6 animate-spin text-zinc-600" />
                        </div>
                    )
                }
                <div className="h-4 w-full" ref = {ref} />
            </div>
            <div className="sticky w-[calc(100%-3rem)] md:w-[calc(100%-10rem)] rounded-lg overflow-hidden border border-zinc-300 mx-auto h-40 bottom-6 left-0 right-0">
                <QNAForm 
                    chapterId={chapterId}
                    addData={addData} 
                />
            </div>
        </div>
    )
}
