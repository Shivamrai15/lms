"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

import { Option, QuizQuestion } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuizOption } from "./quiz-option";
import { GripHorizontal, Trash2, X } from "lucide-react";
import { useSave } from "@/hooks/use-save";
import { useDebounce } from "@/hooks/use-debounce";


interface QuizItemProps {
    item: QuizQuestion & { options : Option[] }
    chapterId: string;
    courseId: string;
    disabled: boolean;
    onQuestionDelete: (id: string)=>void;
}


export const QuizItem = ({
    item,
    chapterId,
    courseId,
    disabled,
    onQuestionDelete
} : QuizItemProps) => {
    
    const [question, setQuestion] = useState(item.question);
    const [options, setOptions] = useState(item.options);
    const { setIsSaving } = useSave();
    const debounceValue = useDebounce(question, 1000);

    const onDelete = async(id: string) => {
        try {
            setIsSaving(true);
            const items = options.filter((item)=>item.id!==id);
            setOptions(items);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/quiz/question/${item.id}/option?id=${id}`);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsSaving(false)
        }
    }

    const onCreate = async()=>{
        try {
            setIsSaving(true);
            const id = uuidv4();

            setOptions((prev)=>[...prev, {
                id,
                answer : "",
                isCorrect : false,
                questionId : item.id,
                createdAt : new Date()
            }]);
            const response  = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quiz/question/${item.id}/option`);
            const items = options.filter((item)=>item.id !==id);
            setOptions([...items, response.data]);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    }


    const onUpdate = async(value: string)=> {
        try {
            if (!value) {
                return;
            }
            setIsSaving(true);
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/quiz/question/${item.id}`, { question : value});
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    }

    useEffect(()=>{
        onUpdate(debounceValue)
    }, [debounceValue])



    return (
        <div className="w-full bg-white border border-zinc-300 rounded-md shadow-md border-l-8 border-l-violet-600 group">
            <div className="flex items-center justify-center h-6">
                <GripHorizontal className="h-6 w-6 text-zinc-400 hidden group-hover:block"/>
            </div>
            <div className="px-6 py-4 space-y-6">
                <Input
                    value={question}
                    disabled={disabled}
                    placeholder="Question"
                    onChange={(e)=>setQuestion(e.target.value)}
                    className="rounded-none h-12 border-0 border-b-2 border-zinc-400 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-violet-400 focus:bg-zinc-50 font-medium text-zinc-800"
                />
                <div className="flex flex-col gap-y-2 w-full">
                    {options.map((option, index)=>(
                        <div className="flex items-center justify-between gap-x-4">
                            <QuizOption
                                option={option}
                                chapterId={chapterId}
                                courseId={courseId}
                                index = {index+1}
                                key={option.id}
                                disabled={disabled}
                            />
                            <Button
                                className="text-zinc-600"
                                size="icon"
                                variant="ghost"
                                onClick={()=>onDelete(option.id)}
                                disabled={disabled}
                            >
                                <X className="h-6 w-6 text-zinc-700" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <Button
                        className="text-zinc-700 font-semibold"
                        variant="secondary"
                        onClick={()=>onQuestionDelete(item.id)}
                        disabled={disabled}
                        size="sm"
                    >
                        <Trash2/>
                    </Button>
                    <Button
                        className="text-zinc-700 font-semibold"
                        variant="secondary"
                        onClick={onCreate}
                        disabled={disabled}
                        size="sm"
                    >
                        Add Option
                    </Button>
                </div>
            </div>
        </div>
    )
}
