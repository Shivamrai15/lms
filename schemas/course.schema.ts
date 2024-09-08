import * as z from "zod";

export const CourseSchema = z.object({
    title : z.string().min(1, {
        message : "Course title is required"
    })
});