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
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseSchema } from "@/schemas/course.schema";
import { toast } from "sonner";

export const CourseForm = () => {

    const router = useRouter();

    const form  = useForm<z.infer<typeof CourseSchema>>({
        resolver : zodResolver(CourseSchema),
        defaultValues : {
            title : ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values : z.infer<typeof CourseSchema>)=>{
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/tutor/courses/${response.data.id}`);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="max-w-5xl mx-auto w-full flex md:justify-center md:items-center h-full py-10 md:py-6">
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-zinc-800" >Name your course</h1>
                <p className="text-sm text-zinc-600">What would you like to name your course? Don&apos;t worry you can change it later*</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Course Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g 'Advance Backend'"
                                                className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                {...field}
                                                disabled = {isSubmitting}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            What will you teach in this course?
                                        </FormDescription>
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
                                onClick={()=>router.push("/")}
                                disabled = {isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="rounded-none h-14 font-semibold"
                                type="submit"
                                disabled = {isSubmitting || !isValid}
                            >
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
