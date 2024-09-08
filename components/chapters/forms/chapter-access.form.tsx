"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";


const formSchema = z.object({
    isFree : z.boolean().default(false)
})

interface ChapterAccessFormProps {
    initialData : {
        isFree : boolean;
    },
    courseId : string;
    chapterId : string;
}

export const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId
} : ChapterAccessFormProps) => {

    const router = useRouter();
    const [isEditing, setEditing] = useState(false);
    const toggleEdit = ()=>setEditing((prev)=>!prev);

    const form  = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            isFree : initialData.isFree
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof formSchema>)=>{
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter Updated")
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
                <span className="font-semibold">Chapter Access Settings</span>
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
                                Edit access
                            </>
                            
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    <p className={cn(
                        "text-sm text-zinc-700 mt-2 font-medium",
                    )}>
                        {
                            initialData.isFree ? "This chapter is free for preview." : "This chapter is paid."
                        }
                    </p>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 mt-4"
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="isFree"
                                    render={({field})=>(
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormDescription>
                                                    Check this box if you want to make this chapter free for preview
                                                </FormDescription>
                                            </div>
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
