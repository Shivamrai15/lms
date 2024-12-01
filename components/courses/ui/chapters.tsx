"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Chapter } from "@prisma/client";
import { VideoIcon } from "lucide-react";
import { Heading } from "@/components/utils/heading";

interface ChaptersProps {
    chapters : Chapter[];
}

function parseDuration ( duration: number|null ) {

    if (!duration) return "00:00";
    const hour = Math.floor(duration / 3600); 
    const minute = Math.floor((duration % 3600) / 60).toString().padStart(2, '0');
    const second = (duration % 60).toString().padStart(2, '0');
  
    return hour > 0 ? `${hour}:${minute}:${second}` : `${minute}:${second}`;

}

export const Chapters = ({
    chapters
} : ChaptersProps) => {
    
    const Preview = useMemo(()=>dynamic(()=>import("@/components/utils/preview"), {ssr:false}), []);

    return (
        <div className="w-full mt-20">
            <div className="max-w-3xl w-full mx-auto space-y-6">
                <div className="space-y-2">
                    <Heading className="text-2xl md:text-3xl font-bold text-zinc-700">
                        Course Content
                    </Heading>
                    <p className="text-sm font-medium text-zinc-500">Course content includes {chapters.length} chapters</p>
                </div>
                <div className="border-2 border-zinc-400 w-full px-4">
                    <Accordion type="single" collapsible>
                        {
                            chapters.map((chapter)=>(
                                <AccordionItem value={chapter.id} key={chapter.id} >
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center justify-between w-full pr-3 gap-x-3">
                                            <div className="flex items-center gap-x-3">
                                                <span className="px-3 py-2 rounded-full bg-green-100">
                                                    <VideoIcon className="h-4 w-4 text-green-700" />
                                                </span>
                                                <h2 className="text-zinc-700 font-semibold text-sm text-left">{chapter.title}</h2>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                {
                                                    chapter.isFree && (
                                                        <Badge>
                                                            Preview
                                                        </Badge>
                                                    )
                                                }
                                                <span className="text-sm text-zinc-600">
                                                    {parseDuration(chapter.duration)}
                                                </span>
                                            </div>
                                            
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm">
                                        <Preview value={chapter.description} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
