"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import { 
    FaCircleInfo, 
    FaLinkedin, 
    FaGithub,
    FaXTwitter,
    FaYoutube
} from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Preview from "@/components/utils/preview";
import { UserProgress } from "@prisma/client";
import { CourseProgressButton } from "@/components/courses/ui/course-progress-button";


interface OverviewProps {
    chapterId : string;
    courseId : string;
    shortDescription : string;
    ratings : number;
    purchases : number;
    description : string;
    updatedAt : Date;
    tutor : {
        name: string|null;
        image: string|null;
        profile : {
            description: string|null;
            headline : string|null;
            facebookLink : string|null;
            githubLink : string|null;
            websiteLink : string|null;
            linkedinLink : string|null;
            twitterLink : string|null;
            youtubeLink :string|null;
        }|null;
    };
    isPurchased : boolean;
    nextChapterId? : string;
    userProgress: UserProgress|null;
}

export const Overview = ({
    chapterId,
    courseId,
    description,
    purchases,
    ratings,
    shortDescription,
    tutor,
    updatedAt,
    isPurchased,
    nextChapterId,
    userProgress
} : OverviewProps) => {

    return (
        <div className="w-full px-6 md:px-10 pb-10 pt-6">
            <div className="w-full flex flex-col gap-y-8">
                <h1 className="text-zinc-700 text-lg md:text-xl font-medium">
                    {shortDescription}
                </h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-4 gap-x-10">
                        <div className="flex flex-col">
                            {/* TODO AVG ratings and stars */}
                            <span className="text-zinc-600 text-xs font-medium">
                                {ratings} ratings
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-zinc-800 font-semibold">{purchases}</span>
                            <span className="text-zinc-600 text-xs font-medium">
                                students
                            </span>
                        </div>
                    </div>
                    {
                        isPurchased && (
                            <CourseProgressButton
                                chapterId={chapterId}
                                courseId={courseId}
                                nextChapterId={nextChapterId}
                                isCompleted={!!userProgress?.isCompleted}
                            />
                        )
                    }
                </div>
                <div className="flex items-center gap-x-3">
                    <FaCircleInfo className="h-5 w-5" />
                    <span className="text-base font-medium">Last updated {format(updatedAt, "MMMM yyyy")}</span>
                </div>
            </div>
            <Separator className="mt-8 text-zinc-300"/>
            <div className="mt-8 space-y-6 w-full">
                <div className="flex items-center gap-x-6">
                    <div className="h-14 w-14 shrink-0 relative">
                        <Image
                            src="/assets/certificate.png"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl text-zinc-700 font-semibold">Certificate</h2>
                        <p className="text-sm text-zinc-700 font-medium">Get LearnIT certificate by completing entire course</p>
                    </div>
                </div>
                <div className="w-full">
                    <Button 
                        className="w-full rounded-none border-2 border-zinc-400 text-zinc-700 font-semibold"
                        variant="outline"
                        disabled
                    >
                        LearnIT Certificate
                    </Button>
                </div>
            </div>
            <Separator className="mt-8 text-zinc-300"/>
            <div className="mt-8 space-y-3 w-full">
                <div className="flex items-center gap-x-6">
                    <div className="h-14 w-14 shrink-0 relative">
                        <Image
                            src="/assets/about.png"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl text-zinc-700 font-semibold">Chapter Description</h2>
                    </div>
                </div>
                <Preview value={description} />
            </div>
            <Separator className="mt-8 text-zinc-300"/>
            <div className="mt-8 space-y-3 w-full">
                <div className="flex items-start gap-x-6">
                    <div className="h-14 w-14 shrink-0 relative">
                        <Image
                            src="/assets/avatar.png"
                            alt=""
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl text-zinc-700 font-semibold">{tutor.name}</h2>
                        <p className="text-sm text-zinc-700 font-medium">{tutor.profile?.headline || "Instructor"}</p>
                        <div className="flex items-center justify-start flex-wrap gap-4 mt-4">
                            {
                                tutor.profile?.linkedinLink && (
                                    <Link
                                        href={tutor.profile.linkedinLink}
                                    >
                                        <div className="h-9 w-9 bg-muted flex items-center justify-center">
                                            <FaLinkedin className="h-6 w-6 text-[#0072b1]"/>
                                        </div>
                                    </Link>
                                )
                            }
                            {
                                tutor.profile?.githubLink && (
                                    <Link
                                        href={tutor.profile.githubLink}
                                    >
                                        <div className="h-9 w-9 bg-muted flex items-center justify-center">
                                            <FaGithub className="h-6 w-6 text-neutral-900"/>
                                        </div>
                                    </Link>
                                )
                            }
                            {
                                tutor.profile?.facebookLink && (
                                    <Link
                                        href={tutor.profile.facebookLink}
                                    >
                                        <div className="h-9 w-9 bg-muted flex items-center justify-center">
                                            <FaFacebookSquare className="h-6 w-6 text-[#4267B2]"/>
                                        </div>
                                    </Link>
                                )
                            }
                            {
                                tutor.profile?.twitterLink && (
                                    <Link
                                        href={tutor.profile.twitterLink}
                                    >
                                        <div className="h-9 w-9 bg-muted flex items-center justify-center">
                                            <FaXTwitter className="h-6 w-6 text-zinc-900"/>
                                        </div>
                                    </Link>
                                )
                            }
                            {
                                tutor.profile?.youtubeLink && (
                                    <Link
                                        href={tutor.profile.youtubeLink}
                                    >
                                        <div className="h-9 w-9 bg-muted flex items-center justify-center">
                                            <FaYoutube className="h-6 w-6 text-red-600"/>
                                        </div>
                                    </Link>
                                )
                            }
                            {
                                tutor.profile?.websiteLink && (
                                    <Link
                                        href={tutor.profile.websiteLink}
                                    >
                                        <div className="h-9 w-9 bg-muted flex items-center justify-center">
                                            <IoMdLink className="h-6 w-6 text-zinc-800"/>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Preview value={tutor.profile?.description||""} />
            </div>
        </div>
    )
}
