"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Button } from '../ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';


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
        <ReactMarkdown 
            className='text-zinc-700 text-[15px]'
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <div className='relative py-6'>
                            <div className='overflow-x-auto'>
                                <SyntaxHighlighter
                                    style={dracula}
                                    language={match[1]}
                                    PreTag="div"
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            </div>
                            <Button
                                className='absolute top-11 right-3 p-2 h-8'
                                onClick={()=>handleCopy(String(children).replace(/\n$/, ''))}
                            >
                                {
                                    copied ? <CheckIcon className='size-4'/> : <CopyIcon className='size-4'/>
                                }
                            </Button>
                        </div>
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
    )
}
