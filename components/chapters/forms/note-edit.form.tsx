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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { usePlayer } from "@/hooks/use-player";
import { useNotes } from "@/hooks/use-notes";



interface NoteEditFormProps {
    note: Note;
    chapterId: string;
    courseId: string;
    onCancel: ()=>void;
}

const formSchema = z.object({
    note: z.string().min(1)
});

export const NoteEditForm = ({
    note,
    courseId,
    chapterId,
    onCancel,
}: NoteEditFormProps ) => {

    const Editor = useMemo(()=>dynamic(()=>import("@/components/utils/editor"), {ssr:false}), []);
    const [isLoading, setIsLoading] = useState(false);
    const { updateNote } = useNotes();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            note : note.note,
        }
    });

    const { isValid } = form.formState;


    const onUpdate = async( value: z.infer<typeof formSchema>)=>{
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/notes?id=${note.id}`, value);
            updateNote(response.data);
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
                onSubmit={form.handleSubmit(onUpdate)}
            >
                <div>
                    <FormField
                        control={form.control}
                        name="note"
                        render={({field})=>(
                            <FormItem>
                                <FormControl className="w-full">
                                    <Editor
                                        onChange={field.onChange}
                                        value={field.value}
                                        className="border-2 py-4 border-zinc-500 min-h-0 h-fit"
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
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    )
}
