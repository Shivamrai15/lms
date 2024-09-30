"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Note } from "@prisma/client";
import { 
    Form, 
    FormItem,
    FormField,
    FormControl,
} from "@/components/ui/form";
import { NotesSchema } from "@/schemas/notes.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { usePlayer } from "@/hooks/use-player";


interface NotesFormProps {
    onCancel: ()=>void;
    addNote: ( note: Note )=>void;
    courseId: string;
    chapterId: string; 
}

export const NotesForm = ({
    addNote,
    onCancel,
    chapterId,
    courseId
} : NotesFormProps) => {
    
    const Editor = useMemo(()=>dynamic(()=>import("@/components/utils/editor"), {ssr:false}), []);
    const [isLoading, setIsLoading] = useState(false);
    const { timeStamp } = usePlayer();

    const form = useForm<z.infer<typeof NotesSchema>>({
        resolver : zodResolver(NotesSchema),
        defaultValues : {
            note : "",
            time : timeStamp
        }
    });

    useEffect(()=>{
        form.setValue("time", timeStamp);
    }, [timeStamp]);

    const { isValid } = form.formState;

    const onCreate = async( value: z.infer<typeof NotesSchema>)=>{
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/notes`, value);
            addNote(response.data);
            onCancel();
            form.reset();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }  
    
    return (
        <Form {...form} >
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onCreate)}
            >
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="time"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter time in seconds"
                                        className="rounded-none h-12 border-zinc-500 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        onChange={(e)=>field.onChange(Number.parseInt(e.target.value))}
                                        type="number"
                                        step={1}
                                        value={field.value}
                                        disabled={true}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({field})=>(
                            <FormItem>
                                <FormControl className="w-full">
                                    <Editor
                                        onChange={field.onChange}
                                        value={field.value}
                                        className="border-2  py-4 border-zinc-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center justify-end gap-x-4">
                    <Button
                        variant="ghost"
                        className="text-zinc-800 font-medium"
                        disabled={isLoading}
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="rounded-none bg-neutral-800 hover:bg-neutral-800/80"
                        disabled={isLoading || !isValid}
                        type="submit"
                    >
                        Save Note
                    </Button>
                </div>
            </form>
        </Form>
    )
}
