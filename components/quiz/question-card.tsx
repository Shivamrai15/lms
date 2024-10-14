"use client";

import { cn } from "@/lib/utils";
import { QuizQuestion, Option } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";

interface QuizQuestionProps {
    question: QuizQuestion & { options: Option[] }
    addAnswer: ( questionId: string, optionId: string )=>void;
    answers : { questionId: string, optionId: string }[];
}

export const QuestionCard= ({
    question,
    addAnswer,
    answers
}: QuizQuestionProps) => {;

    return (
        <div className={cn(
            "w-full p-6 rounded-2xl bg-violet-100 border border-violet-200",
        )}>
            <h3 className="font-medium text-zinc-700 text-base" >{question.question}</h3>
            <div className="mt-6 flex flex-col space-y-2">
                {
                    question.options.map((option)=> (
                        <div
                            key={option.id}
                            className="flex items-center gap-x-4"
                        >
                            <Checkbox
                                checked={answers.find((ans)=>ans.questionId===question.id)?.optionId===option.id}
                                onClick={()=>addAnswer(question.id, option.id)}
                            />
                            <span className="text-sm font-medium text-zinc-600" >{option.answer}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
