"use client";

import { useRouter } from 'next/navigation';
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    query : z.string().min(1)
});

export const SearchForm = () => {

    const router = useRouter();
    
    const form =useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            query : ""
        }
    });

    const onSubmit = (values : z.infer<typeof formSchema>)=>{
        router.push(`/search?query=${values.query}`)
    }   



    return (
        <Form {...form}>
            <form 
                className="max-w-6xl w-full mx-auto py-10 px-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex bg-white/60 focus-within:bg-white items-center h-14 md:h-20 rounded-full px-4 md:px-6 transition-all">
                    <Search className='h-6 w-6 md:h-8 md:w-8 text-zinc-800' />
                    <FormField 
                        control={form.control}
                        name='query'
                        render={({field})=>(
                            <FormItem className='w-full'>
                                <FormControl className='w-full'>
                                    <Input 
                                        className="h-full w-full bg-transparent outline-none placeholder:text-zinc-500 focus:placeholder:text-zinc-800 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 border-none md:text-lg font-medium text-zinc-800 transition-all"
                                        placeholder='Search courses and keywords'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        variant="secondary"
                        className='rounded-full h-8 w-8 md:h-16 md:w-16'
                        type='submit'
                    >
                        <ChevronRight className='md:h-8 md:w-8 text-zinc-800' />
                    </Button>
                </div>
            </form>
        </Form>
    )
}
