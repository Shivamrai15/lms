"use client";

import { useRouter } from "next/navigation";
import { useSWRQuery } from "@/hooks/useSWRQuery";
import { Category } from "@prisma/client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { Skeleton } from "@/components/ui/skeleton";


interface Response {
    data : (Category & { _count : {
        courses : number
    }})[];
    error : any;
    isLoading : boolean;
}

export const Categories = () => {
    
    const router = useRouter();
    const {data, error, isLoading}: Response = useSWRQuery('/api/public/category');

    
    if ( error ) {
        return null;
    }

    return (
        <ul className="w-full pt-6 relative px-4" >
            <Carousel
                className="w-full space-y-3"
                opts = {{
                    align : "start",
                    slidesToScroll : "auto"
                }}
            >
                <div className="absolute left-4 bottom-1/2 -translate-y-1/2 z-10">
                    <CarouselPrevious className="z-10 h-12 w-12 bg-neutral-300 hover:bg-neutral-200 shadow-lg" variant="secondary"/>
                </div>
                <CarouselContent className="space-x-2">
                    { isLoading ? (
                        <>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="basis-auto" >
                                <div className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all space-y-3">
                                    <Skeleton className="h-4 w-32 bg-neutral-700"/>
                                    <Skeleton className="h-4 w-16 bg-neutral-700"/>
                                </div>
                            </CarouselItem>
                            
                        </>
                        ) : data.map((category) => (
                            <CarouselItem key={category.id} className="basis-auto cursor-pointer" >
                                <div 
                                    className="p-4 md:p-5 md:px-6 rounded-full bg-neutral-800 hover:bg-neutral-900/80 transition-all"
                                    onClick={()=>router.push(`/category/${category.id}`)}
                                >
                                    <h2 className="text-zinc-100 font-semibold text-[15px]">{category.name}</h2>
                                    <span className="text-xs text-zinc-400">{category._count.courses} Courses</span>
                                </div>
                            </CarouselItem>
                    )) }
                </CarouselContent>
                <div className="absolute right-4 bottom-1/2 -translate-y-1/2 z-10">
                    <CarouselNext className="z-10 h-12 w-12 bg-neutral-300 hover:bg-neutral-200 shadow-lg" variant="secondary"/>
                </div>
            </Carousel>
        </ul>
    )
}
