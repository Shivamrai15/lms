"use client"

import { AlertDelete } from "@/components/modals/delete-alert.modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionsProps {
    courseId : string;
    isPublished : boolean;
}
export const Actions = ({
    courseId,
    isPublished
} : ActionsProps) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onClick = async() => {
        try {
            setLoading(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
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
            const resposne = await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course has been deleted successfully");
            router.push(`/tutor/courses`)
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
                disabled={loading}
                variant="outline"
                size="sm"
            >
                { isPublished ? "Unpublish" : "Publish"}
            </Button>
            <AlertDelete
                onConfirm={onDelete}
                disabled={loading}
            />
        </div>
    )
}
