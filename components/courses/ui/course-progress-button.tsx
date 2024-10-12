"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { toast } from "sonner";
import axios from "axios";
import { useCertificate } from "@/hooks/use-certificate-modal";


interface CourseProgressButtonProps {
    chapterId : string;
    courseId : string;
    nextChapterId? : string;
    isCompleted : boolean;
    certificate : boolean;
}

export const CourseProgressButton = ({
    chapterId,
    courseId,
    isCompleted,
    nextChapterId,
    certificate
}: CourseProgressButtonProps ) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);
    const { onOpen } = useCertificate();
    const Icon = isCompleted ? XCircle : CheckCircle;

    const onClick = async()=>{
        try {
            setIsLoading(true);
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, { isCompleted : !isCompleted });
            let certificateId : string|null = null;
            if (!isCompleted && !nextChapterId) {
                confetti.onOpen();
                if ( !certificate ) {
                    const response = await axios.post(`/api/courses/${courseId}/certificate`);
                    certificateId = response.data.id;
                }
            }

            if (!isCompleted && nextChapterId) {
                router.push(`/course/${courseId}/view/chapter/${nextChapterId}`)
            }


            toast.success("Progress Updated");
            router.refresh();

            if ( certificateId ) {
                onOpen(certificateId);
            }


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
