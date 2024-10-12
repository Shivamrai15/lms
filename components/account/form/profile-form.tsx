"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ProfileSchema } from "@/schemas/profile.schema";
import { Input } from "@/components/ui/input";
import { Gender } from "@prisma/client";
import { format } from "date-fns";


interface ProfileFormProps {
    name : string;
    headline? : string;
    description? : string;
    gender? : Gender
}


export const ProfileForm = ({
    name,
    description,
    gender,
    headline
} : ProfileFormProps ) => {
    
    const router = useRouter();
    const Editor = useMemo(()=>dynamic(()=>import("@/components/utils/editor"), {ssr:false}), []);

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver : zodResolver(ProfileSchema),
        defaultValues : {
            name,
            headline,
            gender,
            description : description || ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values: z.infer<typeof ProfileSchema>)=>{
        try {
            await axios.patch(`/api/user/profile`, values);
            toast.success("Profile Updated");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    
    return (
        <Form {...form}>
            <form
                className="w-full space-y-10"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                        {...field}
                                        disabled = {isSubmitting}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="headline"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Headline"
                                        className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500"
                                        {...field}
                                        disabled = {isSubmitting}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({field})=>(
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting} >
                                    <FormControl>
                                        <SelectTrigger className="rounded-none h-14 border-zinc-400 border-2 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-500">
                                            <SelectValue placeholder="Select your gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                        <SelectItem value="OTHERS">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Editor
                                        {...field}
                                        className="border-zinc-400 border-2 py-4"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Please provide a brief overview of your academic background, including any relevant degrees, certifications, or areas of expertise. Include details about your employment history, highlighting key roles and responsibilities.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center justify-end">
                    <Button 
                        className="bg-neutral-800 rounded-none"
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        size="lg"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}
