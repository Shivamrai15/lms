"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget, CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

import { Button } from "@/components/ui/button";
import { Trash, VideoIcon } from "lucide-react";

interface VideoUploadProps {
    value : string[];
    disabled : boolean;
    onChange : (value : string) => void;
    onRemove : (value : string) => void;
}

export const VideoUpload = ({
    value,
    disabled,
    onChange,
    onRemove
} : VideoUploadProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    const onUpload = (result : any)=>{
        onChange(result.info.secure_url)
    }


    if (!isMounted){
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {
                    value.map((url)=>(
                        <div
                            key={url}
                            className="relative w-full aspect-video rounded-md overflow-hidden"
                        >
                            <div className="z-10 absolute top-2 right-2">
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    type="button"
                                    onClick={() => onRemove(url)}
                                >
                                    <Trash className="h-4 w-4"/>
                                </Button>
                            </div>
                            <CldVideoPlayer
                                width="1920"
                                height="1080"
                                src={url}
                            />
                        </div>
                    ))
                }
            </div>
            <CldUploadWidget
                onSuccess={onUpload}
                uploadPreset="f3ytpcsd"
                options={{
                    clientAllowedFormats : ["mp4"],
                    folder : "lms",
                    resourceType : "video",
                }}
            >
                { ({open}) => {
                    const onClick = ()=>{
                        open();
                    }
                    return (
                        <Button
                            type="button"
                            disabled = {disabled}
                            onClick={onClick}
                            variant="secondary"
                            className="w-full"
                        >
                            <VideoIcon className="h-4 w-4 mr-2" />
                            Upload a video 
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}