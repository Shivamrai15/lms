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
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { ImageUpload } from "../../utils/image-upload";

const ImageSchema = z.object({
    image : z.string().min(1, {
        message : "Image is required"
    })
});

interface ImageFormProps {
    initialData : {
        image : string | null;
    },
    courseId : string;
}

export const ImageForm = ({
    initialData,
    courseId
} : ImageFormProps) => {

    const router = useRouter();
    const [isEditing, setEditing] = useState(false);
    const toggleEdit = ()=>setEditing((prev)=>!prev);

    const form  = useForm<z.infer<typeof ImageSchema>>({
        resolver : zodResolver(ImageSchema),
        defaultValues : {
            image : initialData.image || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof ImageSchema>)=>{
        try {
            const response = await axios.patch(`/api/courses/${courseId}`, values);
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
                <span className="font-semibold">Course Image</span>
                <Button
                    variant="ghost"
                    onClick={toggleEdit}
                >
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : initialData.image ? (
                            <>
                                <Pencil className="h-4 w-4 mr-3" />
                                Edit image
                            </>
                        ) : (
                            <>
                               <PlusCircle className="h-4 w-4 mr-3" />
                               Add an image 
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    !initialData.image ? (
                        <div className="flex items-center justify-center aspect-video bg-slate-200 rounded-md mt-2">
                            <ImageIcon className="h-10 w-10 text-zinc-500" />
                        </div>
                    ) : (
                        <div className="relative aspect-video mt-2">
                            <Image
                                src={initialData.image}
                                alt="Image"
                                fill
                                className="object-cover rounded-md"
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
                                    name="image"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value ? [field.value] : []}
                                                    disabled = {isSubmitting}
                                                    onChange={(url) => {
                                                        field.onChange(url);
                                                        console.log(url)
                                                    }}
                                                    onRemove={() => field.onChange("")}
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
        </div>
    )
}
