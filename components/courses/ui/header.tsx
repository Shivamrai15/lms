"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";


import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
    Category,
    SubCategory,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heading } from "@/components/utils/heading";
import { Stars } from "@/components/rating/stars";


interface HeaderProps {
    id : string;
    title : string;
    subCategory: SubCategory & { category: Category } | null;
    tutorName: string;
    tutorImage: string|null;
    shortDescription: string;
    tutorProfile: string|null|undefined;
    lastUpdated: Date;
    ratings: number;
    purchases: number;
    avgRating: number; 
}

export const Header = ({
    id,
    lastUpdated,
    shortDescription,
    subCategory,
    title,
    tutorImage,
    tutorName,
    tutorProfile,
    avgRating,
    purchases,
    ratings
} : HeaderProps) => {
    
    const router = useRouter();
    const Preview = useMemo(()=>dynamic(()=>import("@/components/utils/preview"), {ssr:false}), []);
    
    return (
        <header className="p-4">
            <div className="w-full px-6 md:px-12 lg:px-24 py-8 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-lg md:rounded-xl shadow-xl">
                <div className="max-w-6xl w-full mx-auto flex items-center">
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="flex items-center gap-x-2">
                            <Link
                                href={`/category/${subCategory?.categoryId}`}
                                className="text-violet-400 font-semibold md:text-lg"
                            >
                                { subCategory?.category.name }
                            </Link>
                            <ChevronRight className="text-violet-400" />
                            <Link
                                href={`/category/${subCategory?.categoryId}/courses/${subCategory?.id}`}
                                className="text-violet-400 font-semibold md:text-lg"
                            >
                                { subCategory?.name }
                            </Link>
                        </div>
                        <div className="space-y-4 pb-4">
                            <Heading className={`text-2xl md:text-5xl text-white font-bold`}>
                                {title}
                            </Heading>
                            <h2 className="text-zinc-200 md:text-lg">
                                {shortDescription}
                            </h2>
                        </div>
                        <div className="pb-4 flex items-center gap-x-3">
                            <span className="text-zinc-300 font-[600]">{avgRating ? avgRating.toFixed(1): 0}</span>
                            <Stars avgRating={`${avgRating}`} />
                            <span className="text-zinc-300">({ratings} ratings) {purchases} Students</span>
                        </div>
                        <HoverCard>
                            <HoverCardTrigger className="text-zinc-100 cursor-default md:cursor-pointer">Created by <span className="text-violet-400">{tutorName}</span></HoverCardTrigger>
                            <HoverCardContent className="w-72 md:w-96 p-4" align="start" >
                                <div className="flex items-start gap-x-4 md:gap-x-8">
                                    <Avatar>
                                        <AvatarImage src={tutorImage||""} />
                                        <AvatarFallback>{tutorName?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-y-4">
                                        <h2 className="text-zinc-700 text-sm font-medium" >@{tutorName}</h2>
                                        <div className="max-h-28 h-full overflow-hidden">
                                            <Preview value={tutorProfile||""} />
                                        </div>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        <div className="flex items-center gap-x-2">
                            <Button
                                className='h-14 bg-green-600 hover:bg-green-700/90 rounded-none w-full md:w-auto font-medium'
                                onClick={()=>router.push(`/course/${id}/view`)}
                            >
                                View Course
                            </Button>
                        </div>
                    </div>
                    <div className="h-full w-1/2 hidden md:flex items-center justify-end">
                        <div className="max-w-md w-full relative aspect-square">
                            <Image
                                src="/assets/13923473_04_13_21_05.svg"
                                fill
                                alt=""
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
