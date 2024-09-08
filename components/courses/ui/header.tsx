"use client";

import { Button } from "@/components/ui/button";
import { CourseEnrollButton } from "@/components/utils/course-enroll-button";
import { Category, Course } from "@prisma/client"
import { User } from "next-auth";
import { useRouter } from "next/navigation";

interface HeaderProps {
    course : Course & { category : Category|null };
    tutor : User;
}

export const Header = ({
    course,
    tutor,
} : HeaderProps) => {
    
    const router = useRouter();
    
    return (
        <header className="w-full bg-neutral-800 px-6 md:px-12 lg:px-24 py-10">
            <div className="max-w-2xl w-full space-y-6">
                <div className="space-y-2">
                    <h1 className="text-xl md:text-3xl font-semibold text-white">
                        {course.title}
                    </h1>
                    <h2 className="text-zinc-400 text-lg md:text-xl font-medium">
                        {course.category?.name}
                    </h2>
                </div>
                <div className="space-y-2 text-white font-medium">
                    Created by {tutor.name}
                </div>
                <div className="flex items-center gap-x-2">
                    <Button
                        className='h-14 bg-violet-600 hover:bg-violet-700/90 rounded-none w-full md:w-auto'
                        onClick={()=>router.push(`/course/${course.id}/view`)}
                    >
                        View Course
                    </Button>
                </div>
            </div>
        </header>
    )
}
