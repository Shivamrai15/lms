"use client";

import * as z from "zod";
import axios from "axios";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { QNASchema } from "@/schemas/qna.schema";
import { HiPaperAirplane } from "react-icons/hi2";
import { toast } from "sonner";
import { QNAResponse } from "@/types";


interface QNAFormProps {
    chapterId: string;
    addData: (value: QNAResponse)=>void; 
}

export const QNAForm = ({
    chapterId,
    addData
}: QNAFormProps ) => {
    
    const Editor = useMemo(()=>dynamic(()=>import("@/components/utils/editor"), {ssr:false}), []);

    const form = useForm<z.infer<typeof QNASchema>>({
        resolver : zodResolver(QNASchema),
        defaultValues : {
            question: "",
            chapterId
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values: z.infer<typeof QNASchema>)=> {
        try {
            const response = await axios.post("/api/user/qna", values);
            addData(response.data);
            form.setValue("question", "");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Form {...form}>
            <form
                className="w-full h-full flex items-center"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="w-[calc(100%-5rem)] h-full overflow-y-auto">
                    <FormField
                        control={form.control}
                        name="question"
                        render={({field})=>(
                            <FormItem>
                                <FormControl >
                                    <Editor 
                                        {...field}
                                        className="h-auto py-4"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-20 h-full flex items-center justify-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        <HiPaperAirplane className="h-8 w-8 text-zinc-600"/>
                    </Button>
                </div>
            </form>
        </Form>
    )
}
