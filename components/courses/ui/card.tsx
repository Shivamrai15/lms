"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { Course } from "@prisma/client";
import { UserRound } from "lucide-react";

interface CardProps {
    course : (Course & { _count: {purchases: number, ratings: number }, tutor : {name: string | null, id: string} } );
    isBestSeller? : boolean;
}

export const Card = ({
    course,
    isBestSeller
} : CardProps ) => {

    const router = useRouter();

    return (
        <div
            className="w-56 md:w-80 space-y-4 pb-6 bg-neutral-900/80 shadow-black shadow-md"
            onClick={()=>router.push(`/course/${course.id}`)}
        >
            <div className="w-full aspect-video relative">
                <Image
                    src={course.image!}
                    alt="Image"
                    fill
                    className="object-cover transition-all duration-300"
                />
            </div>
            <div className="px-6 space-y-2">
                <h1 className="font-semibold text-zinc-100 line-clamp-2">
                    {course.title}
                </h1>
                <p className="text-zinc-200 font-medium text-sm line-clamp-1">
                    {course.tutor.name}
                </p>
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
