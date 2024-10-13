"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyedMutator } from "swr";

import { formatPrice } from "@/lib/format";
import { Course, Rate } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { BookOpen, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCommentModal } from "@/hooks/use-comment-modal";
import { CourseProgress } from "../courses/ui/course-progress";


interface CardProps {
    course : (Course & {
        _count: {
            chapters: number;
        };
        progress : number|null;
        ratings: Rate[];
    });
    isBestSeller? : boolean;
    className? : string;
    mutate : KeyedMutator<any>
}

export const Card = ({
    course,
    isBestSeller,
    className,
    mutate
} : CardProps ) => {

    const router = useRouter();
    const [activeStar, setActiveStar] = useState( course.ratings[0]?.star||0 );
    const { onOpen } = useCommentModal();
    const stars = [1, 2, 3, 4, 5];

    const handleClick = async (starValue : number ) => {

        if (starValue === activeStar ) return ;
        try {

            setActiveStar( starValue );
            if ( course.ratings[0] ) {

                await axios.patch(`/api/user/rating`, {
                    courseId :course.id,
                    star : starValue,
                    comment : course.ratings[0].comment||undefined,
                });
            } else {
                await axios.post("/api/user/rating", {
                    star : starValue,
                    courseId : course.id
                });
            }
            mutate();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
        }
    }

    return (
        <div
            className={cn(
                "w-full space-y-6 p-3 pb-6 bg-white shadow-md border rounded-md group",
                className
            )}
            onClick={()=>router.push(`/course/${course.id}`)}
        >
            <div className="w-full aspect-video rounded-md overflow-hidden relative">
                <Image
                    src={course.image!}
                    alt="Image"
                    fill
                    className="object-contain"
                />
            </div>
            <div className="w-full space-y-3 px-3">
                <h2 className="font-semibold text-zinc-700 line-clamp-2 text-base">{course.title}</h2>
                <div
                    className="flex items-center gap-x-4"
                >
                    <span className="h-8 w-8 rounded-full shrink-0 bg-violet-200 flex items-center justify-center">
                        <BookOpen className="text-violet-700 h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-zinc-700">
                        {course._count.chapters} Chapters
                    </span>
                </div>
                <CourseProgress value={course.progress||0} variant="default" size="sm" />
            </div>
            <div className="flex items-center justify-between">
                <div className='flex items-center gap-x-1.5'>
                    {
                        stars.map((star, index )=>(
                            star <= activeStar ? (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClick(star)
                                    }}
                                >
                                    <FaStar
                                        className='h-5 w-5  text-zinc-500 md:cursor-pointer'
                                    />
                                </button>
                            ) : (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClick(star)
                                    }}
                                    key={index}
                                >
                                    <Star
                                        className='text-zinc-600 h-5 w-5 hover:drop-shadow-lg md:cursor-pointer'
                                    />
                                </button>
                            )                   
                        ))
                    }
                </div>
                <div
                    className="text-sm text-zinc-700 font-semibold hover:opacity-70 cursor-default md:cursor-pointer"
                    onClick={(e)=>{
                        e.stopPropagation();
                        onOpen(course.ratings[0], mutate, course);
                    }}
                >
                    { course.ratings[0]?.comment ? "Update review" : "Write review" }
                </div>
            </div>
        </div>
    )
}
