"use client";


import { useEffect } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import axios from "axios";
import { Option } from "@prisma/client";
import { toast } from "sonner";
import { OptionSchema } from "@/schemas/option.schema";
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";


interface QuizOptionProps {
    option: Option;
    chapterId: string;
    courseId: string;
    index : number;
    disabled: boolean;
}


export const QuizOption = ({
    option,
    chapterId,
    courseId,
    index,
    disabled
} : QuizOptionProps ) => {

    
    const form = useForm<z.infer<typeof OptionSchema>>({
        resolver : zodResolver(OptionSchema),
        defaultValues : {
            isCorrect : option.isCorrect,
            answer : option.answer
        }
    });


    const { isValid } = form.formState;
    const w = form.watch();

    const updateOption = async(value:z.infer<typeof OptionSchema>)=> {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/quiz/question/${option.questionId}/option?id=${option.id}`, value);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
        }
    }

    useEffect(()=>{
        if (isValid && (w.answer !== option.answer || w.isCorrect!=option.isCorrect)) {
            const timer = setTimeout(()=>{
                updateOption(w);
            }, 1000);
            return ()=>clearTimeout(timer);
        }
    }, [w]);



    return (
        <Form {...form}>
            <form
                className="flex items-center gap-x-4 w-full"
            >   
                <FormField
                    control={form.control}
                    name="isCorrect"
                    render={(({field})=>(
                        <FormItem>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    ))}
                />
                <FormField
                    control={form.control}
                    name="answer"
                    render={(({field})=>(
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="rounded-none h-10 border-0 w-full outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-400 focus:bg-zinc-50 font-medium text-zinc-800  focus:border-b-2"
                                    placeholder={`Option ${index}`}
                                    {...field}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    ))}
                />
            </form>
        </Form>
    )
}
