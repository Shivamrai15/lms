"use client"

import { Badge } from "@/components/ui/badge"
import { Course } from "@prisma/client"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CourseTutorCardProps {
    course : Course
}

export const CourseTutorCard = ({
    course
} : CourseTutorCardProps) => {

    const router = useRouter();

    return (
        <div
            onClick={()=>router.push(`/tutor/courses/${course.id}`)}
            className='w-full p-2 bg-zinc-100 rounded-md shadow-md space-y-4 hover:scale-105 transition-all border border-zinc-200 duration-300'
        >
            <div className="aspect-video w-full rounded-md overflow-hidden relative">
                {
                    course.image ? (
                        <Image
                            src={course.image}
                            alt="Image"
                            fill
                            className="object-cover"
                        /> 
                    ) : (
                        <div className="h-full w-full flex items-center justify-center border rounded-md bg-zinc-200">
                            <ImageIcon className="h-6 w-6 text-zinc-600" />
                        </div>
                    )
                }
            </div>
            <div className="space-y-2 px-2 pb-2">
                <h2 className="text-zinc-700 font-medium">{course.title}</h2>
                <Badge>
                    {
                        course.isPublished ? "Published" : "Unpublished"
                    }
                </Badge>
            </div>
        </div>
    )
}
