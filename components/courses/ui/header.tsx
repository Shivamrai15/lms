"use client";

import { useRouter } from "next/navigation";
import { Abril_Fatface } from "next/font/google";
import { 
    Category,
    Chapter, 
    Course, 
    SubCategory,
} from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CourseEnrollButton } from "@/components/utils/course-enroll-button";
import Image from "next/image";

const font =  Abril_Fatface({
    subsets : ["latin"],
    weight : ["400"]
});

interface HeaderProps {
    course : Course & { subCategory : (SubCategory & { category: Category })|null, chapters : Chapter[], tutor : {id: string, name: string|null, image: string|null},  _count : {purchases: number, ratings: number }  };
}

export const Header = ({
    course,
} : HeaderProps) => {
    
    const router = useRouter();
    
    return (
        <header className="w-full bg-neutral-800 px-6 md:px-12 lg:px-24 py-20 rounded-b-3xl md:rounded-b-[7rem]">
            <div className="max-w-6xl w-full mx-auto flex items-center">
                <div className="w-full md:w-1/2 space-y-6">
                    <div className="space-y-4">
                        <h1 className={`${font.className} text-xl md:text-4xl text-white`}>
                            {course.title}
                        </h1>
                        <h2 className="text-zinc-200 md:text-lg">
                            {course.shortDescription}
                        </h2>
                    </div>
                    <div className="space-y-2 text-sm text-white ">
                        Created by {course.tutor.name}
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
