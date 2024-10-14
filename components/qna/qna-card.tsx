"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { format } from "date-fns";

import { QNAResponse } from "@/types";
import { 
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";

interface QNACardProps {
    data : QNAResponse,
}

export const QNACard = ({
    data
}: QNACardProps ) => {
    
    const Preview = useMemo(()=>dynamic(()=>import("@/components/utils/preview"), {ssr:false}), []);
    
    return (
        <div className="max-w-2xl w-full mx-auto border border-zinc-200 p-4 rounded-md">
            <div className="flex items-start gap-x-6" >
                <div className="h-8 md:h-10 aspect-square shrink-0">
                    <Avatar className="h-full w-full">
                        <AvatarImage src={data.user?.image||""} />
                        <AvatarFallback className="bg-neutral-800 text-zinc-200 font-semibold md:text-lg" >{data.user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-zinc-700 font-medium text-sm" >{data.user?.name}</h3>
                    <p className="text-zinc-600 text-xs">
                        { format(data.createdAt, "dd LLL yyyy")}
                    </p>
                </div>
            </div>
            <div className="py-4">
                <Preview 
                    value={data.question}
                    className="py-2"
                />
            </div>
        </div>
    )
}
