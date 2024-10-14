"use client";

import { cn } from "@/lib/utils";
import { QuizQuestion, Option } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";

interface OutputCardProps {
    question: QuizQuestion & { options: Option[] }
    type : "correct"|"incorrect"|"dropped"
}

export const OutputCard= ({
    question,
    type
}: OutputCardProps) => {;

    return (
        <div className={cn(
            "w-full p-6 rounded-2xl bg-violet-100 border border-violet-200",
            type === "correct" && "bg-emerald-50 border-emerald-200",
            type === "incorrect" && "bg-red-50 border-red-200",
        )}>
            <div className="flex items-center justify-end py-2">
                <p className={cn(
                    "text-zinc-700 font-semibold",
                    type === "correct" && "text-emerald-600",
                    type === "incorrect" && "text-red-600"
                )}>
                    {
                        type.charAt(0).toUpperCase()+type.slice(1)
                    }
                </p>
            </div>
            <h3 className="font-medium text-zinc-700 text-base" >{question.question}</h3>
            <div className="mt-6 flex flex-col space-y-2">
                {
                    question.options.map((option)=> (
                        <div
                            key={option.id}
                            className="flex items-center gap-x-4"
                        >
                            <Checkbox
                                checked={option.isCorrect}
                                disabled
                            />
                            <span className="text-sm font-medium text-zinc-600" >{option.answer}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
