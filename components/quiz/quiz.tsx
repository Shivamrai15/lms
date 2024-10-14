"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Option, Quiz as QuizType, QuizQuestion, QuizResult } from "@prisma/client";
import { QuestionCard } from "./question-card";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface QuizProps {
    quiz : QuizType & { questions : (QuizQuestion & { options : Option[] })[], result: QuizResult[] };
    courseId: string;
}

export const Quiz = ({
    quiz,
    courseId
}: QuizProps) => {

    const [ answers, setAnswers ] = useState<{ questionId: string, optionId: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const addAnswer = (questionId: string, optionId: string)=>{
        const filteredAnswers = answers.filter((ans)=>ans.questionId!==questionId);
        setAnswers([...filteredAnswers, { questionId, optionId }]);
    }

    const onSubmit = async()=>{
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/user/quiz/${quiz.id}`, {
                response : answers
            });
            router.push(`/course/${courseId}/quiz/${quiz.id}/result`)
        } catch (error) {
            console.log(error);
            toast.error("Someting went wrong")
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="space-y-10 w-full py-20">
            <div className="flex flex-col gap-y-6">
                {
                    quiz.questions.map((question)=>(
                        <QuestionCard
                            key={question.id}
                            question={question}
                            addAnswer={addAnswer}
                            answers={answers}
                        />
                    ))
                }
            </div>
            <div
                className="flex items-center justify-end"
            >
                <Button
                    size="lg"
                    className="rounded-none bg-neutral-800 hover:bg-neutral-800/80"
                    type="submit"
                    onClick={onSubmit}
                    disabled={isLoading}
                >
                    Finish
                </Button>
            </div>
        </div>
    )
}
