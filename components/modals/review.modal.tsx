"use client";

import * as z from "zod";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useCommentModal } from "@/hooks/use-comment-modal";
import { FaStar } from "react-icons/fa6";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";

const formSchema = z.object({
    comment : z.string().min(1)
})

export const ReviewModal = () => {

    const { course, isOpen, mutate, onClose, rating } = useCommentModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            comment : rating?.comment || ""
        }
    });

    useEffect(()=>{
        if (rating) {
            form.setValue("comment", rating.comment||"");
        }
    }, [rating]);


    const onOpenChange = (open: boolean)=>{
        if (!open) {
            onClose();
        }
    }
    const stars = [1, 2, 3, 4, 5];

    const { isValid, isSubmitting } = form.formState;
    
    const onSubmit = async(values: z.infer<typeof formSchema>)=>{
        try {

            if ( course ) {
                await axios.put(`/api/user/rating`, {
                    courseId : course.id,
                    comment : values.comment,
                });
                if (mutate) {
                    mutate();
                }
                form.reset();
                onClose();
            }

        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="rounded-none md:rounded-none">
                <div className="flex flex-col items-center gap-x-4 py-6">
                    <h1 className="text-center text-lg md:text-xl text-zinc-800 font-bold">Why did you leave this rating?</h1>
                    <div className="mt-6">
                        <div className="flex gap-x-2 items-center">
                            { stars.map((value, index)=>(
                                value <= (rating?.star || 0) ? (
                                    <FaStar
                                        key={index}
                                        className="h-6 w-6 text-zinc-600"
                                    />
                                ) : (
                                    <Star
                                        key={index}
                                        className="h-6 w-6 text-zinc-600"
                                    />
                                )
                            )) }
                        </div>
                    </div>
                </div>
                <Form {...form}>
                    <form
                        className="space-y-6 mb-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div>
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                className="border-zinc-400 border-2 rounded-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none text-zinc-800"
                                                {...field}
                                                placeholder="Share your personal experience with this course. Did it meet your expectations?"
                                                rows={6}
                                                disabled={isSubmitting}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            size="lg"
                            className="bg-neutral-800 hover:bg-neutral-800/80 w-full rounded-none"
                            type="submit"
                            disabled={isSubmitting || !isValid}
                        >
                            Save and Continue
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
