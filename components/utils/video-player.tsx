"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { CldVideoPlayer } from "next-cloudinary";

import 'next-cloudinary/dist/cld-video-player.css';

interface VideoPlayerProps {
    chapterId: string;
    title: string;
    courseId: string;
    nextChapterId: string|undefined;
    videoUrl: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    thumbnail: string;
}
export const VideoPlayer = ({
    chapterId,
    completeOnEnd,
    courseId,
    isLocked,
    nextChapterId,
    title,
    videoUrl,
    thumbnail
} : VideoPlayerProps ) => {

    const [isReady, setIsReady] = useState(false);

    return (
        <div className="relative aspect-video">
            {
                isReady && !isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
                        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                    </div>
                )
            } {
                isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center backdrop-brightness-50 flex-col gap-2 text-secondary" style={{ backgroundImage : `url('${thumbnail}')`, backgroundRepeat : "no-repeat", backgroundSize : "cover" }} >
                        <div className="h-full w-full backdrop-brightness-[.2] flex flex-col items-center justify-center space-y-2">
                            <Lock className="h-8 w-8"/>
                            <p className="text-sm">
                                This chapter is locked
                            </p>
                        </div>
                    </div>
                )
            }
            {
                !isLocked && (
                    <CldVideoPlayer
                        width="1920"
                        height="1080"
                        src={videoUrl}
                        onMetadataLoad={()=>setIsReady(true)}
                        autoPlay
                        onEnded={()=>{}}
                    />
                )
            }
        </div>
    )
}
