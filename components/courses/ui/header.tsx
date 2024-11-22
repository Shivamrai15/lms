"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Abril_Fatface } from "next/font/google";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
    Category,
    Chapter, 
    Course, 
    SubCategory,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const font =  Abril_Fatface({
    subsets : ["latin"],
    weight : ["400"]
});

interface HeaderProps {
    course : Course & { subCategory : (SubCategory & { category: Category })|null, chapters : Chapter[], tutor : {id: string, name: string|null, image: string|null, profile : { description: string|null }|null},  _count : {purchases: number, ratings: number }  };
}

export const Header = ({
    course,
} : HeaderProps) => {
    
    const router = useRouter();
    const Preview = useMemo(()=>dynamic(()=>import("@/components/utils/preview"), {ssr:false}), []);
    
    return (
        <header className="w-full px-6 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-violet-300">
            <div className="max-w-6xl w-full mx-auto flex items-center">
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="flex items-center gap-x-2">
                        <Link
                            href={`/category/${course.subCategory?.categoryId}`}
                            className="text-green-600 font-semibold md:text-lg"
                        >
                            { course.subCategory?.category.name }
                        </Link>
                        <ChevronRight className="text-green-600" />
                        <Link
                            href={`/category/${course.subCategory?.categoryId}/courses/${course.subCategoryId}`}
                            className="text-green-600 font-semibold md:text-lg"
                        >
                            { course.subCategory?.name }
                        </Link>
                    </div>
                    <div className="space-y-4 pb-6">
                        <h1 className={`${font.className} text-xl md:text-4xl text-zinc-800`}>
                            {course.title}
                        </h1>
                        <h2 className="text-zinc-700 md:text-lg">
                            {course.shortDescription}
                        </h2>
                    </div>
                    <HoverCard>
                        <HoverCardTrigger className="text-zinc-800 cursor-default md:cursor-pointer font-semibold">Created by {course.tutor.name}</HoverCardTrigger>
                        <HoverCardContent className="w-72 md:w-96 p-4" align="start" >
                            <div className="flex items-start gap-x-4 md:gap-x-8">
                                <Avatar>
                                    <AvatarImage src={course.tutor.image||""} />
                                    <AvatarFallback>{course.tutor.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-y-4">
                                    <h2 className="text-zinc-700 text-sm font-medium" >@{course.tutor.name}</h2>
                                    <div className="max-h-28 h-full overflow-hidden">
                                        <Preview value={course.tutor.profile?.description||""} />
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    <div className="flex items-center gap-x-2">
                        <Button
                            className='h-14 bg-green-600 hover:bg-green-700/90 rounded-none w-full md:w-auto font-medium'
                            onClick={()=>router.push(`/course/${course.id}/view`)}
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
        </header>
    )
}
