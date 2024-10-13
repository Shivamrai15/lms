"use client";

import { AggregatedReview } from "./aggregated-review";
import { Reviews } from "./reviews";

interface CourseReviewProps {
    courseId: string;
}

const CourseReview = ({
    courseId
} : CourseReviewProps ) => {
    
    return (
        <div className="max-w-3xl w-full mx-auto py-20 px-6">
            <AggregatedReview courseId={courseId} />
            <Reviews courseId={courseId} />
        </div>
    )
}

export default CourseReview;