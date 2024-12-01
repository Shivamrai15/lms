"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { CodeHighlighter } from './code-highlighter';


interface ChatResponseProps {
    response : string;
}

export const ChatResponse = ({ response }: ChatResponseProps ) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    };

    return (
        <div className='space-y-4'>
            <ReactMarkdown 
                className='text-zinc-700 text-[15px]'
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <CodeHighlighter
                                language={match[1]}
                                code={String(children).replace(/\n$/, '')}
                            />
                        ) : (
                            <div className='py-2 max-md:overflow-x-auto inline'>
                                <code className={`bg-gray-100 text-red-500 ${className}`} {...props}>
                                    {children}
                                </code>
                            </div>
                        );
                    },
                }}
            >
                {response}
            </ReactMarkdown>
            <Button
                variant="outline"
                className='p-2 h-8'
                onClick={()=>handleCopy(response)}
            >
                {
                    copied ? <CheckIcon className='size-4'/> : <CopyIcon className='size-4'/>
                }
            </Button>
        </div>
    )
}
