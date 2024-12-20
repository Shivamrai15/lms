"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2, Lock } from "lucide-react";
import { usePlayer } from "@/hooks/use-player";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { toast } from "sonner";
import axios from "axios";
import { useCertificate } from "@/hooks/use-certificate-modal";
import { useSession } from "next-auth/react";


interface VideoPlayerProps {
    chapterId: string;
    title: string;
    courseId: string;
    nextChapterId: string|undefined;
    videoUrl: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    thumbnail: string;
    certificate: boolean;
}
export const VideoPlayer = ({
    chapterId,
    completeOnEnd,
    courseId,
    isLocked,
    nextChapterId,
    title,
    videoUrl,
    thumbnail,
    certificate
} : VideoPlayerProps ) => {


    const router = useRouter();
    const session = useSession();
    const confetti = useConfettiStore();
    const { onOpen } = useCertificate();

    const [isReady, setIsReady] = useState(false);
    const { setSeek, setTimeStamp } = usePlayer();
    const videoRef = useRef<HTMLVideoElement|null>(null);
    const identityRef = useRef<HTMLDivElement|null>(null);

    const handleSeek = ( time:number )=>{
        if ( !videoRef.current ) {
            return;
        }
        videoRef.current.currentTime = time;
    }

    useEffect(()=>{
        const video = videoRef.current;
        if (!video){
            return;
        }
        const handleFullscreenChange = () => {
            const isFullScreen = document.fullscreenElement === videoRef.current;
            if (identityRef.current) {
                identityRef.current.style.display = isFullScreen ? 'block' : 'none';
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
    
        setSeek(handleSeek);
        const updateTime = () => setTimeStamp(Math.floor(video.currentTime));
        video.addEventListener('timeupdate', updateTime);
        return () => {
            video.removeEventListener('timeupdate', updateTime);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };

    }, []);


    useEffect(()=>{
        const interval = setInterval(()=>{
            if (identityRef.current) {
                const left = Math.floor(Math.random() * 101);
                const top = Math.floor(Math.random() * 101);
                identityRef.current.style.top = `${top}%`;
                identityRef.current.style.left = `${left}%`;
            }
        }, 1500);

        return ()=>{
            clearInterval(interval);
        }
    }, []);

    const onEnd = async()=>{
        try {
            
            if ( completeOnEnd ) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, { isCompleted : true })
            }

            let certificateId : string|null = null;

            if ( !certificate && !nextChapterId) {
                const response = await axios.post(`/api/courses/${courseId}/certificate`);
                certificateId = response.data.id;
            }

            if (!nextChapterId) {
                confetti.onOpen();
            }
            if (nextChapterId) {
                router.push(`/course/${courseId}/view/chapter/${nextChapterId}`);
            }

            toast.success("Progress Update");
            router.refresh();

            if ( certificateId ) {
                onOpen(certificateId);
            }

        } catch (error) {
            toast.error("Something went wrong");
        }
    }


    return (
        <div className="relative w-full aspect-video md:aspect-[5/2] overflow-hidden bg-neutral-900">
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
                    <video
                        className="w-full aspect-video md:aspect-[5/2]"
                        src={videoUrl}
                        id={chapterId}
                        controls
                        controlsList="nodownload" 
                        onContextMenu={()=>{return false}}
                        ref={videoRef}
                        onEnded={onEnd}
                    ></video>
                )
            }
            <div
                className="absolute bg-red-400/40 text-zinc-100 rounded-lg left-0 top-0 px-4 py-2"
                ref={identityRef}
            >
                {session.data?.user.email}
            </div>
        </div>
    )
}
