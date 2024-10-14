"use client";

import Image from "next/image"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface UnauthorizedProps {
    courseId: string;
}

export const Unauthorized = ({
    courseId
}: UnauthorizedProps) => {

    const router = useRouter();

    return (
        <div className="h-full w-full">
            <div className="h-full flex flex-col items-center justify-center p-6 space-y-10 md:space-y-16">
                <div className="w-52 md:w-60 aspect-square relative">
                    <Image
                        src="/assets/3922671_2073829.avif"
                        alt=""
                        fill
                        className="object-contain"
                    />
                </div>
                <div
                    className="space-y-4 flex flex-col items-center justify-center"
                >
                    <p className="text-sm font-medium text-zinc-700">
                        Quiz not found. Explore the course by clicking the button below.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-none bg-violet-600 hover:bg-violet-600/80"
                        onClick={()=>router.push(`/course/${courseId}`)}
                    >
                        Go to course
                    </Button>
                </div>
            </div>
        </div>
    )
}
