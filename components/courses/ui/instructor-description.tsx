"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { Heading } from "@/components/utils/heading";
import { SlBadge } from "react-icons/sl";
import { UsersRound } from "lucide-react";
import { FaCirclePlay } from "react-icons/fa6";
import { cn } from "@/lib/utils";


interface InstructorDescriptionProps {
    tutor: {
        profile: {
            description: string | null;
            headline: string|null;
        } | null;
        id: string;
        image: string | null;
        _count: {
            courses: number;
        };
        name: string | null;
        courses: {
            _count: {
                purchases: number;
                ratings: number;
            };
        }[];
    }
    
}

export const InstructorDescription = ({
    tutor
}: InstructorDescriptionProps ) => {

    const Preview = useMemo(()=>dynamic(()=>import("@/components/utils/preview"), {ssr:false}), []);
    
    return (
        <section className="w-full mt-20" >
            <div className="max-w-3xl mx-auto space-y-6">
                <Heading className="text-2xl md:text-3xl font-bold text-zinc-700">
                    Instructor
                </Heading>
                <div className="space-y-4">
                    <div className="space-y-0">
                        <Heading className="text-xl md:text-2xl font-semibold text-violet-700" >{tutor.name}</Heading>
                        <p className="text-zinc-700 text-base font-medium">{tutor.profile?.headline}</p>
                    </div>
                    <div className="flex items-start gap-x-8">
                        <div className="relative size-28 md:size-36 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
                            {
                                tutor.image ? (
                                    <Image
                                        src={tutor.image}
                                        alt={tutor.name||"Instructor"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Heading>
                                        {tutor.name?.charAt(0)??"I"}
                                    </Heading>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-y-2 py-4">
                            <div className="flex items-center gap-x-4 text-zinc-800 font-medium">
                                <SlBadge className="size-5" fill="#27272a" />
                                <span className="text-sm">{tutor.courses.reduce((prev, curr)=>{
                                    return prev+curr._count.ratings
                                }, 0).toLocaleString()} Reviews</span>
                            </div>
                            <div className="flex items-center gap-x-4 text-zinc-800 font-medium">
                                <UsersRound className="size-5" fill="#27272a" />
                                <span className="text-sm">{tutor.courses.reduce((prev, curr)=>{
                                    return prev+curr._count.purchases
                                }, 0).toLocaleString()} Students</span>
                            </div>
                            <div className="flex items-center gap-x-4 text-zinc-800 font-medium">
                                <FaCirclePlay className="size-5" fill="#27272a" />
                                <span className="text-sm">{tutor._count.courses} Courses</span>
                            </div>
                        </div>
                    </div>
                    <div 
                        className="text-zinc-700 relative h-auto mt-6"
                    >
                        <Preview value={tutor.profile?.description??""}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
