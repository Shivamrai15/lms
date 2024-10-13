import * as z from "zod";

export const RatingSchema = z.object({
    star : z.number().min(1).max(5),
    comment : z.string().optional(),
    courseId: z.string().min(1)
});

