"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { File, Pencil } from "lucide-react";
import { useState } from "react";
import { Attachment } from "@prisma/client";
import { FileUpload } from "@/components/utils/file-upload";


const formSchema = z.object({
    name : z.string().min(1),
    url : z.string().min(1)
})

interface ResourcesFormProps {
    initialData : {
        attachments : Attachment[]
    },
    chapterId : string;
    courseId : string;
}

export const ResourcesForm = ({
    initialData,
    chapterId,
    courseId
} : ResourcesFormProps) => {

    const router = useRouter();
    const [isEditing, setEditing] = useState(false);
    const toggleEdit = ()=>setEditing((prev)=>!prev);

    const form  = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData.attachments[0] ? initialData.attachments[0] : {
            name : "",
            url : ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof formSchema>)=>{
        try {

            if (!initialData.attachments.length) {
                await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/resource`, values);
                toast.success("Resource added");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/resource?id=${initialData.attachments[0].id}`, values);
                toast.success("Resource updated");
            }

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
                <span className="font-semibold">Resources</span>
                <Button
                    variant="ghost"
                    onClick={toggleEdit}
                >
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <Pencil className="h-4 w-4 mr-3" />
                                Edit title
                            </>
                            
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    <div>
                        {
                            !initialData.attachments.length ? (
                                <p className="text-sm text-zinc-700 mt-2 font-medium italic">
                                    No resources are added
                                </p>
                            ) : (
                                <div className="flex items-center text-sm text-zinc-700 mt-2 font-medium ">
                                    <File className="h-4 w-4 mr-3" />
                                    <span className="line-clamp-1">{initialData.attachments[0].name}</span>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 mt-4"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g 'Theory of course'"
                                                    className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                    {...field}
                                                    disabled = {isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="url"
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
        </div>
    )
}
