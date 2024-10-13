"use client";

import Image from "next/image"; 
import { KeyedMutator } from "swr";

import { useSWRQuery } from "@/hooks/useSWRQuery";
import { Course, Rate } from "@prisma/client";
import { CardSkeleton } from "./card-skeleton";
import { Card } from "@/components/rating/card";


interface Response {
    data : ( Course & { ratings : Rate[] } )[];
    error : any
    isLoading : boolean;
    mutate : KeyedMutator<any>;
}

export const UserCourses = () => {
    
    const { data, error, isLoading, mutate } : Response = useSWRQuery("/api/user/courses");

    if (error) {
        return null;
    }

    return (
        <section className="py-16 px-6">
            <div className="max-w-4xl w-full mx-auto">
                <h1 className="text-xl md:text-2xl font-bold text-zinc-800">Enrolled Courses</h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
                    {
                        isLoading ? (
                            <>
                                <CardSkeleton className="w-full md:w-full"/>
                                <CardSkeleton className="w-full md:w-full"/>
                                <CardSkeleton className="w-full md:w-full"/>
                            </>
                        ) : (
                            <>
                                {data.length === 0 && (
                                    <div className="sm:col-span-2 md:col-span-3 w-full">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="relative h-60 aspect-square">
                                                <Image
                                                    src="/assets/empty.jpg"
                                                    fill
                                                    alt=""
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm text-zinc-600 font-medium text-center">
                                            You haven&apos;t enrolled in any courses yet. Check out our wide range of courses and enroll today!
                                        </p>
                                    </div>
                                )  } 
                                {
                                    data.map(course=>(
                                        <Card
                                            course={course}
                                            key={course.id}
                                            className="w-full md:w-full hover:scale-105 transition-all duration-300"
                                            mutate={mutate}
                                        />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
