"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { toast } from "sonner";
import axios from "axios";


interface CourseProgressButtonProps {
    chapterId : string;
    courseId : string;
    nextChapterId? : string;
    isCompleted : boolean;
}

export const CourseProgressButton = ({
    chapterId,
    courseId,
    isCompleted,
    nextChapterId
}: CourseProgressButtonProps ) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const Icon = isCompleted ? XCircle : CheckCircle;

    const onClick = async()=>{
        try {
            setIsLoading(true);
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, { isCompleted : !isCompleted });
            if (!isCompleted && !nextChapterId) {
                // TODO create certificate
                confetti.onOpen();
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/course/${courseId}/view/chapter/${nextChapterId}`)
            }

            toast.success("Progress Updated");
            router.refresh();

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            type="button"
            variant={isCompleted ? "outline" : "success"}
            onClick={onClick}
            disabled={isLoading}
        >
            {isCompleted ? "Not compeletd": "Mark as complete"}
            <Icon className="h-4 w-4 ml-2" />
        </Button>
    )
}
