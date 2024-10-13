"use client";

import { Course } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CourseProgress } from "../courses/ui/course-progress";
import { BookOpen } from "lucide-react";

interface ProgressCardProps {
    course : Course & { progress : number|null, _count: {
        chapters: number;
    }}
}

export const ProgressCard = ({
    course
}: ProgressCardProps ) => {
    
    const router = useRouter();

    return (
        <div 
            className="w-full space-y-6 p-3 pb-6 bg-white shadow-md border rounded-md group hover:scale-105 transition-all duration-300"
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
        </div>
    )
}
