"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
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
import { Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { ChaptersList } from "../../chapters/chapters-list";

const ChapterSchema = z.object({
    title : z.string().min(1)
});

interface ChaptersFormProps {
    initialData : Course & { chapters : Chapter[] }
    courseId : string;
}

export const ChaptersForm = ({
    initialData,
    courseId
} : ChaptersFormProps) => {

    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const toggleCreate = ()=>setIsCreating((prev)=>!prev);

    const form  = useForm<z.infer<typeof ChapterSchema>>({
        resolver : zodResolver(ChapterSchema),
        defaultValues : {
            title : ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof ChapterSchema>)=>{
        try {
            const response = await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("Chapter created")
            toggleCreate();
            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    const onReorder = async (updateData : {id: string, position: number}[]) => {
        try {
            setIsUpdating(true);
            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list : updateData
            });
            toast.success("Chapters reorderd");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {
        router.push(`/tutor/courses/${courseId}/chapters/${id}`)
    }

    return (
        <div className="mt-6 border bg-zinc-100 p-4 transition-transform relative">
            {
                isUpdating && (
                    <div className="absolute h-full w-full bg-zinc-500/20 top-0 right-0 rounded-m flex items-center justify-center">
                        <Loader2 className="animate-spin text-violet-600 h-6 w-6" />
                    </div>
                )
            }
            <div className="flex items-center justify-between font-medium text-zinc-800">
                <span className="font-semibold">Course Chapters</span>
                <Button
                    variant="ghost"
                    onClick={toggleCreate}
                >
                    {
                        isCreating ? (
                            <>Cancel</>
                        ) : (
                            <>
                               <PlusCircle className="h-4 w-4 mr-3" />
                               Add a chapter 
                            </>
                        )
                    }
                </Button>
            </div>
            {
                isCreating ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 mt-4"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder={`Introduction of the ${initialData.title}`}
                                                    className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                    {...field}
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
                                    onClick={toggleCreate}
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
                ) : (
                    <>
                        <div className={cn(
                            "text-sm mt-2 font-medium",
                            !initialData.chapters.length && "text-zinc-600 italic"
                        )}>
                            {
                                !initialData.chapters.length && "No Chapters"
                            }
                            <ChaptersList
                                onEdit = {onEdit}
                                onReorder = {onReorder}
                                items = {initialData.chapters}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                            Drag and drop to reorder the chapters
                        </p>
                    </>
                )
            }
        </div>
    )
}
