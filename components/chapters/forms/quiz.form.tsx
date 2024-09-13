"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { Chapter, Quiz } from "@prisma/client";
import { Button } from "@/components/ui/button";


interface QuizFormProps {
    initialData : Chapter & { quiz : Quiz|null };
    courseId : string;
    chapterId : string;
}

export const QuizForm = ({
    initialData,
    chapterId,
    courseId
}: QuizFormProps ) => {
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async()=>{
        try {
            setIsLoading(true);
            if (!initialData.quiz) {
                await axios.post(`/api/courses/${courseId}/chapters/${chapterId}/quiz`);
            } 
            router.push(`/tutor/courses/${courseId}/chapters/${chapterId}/quiz-test`);

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="w-full">
            <Button
                className="w-full h-14 rounded-none"
                disabled = {isLoading}
                onClick={onClick}
            >
                Continue
            </Button>
        </div>
    )
}
