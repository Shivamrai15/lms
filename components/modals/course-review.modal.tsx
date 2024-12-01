"use client";

import { AggregatedReview } from "../rating/aggregated-review";
import { Reviews } from "../rating/reviews";
import { Dialog, DialogContent } from "../ui/dialog";

interface CourseReviewModalProps {
    isOpen: boolean;
    onClose: ()=>void;
    courseId: string;
}

export const CourseReviewModal = ({
    courseId,
    isOpen,
    onClose
}: CourseReviewModalProps) => {
    
    const onOpenChange = (open: boolean)=>{
        if (!open) {
            onClose();
        }
    }
    
    return (
        <Dialog
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-3xl w-full h-[36rem] bg-white overflow-y-auto px-8 overflow-x-hidden">
                <AggregatedReview courseId={courseId} />
                <Reviews courseId={courseId} />
            </DialogContent>
        </Dialog>
    )
}
