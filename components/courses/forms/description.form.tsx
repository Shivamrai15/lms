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
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { DescriptionSchema } from "@/schemas/description.schema";
import { cn } from "@/lib/utils";
import { Editor } from "../../utils/editor";


interface DescriptionFormProps {
    initialData : {
        description : string|null;
    },
    courseId : string;
}

export const DescriptionForm = ({
    initialData,
    courseId
} : DescriptionFormProps) => {

    const router = useRouter();
    const [isEditing, setEditing] = useState(false);
    const toggleEdit = ()=>setEditing((prev)=>!prev);

    const form  = useForm<z.infer<typeof DescriptionSchema>>({
        resolver : zodResolver(DescriptionSchema),
        defaultValues : {
            description : initialData.description||""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof DescriptionSchema>)=>{
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
                <span className="font-semibold">Course Description</span>
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
                                Edit description
                            </>
                            
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    <div className={cn(
                        "text-sm text-zinc-700 mt-2 font-medium",
                        !initialData.description && "italic"
                    )}>
                        {
                            initialData.description ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: initialData.description }}
                            />
                        ) : "Description is not available"}
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
                                    name="description"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl className="bg-white">
                                                <Editor
                                                    {...field}
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
