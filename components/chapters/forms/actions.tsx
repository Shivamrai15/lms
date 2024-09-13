"use client"

import { AlertDelete } from "@/components/modals/delete-alert.modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionsProps {
    disabled : boolean;
    courseId : string;
    chapterId : string;
    isPublished : boolean;
}
export const Actions = ({
    chapterId,
    courseId,
    disabled,
    isPublished
} : ActionsProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onClick = async() => {
        try {
            setLoading(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("Chapter unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("Chapter published");
            }
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async()=>{
        try {
            setLoading(true);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
            toast.success("Chapter has been deleted successfully");
            router.refresh();
            router.push(`/tutor/courses/${courseId}`)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={loading || disabled}
                variant="outline"
                size="sm"
            >
                { isPublished ? "Unpublish" : "Publish"}
            </Button>
            <AlertDelete
                disabled={loading}
                onConfirm={onDelete}
            />
        </div>
    )
}
