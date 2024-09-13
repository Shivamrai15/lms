"use client";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import axios from "axios";
import { toast } from "sonner";

import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from "@hello-pangea/dnd";

import { Option, Quiz, QuizQuestion } from "@prisma/client";
import { Lock, PlusCircle, Trash2Icon, Unlock } from "lucide-react";
import { QuizItem } from "./quiz-item";
import { useSave } from "@/hooks/use-save";
import { Button } from "@/components/ui/button";


interface QuizForm {
    chapterId: string;
    courseId: string;
    quiz : Quiz & {
        questions : (QuizQuestion & { options : Option[] })[]
    }
}

export const QuizForm = ({
    quiz,
    chapterId,
    courseId
} : QuizForm) => {
    
    const [ quizItems, setQuizItems ] = useState(quiz.questions);
    const [isLocked, setIsLocked] = useState(false);
    const { isSaving, setIsSaving } = useSave();

    const Icon = isLocked ? Lock : Unlock; 

    const addQuestion = async()=>{
        try {
            setIsSaving(true)
            const id = uuidv4();
            setQuizItems((items)=>[...items, {
                id ,
                question : "",
                position : quizItems.length+1,
                createdAt : new Date(),
                updatedAt : new Date(),
                options : [],
                quizId : quiz.id
            }]);

            const response = await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quiz/question`);
            const items = quizItems.filter((item)=>item.id!==id);
            items.push(response.data);
            items.sort((a, b)=> a.position-b.position);
            setQuizItems(items);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    }

    const onQuestionDelete = async(id: string) => {
        try {
            setIsSaving(true)
            const items = quizItems.filter((item)=>item.id!==id);
            items.sort((a, b)=> a.position-b.position);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/quiz/question/${id}`);
            setQuizItems(items);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }finally {
            setIsSaving(false);
        }
    }

    const updatePosition = async(items: {id: string, position: number}[])=>{
        try {
            setIsSaving(true);
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/quiz/question/`, {items})
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    }


    const onDragEnd = (result : DropResult)=> {
        try {
            if (!result.destination) return;
            const items = Array.from(quizItems);
            const sourceQuestion = items.find((item)=>item.id===result.draggableId);
            if (!sourceQuestion) {
                return;
            }

            items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, sourceQuestion);

            const updatedItems = items.map((item, index)=>({
                ...item,
                position : index+1
            }));

            const updatedItemsPosition = updatedItems.map((item)=>({
                id : item.id,
                position : item.position
            }));

            setQuizItems(updatedItems);
            updatePosition(updatedItemsPosition);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    
    return (
        <div className="w-full relative space-y-10">
            <div className="max-w-sm w-full z-10 bg-white px-6 py-4 shadow-md border border-zinc-300 rounded-md mx-auto sticky top-4">
                <div className="flex items-center justify-center text-zinc-700 gap-x-6">
                    <Button
                        onClick={addQuestion}
                        disabled={isLocked}
                        size="icon"
                        variant="ghost"
                    >
                        <PlusCircle 
                            className="h-6 w-6 md:cursor-pointer"
                        />
                    </Button>
                    <Button
                        disabled = {isLocked}
                        size="icon"
                        variant="ghost"
                    >
                        <Trash2Icon className="h-6 w-6 md:cursor-pointer" />
                    </Button>
                    <Icon
                        className="h-6 w-6 md:cursor-pointer"
                        onClick={()=>setIsLocked((prev)=>!prev)}
                    />
                    <span className="font-semibold text-sm">
                        { isSaving ? "Saving..." : "Saved" }
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-y-6">
                <DragDropContext onDragEnd={onDragEnd} >
                    <Droppable droppableId="questions" >
                        {(provided)=>(
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                {
                                    quizItems.map((question, index)=>(
                                        <Draggable key={question.id} draggableId={question.id} index={index} >
                                            {(provided)=>(
                                                <div
                                                    className="py-3"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <QuizItem
                                                        chapterId={chapterId}
                                                        courseId={courseId}
                                                        item={question}
                                                        key={question.id}
                                                        disabled={isLocked}
                                                        onQuestionDelete={onQuestionDelete}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
}
