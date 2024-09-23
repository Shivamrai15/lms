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

interface ChaptersProps {
    chapters : Chapter[];
}

export const Chapters = ({
    chapters
} : ChaptersProps) => {
    
    const Preview = useMemo(()=>dynamic(()=>import("@/components/utils/preview"), {ssr:false}), []);

    return (
        <div className="w-full mt-20">
            <div className="max-w-3xl w-full mx-auto space-y-6">
                <div className="space-y-2">
                    <h1 className="text-xl md:text-2xl font-bold text-zinc-700">
                        Course Content
                    </h1>
                    <p className="text-sm font-medium text-zinc-500">Course content includes {chapters.length} chapters</p>
                </div>
                <div className="border-2 border-zinc-400 w-full px-4">
                    <Accordion type="single" collapsible>
                        {
                            chapters.map((chapter)=>(
                                <AccordionItem value={chapter.id} key={chapter.id} >
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center justify-between w-full pr-3">
                                            <div className="flex items-center gap-x-3">
                                                <span className="px-3 py-2 rounded-full bg-green-100">
                                                    <VideoIcon className="h-4 w-4 text-green-700" />
                                                </span>
                                                <h2 className="text-zinc-700 font-semibold text-sm text-left">{chapter.title}</h2>
                                            </div>
                                            {
                                                chapter.isFree && (
                                                    <Badge>
                                                        Preview
                                                    </Badge>
                                                )
                                            }
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
