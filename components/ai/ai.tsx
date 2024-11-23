"use client";

import {
    useEffect,
    useRef,
    useState
} from 'react';
import Image from 'next/image';
import { Ollama } from 'ollama/browser';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useChat } from '@/hooks/use-chat';
import { v4 as uuidv4 } from 'uuid';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckIcon, ChevronRight, CopyIcon, Loader2 } from 'lucide-react';
import { ChatResponse } from './chat';
import { MdPadding } from 'react-icons/md';

interface AIProps {
    chapterId: string;
    title: string;
}

const formSchema = z.object({
    prompt : z.string().min(3)
});


export const AI = ({
    chapterId,
    title
}: AIProps ) => {
    
    const session = useSession();

    const ollama = new Ollama({
        host: 'http://127.0.0.1:11434',
    });

    const ref = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const[loading, setLoading] = useState(false);
    const [thinking, setThinking] = useState(false)
    
    const { addChat, getUserChat, addResponse, messages } = useChat();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            prompt : ""
        }
    });


    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };


    const onPromptSubmit = async ({ prompt }: z.infer<typeof formSchema>) => {
        try {
            
            setLoading(true);
            setThinking(true)
            form.reset();
            const id = uuidv4();
            addChat(id, chapterId, prompt, session.data?.user.id||"");
            const response = await ollama.chat({
                model: 'llama3.2',
                messages: [
                    { 
                        role: 'user',
                        content: `You are a helpful chatbot that provides answers strictly related to the title of the current chapter. Only respond with information relevant to the chapter's topic. If the user's question is unrelated, politely redirect them to focus on the chapter's title. The current chapter is titled: ${title}
                                Question ${prompt}`,
                    }
                ],
                stream : true,
            });
            setThinking(false)

            for await (const part of response) {
                addResponse(id, part.message.content);
            }

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(()=>{
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, [addResponse, messages]);



    return (
        <div
           className="h-full w-full relative overflow-y-auto scroll-smooth"
        >
            <div 
                className='flex flex-col gap-y-16 px-6 py-10 min-h-full max-w-3xl w-full mx-auto'
            >
                {
                    getUserChat(chapterId, session.data?.user.id||"").map((message)=>(
                        <div 
                            className='w-full space-y-10'
                            key={message.id}
                        >
                            <div
                                className='w-full flex items-center justify-end'
                            >
                                <div className='max-w-xl w-full p-4 bg-neutral-100 border border-zinc-200/80 rounded-xl rounded-tr-none'>
                                    <p className='text-zinc-700 text-[15px] font-[400]' >
                                        {message.chat}
                                    </p>
                                </div>
                            </div>
                            <div className='w-full flex items-start gap-x-4'>
                                <div className='h-9 w-9 relative rounded-full bg-neutral-100 shrink-0 overflow-hidden flex items-center justify-center border border-zinc-200'>
                                    <Image
                                        src="/assets/ai-avatar.png"
                                        height={20}
                                        width={20}
                                        alt='AI'
                                        className='object-contain'
                                    />
                                </div>
                                <div className='w-[calc(100%-52px)] space-y-4'>
                                    {
                                        thinking && (
                                            <div className='py-1'>
                                                <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
                                            </div>
                                        )
                                    }
                                    <ChatResponse response={message.response} />
                                    <Button
                                        variant="outline"
                                        className='p-2 h-8'
                                        onClick={()=>handleCopy(message.response)}
                                    >
                                        {
                                            copied ? <CheckIcon className='size-4'/> : <CopyIcon className='size-4'/>
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className='h-0' ref={ref} />
            </div>
            <div className='px-6 py-6 w-full flex items-center justify-center sticky bottom-0 bg-gradient-to-b from-transparent via-30% via-white to-white'>
                <Form {...form}>
                    <form
                        className='max-w-3xl w-full bg-white shadow-md border border-zinc-200 mx-auto h-14 md:h-20 rounded-full overflow-hidden flex items-center px-6'
                        onSubmit={form.handleSubmit(onPromptSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name='prompt'
                            render={({field})=>(
                                <FormItem className='w-full'>
                                    <FormControl className='w-full'>
                                        <Input 
                                            className="h-full w-full bg-transparent outline-none placeholder:text-zinc-500 focus:placeholder:text-zinc-800 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 border-none text-zinc-800 transition-all"
                                            placeholder='Ask your question'
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            variant="secondary"
                            className='rounded-full h-8 w-8 md:h-14 md:w-14'
                            type='submit'
                            disabled={loading}
                        >
                            <ChevronRight className='h-4 w-4 md:h-6 md:w-6 text-zinc-800' />
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
