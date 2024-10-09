"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { Chapter } from "@prisma/client";
import { VideoUpload } from "@/components/utils/video-upload";
import { FileUpload } from "@/components/utils/file-upload";

const VideoSchema = z.object({
    videoUrl : z.string().min(1)
});

interface VideoFormProps {
    initialData : Chapter
    courseId : string;
    chapterId: string;
}

export const VideoForm = ({
    initialData,
    courseId,
    chapterId
} : VideoFormProps) => {

    const router = useRouter();
    const [isEditing, setEditing] = useState(false);
    const toggleEdit = ()=>setEditing((prev)=>!prev);

    const form  = useForm<z.infer<typeof VideoSchema>>({
        resolver : zodResolver(VideoSchema),
        defaultValues : {
            videoUrl : initialData.videoUrl || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof VideoSchema>)=>{
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Course Updated")
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="mt-6 border bg-zinc-100 p-4 transition-transform">
            <div className="flex items-center justify-between font-medium text-zinc-800">
                <span className="font-semibold">Chapter Video</span>
                <Button
                    variant="ghost"
                    onClick={toggleEdit}
                >
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : initialData.videoUrl ? (
                            <>
                                <Pencil className="h-4 w-4 mr-3" />
                                Edit video
                            </>
                        ) : (
                            <>
                               <PlusCircle className="h-4 w-4 mr-3" />
                               Add video
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    !initialData.videoUrl ? (
                        <div className="flex items-center justify-center aspect-video bg-slate-200 rounded-md mt-2">
                            <VideoIcon className="h-10 w-10 text-zinc-500" />
                        </div>
                    ) : (
                        <div className="relative aspect-video mt-2">
                            <CldVideoPlayer
                                width="1920"
                                height="1080"
                                src={initialData.videoUrl}
                            />
                        </div>
                    )
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 mt-4"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="videoUrl"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    onChange={(url) => field.onChange(url)}
                                                    disabled = {isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="rounded-none h-14 font-semibold"
                                    type="button"
                                    onClick={toggleEdit}
                                    disabled = {isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="rounded-none h-14 font-semibold"
                                    type="submit"
                                    disabled = {isSubmitting || !isValid}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Form>
                )
            }
            { initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Videos can take a few minutes to process
                </div>
            )}
        </div>
    )
}
