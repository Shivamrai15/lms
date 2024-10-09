"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

function convertSeconds(inp_seconds: number) {
    const hour = Math.floor(inp_seconds / 3600); 
    const minute = Math.floor((inp_seconds % 3600) / 60);
    const second = inp_seconds % 60;
  
    return  { hour, minute, second }
}

function convertToSeconds(value : z.infer<typeof formSchema>) {
    const totalSeconds = (value.hour * 3600) + (value.minute * 60) + value.second;
    return totalSeconds;
}


interface VideoLengthFormProps {
    initialData : {
        duration : number|null;
    },
    chapterId : string;
    courseId : string;
}


const formSchema = z.object({
    "hour" : z.number().min(0,
        {
            message : "Outside of hour range"
        }
    ),
    "minute" : z.number().min(0, {
        message : "Outside of minute range"
    }).max(59, {
        message : "Outside of minute range"
    }),
    "second" : z.number().min(0, {
        message : "Outside of second range"
    }).max(59, {
        message : "Outside of second range"
    }),
})

export const VideoLengthForm = ({
    chapterId,
    courseId,
    initialData
} : VideoLengthFormProps ) => {

    const router = useRouter();
    const [isEditing, setEditing] = useState(false);

    const toggleEdit = ()=>setEditing((prev)=>!prev);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData.duration ? convertSeconds(initialData.duration): undefined
    });

    const {hour, minute, second } = convertSeconds(initialData.duration||0);

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async( values: z.infer<typeof formSchema> )=>{
        try {
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, { duration: convertToSeconds(values)});
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
                <span className="font-semibold">Video Duration</span>
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
                                Edit duration
                            </>
                            
                        )
                    }
                </Button>
            </div>
            {
                !isEditing ? (
                    <p className="text-sm text-zinc-700 mt-2 font-medium">
                        {hour} hrs : {minute} min : {second} : sec
                    </p>
                ) : (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 mt-4"
                        >
                            <div className="grid grid-cols-3 gap-x-4">
                                <FormField
                                    control={form.control}
                                    name="hour"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Hours"
                                                    className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                    value={field.value}
                                                    onChange={(e)=>field.onChange(Number.parseInt(e.target.value))}
                                                    disabled = {isSubmitting}
                                                    type="number"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="minute"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Minutes"
                                                    className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                    value={field.value}
                                                    onChange={(e)=>field.onChange(Number.parseInt(e.target.value))}
                                                    disabled = {isSubmitting}
                                                    type="number"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="second"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Seconds"
                                                    className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                                    value={field.value}
                                                    onChange={(e)=>field.onChange(Number.parseInt(e.target.value))}
                                                    disabled = {isSubmitting}
                                                    type="number"
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
