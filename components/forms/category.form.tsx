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
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Course } from "@prisma/client";
import { Combobox } from "../ui/combobox";
import { cn } from "@/lib/utils";

const CategoryFormSchema = z.object({
    categoryId: z.string().min(1)
});

interface CategoryFormProps {
    initialData : Course;
    courseId : string;
    options : { label: string, value: string }[]; 
}

export const CategoryForm = ({
    initialData,
    courseId,
    options
} : CategoryFormProps) => {

    const router = useRouter();
    const [isEditing, setEditing] = useState(false);
    const toggleEdit = ()=>setEditing((prev)=>!prev);

    const form  = useForm<z.infer<typeof CategoryFormSchema>>({
        resolver : zodResolver(CategoryFormSchema),
        defaultValues : {
            categoryId : initialData.categoryId || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof CategoryFormSchema>)=>{
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

    const selectedOption = options.find((option)=>option.value===initialData.categoryId)?.label;

    return (
        <div className="mt-6 border bg-zinc-100 p-4 transition-transform">
            <div className="flex items-center justify-between font-medium text-zinc-800">
                <span className="font-semibold">Course Category</span>
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
                                Edit category
                            </>
                        ) : (
                            <>
                               <PlusCircle className="h-4 w-4 mr-3" />
                               Add category 
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    <p className={cn(
                        "text-sm text-zinc-700 mt-2 font-medium",
                        !initialData.categoryId && "italic"
                    )}>
                        {
                            initialData.categoryId ? (
                            selectedOption
                        ) : "Description is not available"}
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
                                    name="categoryId"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Combobox
                                                    options={options}
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
