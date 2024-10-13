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
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCommentModal } from "@/hooks/use-comment-modal";


interface CardProps {
    course : (Course & { ratings : Rate[] } );
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
                <p className="font-medium text-emerald-600">
                    {formatPrice(course.price!)}
                </p>
                {
                    isBestSeller && (
                        <span className="block px-2 py-1.5 bg-yellow-300 w-fit text-xs font-medium rounded-full border-b-2 border-yellow-800">
                            Bestseller
                        </span>
                    )
                }
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
                    { course.ratings[0].comment ? "Update review" : "Write review" }
                </div>
            </div>
        </div>
    )
}
