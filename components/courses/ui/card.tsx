"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { Course } from "@prisma/client";
import { UserRound } from "lucide-react";

interface CardProps {
    course : Course & { _count: {
        purchases: number;
    }};
    isBestSeller? : boolean;
}

export const Card = ({
    course,
    isBestSeller
} : CardProps ) => {

    const router = useRouter();

    return (
        <div
            className="w-56 md:w-72 space-y-4 border border-zinc-300 pb-6 rounded-md bg-neutral-800"
            onClick={()=>router.push(`/course/${course.id}`)}
        >
            <div className="w-full aspect-video relative overflow-hidden rounded-t-md">
                <Image
                    src={course.image!}
                    alt="Image"
                    fill
                    className="object-cover hover:scale-105 transition-all duration-300"
                />
            </div>
            <div className="px-6 space-y-2">
                <h1 className="font-semibold text-zinc-100 line-clamp-1">
                    {course.title}
                </h1>
                <div className="flex items-center gap-x-3">
                    <UserRound className="text-zinc-400 h-3 w-3" />
                    <span className="text-xs text-zinc-400" >{course._count.purchases}</span>
                </div>
                <div className="font-semibold text-emerald-500">
                    {formatPrice(course.price!)}
                </div>
                {
                    isBestSeller && (
                        <div>
                            <span className="bg-yellow-500/80 text-sm text-yellow-900 px-2 py-1 mt-2" >
                                Bestseller
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
